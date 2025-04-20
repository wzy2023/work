import { Index, LotteryAsalysisPossibilities } from '@/apis/entities'

export interface Hot {
  p: number,
  h: number,
}

interface Result {
  possibilitiesHots: LotteryAsalysisPossibilities[]
}

// 计算指定概率 probability 在 num 次里至少出现 1 次的概率
const calcProbability = (probability: number, num: number): number => {
  // 计算没有出现的概率
  const probNoSuccess = Math.pow(1 - probability, num)

  // 计算至少一次出现的概率
  return 1 - probNoSuccess
}

// 伯努利等差公式
const calcDeviation = (probability: number, totalTrials: number, actualCount: number) => {
  // 计算期望次数
  const expectedCount = totalTrials * probability

  // 计算差异
  const difference = actualCount - expectedCount

  // 计算标准差
  const standardDeviation = Math.sqrt(totalTrials * probability * (1 - probability))

  // 计算标准化差异（Z值）
  return difference / standardDeviation
}

const calcHot = (type: 1 | 2, possibility: LotteryAsalysisPossibilities, indexs: any[], actualCount?: number) => {
  const { probability, probabilityNum } = possibility

  // 算法一：
  switch (type) {
    case 1:
      const sum1 = indexs.reduce((sum: number, item: Index) => sum + calcProbability(probability, item.indexDifference), 0)
      const p1 = sum1 / indexs.length
      const h1 = p1 / calcProbability(probability, probabilityNum)
      return { p: p1, h: h1 }

    case 2:
      if (actualCount === undefined) {
        return { p: NaN, h: NaN }
      }
      const totalTrials = indexs.reduce((sum: number, item: Index) => sum + item.indexDifference + 1, 0)
      const h2 = calcDeviation(probability, totalTrials, actualCount)
      return { p: NaN, h: h2 }

    default:
      return { p: NaN, h: NaN }
  }
}

export const calcPossibilitiesHots = (possibilities: LotteryAsalysisPossibilities[]): Result => {
  const possibilitiesHots = possibilities.map(possibility => {

    const hots1 = {
      current: possibility.prevIndexs?.map((_, index) => {
        return calcHot(1, possibility, [possibility.prevIndexs?.[index]])
      }),
      slice: possibility.prevIndexs?.map((_, index) => {
        return calcHot(1, possibility, possibility.prevIndexs.slice(0, index + 1))
      }),
    }

    const hots2 = {
      current: possibility.prevIndexs?.map((_, index) => {
        return calcHot(2, possibility, [possibility.prevIndexs?.[index]], index === 0 ? 0 : 1)
      }),
      slice: possibility.prevIndexs?.map((_, index) => {
        return calcHot(2, possibility, possibility.prevIndexs.slice(0, index + 1), possibility.prevIndexs.slice(0, index + 1).length - 1)
      }),
    }

    const hots3 = {
      current: possibility.prevIndexs?.map((_, index) => {
        return calcHot(2, possibility, [possibility.prevIndexs?.[index]], 1)
      }),
      slice: possibility.prevIndexs?.map((_, index) => {
        return calcHot(2, possibility, possibility.prevIndexs.slice(0, index + 1), possibility.prevIndexs.slice(0, index + 1).length)
      }),
    }

    const hots4 = {
      current: [],
      slice: Array.from({ length: 30 }).map((_, n) => {
        const i = (n + 1) * 10
        return {
          p: NaN,
          h: calcDeviation(possibility.probability, i, possibility.prevIndexs.filter(item => item.index > 0 && item.index <= i).length),
        }
      }),
    }

    return {
      ...possibility,
      hots: [hots1, hots2, hots3, hots4],
    } as LotteryAsalysisPossibilities
  })

  return {
    possibilitiesHots,
  }
}
