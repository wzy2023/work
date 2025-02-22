// 取指定范围内的随机数
export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 指定小数点的位数
export const limitDecimals = (v: string, num = 2, isForce: boolean): string => {
  let value = parseFloat(v)
  if (isNaN(value)) {
    if (isForce) {
      value = 0
    } else {
      return ''
    }
  }
  return value.toFixed(num).toString()
}

// 转换成更易读的尺寸单位
export const getFileSize = (size: number) => {
  let d = 'G'
  let s = size / 1024 / 1024 / 1024
  if (s < 1) {
    d = 'M'
    s *= 1024
  }
  // @ts-ignore
  return `${(s.toFixed(1) / 1).toString()}${d}`
}

// 校验是否为有效的数值
export const isValidNumber = (value: any) => {
  // 检查是否为数字类型
  if (typeof value !== 'number') {
    return false
  }

  // 检查是否为 NaN
  if (isNaN(value)) {
    return false
  }

  // 检查是否为 Infinity 或 -Infinity
  if (value === Infinity || value === -Infinity) {
    return false
  }

  // 如果以上检查都通过，则是有效的数值
  return true
}

// 格式化数字为千分位
export const numberWithCommas = (x?: number | string): string => {
  if (x === undefined || x === null) {
    return ''
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
