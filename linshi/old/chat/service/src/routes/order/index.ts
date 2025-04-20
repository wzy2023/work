import express from 'express'
import { chatOrder, chatSystem, chatUser, chatShare, chatIncome } from '../../database'
import { login } from '../../middleware'
import { OrderStatus, Sku, UserRole } from '../../types'
import { randomChatId } from '../../utils'
import { decipherGcm, getWxPayUrl } from '../../utils/wx'

const router = express.Router()

router.get('/list', [login], async (req, res) => {
  try {
    const { token: uuid } = req.query

    const data = await chatOrder.list({ current: 1, pageSize: 100 }, { user: { uuid } })

    res.send({ status: 'Success', message: '获取订单记录成功', data })
  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/info', [login], async (req, res) => {
  try {
    const { token: uuid, orderId } = req.query
    if (!orderId) {
      throw new Error('订单号不能为空')
    }

    const data = await chatOrder.find({ orderId, user: { uuid } })
    if (!data) {
      throw new Error('订单不存在')
    }

    res.send({ status: 'Success', message: '获取订单信息成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.post('/add', [login], async (req, res) => {
  try {
    const { token: uuid, skuInfo } = req.body

    const setting = await chatSystem.get('setting')

    const sku = (setting.value?.sku || []).find(item => item.skuId === skuInfo.skuId) as Sku
    if (!sku) {
      throw new Error('商品不存在~')
    }
    if (sku.name !== skuInfo.name || sku.price !== skuInfo.price || sku.num !== skuInfo.num || sku.bonus !== skuInfo.bonus) {
      throw new Error('商品信息已更改，请刷新后重试~')
    }

    const orderId = randomChatId().toString()

    const { code_url: wxPayUrl } = await getWxPayUrl(orderId, sku.price * 100, sku.name) as { code_url: string }

    const data = await chatOrder.add({ orderId, sku, uuid, wxPayUrl })

    res.send({ status: 'Success', message: '创建订单成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.post('/wechat/pay/notify', async (req, res) => {
  try {
    const { out_trade_no: orderId, trade_state } = decipherGcm(req.body)

    const order = await chatOrder.find({ orderId })

    if (order.status === OrderStatus.SUCCESS) {
      res.send({ status: 'Success', message: '已通知过' })
      return
    }

    // 更新订单状态
    await chatOrder.updateStatus(orderId, trade_state)

    // 如果订单状态是成功
    if (trade_state === OrderStatus.SUCCESS) {
      // 给用户加点
      await chatUser.addCount(order.user.uuid, (order.sku.num || 0) + (order.sku.bonus || 0), order.sku?.price)

      // 如果有邀请人，给邀请人分成
      const inviter = await chatShare.findInviter(order.user.uuid)
      if (inviter && [UserRole.Admin, UserRole.Promoter].includes(inviter.role)) {
        const income = Number((order.sku.price / 2).toFixed(1))
        await chatUser.addIncome(inviter.uuid, income)
        await chatIncome.add(inviter.uuid, order.user.uuid, order.sku.price, income)
      }
    }

    res.send({ status: 'Success', message: '通知成功' })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

export default router
