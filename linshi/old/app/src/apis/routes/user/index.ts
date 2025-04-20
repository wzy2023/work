import { useContext } from '@wzyjs/midway/exports'
import { User } from '@/apis/entities'
import { generateApi, generateCrudApi, omit } from '@/apis/utils'
import { LoginData } from './types'
import { recordUserId } from './utils'

const { list, remove, update, info, create } = generateCrudApi<User>({
  name: 'user',
  label: '用户',
  Entity: User,
  select: {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  },
})

const register = generateApi({
  successMsg: '注册成功',
  url: '/user/register',
  fn: async (values: LoginData) => {
    const { remember, ...data } = values

    const record = await User.findOne({ where: { name: data.name } })
    if (record) {
      throw new Error('用户名已存在')
    }

    const user = new User()
    user.name = data.name
    user.password = data.password
    await user.save()

    recordUserId(user.id, remember)

    return omit(user, 'password')
  },
})

const login = generateApi({
  successMsg: '登录成功',
  url: '/user/login',
  fn: async (values: LoginData) => {
    const { remember, ...where } = values

    const data = await User.findOne({
      where,
      select: ['id', 'name'],
    })

    if (!data) {
      return register(values)
    }

    recordUserId(data.id, values.remember)

    return data
  },
})

const me = generateApi({
  successMsg: '查询成功',
  url: '/user/me',
  fn: async () => {
    const ctx = useContext()

    return await User.findOne({
      where: {
        id: ctx.session.userId,
      },
      select: ['id', 'name'],
    })
  },
})

export {
  list,
  info,
  create,
  remove,
  update,
  login,
  register,
  me,
}
