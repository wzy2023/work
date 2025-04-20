import { chatUser } from '../database'

const admin = async (req, res, next) => {
  const token = req.body.token || req.query.token

  const user = await chatUser.find({ uuid: token })

  if (user.role !== 999) {
    await res.send({ status: 'AuthFail', message: '不是管理员，无访问权限~' })
    return
  }

  next()
}

export { admin }
