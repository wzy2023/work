import { LotteryAsalysisPossibilities, Index } from '@/apis/entities'
import { sortArr } from './other'
import { NumListsMap } from './getNumLists'

interface Result {
  possibilitiesIndexs: LotteryAsalysisPossibilities[]
}

export const calcPossibilitiesIndexs = (possibilities: LotteryAsalysisPossibilities[], numListsMap: NumListsMap): Result => {
  const possibilitiesIndexs = possibilities.map(possibility => {

    const prevIndexs = sortArr(possibility.group.reduce<Index[]>((arr, item) => {
      return [...arr, ...(numListsMap.lottery.get(item.join()) || []).map(index => ({
        nums: item,
        index,
        indexDifference: NaN,
      }))]
    }, []), 'index').map((item, i, arr) => ({
      ...item,
      indexDifference: item.index - (arr[i - 1]?.index || 0),
    }))

    const nextIndexs = sortArr(possibility.group.reduce<Index[]>((arr, item) => {
      return [...arr, ...(numListsMap.forecast.get(item.join()) || []).map(index => ({
        nums: item,
        index,
        indexDifference: NaN,
      }))]
    }, []), 'index').map((item, i, arr) => ({
      ...item,
      indexDifference: item.index - (arr[i - 1]?.index || 0),
    }))

    return {
      ...possibility,
      prevIndexs,
      nextIndexs,
    } as LotteryAsalysisPossibilities
  })

  return {
    possibilitiesIndexs,
  }
}
