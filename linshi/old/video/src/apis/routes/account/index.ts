import { Account, AccountLoginStatus, AccountPlatform } from '@/apis/entities'
import { generateApi, generateCrudApi } from '@/apis/utils'
import { platformMap } from '@/apis/utils/platforms'
import { useContext } from '@wzyjs/midway/exports'

const { list, remove } = generateCrudApi<Account>({
  name: 'account',
  label: '账号列表',
  Entity: Account,
})

const getPlatformList = generateApi({
  url: '/account/platform/list',
  successMsg: '获取平台列表成功',
  fn: async () => {
    return {
      options: Object.keys(platformMap).map(key => ({
        label: platformMap[key].name,
        value: key,
        config: platformMap[key].submitConfig,
      })),
    }
  },
})

const getLoginToken = generateApi({
  url: '/account/login/token',
  successMsg: '获取成功',
  fn: async (key: AccountPlatform) => {
    const platform = new platformMap[key].class()
    return await platform.getLoginToken()
  },
})

const loginSuccess = async (key: AccountPlatform, projectId: string, userInfo: any, headers: any) => {
  let account = await Account.findOne({
    where: {
      project: { id: projectId },
      platform: key,
      userId: userInfo.userId,
      isDeleted: 0,
    },
  })
  if (!account) {
    account = new Account()
    account.platform = key
    account.userId = userInfo.userId
    account.project = projectId as any
  }

  account.headers = headers
  account.status = AccountLoginStatus.LoggedIn

  account.name = userInfo.name
  account.works = userInfo.works
  account.fans = userInfo.fans
  account.avatar = userInfo.avatar

  await account.save()
}

const getLoginStatus = generateApi({
  url: '/account/login/status',
  successMsg: '获取成功',
  fn: async (projectId: string, key: AccountPlatform, loginToken: string) => {
    const platform = new platformMap[key].class({ loginToken })
    const status = await platform.getLoignStatus()

    if (status === AccountLoginStatus.LoggedIn) {
      const userInfo = await platform.getUserInfo()
      await loginSuccess(key, projectId, userInfo, platform.headers)
    }

    return { status }
  },
})

const checkAllStatus = generateApi({
  url: '/account/user/check/all/status',
  successMsg: '检查完成',
  fn: async (projectId: string) => {
    const accounts = await Account.find({
      where: {
        project: { id: projectId },
        isDeleted: 0,
      },
    })

    const result = await Promise.all((accounts || []).map(async account => {
      if (!account.headers) {
        account.status = AccountLoginStatus.NotLoggedIn
        await account.save()
        return false
      }

      const platform = new platformMap[account.platform].class({ headers: account.headers })
      try {
        const userInfo = await platform.getUserInfo()
        account.name = userInfo.name
        account.works = userInfo.works
        account.fans = userInfo.fans
        account.avatar = userInfo.avatar
        account.status = AccountLoginStatus.LoggedIn
        await account.save()
        return true

      } catch (err: any) {
        console.log(666, `${account.platform} 账号登录失效~`, err?.message)
        account.status = AccountLoginStatus.NotLoggedIn
        await account.save()
        return false
      }
    }))

    const { setAttr } = useContext<any>()
    setAttr('message', `检测完成：可用：${result.filter(i => i).length}，掉线: ${result.filter(i => !i).length}`)
  },
})

const create = generateApi({
  url: '/account/create',
  successMsg: '添加成功',
  fn: async (params: { projectId: string, platform: AccountPlatform, headers: any }) => {
    const { projectId, platform: key, headers } = params
    const platform = new platformMap[key].class({ headers: JSON.parse(headers || '{}') })
    const userInfo = await platform.getUserInfo()
    await loginSuccess(key, projectId, userInfo, platform.headers)
  },
})

const openSite = generateApi({
  url: '/account/site/open',
  successMsg: '打开成功',
  fn: async (id: string) => {
    const account = await Account.findOne({ where: { id } })
    if (!account) {
      throw new Error('未找到指定账号')
    }

    const platform = new platformMap[account.platform].class({ headers: account.headers })
    await platform.open()
  },
})

export {
  list,
  remove,
  create,
  openSite,
  getPlatformList,
  getLoginToken,
  getLoginStatus,
  checkAllStatus,
  Account,
}
