import { Browser, BrowserContext, chromium, Page } from 'playwright'
import fs from 'fs-extra'
import { omit } from '@wzyjs/utils/node'

export const parseTags = (tags: string[]) => {
  return tags.map((item: string) => `#${item}`).join(' ')
}

export const getCookies = (cookies: any) => {
  let cookieObj: any = {}

  cookies.forEach((cookie: string) => {
    // 使用分号分割每个属性
    let parts = cookie.split('; ').slice(0, 1)
    // 遍历每个部分并处理
    parts.forEach((part: string) => {
      // 如果当前部分包含'='，则认为它是键值对
      if (part.includes('=')) {
        let [key, value] = part.split('=')
        // 如果键已经存在于对象中，则追加到数组中，否则创建新的键
        if (cookieObj[key]) {
          if (!Array.isArray(cookieObj[key])) {
            cookieObj[key] = [cookieObj[key]]
          }
          cookieObj[key].push(value)
        } else {
          cookieObj[key] = value
        }
      }
    })
  })

  return cookieObj
}

export const cookies2Str = (cookies: any) => {
  let cookieString = ''
  for (const key in cookies) {
    if (cookies.hasOwnProperty(key)) {
      const value = cookies[key]
      cookieString += `${key}=${value}; `
    }
  }
  return cookieString
}

export const parseCookies = (cookieString: string, urls: string | string[]) => {
  if (!Array.isArray(urls)) {
    urls = [urls]
  }
  // 从字符串中提取 cookie 名称和值
  return cookieString.split('; ').map(cookiePart => {
    const [name, value] = cookiePart.split('=')
    if (!name || !value) {
      return null
    }
    return urls.map(url => ({
      name,
      value,
      url,
    }))
  }).flat().filter(Boolean)
}

const extractProtocolAndDomain = (url: string): string => {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\:[\w.]+)?/
  const match = url.match(regex)
  return match ? match[0] : ''
}

export class BrowserPage {
  browser: Browser
  context: BrowserContext
  page: Page

  protected async newBrowser(headless = true) {
    this.browser = await chromium.launch({
      headless,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    })
  }

  protected async newPage(url: string, origin: string, headers: any, waitUntil = 'networkidle') {
    if (!this.browser) {
      return
    }

    this.context = await this.browser.newContext({
      viewport: { width: 1600, height: 1000 },
      storageState: {
        cookies: headers.cookies,
        origins: [
          {
            origin,
            localStorage: [],
          },
        ],
      },
    })

    this.page = await this.context.newPage()

    if (omit(headers, ['cookie', 'cookies'])) {
      await this.page.route('**/*', async (route) => {
        const request = route.request()
        const newHeaders = {
          ...omit(headers, ['cookie', 'cookies']),
          ...request.headers(),
        }
        await route.continue({ headers: newHeaders })
      })
    }

    try {
      await this.page.goto(url, { waitUntil })
    } catch (err) {
      console.log(666, err)
    }

    if (this.page.url().includes('login')) {
      throw new Error('Cookie 失效，已跳转到登录页')
    }
  }

  protected async safeClick(selector: string) {
    if (!this.page) {
      return
    }
    await this.page.waitForSelector(selector, { state: 'attached' })
    await this.page.click(selector)
  }

  protected async safeInput(selector: string, text: string) {
    await this.page.waitForSelector(selector, { state: 'attached' })
    await this.page.fill(selector, '')
    await this.page.fill(selector, text)
  }

  protected async safeUpload(selector: string, filePath: string, waitSelector?: string) {
    await this.page.waitForSelector(selector, { state: 'attached' })

    const fileInput = await this.page.$(selector)
    if (!fileInput) {
      throw new Error('无法找到文件输入元素')
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在: ${filePath}`)
    }

    await fileInput.setInputFiles(filePath)

    await this.page.evaluate((selector) => {
      const input = document.querySelector(selector)
      if (input) {
        const event = new Event('change', { bubbles: true })
        input.dispatchEvent(event)
      }
    }, selector)

    // 等待指定元素出现，表示上传完成
    if (waitSelector) {
      await this.page.waitForSelector(waitSelector, { state: 'attached' })
    }
  }
}
