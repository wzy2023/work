import { levenshteinDistance } from './string'
import { performDecimalOperation } from './other'

// 数组随机变换位置
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array] // 创建数组的副本以避免修改原数组
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

// 去重函数，接受一个字符串数组，返回一个相似程度高的去重后的数组
export const removeSimilarDuplicates = (arr: string[], threshold: number, isLog?: boolean): string[] => {
  const uniqueArray: string[] = []
  const similarPairs: string[][] = [] // 用于存储相似的字符串对

  for (const str of arr) {
    const isSimilar = uniqueArray.some(uniqueStr => {
      const distance = levenshteinDistance(str, uniqueStr)
      if (distance <= threshold) {
        similarPairs.push([str, uniqueStr]) // 记录相似字符串对
        return true
      }
      return false
    })

    if (!isSimilar) {
      uniqueArray.push(str)
    }
  }

  // 打印相似的字符串
  if (isLog) {
    if (similarPairs.length > 0) {
      similarPairs.forEach(pair => {
        console.log(pair[0])
        console.log(pair[1])
        console.log()
      })
    } else {
      console.log('没有找到类似的字符串')
    }
  }

  return uniqueArray
}

// 从数组中获取某个字段的总和
export const getTotal = (arr?: any[], key?: string): number => {
  if (!Array.isArray(arr) || !key) {
    return 0 // 默认返回数值类型的 0
  }

  // 使用 performDecimalOperation 函数计算总额
  return arr.reduce((total: number, item: any) => {
    const itemValue = Number(item[key])
    if (!isNaN(itemValue)) {
      return performDecimalOperation(total, itemValue, '+')
    }
    return total
  }, 0)
}
