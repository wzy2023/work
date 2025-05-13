import { procedure } from '@/api/trpc/procedures'

import { _ } from '@wzyjs/utils/node'
import { type NeedJobType } from './utils/types'
import { list, needJobTypeMap } from './utils/config'

export const orderDemand = {
  crawl: procedure
  .mutation(async ({ ctx }) => {

    // 数据库数据
    const dataSource = await ctx.db.orderDemand.findMany({
      where: {
        isDeleted: false,
      },
    })

    // 拿到的新数据
    const newDatas = await Promise.allSettled(list.map(item => item.fn()))

    // 过滤一遍
    const res = newDatas.map((item, index) => {
      if (item.status !== 'fulfilled') {
        return {
          status: 'fail',
          reason: item.reason,
        }
      }

      const filterData = item.value.filter(item_ => !dataSource?.find((i: any) => item_.url === i.url)).map(item_ => ({
        ...item_,
        type: needJobTypeMap[list[index]?.type as unknown as NeedJobType],
        // createTime: dayjs(item_.createTime).toISOString(),
      }))

      return {
        status: 'success',
        data: filterData,
        ...(_.pick(list[index], ['type', 'name'])),
      }
    })

    const groupedRes = _.groupBy(res, 'status')

    console.log(666, 45, groupedRes)

    // 创建
    return ctx.db.orderDemand.createMany({
      data: groupedRes.success?.map((item: any) => item.data).flat() || [],
    })
  }),
}
