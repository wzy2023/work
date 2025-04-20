import { chatUser } from '../database'

const login = async (req, res, next) => {
  const token = req.body.token || req.query.token
  if (!token) {
    await res.send({ status: 'Unauthorized', message: '用户未登录~' })
    return
  }

  const user = await chatUser.find({ uuid: token })
  if (!user) {
    await res.send({ status: 'Unauthorized', message: '无此用户，请重新登录~' })
    return
  }

  if (user.status !== 1) {
    await res.send({ status: 'Unauthorized', message: '用户状态异常，禁止登录~' })
    return
  }

  res.token = token

  next()
}

export { login }
