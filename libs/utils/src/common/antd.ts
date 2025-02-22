import { Option } from '@wzyjs/types'

// options 转 valueEnum
export const options2valueEnum = (options: string[]): { [key: string]: { text: string } } => {
  return (options || []).reduce<{
    [key: string]: { text: string }
  }>((acc, cur) => {
    acc[cur] = { text: cur }
    return acc
  }, {})
}

// 字符串转 options
export const transformOptions = (inputArray?: string[] | Option[]): Option[] => {
  if (!inputArray?.length) {
    return []
  }

  return inputArray.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item }
    }
    return item
  })
}

// 根据 dataSource 生成 columns
export const getColumns = (dataSource: any) => {
  if (!Array.isArray(dataSource)) {
    return []
  }
  return Object.keys(dataSource?.[0] || {}).map(item => ({
    title: item,
    dataIndex: item,
  }))
}
