import { Koa, useContext } from '@wzyjs/midway/exports'

import { Profession, UserInfo, Tech } from '@/apis/entities'
import { generateApi, generateCrudApi } from '@/apis/utils'

import { In } from 'typeorm'
import { LoginData, UpdateProfessionData, UpdateTechsData } from './types'

const { list, remove, update, info, create } = generateCrudApi<UserInfo>({
  name: 'quiz/user',
  label: 'UserInfo',
  Entity: UserInfo,
})

const register = generateApi({
  successMsg: '注册成功',
  url: '/quiz/user/register',
  fn: async (values: LoginData) => {
    const { openID } = values

    const data = await UserInfo.findOne({ where: { openID, isDeleted: 0 } })

    if (data) {
      throw new Error('openID 已存在')
    }

    const user = new UserInfo()
    user.openID = openID
    await user.save()

    return user
  },
})

const login = generateApi({
  successMsg: '登录成功',
  url: '/quiz/user/login',
  fn: async (values: LoginData) => {
    const { openID } = values

    const data = await UserInfo.findOne({ where: { openID, isDeleted: 0 } })

    if (!data) {
      return register(values)
    }

    data.lastLoginTime = new Date()
    data.loginCount += 1
    await data.save()

    return data
  },
})

const me = generateApi({
  successMsg: '获取用户信息成功',
  url: '/quiz/user/me',
  fn: () => {
    const { state: { userInfo } } = useContext<Koa.Context>()
    return userInfo
  },
})

const updateProfession = generateApi({
  successMsg: '修改职业成功',
  url: '/quiz/user/update/profession',
  fn: async (values: UpdateProfessionData) => {
    const { professionId } = values

    const { state: { userInfo } } = useContext<Koa.Context>()
    userInfo.profession = await Profession.findOne({ where: { id: professionId, isDeleted: 0 } }) ?? undefined
    await userInfo.save()

    return userInfo
  },
})

const updateTechs = generateApi({
  successMsg: '修改技术成功',
  url: '/quiz/user/update/techs',
  fn: async (values: UpdateTechsData) => {
    const { techIds } = values

    const { state: { userInfo } } = useContext<Koa.Context>()
    userInfo.techs = await Tech.find({ where: { id: In(techIds), isDeleted: 0 } }) || []
    await userInfo.save()

    return userInfo
  },
})

export {
  login,
  me,
  list,
  info,
  create,
  remove,
  update,
  updateProfession,
  updateTechs,
  UserInfo,
}
