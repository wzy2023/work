import type { FetchFn } from 'chatgpt'

export interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

export interface ChatGPTUnofficialProxyAPIOptions {
  accessToken: string
  apiReverseProxyUrl?: string
  model?: string
  debug?: boolean
  headers?: Record<string, string>
  fetch?: FetchFn
}

export interface ModelConfig {
  apiModel?: ApiModel
  reverseProxy?: string
  timeoutMs?: number
  socksProxy?: string
  httpsProxy?: string
  balance?: string
}

export type ApiModel = 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI' | undefined

export interface Talk {

}

export interface Page {
  current: number,
  pageSize: number
}

export interface Where {
  [key: string]: any
}

export interface Point {
  pointType: 'click' | 'view',
  pointName: string,
  pointDesc?: string,
  pageUrl: string,
  userAgent: Record<string, any>
  extraData?: any
}

export interface Sort {
  [key: string]: 'descend' | 'ascend'
}

export interface UserInfo {
  uuid: string
  mobile: string
  openid?: string
  unionid?: string
  role?: UserRole
  status?: UserStatus
  wx?: Record<string, any>
}

export enum UserRole {
  User = 1,
  Promoter = 2,
  Admin = 999,
}

export enum UserStatus {
  Normal = 1,
  Disabled = 2,
}

export interface Order {
  orderId: string,
  uuid: string,
  sku: Sku,
  wxPayUrl: string
}

export interface Talk {
  messageId: number
  prompt: string
  text: string
  isSuccess: boolean
  count: number
  createAt?: number
  updateAt?: number
}

export interface SMSCode {
  mobile: string,
  code: string,
  ttl: number
}

export interface Sku {
  skuId: number,
  name: string,
  price: number, // 单位是元
  num: number,
  bonus?: number
}

export enum OrderStatus {
  SUCCESS = 'SUCCESS', // 支付成功
  REFUND = 'REFUND', // 转入退款
  NOTPAY = 'NOTPAY', // 未支付
  CLOSED = 'CLOSED', // 已关闭
  REVOKED = 'REVOKED', // 已撤销（付款码支付）
  USERPAYING = 'USERPAYING', // 用户支付中（付款码支付）
  PAYERROR = 'PAYERROR', // 支付失败(其他原因，如银行返回失败)
}
