// 获取字符串中的中文字符串
export const getChineseByStr = (str: string): string => {
  if (!str) {
    return ''
  }

  const match = str.match(/[\u4e00-\u9fa5]/g)
  if (!match) {
    return ''
  }

  return match.join('')
}

// 获取字符串中的长度，中文算 2 个字符
export const getStrLength = (value: string): number => {
  if (!value) {
    return 0
  }
  const chineseLength = getChineseByStr(value).length
  return (value.length - chineseLength) + chineseLength * 2
}

// 替换全部指定字符串
export const replaceAll = (str: string, searchValue: string, replaceValue: string): string => {
  if (!str || !searchValue || !replaceValue) {
    return str || ''
  }

  str = str.replace(searchValue, replaceValue)

  if (!str.includes(searchValue)) {
    return str
  }

  return replaceAll(str, searchValue, replaceValue)
}

// 根据规则替换字符串
export const replaceByRules = (str: string, rules: [string, string][]) => {
  rules.forEach(([searchValue, replaceValue]) => {
    str = str.replaceAll(searchValue, replaceValue)
  })
  return str
}

// 根据变量替换占位符
export const replaceByVariables = (prompt: string, variables?: { [key: string]: string }) => {
  if (!variables || Object.keys(variables).length === 0) {
    return prompt
  }

  // 使用捕获组匹配所有 {{ key }} 格式的占位符
  const regex = /\{\{\s*(\w+)\s*\}\}/g

  return prompt.replace(regex, (match, p1) => {
    return variables[p1] ?? match // 若变量未找到，保留原样
  })
}

// 获取变量的类型
export const getType = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1)
}

// 金钱格式化，每三位加,
export const amount = (str: string) => {
  const reg = /(?=(?!\b)(\d{3})+$)/g
  return str.replace(reg, ',')
}

// 更安全的 JSON.parse
export const jsonParse = (value: string | object): object => {
  if (typeof value === 'object') {
    return value
  }
  try {
    return JSON.parse(value)
  } catch (err: any) {
    return {}
  }
}

// 是否为json对象的字符串
export const isJson = (str: string) => {
  try {
    if (getType(JSON.parse(str)) === 'Object') {
      return true
    }
  } catch (e) {
  }
  return false
}

// 将变量转为字符串
export const toString = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'object' ? JSON.stringify(value) : String(value)
}

// 生成随机颜色
export const getRandomColor = (): string => {
  const color = Math.floor(Math.random() * 16777215).toString(16)
  if (color.length === 6) {
    return color
  } else {
    return getRandomColor()
  }
}

// 生成随机字符串
export const getRandomString = (length = 4): string => {
  return Math.random().toString(36).substr(2, length)
}

// 获取字符串内的中文
export const getChinese = (str: string): string => {
  if (str == null || str === '') {
    return ''
  }

  const res = str.match(/[\u4e00-\u9fa5]/g)
  if (!res) {
    return ''
  }

  return res.join('')
}

// 截取指定两个文本之间的字符串 (不好用)
export const getSliceStr = (str: string, before: string, after: string) => {
  return str.slice(str.indexOf(before) + before.length, str.lastIndexOf(after))
}

// 获取代理后的url
export const getProxyUrl = (url: string) => {
  const beforeUrl = 'https://1141871752167714.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/a.LATEST/proxy/?url='
  return beforeUrl + url
}

// 获取字符串的长度
export const getLength = (value: string) => {
  const chineseLength = getChinese(value).length
  return (value.length - chineseLength) + chineseLength * 2
}

// 获取指定cookie
export const getCookie = (name: string) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

// 生成符合数量的字母，例如：3 => ['a', 'b', 'c']
export const generateAlphabetArray = (n: number) => {
  return Array.from({ length: n }, (_, i) => String.fromCharCode(97 + i))
}

// 计算文本相似度 (Levenshtein 距离算法)
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = []

  // 初始化矩阵
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // 填充矩阵
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // 替换
          matrix[i][j - 1] + 1, // 插入
          matrix[i - 1][j] + 1, // 删除
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// 文件名生成唯一的文件名
export const generateUniqueFileName = (name: string) => {
  // 使用正则表达式匹配文件名和扩展名
  const match = name.match(/^(.*?)(\.[^.]*$|$)/)
  if (match) {
    const namePart = match[1] // 文件名部分
    const extensionPart = match[2] // 扩展名部分，可能是'.jpg'或在没有扩展名的情况下是''
    if (extensionPart) {
      return `${namePart}_${Date.now()}${extensionPart}`
    } else {
      // 如果没有扩展名，则手动添加一个标准的扩展名，例如 '.dat'
      return `${namePart}_${Date.now()}.dat`
    }
  }
  // 如果文件名不符合预期格式，则返回默认值或者抛出错误
  throw new Error('Invalid filename format.')
}
