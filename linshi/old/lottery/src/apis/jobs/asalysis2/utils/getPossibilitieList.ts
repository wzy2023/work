import { LotteryAsalysisPossibilities, LotteryType } from '@/apis/entities'
import { multiLoop, isAllUnique, calcPossibilitie } from './other'

// 一个开奖号码，例如 [1,1,6]
export interface Number {
  nums: number[],
  probability: number,
  probabilityNum: number,
}

const getNumberList = (lotteryType: LotteryType) => {
  const numberList: Number[] = []

  // 每位有多少种可能
  const num = lotteryType.range[lotteryType.range.length - 1] - lotteryType.range[0] + 1

  // 全部可能的开奖号码数量
  const { all: probabilityNum } = calcPossibilitie(num, lotteryType.size, 1)

  multiLoop(lotteryType.size, lotteryType.range, (...nums: number[]) => {
    numberList.push({
      nums,
      probabilityNum,
      probability: 1 / probabilityNum,
    })
  })

  return numberList
}

export const getPossibilitieList = (lotteryType: LotteryType, size: number): {
  possibilities: LotteryAsalysisPossibilities[]
} => {

  const possibilities: LotteryAsalysisPossibilities[] = []
  const combinations = getNumberList(lotteryType)
  const seenGroups = new Set<string>()

  multiLoop(size, [1, combinations.length], (...nums: number[]) => {
    if (!isAllUnique(nums)) {
      return
    }

    const group = nums.map(i => combinations[i - 1].nums)
    const groupKey = group.map(i => Number(i.join(''))).sort().join()

    if (seenGroups.has(groupKey)) {
      return
    }

    seenGroups.add(groupKey)

    const probability = nums.reduce((t, i) => t + combinations[i - 1].probability, 0)

    possibilities.push({
      group,
      probability,
      probabilityNum: 1 / probability,
    } as LotteryAsalysisPossibilities)
  })

  return {
    possibilities,
  }
}
