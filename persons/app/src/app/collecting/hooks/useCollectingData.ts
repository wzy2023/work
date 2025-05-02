import { useMemo } from 'react'

import type { CollectingType } from '@/api/types'

import { api } from '@/api/react'

export const useCollectingData = (type: CollectingType) => {
  const { data: rawItems = [], isLoading, refetch } = api.collecting.findMany.useQuery({
    where: {
      type,
    },
  })

  // 转换数据格式
  const collectingItems = useMemo<Collecting.Item[]>(() => {
    return rawItems.map(item => ({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags : [],
    }))
  }, [rawItems])

  return {
    collectingItems,
    loading: isLoading,
    refetch,
  }
}
