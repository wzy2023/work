import { baiduPan } from '../../config/default'
import axios from 'axios'
import * as json from '../../utils/json'
import { delay } from '../../utils'

export const catchJson = (res, msg) => {
  return {
    success: false,
    msg,
    errno: res.data.errno,
    authUrl: `http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=${baiduPan.appKey}&redirect_uri=${baiduPan.redirectUri}&scope=basic,netdisk`,
  }
}

export const getFileSize = (size) => {
  let d = 'G'
  let s = size / 1024 / 1024 / 1024
  if (s < 1) {
    d = 'M'
    s *= 1024
  }
  // @ts-ignore
  return `${(s.toFixed(1) / 1).toString()}${d}`
}

export const checkShareUrl = async (url, time = 2000) => {
  await delay(time)
  return new Promise(async resolve => {
    const res = await axios.request({
      method: 'get',
      url,
    })
    resolve(!res.data.includes('此链接分享') || !res.data.includes('无法访问'))
  })
}
