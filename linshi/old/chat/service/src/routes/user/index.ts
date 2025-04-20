import express from 'express'
import { login } from '../../middleware'
import { chatSMSCode, chatUser } from '../../database'
import { randomSMSCode, randomUuid, sendSms } from '../../utils'
import { code2OpenId, getUserInfo } from '../../utils/wx'

const router = express.Router()

router.post('/sms/send', async (req, res) => {
  try {
    const { mobile } = req.body

    if (!mobile) {
      throw new Error('手机号码不能为空')
    }

    const code = randomSMSCode()
    const result = await sendSms(mobile, code, 10)

    if (result.code !== '0') {
      throw new Error(result.raw?.data?.message)
    }

    await chatSMSCode.add({ mobile, code, ttl: 10 })

    res.send({ status: 'Success', message: '发送验证码成功' })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/login/wechat', async (req, res) => {
  try {
    const { code } = req.query as unknown as { code: string }

    if (!code) {
      throw new Error('code不能为空')
    }

    const { openid, unionid, access_token } = await code2OpenId(code)
    const wx = await getUserInfo(access_token, openid)
    let uuid = await chatUser.login({ openid }, wx)

    if (!uuid) {
      await res.send({ status: 'Success', message: '登录成功', data: { openid, unionid, access_token } })
      return
    }

    await res.send({ status: 'Success', message: '登录成功', data: { token: uuid } })

  } catch (error) {
    await res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/login/mobile', async (req, res) => {
  try {
    const {
      mobile,
      code,
      weChatRes,
      share
    } = req.query as unknown as { mobile: string, code: string, weChatRes?: any, share?: string }

    if (!mobile) {
      throw new Error('请输入手机号')
    }
    if (!code) {
      throw new Error('请输入验证码')
    }
    if (!await chatSMSCode.check({ mobile, code })) {
      throw new Error('验证码错误')
    }

    let wx: any
    if (weChatRes) {
      wx = await getUserInfo(weChatRes.access_token, weChatRes.openid)
    }

    let uuid = await chatUser.login({ mobile }, wx)

    if (!uuid) {
      uuid = randomUuid()
      await chatUser.register({ uuid, mobile, wx })

      if (share) {
        await chatUser.addCountByShare(share, uuid)
      }
    }

    await res.send({ status: 'Success', message: '登录成功', data: { token: uuid } })

  } catch (error) {
    await res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.get('/info', [login], async (req, res) => {
  try {
    const { token: uuid } = req.query as { token: string }

    const data = await chatUser.find({ uuid })
    if (!data) {
      throw new Error('获取用户信息失败~')
    }

    data.updateAt = Date.now()
    await data.save()

    await res.send({ status: 'Success', message: '获取用户信息成功', data })
  } catch (error) {
    await res.send({ status: 'Fail', message: error.message })
  }
})

export default router
