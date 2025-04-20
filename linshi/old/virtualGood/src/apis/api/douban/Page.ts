import puppeteer from 'puppeteer'

const parseCookies = (cookie) => {
  const reg = /(.*?)=(.*?);/g
  const arr = []

  do {
    var item = reg.exec(cookie)
    if (item) {
      arr.push({
        key: item[1].trim(),
        value: item[2].trim(),
      })
    }
  } while (item)

  return arr
}

export default class Page {
  url: ''
  options: any = {}
  browser: any = null
  page: any = null

  constructor(url, options: any = {}) {
    this.url = url
    this.options = options
    if (options?.cookies) {
      this.options.cookies = parseCookies(options?.cookies)
    }
  }

  async _getBrower() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true })
    }
    return this.browser
  }

  async _getPage() {
    if (!this.page) {
      const browser = await this._getBrower()
      this.page = await browser.newPage()
      this.options?.cookies?.map(async item => {
        await this.page.setCookie({
          name: item.key,
          value: item.value,
          domain: '.douban.com',
          path: '/',
          expires: Date.now() + 3600 * 100000,
        })
      })
      await this.page.goto(this.url, { timeout: 60 * 1000 })
    }
    return this.page
  }

  async getValue(selector, attrOrFn) {
    const page = await this._getPage()

    try {
      return page.$eval(selector, attrOrFn).catch(() => undefined)
    } catch (err) {
      return ''
    }
  }

  async getList(selector, fn) {
    const page = await this._getPage()

    try {
      return page.$$eval(selector, fn).catch(() => undefined)
    } catch (err) {
      return []
    }
  }

  async getData(list) {

    // 先启动页面，不然下面的Promise.all()是并行执行的，会启动出多个brower
    await this._getPage()

    const res: any = await Promise.all(list.map(async i => ({
      key: i.key,
      value: i.type === 'list' ? await this.getList(i.selector, i.attrOrFn) : await this.getValue(i.selector, i.attrOrFn),
    }))) || []

    return res.reduce((o, i) => ({
      ...o,
      [i.key]: Array.isArray(i.value) ? i.value.filter(i => i !== '更多...') : i.value,
    }), {})
  }
}
