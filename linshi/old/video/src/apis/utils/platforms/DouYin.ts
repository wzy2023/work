import { axios } from '@wzyjs/utils'
import { parseCookies, BrowserPage, parseTags } from './utils'

class DouYinSubmit extends BrowserPage {
  urls = { origin: [''], list: '', create: '' }

  constructor() {
    super()
    this.urls.origin = ['https://creator.douyin.com', 'https://video-cn.douyin.com', 'https://p0-creator-media-private.douyin.com']
    this.urls.list = 'https://creator.douyin.com/creator-micro/content/manage?enter_from=publish'
    this.urls.create = 'https://creator.douyin.com/creator-micro/content/publish?enter_from=publish_page'
  }

  private async uploadVideo(filePath: string) {
    await this.safeUpload(
      'input[accept="video/mp4,video/x-m4v,video/*"]',
      filePath,
      '.semi-toast-content',
    )
  }

  private async inputTitle(text: string) {
    if (!text) {
      return
    }
    await this.safeInput('.semi-input.semi-input-default', text)
  }

  private async inputDesc(text: string) {
    if (!text) {
      return
    }
    await this.safeInput('.zone-container.editor-kit-container.editor', text)
  }

  private async clickSubmit() {
    await this.safeClick('.card-container-creator-layout button[class*="primary"]')
  }

  private async check() {
    await this.page.waitForNavigation({ url: this.urls.list })
  }

  public async open() {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin[0], this.headers, 'commit')
  }

  public async submit(values: any) {
    await this.newBrowser(false)
    // @ts-ignore
    await this.newPage(this.urls.create, this.urls.origin[0], this.headers)
    await this.uploadVideo(values.videoFilePath)
    await this.inputTitle(values.title)
    await this.inputDesc(values.desc + '\n' + parseTags(values.tags))
    // await this.clickSubmit()
    // await this.check()
    // await this.browser.close()
  }
}

export class DouYin extends DouYinSubmit {
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
    const url = 'https://creator.douyin.com/aweme/v1/creator/user/info'
    const res = await axios.get(url, {
      headers: this.headers,
    })

    const { status_msg, status_code, douyin_user_verify_info } = res.data
    if (status_code) {
      throw new Error(status_msg)
    }

    return douyin_user_verify_info
  }

  public async getUserInfo(): Promise<any> {
    const data = await this.apiGetUserInfo()

    this.userInfo = data

    return {
      userId: data.douyin_unique_id,
      name: data.nick_name,
      works: 0,
      fans: data.follower_count,
      avatar: data.avatar_url,
    }
  }
}
