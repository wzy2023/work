import { axios } from '@wzyjs/utils/node'
import { parseCookies, BrowserPage, parseTags } from './utils'

class XiaoHongShuSubmit extends BrowserPage {
  urls = { origin: [''], list: '', create: '' }

  constructor() {
    super()
    this.urls.origin = ['https://creator.xiaohongshu.com', 'https://www.xiaohongshu.com', 'https://edith.xiaohongshu.com']
    this.urls.list = 'https://creator.xiaohongshu.com/publish/publish?source=official'
    this.urls.create = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=tab_switch'
  }

  private async uploadVideo(filePath: string) {
    await this.safeUpload(
      'input.upload-input',
      filePath,
      'div.preview .title',
    )
  }

  private async inputTitle(text: string) {
    await this.safeInput('.el-input__inner', text)
  }

  private async inputDesc(text: string) {
    await this.safeInput('div.ql-editor', text)
  }

  private async clickSubmit() {
    await this.safeClick('.publishBtn')
  }

  private async check() {
    await this.page.waitForNavigation({ url: this.urls.list })
  }

  public async open() {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin[0], this.headers)
  }

  public async submit(values: any) {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin[0], this.headers)
    await this.uploadVideo(values.videoFilePath)
    // await this.inputTitle(values.title)
    await this.inputDesc(values.title + '\n' + values.desc + '\n' + parseTags(values.tags))
    await this.clickSubmit()
    await this.check()
    await this.browser.close()
  }
}

export class XiaoHongShu extends XiaoHongShuSubmit {
  loginToken: string = ''
  headers: any = {}
  userInfo: any = {}

  constructor(option?: { loginToken?: string, headers?: any }) {
    super()
    if (option?.loginToken) {
      this.loginToken = option.loginToken
    }
    if (option?.headers) {
      this.headers = option.headers
      this.headers.cookies = parseCookies(this.headers.cookie, this.urls.origin)
    }
  }

  private async apiGetUserInfo() {
    const url = 'https://creator.xiaohongshu.com/api/galaxy/creator/home/personal_info'

    const res = await axios.get(url, {
      headers: this.headers,
    })

    const { result, msg, data } = res.data
    if (result !== 0) {
      throw new Error(msg)
    }

    return data
  }

  public async getUserInfo(): Promise<any> {
    const data = await this.apiGetUserInfo()

    this.userInfo = data

    return {
      userId: data.red_num,
      name: data.name,
      works: 0,
      fans: data.fans_count,
      avatar: data.avatar,
    }
  }
}
