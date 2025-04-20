import { cloneDeep, isEqual, uniqWith, _ } from '@/utils'

export const playAudio = () => {
  const audio = new Audio('http://downsc.chinaz.net/Files/DownLoad/sound1/202310/y2181.mp3')
  audio.play().catch((e) => {
    console.log(666, '播放失败', e)
  })
}

export const execResult = (total: { [key: string]: number }, groups: any[]) => {
  // 取前几个号码
  const num = [1, 3, 5, 8, 10]
  // 购买几期
  const buyNum = [1, 3, 5, 8, 10]
  // 中奖是否全部停止
  const stop = [true, false]
  // 每个号码的价格
  const price = 2
  // 每次投注的中奖金额
  const reward = {
    1: 70,
    2: 140,
    3: 400,
  }

  // const results: string[] = []

  num.forEach(num => {
    buyNum.forEach(buyNum => {
      stop.forEach(stop => {
        const selectedGroups = groups.slice(0, num)

        const minBuyNum = !stop ? buyNum : Math.min(buyNum, ...selectedGroups.map(item => item.index))

        const totalCost = selectedGroups.length * price * minBuyNum

        const totalRevenue = selectedGroups.filter(group => group.index <= minBuyNum).reduce((acc, group) => {
          return acc + reward[isType(group.nums)]
        }, 0)

        const lr = totalRevenue - totalCost

        const key = `${num}-${buyNum}-${stop.toString()}`
        if (total[key]) {
          total[key] += lr
        } else {
          total[key] = lr
        }

        const str = `取前${num}个号码，购买${buyNum}期，中奖${stop ? '全部停止' : '全部继续'}，支出：${totalCost}，收入：${totalRevenue}，利润：${lr}，结余${total[key]}`
        console.log(666, str)
        // results.push(str)
      })
    })
    // results.push('------------------')
  })

  // console.log(6662, results)
  return total
}

export const roundToDecimalPlaces = (num: number | string, maxDecimalPlaces = 3): string => {
  if (num?.toString()?.includes('.')) {
    const decimalPart: string = num?.toString().split('.')[1]
    if (decimalPart.length > maxDecimalPlaces) {
      const truncatedDecimal: string = decimalPart.slice(0, maxDecimalPlaces)
      return num?.toString().split('.')[0] + '.' + truncatedDecimal
    }
  }
  return num?.toString()
}

export const sortNums = (nums: number[]) => {
  return [...nums].sort((a, b) => a - b)
}

export const sortGroup = (group: number[][]) => {
  return uniqWith(cloneDeep(group).map(item => sortNums(item)), isEqual)
}

export const calcGroups = (dataSource: any[], numList?: number[][], isMerge = true) => {
  if (!dataSource?.length || !numList?.length) {
    return []
  }

  const data: any[] = []

  dataSource.forEach(item => {
    const group = isMerge ? sortGroup(item.possibilitie.group) : item.possibilitie.group

    group.forEach((nums: number[]) => {
      const index = data.findIndex(i => isEqual(i.nums, nums))

      if (index === -1) {
        data.push({
          nums,
          count: 1,
          index: numList.findIndex((i: number[]) => isEqual(isMerge ? sortNums(i) : i, nums)) + 1,
        })
      } else {
        data[index].count += 1
      }
    })
  })

  return data.sort((a, b) => b.count - a.count)
}

export const isType = (nums: number[]): 1 | 2 | 3 => {
  if (nums[0] === nums[1] && nums[1] === nums[2]) {
    return 3
  }
  if (nums[0] === nums[1] || nums[1] === nums[2] || nums[0] === nums[2]) {
    return 2
  }
  return 1
}

export const isEveryValueSame = (array: any[], key: string) => {
  if (!array.length) {
    return false
  }
  const firstValue = array[0][key]
  return array.every(item => item[key] === firstValue)
}

// 计算平均热度
export const calcAvgHot = (item: any) => {
  return item.hots.reduce((prev: number, cur: number) => prev + cur, 0) / (item.hots.length - 1)
}

export const calculateFieldValue = (array: any[], fieldName: string, fieldValue: any): number => {
  if (typeof array?.[0]?.[fieldName] === 'number') {
    // 如果 fieldName 指向的值是数字，则计算累加和
    return array.reduce((sum, item) => sum + (item?.[fieldName] || 0), 0)
  } else {
    // 如果 fieldName 指向的值不是数字，返回匹配该值的项的数量
    return array.filter(item => item?.[fieldName] === fieldValue).length
  }
}

export const getResults = (dataSource: any[]) => {
  return {
    all: dataSource.length,
    right: calculateFieldValue(dataSource, 'isRight', true),
    error: calculateFieldValue(dataSource, 'isRight', false),
  }
}

// 获取数组中指定索引的元素
export const getElementAtIndex = (array: any[], index: number) => {
  // 如果索引是负数，则转换为从末尾开始的正数索引
  if (index < 0) {
    index = array.length + index
  }
  // 返回对应索引的元素
  return array[index]
}

// 计算数组中每个元素与其后一个元素之间的差异
export const calculateDifferences = (numbers: number[]): number[] => {
  // @ts-ignore
  return numbers.map((num, index) => {
    // 确保不会超出数组的界限
    if (index < numbers.length - 1) {
      return numbers[index + 1] - num
    }
  }).filter(num => num !== undefined) // 过滤掉未定义的项
}

// 计算数组中每个元素与其后一个元素之间的差异
export const calculateDiffPNum = (numbers: number[], pNum: number): number[] => {
  return numbers.map(num => {
    return num / pNum
  }).filter(item => !isNaN(item))
}

export const sum = (dataList: any[], key: string) => {
  return dataList.reduce((total: any, item: any) => {
    return total + item.items.reduce((total: any, item: any) => {
      return total + _.get(item, key)
    }, 0)
  }, 0)
}
