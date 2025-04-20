import { ChatOrder, } from '../entities/ChatOrder'
import { Order, Page, Where, OrderStatus } from '../types'
import * as chatUser from './user'

export const list = async (page: Page, where?: Where) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  const [list, total] = await ChatOrder.findAndCount({
    where,
    skip,
    take: pageSize,
    order: { createAt: 'DESC' },
    relations: ['user'],
    select: ['orderId', 'user', 'sku', 'status', 'wxPayUrl', 'createAt', 'updateAt', 'payAt'],
  })

  return { list, total }
}

export const find = async (where: Where) => {
  return await ChatOrder.findOne({ where, relations: ['user'] })
}

export const add = async ({ orderId, uuid, sku, wxPayUrl }: Order) => {
  const order = new ChatOrder()

  order.orderId = orderId
  order.sku = sku
  order.user = await chatUser.find({ uuid })
  order.wxPayUrl = wxPayUrl
  order.status = OrderStatus.NOTPAY
  order.createAt = Date.now()

  return await ChatOrder.save(order)
}

export const updateStatus = async (orderId: string, status: OrderStatus) => {
  if (!orderId) {
    throw new Error('orderId 不能为空')
  }

  const order = await find({ orderId })
  if (!order) {
    throw new Error('订单不存在')
  }

  order.status = status
  order.updateAt = Date.now()

  if (status === OrderStatus.SUCCESS) {
    order.payAt = Date.now()
  }

  await order.save()

  return order
}
