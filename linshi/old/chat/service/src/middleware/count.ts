import { chatUser } from '../database'

const count = async (req, res, next) => {
  const token = req.body.token || req.query.token

  const user = await chatUser.find({ uuid: token })

  if (user.count <= 0) {
    await res.send({ status: 'CountEmpty', message: '[系统提示：抱歉，点数用完啦，先去充值吧~]' })
    return
  }

  next()
}

export { count }
