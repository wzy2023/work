import axios_ from 'axios'
import json5 from 'json5'
import { encodeChat } from 'gpt-tokenizer'

export * from './prompt.ts'

export const axios = axios_.create({
  baseURL: 'https://api.302.ai',
  headers: {
    'mj-api-secret': 'sk-frMebAccfYLVuIWaA8ijnfv9xTtpm3d6qqiW7kNEGpQMBFJG',
    'Authorization': `Bearer sk-frMebAccfYLVuIWaA8ijnfv9xTtpm3d6qqiW7kNEGpQMBFJG`,
  },
})

export const chat = async (message: string, model: string = 'gpt-4.1-mini', isParse = true) => {
  try {
    let { data } = await axios({
      url: '/v1/chat/completions',
      method: 'post',
      data: { model, message },
    })

    console.log(666, typeof data, data)

    const output = typeof data === 'string' ? json5.parse(data)?.output : data?.output

    if (isParse) {
      const match = /```(json)?(.*)```/s.exec(output)
      if (!match) {
        return json5.parse(output)
      } else {
        return json5.parse(match[2])
      }
    }

    return output

  } catch (error: any) {
    throw new Error(error?.response?.statusText || error?.message || '未知原因')
  }
}

export const getTokens = (content: string) => {
  const tokens = encodeChat([{ role: 'user', content }], 'gpt-4o-mini')
  return tokens.length
}

export const extractDomain = (url: string): string => {
  try {
    // 确保URL有协议前缀
    const urlWithProtocol = url.includes('://') ? url : `https://${url}`
    const urlObj = new URL(urlWithProtocol)
    return urlObj.hostname
  } catch (e) {
    // 如果解析失败，返回原始输入
    return url
  }
}
