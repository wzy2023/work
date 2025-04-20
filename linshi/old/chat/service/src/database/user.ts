import { ChatUser } from '../entities/ChatUser'
import { chatShare, chatSystem } from '../database'
import { handleSoter } from '../utils'
import { Page, Sort, UserInfo, UserRole, UserStatus, Where } from '../types'

export const find = async (where: Where) => {
  return await ChatUser.findOneBy(where)
}

export const addCountByShare = async (shareUuid: string, uuid: string) => {
  const shareUser = await find({ uuid: shareUuid })
  if (!shareUser) {
    return
  }

  const setting = await chatSystem.get('setting')
  const { count, open } = setting?.value?.invite
  if (!open) {
    return
  }

  shareUser.count += count
  await shareUser.save()

  await chatShare.add(shareUuid, uuid, count)
}

export const register = async (userInfo: UserInfo) => {
  const setting = await chatSystem.get('setting')

  const chatUser = new ChatUser()
  chatUser.count = setting?.value?.register?.count || 0
  chatUser.createAt = Date.now()
  chatUser.updateAt = Date.now()
  chatUser.status = UserStatus.Normal
  chatUser.role = UserRole.User
  chatUser.uuid = userInfo.uuid
  chatUser.mobile = userInfo.mobile
  chatUser.openid = userInfo.wx?.openid
  chatUser.wx = userInfo.wx || { nickname: `手机用户${userInfo.mobile.slice(-4)}`, }
  await chatUser.save()

  return chatUser
}

export const login = async (where: Where, wx?: any): Promise<string> => {
  const user = await find(where)

  if (!user) {
    return ''
  }

  if (wx) {
    user.wx = wx
    user.openid = wx.openid
    await user.save()
  }

  if (user.status !== 1) {
    throw new Error('用户状态异常，禁止登录~')
  }

  return user.uuid
}

// 减少点数
export const reduceCount = async (uuid: string, num: number = 1) => {
  if (!uuid) {
    throw new Error('参数错误')
  }

  const user = await find({ uuid })
  if (!user) {
    throw new Error('用户不存在')
  }

  user.count = Math.max(0, user.count - num)
  user.useCount = Math.max(0, user.useCount + num)

  await user.save()
}

// 更新用户资料
export const updateUserInfo = async (uuid: string, userInfo: Partial<UserInfo>) => {
  if (!uuid) {
    throw new Error('参数错误')
  }

  const user = await find({ uuid })
  if (!user) {
    throw new Error('用户不存在')
  }

  // 不允许接口设置管理员
  if (userInfo?.role === 999) {
    delete userInfo.role
  }

  Object.assign(user, userInfo)
  await user.save()
}

// 更新状态
export const updateStatus = async (uuid: string, status: number) => {
  if (!uuid) {
    throw new Error('参数错误')
  }

  const user = await find({ uuid })
  if (!user) {
    throw new Error('用户不存在')
  }

  user.status = status
  await user.save()
}

// 添加点数
export const addCount = async (uuid: string, count: number, price?: number) => {
  if (!uuid) {
    throw new Error('参数错误')
  }

  const user = await find({ uuid })
  if (!user) {
    throw new Error('用户不存在')
  }

  if (price) {
    user.payPrice = Math.max(0, user.payPrice + price)
  }

  user.count += count
  await user.save()
}

// 添加收益
export const addIncome = async (uuid: string, income: number) => {
  if (!uuid) {
    return
  }

  const user = await find({ uuid })
  if (!user) {
    return
  }

  user.income = Math.max(0, Number(user.income) + Number(income))
  await user.save()
}

// 用户列表
export const list = async (page: Page, where: Where, sort: Sort) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  const [list, total] = await ChatUser.findAndCount({
    where,
    skip,
    take: pageSize,
    order: handleSoter(sort, { createAt: 'DESC' }),
    select: ['uuid', 'wx', 'mobile', 'status', 'role', 'count', 'income', 'useCount', 'payPrice', 'createAt', 'updateAt'],
  })

  return { list, total }
}
