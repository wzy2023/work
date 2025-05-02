import { _ } from '@/utils'

// 从收集列表中提取所有唯一标签
export const extractAllTags = (items: Collecting.Item[]): string[] => {
  const allTags = _.flatten(items.map(item => item.tags))
  return _.uniq(allTags)
}

// 根据选定标签筛选收集项
export const filterItemsByTags = (items: Collecting.Item[], selectedTags: string[]): Collecting.Item[] => {
  if (!selectedTags.length) return items

  return items.filter(item => {
    return selectedTags.every(tag => item.tags.includes(tag))
  })
}
