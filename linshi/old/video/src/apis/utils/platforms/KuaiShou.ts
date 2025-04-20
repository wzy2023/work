import { axios } from '@wzyjs/utils/node'
import { parseCookies, BrowserPage, parseTags } from './utils'

class KuaiShouSubmit extends BrowserPage {
  urls = { origin: [''], list: '', create: '' }

  constructor() {
    super()
    this.urls.origin = ['https://cp.kuaishou.com', 'https://onvideoapi.kuaishou.com']
    this.urls.list = 'https://cp.kuaishou.com/article/manage/video?status=2&from=publish'
    this.urls.create = 'https://cp.kuaishou.com/article/publish/video?tabType=1'
  }

  private async uploadVideo(filePath: string) {
    await this.safeUpload(
      '#joyride-wrapper input',
      filePath,
      '#preview-tours video',
    )
  }

  private async inputDesc(text: string) {
    await this.safeInput('#work-description-edit', text)
  }

  private async clickSubmit() {
    await this.safeClick('._button-primary_si04s_60')
  }

  private async closeToolTip() {
    await this.safeClick('._close_d7f44_29')
  }

  private async check() {
    await this.page.waitForNavigation({ url: this.urls.list })
  }

  public async open() {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin, this.headers)
  }

  public async submit(values: any) {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin[0], this.headers)
    await this.uploadVideo(values.videoFilePath)
    await this.closeToolTip()
    await this.inputDesc(values.title + '' + values.desc + '\n' + parseTags(values.tags))
    await this.clickSubmit()
    await this.check()
    await this.browser.close()
  }
}

export class KuaiShou extends KuaiShouSubmit {
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
    const url = 'https://cp.kuaishou.com/rest/cp/creator/pc/home/userInfo'
    const res = await axios.post(url, null, {
      headers: this.headers,
    })

    const { result, message, data } = res.data
    if (result !== 1) {
      throw new Error(message)
    }

    return data
  }

  public async getUserInfo(): Promise<any> {
    const data = await this.apiGetUserInfo()

    this.userInfo = data

    return {
      userId: data.coreUserInfo.userId,
      name: data.coreUserInfo.userName,
      works: 0,
      fans: data.coreUserInfo.fansNum,
      avatar: data.coreUserInfo.headUrl,
    }
  }
}
