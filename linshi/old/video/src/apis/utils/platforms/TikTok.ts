import { axios } from '@wzyjs/utils'
import { parseCookies, BrowserPage, parseTags } from './utils'

class TikTokSubmit extends BrowserPage {
  urls = { origin: '', list: '', create: '' }

  constructor() {
    super()
    this.urls.origin = 'https://www.tiktok.com'
    this.urls.list = ''
    this.urls.create = 'https://www.tiktok.com/tiktokstudio/upload?from=creator_center'
  }

  private async uploadVideo(filePath: string) {
    await this.safeUpload(
      'input[type="file"]',
      filePath,
      '.info-status-item .TUXText',
    )
  }

  private async inputDesc(text: string) {
    await this.safeInput('.notranslate.public-DraftEditor-content', text)
  }

  private async clickSubmit() {
    await this.safeClick('button.TUXButton.TUXButton--primary')
  }

  private async check() {
    await this.page.waitForSelector('div[content="你可以管理自己的作品或上传其它视频。"]', { state: 'visible' })
  }

  public async open() {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin, this.headers)
  }

  public async submit(values: any) {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin, this.headers)
    await this.uploadVideo(values.videoFilePath)
    await this.inputDesc(values.title + ' ' + values.desc + '\n' + parseTags(values.tags))
    await this.clickSubmit()
    await this.check()
    await this.browser.close()
  }
}

export class TikTok extends TikTokSubmit {
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
    const url = 'https://www.tiktok.com/passport/web/account/info/'
    const res = await axios.post(url, null, {
      headers: this.headers,
    })

    const { message, data } = res.data
    if (message !== 'success') {
      throw new Error(message)
    }

    return data
  }

  public async getUserInfo(): Promise<any> {
    const data = await this.apiGetUserInfo()

    this.userInfo = data

    return {
      userId: data.user_id,
      name: data.username,
      works: 0,
      fans: 0,
      avatar: data.avatar_url,
    }
  }
}
