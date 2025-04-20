import { Raw } from 'typeorm'
import { LotteryAsalysis, LotteryAsalysisLine, LotteryType } from '@/apis/entities'
import { shuffleArray } from './other'

export interface AsalysisInfo {
  exec: number
  runNum: number
  possibilitiesLength: number
  remark: string
}

const g = () => Array.from({ length: 15 }).reduce((o: any, _, idx): { [key: string]: any } => ({
  ...o,
  [idx + 1]: {
    5: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    10: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  },
}), {})

const getTableType = (type: string, table: any[], i: number) => {
  switch (type) {
    case 'cold':
      return table.slice(0, i)

    case 'hot':
      return table.slice(0 - i)

    case 'moderate':
      const middleIndex = Math.floor(table.length / 2)
      const start = Math.max(0, middleIndex - Math.floor(i / 2))
      return table.slice(start, start + i)

    case 'random':
      return shuffleArray(table).slice(0, i)

    case 'total':
      return table

    default:
      return []
  }
}

const getEmptyResult = (length: number) => {
  return Array.from({ length }).map((_, i) => ({
    hotIndex: i + 1,
    result: Array.from({ length: 30 }).map((_, index) => ({
      current: index + 1,
      findResult: {
        cold: g(),
        hot: g(),
        moderate: g(),
        random: g(),
        total: g(),
      },
    })),
  }))
}

export const calCorrectRates = async (lottery: LotteryType, info: AsalysisInfo) => {
  const asalysisList = await LotteryAsalysis.find({
    select: { recommendTables: true },
    where: {
      info: Raw(alias => `
                ${alias} ->> '$.exec' = :exec AND
                ${alias} ->> '$.runNum' = :runNum AND
                ${alias} ->> '$.possibilitiesLength' = :possibilitiesLength AND
                ${alias} ->> '$.remark' = :remark
              `, info),
    },
  })

  const data = getEmptyResult(asalysisList[0]?.recommendTables.length)

  asalysisList.forEach(item => {
    // 三种热度算法
    item.recommendTables.forEach((item_, index_) => {
      // 每种热度算法的30个位置
      item_.tables.forEach((item__, index__) => {
        // 每次取推荐表格的前 i 个
        Array.from({ length: 15 }).map((_, i) => {
          // 计算冷、热、温和三种类型
          ;['cold', 'hot', 'moderate', 'random', 'total'].forEach(type => {
            const tableData = getTableType(type, item__.table, i)

            if (!tableData.length) {
              return
            }

            // 计算 5、10 期内出现的次数及比例
            ;[5, 10].forEach(subType => {
              const num2 = tableData.filter(n => n.indexs[0] > 0 && n.indexs[0] <= subType).length
              const num3 = tableData.map(n => n.indexs.filter((index: number) => index > 0 && index <= subType)).flat().length

              // @ts-ignore
              const target = data[index_].result[index__].findResult[type][i + 1][subType]

              if (type === 'total') {
                const coldNum = getTableType('cold', item__.table, i).reduce((t: number, i) => t + (i.indexs[0] || 0), 0)
                const hotNum = getTableType('hot', item__.table, i).reduce((t: number, i) => t + (i.indexs[0] || 0), 0)
                const moderateNum = getTableType('moderate', item__.table, i).reduce((t: number, i) => t + (i.indexs[0] || 0), 0)
                target[0][2] += coldNum
                target[1][2] += hotNum
                target[2][2] += moderateNum
                return
              }

              if (num2 > 0) {
                target[0][0] += 1
              }
              target[0][1] += 1
              target[0][2] = target[0][0] / target[0][1]

              if (num2 > 0) {
                target[1][0] += num2
              }
              target[1][1] += 1
              target[1][2] = target[1][0] / target[1][1]

              if (num3 > 0) {
                target[2][0] += num3
              }
              target[2][1] += 1
              target[2][2] = target[2][0] / target[2][1]
            })
          })
        })
      })
    })
  })

  await LotteryAsalysisLine.insert({
    lottery,
    info,
    data,
  })
}
