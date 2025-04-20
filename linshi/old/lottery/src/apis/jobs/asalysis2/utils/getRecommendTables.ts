import { LotteryType, LotteryAsalysisPossibilities } from '@/apis/entities'
import { multiLoop, sortArr } from './other'
import { NumListsMap } from './getNumLists'

interface TableItem {
  nums: number[],
  num: number,
  indexs: number[],
}

interface Table {
  current: number,
  table: TableItem[]
}

export interface RecommendTable {
  tables: Table[] // 每列的热度对应一个表格
}

interface Result {
  recommendTables: RecommendTable[] // 每个hot对应一个表格
}

const getEmptyTable = (lottery: LotteryType) => {
  const table: TableItem[] = []

  multiLoop(lottery.size, lottery.range, (...nums: number[]) => {
    table.push({
      nums,
      num: 0,
      indexs: [],
    })
  })

  return table
}

const getTable = (hotIndex: number, possibilitiesHots: LotteryAsalysisPossibilities[], numListsMap: NumListsMap, index: number, table: TableItem[]) => {
  const numberMap = new Map<string, any>()
  table.forEach(item => {
    numberMap.set(item.nums.join(), item)
  })

  // 排序
  // possibilitiesHots = possibilitiesHots.sort((a, b) => {
  //   const hA = a.hots[hotIndex]?.slice[index]?.h
  //   const hB = b.hots[hotIndex]?.slice[index]?.h
  //
  //   if (hA === undefined) return 1
  //   if (hB === undefined) return -1
  //
  //   if (hotIndex === 0) {
  //     return hB - hA
  //   }
  //
  //   return hA - hB
  // })

  possibilitiesHots.forEach(possibilitie => {
    const hots = possibilitie.hots[hotIndex]
    if (!hots) {
      return
    }

    if (!hots.slice[index]) {
      return
    }
    const { h } = hots.slice[index]

    possibilitie.group.forEach(nums => {
      const listItem = numberMap.get(nums.join())
      if (!listItem) {
        return
      }

      switch (hotIndex) {
        case 0:
          if (h > 1) {
            listItem.num += (h - 1)
          }
          if (h < 1) {
            listItem.num -= (1 - h)
          }
          break

        case 1:
        case 2:
        case 3:
          listItem.num += (h > 0 ? 0 : h < 0 ? -1 : 0)
          break

        default:
          console.error('注意: 出现没有定义的 hotIndex!!!')
          break
      }
    })
  })

  table.forEach(item => {
    const index = numListsMap.forecast.get(item.nums.join())
    item.indexs = index || []
  })

  table = table.filter(item => item.num !== 0)

  return sortArr(table, 'num', hotIndex === 0 ? 'desc' : 'asc')
}

const getRecommendTable = (hotIndex: number, lottery: LotteryType, numListsMap: NumListsMap, possibilitiesHots: LotteryAsalysisPossibilities[]) => {
  return {
    tables: Array.from({ length: 30 }).map((_, index) => {
      const empty = getEmptyTable(lottery)
      const table = getTable(hotIndex, possibilitiesHots, numListsMap, index, empty)

      return {
        current: index + 1,
        table,
      }
    }),
  }
}

export const getRecommendTables = (lottery: LotteryType, numListsMap: NumListsMap, possibilitiesHots: LotteryAsalysisPossibilities[]): Result => {
  return {
    recommendTables: Array.from({ length: possibilitiesHots?.[0].hots.length }).map((_, index) => {
      return getRecommendTable(index, lottery, numListsMap, possibilitiesHots)
    }),
  }
}
