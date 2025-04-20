export const runTimer = <T>(label: string, indentation: number, easyMode: boolean, callback: () => T): T => {
  const indentationSpace = Array.from({ length: indentation }).map(() => '  ').join('')

  console.time(indentationSpace + '[完成] ' + label)
  if (!easyMode) {
    console.log(indentationSpace + '[开始] ' + label)
  }
  const result = callback()
  console.timeEnd(indentationSpace + '[完成] ' + label)

  return result
}

export const runTimerAsync = async <T>(label: string, indentation: number, easyMode: boolean = false, callback: () => Promise<T>): Promise<T> => {
  const indentationSpace = Array.from({ length: indentation }).map(() => '  ').join('')

  console.time(indentationSpace + '[完成] ' + label)
  if (!easyMode) {
    console.log(indentationSpace + '[开始] ' + label)
  }
  const result = await callback()
  console.timeEnd(indentationSpace + '[完成] ' + label)

  return result
}

export const runTimerForEach = async (start: number, runNum: number, indentation: number, hasEmptyLine: boolean, callback: (i: number) => void | Promise<void>) => {
  const indentationSpace = Array.from({ length: indentation }).map(() => '  ').join('')

  for (let i = start; i <= runNum; i++) {
    console.time(indentationSpace + '[完成] ' + `${i} / ${runNum}`)
    console.log(indentationSpace + '[进行] ' + `${i} / ${runNum}`)
    await callback(i)
    console.timeEnd(indentationSpace + '[完成] ' + `${i} / ${runNum}`)
    if (hasEmptyLine && i !== runNum) {
      console.log()
    }
  }
}

// 将 [1,6] 填充为 [1,2,3,4,5,6]
export const fillRange = (range: [number, number]) => {
  return Array(range[1] - range[0] + 1).fill(true).map((_, index) => index + range[0])
}

// 指定循环的层数
export const multiLoop = (num: number, range: [number, number], fn: any, args: number[] = [], level = 0) => {
  if (level === num) {
    fn(...args)
    return
  }

  const ranges = fillRange(range)

  ranges.forEach(value => {
    multiLoop(num, range, fn, [...args, value], level + 1)
  })
}

// 计算概率
export const calcPossibilitie = (num: number, numDice: number, numRolls: number) => {
  const singlePossibility = Math.pow(num, numDice)

  // 组合公式计算
  const combinations = (n: number, k: number) => {
    if (k > n) return 0
    let result = 1
    for (let i = 0; i < k; i++) {
      result *= (n - i) / (i + 1)
    }
    return result
  }

  return {
    all: Math.pow(singlePossibility, numRolls),
    uniq: combinations(singlePossibility, numRolls),
  }
}

// 数组里的成员是否全部相同
export const isAllUnique = (arr: number[]): boolean => {
  const uniqueElements = new Set(arr)
  return uniqueElements.size === arr.length
}

// 给数组从小到大排序
export const sortArr = (arr: any[], key: string, order: 'asc' | 'desc' = 'asc') => {
  return [...arr].sort((a, b) => order === 'asc' ? a[key] - b[key] : b[key] - a[key])
}

// 格式化时间
export const formatTime = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 数组随机变换位置
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array] // 创建数组的副本以避免修改原数组
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
