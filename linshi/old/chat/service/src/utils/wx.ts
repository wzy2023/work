import fs from 'fs'
import fetch from 'node-fetch'
import WxPay from 'wechatpay-node-v3'
import { OrderStatus } from '../types'

const type = 'native'
const appid = process.env.WECHAT_PAY_APP_ID
const mchid = process.env.WECHAT_PAY_MCH_ID
const notify_url = process.env.WECHAT_PAY_NOTIFY_URL
const apiV3Key = process.env.WECHAT_PAY_API_V3_KEY

const wxPay = new WxPay({
  appid,
  mchid,
  publicKey: fs.readFileSync('./cert/apiclient_cert.pem'),
  privateKey: fs.readFileSync('./cert/apiclient_key.pem'),
})

export const getWxPayUrl = async (out_trade_no: string, total: number, description?: string) => {
  try {
    const params = {
      appid,
      mchid,
      description,
      out_trade_no,
      notify_url,
      amount: { total },
    }

    const url = '/v3/pay/transactions/' + type
    const nonce_str = Math.random().toString(36).substr(2, 15) // 随机字符串
    const timestamp = parseInt(+new Date() / 1000 + '').toString() // 时间戳 秒

    const signature = wxPay.getSignature('POST', nonce_str, timestamp, url, params)
    const authorization = wxPay.getAuthorization(nonce_str, timestamp, signature)

    const result = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/' + type, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        Authorization: authorization,
      }
    })

    const data = await result.json() as { code_url?: string, message?: string }
    if (!data?.code_url) {
      throw new Error(data.message)
    }

    return Promise.resolve(data)

  } catch (error) {
    throw new Error('获取微信二维码链接失败')
  }
}

export const decipherGcm = (payRes: any): { out_trade_no: string, trade_state: OrderStatus } => {
  const { resource: { ciphertext, associated_data, nonce } } = payRes
  return wxPay.decipher_gcm(ciphertext, associated_data, nonce, apiV3Key)
}

export const code2OpenId = async (code: string) => {
  const url = `http://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`

  const res = await fetch(url)
  const data = await res.json() as { errcode?: number, errmsg?: string }

  if (data?.errcode === 40163) {
    throw new Error(data.errmsg)
  }

  return data as { access_token?: string, openid?: string, unionid?: string }
}

export const getUserInfo = async (accessToken, openid) => {
  const res = await fetch(`http://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}`)
  return await res.json()
}
