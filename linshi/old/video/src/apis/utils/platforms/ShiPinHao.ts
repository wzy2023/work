import { axios } from '@wzyjs/utils'
import { AccountLoginStatus } from '@/apis/entities'
import { BrowserPage, cookies2Str, getCookies, parseCookies, parseTags } from './utils'

class ShiPinHaoSubmit extends BrowserPage {
  urls = { origin: '', list: '', create: '' }

  constructor() {
    super()
    this.urls.origin = 'https://channels.weixin.qq.com'
    this.urls.create = 'https://channels.weixin.qq.com/platform/post/create'
    this.urls.list = 'https://channels.weixin.qq.com/platform/post/list'
  }

  private async uploadVideo(filePath: string) {
    await this.safeUpload(
      '.upload input',
      filePath,
      '#fullScreenVideo',
    )
  }

  private async inputDesc(text: string) {
    await this.safeInput('.input-editor', text)
  }

  private async changeAddress() {
    await this.safeClick('.position-display-wrap')
    await this.safeClick('.option-item:first-of-type')
  }

  private async changeOriginal() {
    await this.safeClick('.ant-checkbox-wrapper')
    await this.safeClick('.protocol-text')
    await this.safeClick('#container-wrap div.declare-original-dialog div:nth-child(2) > button')
  }

  private async clickSubmit() {
    await this.safeClick('div.main-body-wrap.post-create div:nth-child(5) button')
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
    await this.newPage(this.urls.create, this.urls.origin, this.headers)
    await this.uploadVideo(values.videoFilePath)
    await this.inputDesc(values.title + ' ' + values.desc + '\n' + parseTags(values.tags))
    await this.changeAddress()
    await this.changeOriginal()
    await this.clickSubmit()
    await this.check()
    await this.browser.close()
  }
}

export class ShiPinHao extends ShiPinHaoSubmit {
  setCookie: string[] = []
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

  private transformCookieStr() {
    const cookies = getCookies(this.setCookie)
    this.headers = {
      cookie: cookies2Str(cookies),
    }
  }

  private async apiGetLoginToken() {
    const url = 'https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/auth/auth_login_code?_rid=6708dbad-551f9cc1'
    const res = await axios.post(url)

    const { data: { token }, errMsg } = res.data
    if (!token) {
      throw new Error(errMsg)
    }

    this.loginToken = token
  }

  private async apiGetLoginStatus() {
    const url = `https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/auth/auth_login_status?token=${this.loginToken}`
    const res = await axios.post(url)

    const { data, errMsg, errCode } = res.data
    if (errCode !== 0) {
      throw new Error(errMsg)
    }

    this.setCookie = res.headers['set-cookie'] || []

    return data
  }

  private async apiGetUserInfo() {
    const url = `https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/auth/auth_data`
    const res = await axios.post(url, null, {
      headers: this.headers,
    })

    const { data, errMsg, errCode } = res.data
    if (errCode !== 0) {
      throw new Error(errMsg)
    }

    return data
  }

  public async getUserInfo(): Promise<any> {
    const data = await this.apiGetUserInfo()

    this.userInfo = data

    return {
      userId: data.finderUser.uniqId,
      name: data.finderUser.nickname,
      works: data.finderUser.feedsCount,
      fans: data.finderUser.fansCount,
      avatar: data.finderUser.headImgUrl,
    }
  }

  public async getLoginToken(): Promise<{ loginToken: string, loginUrl: string }> {
    await this.apiGetLoginToken()
    return {
      loginToken: this.loginToken,
      loginUrl: `https://channels.weixin.qq.com/mobile/confirm_login.html?token=${this.loginToken}`,
    }
  }

  public async getLoignStatus(): Promise<AccountLoginStatus> {
    const data = await this.apiGetLoginStatus()

    if (data.status === 0) {
      return AccountLoginStatus.NotLoggedIn
    }

    if (data.status === 1) {
      this.transformCookieStr()
      return AccountLoginStatus.LoggedIn
    }

    if (data.status === 5) {
      return AccountLoginStatus.Scanned
    }

    return data.status
  }
}
