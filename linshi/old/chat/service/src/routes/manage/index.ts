import express from 'express'
import { admin, login } from '../../middleware'
import { chatOrder, chatPoint, chatShare, chatSystem, chatTalk, chatUser, chatIncome } from '../../database'

const router = express.Router()

router.get('/user/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where, sort } = req.query

    const { list, total } = await chatUser.list(page, where, sort)

    await res.send({ status: 'Success', message: '查询用户列表成功', data: { list, total } })

  } catch (error) {
    await res.send({ status: 'Fail', message: error.message, data: [] })
  }
})

router.post('/user/update/info', [login, admin], async (req, res) => {
  try {
    const { uuid, userInfo } = req.body
    await chatUser.updateUserInfo(uuid, userInfo)
    res.send({ status: 'Success', message: '更新成功' })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.post('/user/update/status', [login, admin], async (req, res) => {
  try {
    const { uuid, status } = req.body
    await chatUser.updateStatus(uuid, status)
    res.send({ status: 'Success', message: '更新成功' })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/talk/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where, sort } = req.query

    const { list, total } = await chatTalk.list(page, where, sort)

    res.send({ status: 'Success', message: '查询对话记录成功', data: { list, total } })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.post('/system/setting/update', [login, admin], async (req, res) => {
  try {
    delete req.body.token
    const setting = await chatSystem.update('setting', req.body)
    res.send({ status: 'Success', message: '设置修改成功', data: setting })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/share/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where } = req.query

    const data = await chatShare.list(page, where, true)

    res.send({ status: 'Success', message: '获取邀请记录成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/order/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where } = req.query

    const data = await chatOrder.list(page, where)

    res.send({ status: 'Success', message: '获取订单记录成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/point/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where, sort } = req.query

    const { list, total } = await chatPoint.list(page, where, sort)

    res.send({ status: 'Success', message: '查询埋点列表成功', data: { list, total } })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

router.get('/income/list', [login, admin], async (req, res) => {
  try {
    const { page = { current: 1, pageSize: 10 }, where } = req.query

    const data = await chatIncome.list(page, where, true)

    res.send({ status: 'Success', message: '获取分成记录成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

export default router
