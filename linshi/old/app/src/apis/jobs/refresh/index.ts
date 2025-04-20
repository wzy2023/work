import { Core, Cron } from '@wzyjs/midway/exports'
import { isBetweenTime, needJobTypeMap, processList } from './utils'
import { list } from './config'
import { getData } from './data'
import { Res, RetType } from './types'

@Cron.Job({
  cronTime: Core.FORMAT.CRONTAB.EVERY_PER_5_MINUTE,
  start: true,
  // runOnInit: true,
})
export class DataSyncCheckerJob implements Cron.IJob {
  async onTick() {
    if (isBetweenTime(0, 8)) {
      return
    }

    try {
      // 获取数据库中的数据
      const dataSource = await getData()

      // 抓取指定网站的数据
      const data = await Promise.allSettled(list.map(item => item.fn()))

      // 遍历数据
      const msgs: Res[][] = await Promise.all(data.map(async (item, index) => {
        if (item.status !== 'fulfilled') {
          return [{
            ...list[index],
            msg: '获取失败！！！',
            retType: RetType.Fail,
          }]
        }
        return await processList(item.value, dataSource, list[index])
      }))

      msgs.flat().forEach(item => {
        if ([RetType.Fail, RetType.SuccessExec].includes(item.retType)) {
          console.log(666, `[${needJobTypeMap[item.type]}]-${item.name}: ${item.msg}`)
        }
        if ([RetType.SuccessGet].includes(item.retType)) {
          console.log(666, `[${needJobTypeMap[item.type]}]-${item.name}: ${item?.data?.title}`)
        }
      })

    } catch (err) {
      console.log(666, '获取需求和岗位列表失败')
      console.log(666, JSON.stringify(err, null, 2))
    }
  }
}
