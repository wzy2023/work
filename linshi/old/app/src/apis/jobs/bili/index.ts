import { Cron, Core } from '@wzyjs/midway/exports'
import { sendMail, pick, DataStore, uniqBy } from '@wzyjs/utils/node'
import { keywords, toEmail } from './config'
import { getVideoList } from './utils'

function promisifyWithArgs<T, R>(fn: (arg: T, callback: (err: any, result: R) => void) => void): (arg: T) => Promise<R> {
  return function (arg: T): Promise<R> {
    return new Promise((resolve, reject) => {
      fn(arg, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

interface BiliInfo {
  aid: string
}

@Cron.Job({
  cronTime: Core.FORMAT.CRONTAB.EVERY_PER_5_MINUTE,
  // start: true,
  // runOnInit: true,
})
export class DataSyncCheckerJob implements Cron.IJob {
  async onTick() {
    const list = await Promise.all(keywords.map(keyword => getVideoList(keyword)))

    const bili = new DataStore<BiliInfo>({ filename: './datafile', autoload: true })

    const find = promisifyWithArgs(bili.findOne.bind(bili))
    const insert = promisifyWithArgs(bili.insert.bind(bili))

    const res = []

    console.log(666, '需要发送', list.flat().length, '去重后', uniqBy(list.flat(), 'aid').length)
    for (const item of uniqBy(list.flat(), 'aid')) {
      if (await find({ aid: item.aid })) {
        console.log(666, '已经发送过了', item.aid)
        continue
      }

      try {
        const time = (new Date(item.pubdate * 1000)).toLocaleTimeString()

        await sendMail(toEmail, time + ' - ' + item.play, JSON.stringify(pick(item, ['title', 'play', 'typename', 'like', 'favorites', 'pubdate', 'arcurl'])))

        await insert({ aid: item.aid } as any)

        res.push(item.arcurl)
        console.log(666, '发送成功', item.arcurl)
        return `执行成功 ${res}`

      } catch (err) {
        console.log(666, '发送失败', err)
        return `执行失败 ${err}`
      }
    }
  }
}
