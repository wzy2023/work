import express from 'express'
import { chatSystem } from '../../database'

const router = express.Router()

router.get('/setting', async (req, res) => {
  try {
    const setting = await chatSystem.get('setting')
    res.send({ status: 'Success', message: '获取设置成功', data: setting })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

export default router
