import { LotteryType } from '@/apis/entities'

export interface NumLists {
  lottery: number[][],
  forecast: number[][],
}

export interface NumListsMap {
  lottery: Map<string, number[]>,
  forecast: Map<string, number[]>,
}

export interface NumListsInfo {
  lottery: {
    [key: string]: number[],
  },
  forecast: {
    [key: string]: number[],
  }
}

export interface Result {
  numLists: NumLists,
  numListsMap: NumListsMap,
}

const generate = (totalNum: number, size: number, gap: [number, number]): number[][] => {
  const numbersPerValue = (totalNum * size) / (gap[1] - gap[0] + 1)
  const initialNumbers: number[] = []

  // 生成初始的数字集合
  for (let i = gap[0]; i <= gap[1]; i++) {
    for (let j = 0; j < numbersPerValue; j++) {
      initialNumbers.push(i)
    }
  }

  // 随机打乱初始的数字集合
  for (let i = initialNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [initialNumbers[i], initialNumbers[j]] = [initialNumbers[j], initialNumbers[i]]
  }

  const result: number[][] = []

  // 分配数字到数组中
  for (let i = 0; i < totalNum; i++) {
    const subArray: number[] = []
    for (let j = 0; j < size; j++) {
      subArray.push(initialNumbers.pop()!)
    }
    result.push(subArray)
  }

  return result
}

const calcNumListIndexMap = (numberList: number[][]) => {
  const map = new Map<string, number[]>()

  numberList.forEach((num, index) => {
    const key = num.join(',')
    const indices = map.get(key) || []
    indices.push(index + 1)
    map.set(key, indices)
  })

  return map
}

export const getNumLists = (lotteryType: LotteryType, counts: [number, number]): Result => {
  const { size, range } = lotteryType
  const [lotteryNum, forecastNum] = counts

  const numList = generate(lotteryNum + forecastNum, size, range)
  const lottery = numList.slice(0, lotteryNum)
  const forecast = numList.slice(-forecastNum)

  return {
    numLists: {
      lottery,
      forecast,
    },
    numListsMap: {
      lottery: calcNumListIndexMap([...lottery].reverse()),
      forecast: calcNumListIndexMap(forecast),
    },
  }
}
