import { XMLParser } from 'fast-xml-parser'

// XML解析选项
const xmlParserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
  parseAttributeValue: true,
  preserveOrder: false,
  trimValues: true,
}

// 辅助函数：获取文本值
const getTextValue = (value: any): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (value['#text']) return value['#text']
  if (Array.isArray(value)) {
    return value.map(v => getTextValue(v)).join(' ')
  }
  return String(value)
}

// 简单的HTML标签清理函数
const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim()
}

// 抓取RSS内容
export const fetchRssFeed = async (url: string) => {
  try {
    console.log(`尝试抓取RSS: ${url}`)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 增加到60秒超时

    // 常见浏览器User-Agent列表
    const userAgents = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.48 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    ]

    // 随机选择一个User-Agent
    const userAgent: string = userAgents[Math.floor(Math.random() * userAgents.length)] || userAgents[0] || ''

    // 准备抓取选项
    const options: RequestInit = {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,fr;q=0.6',
        'Referer': new URL(url).origin,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'Connection': 'keep-alive',
      },
      signal: controller.signal,
      redirect: 'follow',
      // 包含凭据 (cookies)
      credentials: 'include',
    }

    // 尝试使用浏览器模式抓取
    console.log(`开始请求: ${url}`)
    const response = await fetch(url, options)

    clearTimeout(timeoutId)

    console.log(`响应状态: ${response.status} ${response.statusText}`)
    if (!response.ok) {
      // 如果失败，根据错误类型进行不同的重试策略
      if (response.status === 403 || response.status === 429) {
        console.log(`遇到${response.status}错误，等待后重试...`)
        // 等待更长时间
        await new Promise(resolve => setTimeout(resolve, 3000))

        // 第二次尝试，使用不同的User-Agent和不带Referer
        let fallbackOptions = {
          ...options,
          headers: {
            ...options.headers,
            Accept: '',
            'Accept-Language': '',
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)] || '',
          },
        }
        // @ts-ignore
        delete fallbackOptions.headers.Referer

        console.log(`第一次重试请求: ${url} (无Referer)`)
        let retryResponse = await fetch(url, fallbackOptions)

        // 如果第一次重试失败，尝试第二次重试
        if (!retryResponse.ok && (retryResponse.status === 403 || retryResponse.status === 429)) {
          console.log(`第一次重试失败，继续重试...`)
          await new Promise(resolve => setTimeout(resolve, 5000))

          // 第三次尝试，使用移动设备User-Agent
          fallbackOptions = {
            ...options,
            headers: {
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }

          console.log(`第二次重试请求: ${url} (移动设备UA)`)
          retryResponse = await fetch(url, fallbackOptions)
        }

        if (!retryResponse.ok) {
          throw new Error(`请求失败 (${retryResponse.status}): ${retryResponse.statusText}`)
        }

        const text = await retryResponse.text()
        console.log(`获取内容成功，长度: ${text.length}`)
        return text
      }

      throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
    }

    const text = await response.text()
    console.log(`获取内容成功，长度: ${text.length}`)
    return text
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('获取RSS超时，请检查链接或稍后重试')
    }
    throw new Error(`获取RSS失败: ${error.message}`)
  }
}

// 解析RSS XML
export const parseRssXml = (xml: string) => {
  try {
    // 使用fast-xml-parser解析XML
    const parser = new XMLParser(xmlParserOptions)
    const result = parser.parse(xml)

    // 获取频道信息
    let channelInfo = result.rss?.channel
    if (!channelInfo) {
      // 尝试其他可能的结构
      if (result.feed) { // Atom格式
        channelInfo = result.feed
      } else if (result.rdf?.channel) { // RDF格式
        channelInfo = result.rdf.channel
      }
    }

    if (!channelInfo) {
      throw new Error('无法识别的RSS格式')
    }

    // 提取频道基本信息
    const channelTitle = getTextValue(channelInfo.title)
    const channelDescription = getTextValue(channelInfo.description || channelInfo.subtitle)
    const channelLink = getTextValue(channelInfo.link)

    // 处理items，可能是数组或单个对象
    let items = []

    if (channelInfo.item) {
      // RSS 2.0 格式
      items = Array.isArray(channelInfo.item) ? channelInfo.item : [channelInfo.item]
    } else if (channelInfo.entry) {
      // Atom 格式
      items = Array.isArray(channelInfo.entry) ? channelInfo.entry : [channelInfo.entry]
    } else if (result.rdf?.item) {
      // RDF 格式
      items = Array.isArray(result.rdf.item) ? result.rdf.item : [result.rdf.item]
    }

    // 处理每个item
    const parsedItems = items.map((item: any) => {
      // 获取链接，处理不同格式
      let link = ''

      if (typeof item.link === 'string') {
        link = item.link
      } else if (item.link?._href) {
        link = item.link._href
      } else if (item.link && Array.isArray(item.link)) {
        const linkObj = item.link.find((l: any) => l._rel === 'alternate') || item.link[0]
        link = linkObj._href || ''
      } else if (item.guid) {
        link = getTextValue(item.guid)
      }

      // 获取其他字段
      const title = getTextValue(item.title)
      const description = getTextValue(item.description || item.summary || item.content)
      const content = getTextValue(item['content:encoded'] || item.content || item.description || item.summary || '')
      let pubDate = new Date()

      // 处理不同格式的日期
      if (item.pubDate) {
        pubDate = new Date(getTextValue(item.pubDate))
      } else if (item.published) {
        pubDate = new Date(getTextValue(item.published))
      } else if (item.updated) {
        pubDate = new Date(getTextValue(item.updated))
      } else if (item['dc:date']) {
        pubDate = new Date(getTextValue(item['dc:date']))
      }

      // 确保pubDate是有效日期
      if (isNaN(pubDate.getTime())) {
        pubDate = new Date()
      }

      // 获取作者
      let author = ''
      if (item.author) {
        if (typeof item.author === 'string') {
          author = item.author
        } else if (item.author.name) {
          author = getTextValue(item.author.name)
        }
      } else if (item['dc:creator']) {
        author = getTextValue(item['dc:creator'])
      }

      return {
        title: stripHtml(title),
        description: stripHtml(description),
        content,
        link,
        pubDate,
        author: stripHtml(author),
      }
    }).filter((item: any) => item.link) // 只保留有链接的项

    return {
      title: channelTitle,
      description: channelDescription,
      link: channelLink,
      items: parsedItems,
    }
  } catch (error: any) {
    console.error('解析RSS失败:', error, '\nXML内容前100字符:', xml.substring(0, 100))
    throw new Error(`解析RSS失败: ${error.message}`)
  }
}
