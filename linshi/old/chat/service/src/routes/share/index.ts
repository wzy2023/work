import express from 'express'
import { login } from '../../middleware'
import { chatUser, chatSMSCode, chatShare } from '../../database'
import { randomSMSCode, randomUuid, sendSms } from '../../utils';

const router = express.Router()

router.get('/list', [login], async (req, res) => {
  try {
    const { token: uuid } = req.query

    const data = await chatShare.list({ current: 1, pageSize: 100 }, { inviter: { uuid } }, false)
    res.send({ status: 'Success', message: '获取邀请记录成功', data })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

export default router
