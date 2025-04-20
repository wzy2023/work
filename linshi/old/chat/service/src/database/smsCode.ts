import { ChatSMSCode } from '../entities/ChatSMSCode'
import { SMSCode } from '../types'

export const add = async ({ mobile, code, ttl }: SMSCode) => {
  const smsCode = new ChatSMSCode()

  smsCode.mobile = mobile
  smsCode.code = code
  smsCode.expDate = Date.now() + ttl * 60 * 1000
  smsCode.createAt = Date.now()

  await smsCode.save()
}

export const del = async ({ mobile, code }: Omit<SMSCode, 'ttl'>) => {
  await ChatSMSCode.delete({ mobile, code })
}

export const check = async ({ mobile, code }: Omit<SMSCode, 'ttl'>) => {
  const smsCode = await ChatSMSCode.findOneBy({ mobile, code, used: 0 })

  if (!smsCode) {
    return false
  }

  if (Date.now() > smsCode?.expDate) {
    return false
  }

  await ChatSMSCode.update({ mobile, code }, { used: 1 })

  return true
}
