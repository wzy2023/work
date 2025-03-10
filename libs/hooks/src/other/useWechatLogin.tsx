import React, { useEffect } from 'react'
// import { user } from '@/services'
import { useAsyncEffect } from 'ahooks'

export interface WeChatLoginResult {
  token: string,
}

interface wechatLoginOption {
  onSuccess?: (loginResult: WeChatLoginResult) => void
}

export function insertWxLoginScript() {
  const scriptSrc = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
  const head = document.head || document.getElementsByTagName('head')[0]
  const script = document.createElement('script')

  script.src = scriptSrc

  head.appendChild(script)
}

// 需要先执行
// insertWxLoginScript()

export const useWechatLogin = (option: wechatLoginOption) => {
  const { onSuccess } = option

  // 显示二维码
  useEffect(() => {
    // @ts-ignore
    new window.WxLogin({
      id: 'qrcode',
      appid: 'wx3802f7d1c135b5e4',
      scope: 'snsapi_login',
      redirect_uri: 'http://localhost:8001/login',
    })
  }, [])

  // 拿到 code，获取微信登录信息
  useAsyncEffect(async () => {
    const code = (new URL(location.href)).searchParams.get('code') || ''
    if (!code) {
      return
    }

    // const { data } = await user.loginByWeChat({ code: Array.isArray(code) ? code[code.length - 1] : code })
    // if (!data?.token) {
    //   return
    // }

    // onSuccess?.(data)
  }, [])

  // 没有登录时的视图
  const renderLoginView = () => {
    // return (
    //   <div id='qrcode' />
    // )
  }

  return {
    renderLoginView,
  }
}
