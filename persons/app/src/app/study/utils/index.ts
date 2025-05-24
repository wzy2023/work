// 获取类型标签颜色
export const getTypeColor = (type: string, options: Array<{ label: string; value: string }>) => {
  const colors = ['blue', 'green', 'orange', 'red', 'purple', 'cyan']
  const index = options.findIndex(option => option.value === type)
  return colors[index % colors.length]
}

// 获取类型标签文本
export const getTypeLabel = (type: string, options: Array<{ label: string; value: string }>) => {
  const option = options.find(option => option.value === type)
  return option?.label || type
}
