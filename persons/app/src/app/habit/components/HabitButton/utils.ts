// 给文本添加换行符
export const formatTextWrap = (str: string): string => {
  if (str.length <= 3) {
    return str
  }
  const splitPos = Math.min(3, Math.ceil(str.length / 2))
  return str.substring(0, splitPos) + '\n' + formatTextWrap(str.substring(splitPos))
}
