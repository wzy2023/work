import { useMemo, useState } from 'react'
import { extractAllTags, filterItemsByTags } from '../utils'

export const useFilterTags = (items: Collecting.Item[]) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const tags = useMemo(() => extractAllTags(items), [items])

  const filteredItems = useMemo(() => {
    return filterItemsByTags(items, selectedTags)
  }, [items, selectedTags])

  const onChangeTag = (tags: string[]) => {
    setSelectedTags(tags)
  }

  return {
    tags,
    selectedTags,
    filteredItems,
    onChangeTag,
  }
}
