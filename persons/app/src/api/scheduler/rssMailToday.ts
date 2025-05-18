import { dayjs } from '@wzyjs/utils/node'
import { apiRouter } from '../trpc/apiRouter'
import { createTRPCContext } from '../trpc/context'

export const rssMailToday = async () => {
  try {
    console.log('发送前一天 RSS 内容：开始')

    const today8am = dayjs().tz('Asia/Shanghai')
    const yesterday8am = today8am.subtract(1, 'day')

    const startISOString = yesterday8am.toDate().toISOString()
    const endISOString = today8am.toDate().toISOString()

    // 创建上下文
    const context = await createTRPCContext({ headers: new Headers() })
    const caller = apiRouter.createCaller(context)

    // 调用每日邮件 API
    const result0 = await caller.custom.rssItem.sendEmail({
      where: {
        isInterested: 0,
        createdAt: {
          gte: startISOString,
          lt: endISOString,
        },
      },
    })

    const result1 = await caller.custom.rssItem.sendEmail({
      where: {
        isInterested: 1,
        createdAt: {
          gte: startISOString,
          lt: endISOString,
        },
      },
    })

    console.log(666, '每日定时任务API调用结果:', 0, result0)
    console.log(666, '每日定时任务API调用结果:', 1, result1)
    console.log(666, '发送前一天 RSS 内容：完成')

  } catch (error: any) {
    console.error(666, '发送前一天 RSS 内容：失败:', error.message)
  }
}
