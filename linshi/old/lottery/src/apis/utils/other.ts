// 随机生成 rule
export const generateExpression = (letters: string[], range: [number, number]): string => {
  const operators: string[] = ['+', '-', '*', '/', '%']
  const useParentheses: boolean = true

  // 解析 range 参数
  const minRange: number = range[0] < 1 ? 1 : range[0]
  const maxRange: number = range[1] < minRange ? minRange : range[1]
  const expressionLength: number = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange

  // 初始化表达式的各个部分
  letters.sort(() => Math.random() - 0.5)
  let expressionParts: string[] = [letters[0]]
  let usedLetters: string[] = [letters[0]]
  let remainingLetters: string[] = letters.slice(1)

  // 生成表达式的主体
  while (usedLetters.length < expressionLength) {
    expressionParts.push(operators[Math.floor(Math.random() * operators.length)])
    let nextLetter: string = remainingLetters.length > 0 ? remainingLetters.shift() as string : letters[Math.floor(Math.random() * letters.length)]
    expressionParts.push(nextLetter)
    usedLetters.push(nextLetter)
  }

  // 添加括号
  if (useParentheses && expressionParts.length > 3) {
    // 随机选择一个位置来放置括号，确保括号内有两个字母和一个运算符
    const possiblePositions: number[] = []
    for (let i = 0; i < expressionParts.length - 2; i += 2) {
      possiblePositions.push(i)
    }
    const chosenPosition: number = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
    expressionParts.splice(chosenPosition, 0, '(')
    expressionParts.splice(chosenPosition + 4, 0, ')')
  }

  return expressionParts.join(' ')
}
