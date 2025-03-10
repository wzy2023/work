import Decimal from 'decimal.js'

// 延迟指定毫秒数
export const delay = (time = 1000) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 计算js表达式的值
export const calcJsText = (expr: string, context: Record<string, any>) => {
  const keys = Object.keys(context)
  const values = keys.map(key => context[key])
  return Function(...keys, `return (${expr})`)(...values)
}

// 将数组转换为枚举
export const optionsToEnum = (options: any[], text: string, key: string) => {
  return options.reduce((acc: any, cur: any) => {
    acc[cur[key]] = {
      text: cur[text],
    }
    return acc
  }, {})
}

export const performDecimalOperation = (num1?: number, num2?: number, operator?: string): number | undefined => {
  if (num1 === undefined || num2 === undefined || !operator) {
    return
  }

  // 使用 Decimal.js 处理数值以避免浮点数精度问题
  const decimalNum1 = new Decimal(Number(num1))
  const decimalNum2 = new Decimal(Number(num2))

  switch (operator) {
    case '+':
      return decimalNum1.plus(decimalNum2).toNumber()
    case '-':
      return decimalNum1.minus(decimalNum2).toNumber()
    case '*':
      return decimalNum1.times(decimalNum2).toNumber()
    case '/':
      if (num2 !== 0) {
        // 避免除以零的情况
        return decimalNum1.dividedBy(decimalNum2).toNumber()
      } else {
        console.error('Division by zero is not allowed.')
        return NaN
      }
    default:
      console.error('Invalid operator:', operator)
      return NaN
  }
}
