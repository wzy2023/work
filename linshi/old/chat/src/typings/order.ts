export enum OrderStatus {
  SUCCESS = 'SUCCESS', // 支付成功
  REFUND = 'REFUND', // 转入退款
  NOTPAY = 'NOTPAY', // 未支付
  CLOSED = 'CLOSED', // 已关闭
  REVOKED = 'REVOKED', // 已撤销（付款码支付）
  USERPAYING = 'USERPAYING', // 用户支付中（付款码支付）
  PAYERROR = 'PAYERROR', // 支付失败(其他原因，如银行返回失败)
}

export const orderStatusDescMap = {
  [OrderStatus.SUCCESS]: '支付成功',
  [OrderStatus.REFUND]: '转入退款',
  [OrderStatus.NOTPAY]: '未支付',
  [OrderStatus.CLOSED]: '已关闭',
  [OrderStatus.REVOKED]: '已撤销',
  [OrderStatus.USERPAYING]: '支付中',
  [OrderStatus.PAYERROR]: '支付失败',
}
