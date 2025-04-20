import { Option } from '@/types'
import { Item } from './types'

export const transformOptions = (data: string[][]): Option[] => {
  const result: Option[] = [];

  data.forEach((item = []) => {
    let currentNode: Option | undefined;
    let parentNode: Option | undefined;

    for (let i = 0; i < item.length; i++) {
      if (i === 0) {
        currentNode = result.find(r => r.value === item[i])

        if (!currentNode) {
          currentNode = {
            label: item[i],
            value: item[i],
          }
          result.push(currentNode)
        }

        parentNode = currentNode
      } else {
        currentNode = parentNode?.children?.find(c => c.value === item[i])

        if (!currentNode) {
          currentNode = {
            label: item[i],
            value: item[i],
          }
          if (!parentNode) {
            return
          }
          parentNode.children = parentNode?.children || []
          parentNode?.children.push(currentNode)
        }

        parentNode = currentNode
      }
    }
  })

  return result
}

export const transformJson = (data?: any[]) => {
  if (!data) {
    return {}
  }

  const result: Item = {}

  data.forEach(item => {
    let temp = result
    for (let i = 0; i < item.categorize.length; i++) {
      const key = item.categorize[i]
      if (!temp[key]) {
        temp[key] = i === item.categorize.length - 1 ? item.duration : {}
      } else {
        temp[key] = i === item.categorize.length - 1 ? (temp[key] as number) + item.duration : temp[key]
      }
      temp = temp[key] as Item
    }
  })

  return result
}
