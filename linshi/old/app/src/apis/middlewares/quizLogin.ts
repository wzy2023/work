import { Koa } from '@wzyjs/midway/exports'
import { UserInfo } from '@/apis/entities'

interface Config {
  include?: RegExp[]
  exclude?: RegExp[]
}

export const quizLogin = (config: Config | void) => {
  const { include = [], exclude = [] } = config || {}

  return async (ctx: Koa.Context, next: any) => {
    const { request: { url, header: { token } } } = ctx

    const isInclude = !include.length ? true : include.some(reg => reg.test(url))

    const isExclude = exclude.some(reg => reg.test(url))

    ctx.state.userInfo = await UserInfo.findOne({
      where: {
        openID: (token as string) || 'AAAQ9On-A7GRJVJ1sX93r9y_9hf3',
        isDeleted: 0,
      },
    })
    const isLogin = !!ctx.state.userInfo

    if (isInclude && !isExclude && !isLogin) {
      throw new Error('请先登录~')
    }

    await next()
  }
}
