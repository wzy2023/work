import UNISMS from 'unisms'
import { encode } from 'gpt-3-encoder'

interface SendResponseOptions<T = any> {
  type: 'Success' | 'Fail'
  message?: string
  data?: T
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
  if (options.type === 'Success') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    })
  }

  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  })
}

export const randomUuid = (): string => {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 15; i++) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

export const randomChatId = (): number => {
  const str = '0123456789'
  let result = ''
  for (let i = 0; i < 3; i++) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return Date.now() + parseInt(result)
}

export const randomSMSCode = (num: number = 4): string => {
  const str = '0123456789'
  let result = ''
  for (let i = 0; i < num; i++) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

export const countTokens = (text: string) => {
  return encode(text)?.length || text.length / 2
}

export const calculateCount = (tokensLength: number, isGPT4: boolean): number => {
  // 单个token的价格
  const tokenPrice = (isGPT4 ? 0.02 : 0.002) / 1000 * 7  // 单位为元，人民币

  // 实际价格
  const price = tokenPrice * tokensLength

  // 乘以利润
  const profit = price * 5

  // 转换为角 也就是点数
  return Math.max(1, Math.floor(profit * 10))
}

export const handleSoter = (soter: { [key: string]: 'ascend' | 'descend' }, defaultSoter): Record<string, 'ASC' | 'DESC'> => {
  if (!soter) {
    return defaultSoter
  }
  const result: Record<string, 'ASC' | 'DESC'> = {}
  Object.keys(soter).forEach(key => {
    result[key] = soter[key] === 'ascend' ? 'ASC' : 'DESC'
  })
  return result
}

export const sendSms = async (mobile: string, code: string, ttl: number) => {
  // @ts-ignore
  const UniSMS = UNISMS?.default || UNISMS

  const client = new UniSMS({
    accessKeyId: process.env.UNI_SMS_ACCESS_KEY_ID,
  })

  return client.send({
    to: mobile.toString(),
    signature: process.env.UNI_SMS_SIGNATURE,
    templateId: 'pub_verif_ttl3',
    templateData: { code, ttl },
  })
}
