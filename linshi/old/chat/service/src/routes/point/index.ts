import express from 'express'
import { chatPoint } from '../../database'
import parser from 'ua-parser-js'

const router = express.Router()

router.post('/add', async (req, res) => {
  try {
    const { token: uuid, pointType, pointName, pointDesc, pageUrl, userAgent, extraData } = req.body

    await chatPoint.add({
      pointType,
      pointName,
      pointDesc,
      pageUrl,
      userAgent: parser(userAgent),
      extraData
    }, uuid)

    res.send({ status: 'Success', message: '添加埋点成功' })

  } catch (error) {
    res.send({ status: 'Fail', message: error.message })
  }
})

export default router
