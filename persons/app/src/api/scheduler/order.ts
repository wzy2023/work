import { apiRouter } from '../trpc/apiRouter'
import { createTRPCContext } from '../trpc/context'

export const order = async () => {
  try {
    console.log('抓取 接单 内容：开始')

    // 创建上下文
    const context = await createTRPCContext({ headers: new Headers() })
    const caller = apiRouter.createCaller(context)

    // 调用抓取 API
    const result = await caller.custom.orderDemand.crawl()

    console.log('定时任务API调用结果:', result)
    console.log('抓取 接单 内容：完成')

  } catch (error: any) {
    console.error('抓取 接单 内容：失败:', error.message)
  }
}
