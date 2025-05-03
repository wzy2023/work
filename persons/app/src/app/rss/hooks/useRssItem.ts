import { useRssItemCRUD } from '@/api/generated/crud'

export interface RssItemFilter {
  search?: string
  feedIds?: string[]
  tags?: string[]
  isRead?: boolean
  isStarred?: boolean
  pubDateStart?: string
  pubDateEnd?: string
}

export const useRssItem = (filter: RssItemFilter = {}) => {
  // 使用自动生成的CRUD钩子
  const {
    listState,
    updateState,
    apiUtils,
  } = useRssItemCRUD({
    showTip: false,
    list: {
      query: {
        where: {
          isDeleted: false,
          ...(filter.search ? {
            OR: [
              { title: { contains: filter.search } },
              { description: { contains: filter.search } },
            ],
          } : {}),
          ...(filter.feedIds?.length ? { feedId: { in: filter.feedIds } } : {}),
          ...(filter.tags?.length ? {
            feed: {
              tags: {
                array_contains: filter.tags,
              },
            },
          } : {}),
          ...(filter.isRead !== undefined ? { isRead: filter.isRead } : {}),
          ...(filter.isStarred !== undefined ? { isStarred: filter.isStarred } : {}),
          ...(filter.pubDateStart || filter.pubDateEnd ? {
            pubDate: {
              ...(filter.pubDateStart ? { gte: new Date(filter.pubDateStart) } : {}),
              ...(filter.pubDateEnd ? { lte: new Date(filter.pubDateEnd) } : {}),
            },
          } : {}),
        },
        orderBy: { pubDate: 'desc' },
        include: {
          feed: {
            select: {
              id: true,
              name: true,
              tags: true,
            },
          },
        },
      },
    },
  })

  // 标记为已读/未读
  const toggleRead = (id: string, isRead: boolean) => {
    return updateState.mutateAsync(id, { isRead })
  }

  // 标记为收藏/取消收藏
  const toggleStar = (id: string, isStarred: boolean) => {
    return updateState.mutateAsync(id, { isStarred })
  }

  // 批量标记为已读/未读
  const batchToggleRead = (ids: string[], isRead: boolean) => {
    const promises = ids.map(id => updateState.mutateAsync(id, { isRead }))
    return Promise.all(promises)
  }

  return {
    items: listState.data,
    isLoading: listState.isLoading,
    isError: listState.isError,
    error: listState.error,
    refetch: listState.refetch,
    toggleRead,
    toggleStar,
    batchToggleRead,
    apiUtils,
  }
}
