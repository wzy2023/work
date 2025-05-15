import { useRssItemCRUD } from '@/api/generated/crud'
import dayjs from 'dayjs'

export interface RssItemFilter {
  search?: string
  feedIds?: string[]
  tags?: string[]
  isRead?: boolean
  isStarred?: boolean
  pubDateStart?: string
  pubDateEnd?: string
  page?: number
  pageSize?: number
}

export const useRssItem = (filter: RssItemFilter = {}) => {
  const page = filter.page || 1
  const pageSize = filter.pageSize || 10

  // 构建查询条件
  const whereCondition = {
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
        ...(filter.pubDateStart ? { gte: dayjs(filter.pubDateStart).startOf('day').toISOString() } : {}),
        ...(filter.pubDateEnd ? { lte: dayjs(filter.pubDateEnd).endOf('day').toISOString() } : {}),
      },
    } : {}),
  }

  const { listState, updateState, apiUtils } = useRssItemCRUD({
    showTip: false,
    list: {
      query: {
        where: whereCondition,
        orderBy: { pubDate: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          feed: {
            select: { id: true, name: true, tags: true },
          },
        },
      },
    },
  })

  const totalCount = 1000

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
    pagination: {
      current: page,
      pageSize,
      total: totalCount,
    },
  }
}
