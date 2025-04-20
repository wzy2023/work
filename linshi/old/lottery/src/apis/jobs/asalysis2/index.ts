import { Cron } from '@wzyjs/midway/exports'
import { LotteryAsalysis, LotteryType } from '@/apis/entities'
import {
  delay,
  formatTime,
  getNumLists,
  getPossibilitieList,
  getRecommendTables,
  calcPossibilitiesHots,
  calcPossibilitiesIndexs,
  calCorrectRates,
  runTimer,
  runTimerAsync,
  runTimerForEach,
} from './utils'

@Cron.Job({
  cronTime: '*/59 * * * *',
  // runOnInit: true,
})
export class LotteryAsalysis2Job implements Cron.IJob {
  async onTick() {
    await delay()
    process.stdout.write('\x1B[2J\x1B[0f')

    // 一些配置
    const lotteryCode = 'test310'
    const exec = [1]
    const runNum = 100
    const [lotteryNum, forecastNum] = [5000, 5000]

    // 获取彩种信息
    const lottery = await runTimer('获取彩种信息', 0, true, async () => {
      const lottery = await LotteryType.findOne({ where: { code: lotteryCode } })
      if (!lottery) {
        throw new Error('彩种不存在')
      }
      return lottery
    })

    await runTimerAsync('执行', 0, false, async () => {
      await runTimerForEach(exec[0], exec[1] ?? exec[0], 1, true, async (i) => {
        // 根据彩种信息，生成可能性集合
        const { possibilities } = runTimer('生成可能性集合', 2, true, () => {
          return getPossibilitieList(lottery, i)
        })

        const info = {
          exec: i,
          runNum,
          possibilitiesLength: possibilities.length,
          remark: Date().toString(),
        }

        // 分析 runNum 次
        await runTimerForEach(1, runNum, 2, true, async () => {
          // 根据彩种信息，生成开奖列表及号码的索引信息
          const { numLists, numListsMap } = runTimer('1.生成开奖列表', 3, true, () => {
            return getNumLists(lottery, [lotteryNum, forecastNum])
          })

          // 给所有的可能性集合，在开奖列表中查找出现位置
          const { possibilitiesIndexs } = runTimer('2.开奖列表中查找位置', 3, true, () => {
            return calcPossibilitiesIndexs(possibilities, numListsMap)
          })

          // 给所有的可能性集合，开奖位置，计算热度
          const { possibilitiesHots } = runTimer('3.给位置计算热度', 3, true, () => {
            return calcPossibilitiesHots(possibilitiesIndexs)
          })

          // 给所有号码根据热度计算权重，生成推荐表格
          const { recommendTables } = runTimer('4.生成推荐表格', 3, true, () => {
            return getRecommendTables(lottery, numListsMap, possibilitiesHots)
          })

          // 将本条分析记录到数据库
          await runTimerAsync('5.将本条分析记录到数据库', 3, true, async () => {
            await LotteryAsalysis.save({
              name: formatTime(),
              lottery,
              numLists,
              numListsInfo: {
                lottery: Object.fromEntries(numListsMap.lottery),
                forecast: Object.fromEntries(numListsMap.forecast),
              },
              info,
              recommendTables,
              // possibilities: possibilitiesHots.filter(a => a.hots[0].slice[0]?.h > 1.5).slice(0, 1000),
              possibilities: possibilitiesHots.filter(i => i.nextIndexs[0]?.indexDifference <= 10).slice(0, 1000),
            })
          })
        })

        // 计算中奖率
        await runTimerAsync('计算中奖率', 2, true, async () => {
          await calCorrectRates(lottery, info)
        })

      })
    })
  }
}
