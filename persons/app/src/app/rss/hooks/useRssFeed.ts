import { useRssFeedCRUD } from '@/api/generated/crud'

export const useRssFeed = () => {
  const {
    listState,
    createState,
    updateState,
    removeState,
    apiUtils,
  } = useRssFeedCRUD({
    showTip: false,
    list: {
      query: {
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  // 创建RSS订阅
  const createFeed = (data: any) => {
    return createState.mutateAsync(data)
  }

  // 更新RSS订阅
  const updateFeed = (id: string, data: any) => {
    return updateState.mutateAsync(id, data)
  }

  // 删除RSS订阅
  const deleteFeed = (id: string) => {
    return removeState.mutateAsync(id)
  }

  // 批量删除RSS订阅
  const batchDeleteFeeds = (ids: string[]) => {
    const promises = ids.map(id => removeState.mutateAsync(id))
    return Promise.all(promises)
  }

  // 批量更新RSS订阅
  const batchUpdateFeeds = (params: { id: string, data: any }[]) => {
    const promises = Object.values(params).map(params => {
      updateState.mutateAsync(params.id, params.data)
    })
    return Promise.all(promises)
  }

  return {
    feeds: listState.data,
    isLoading: listState.isLoading,
    isError: listState.isError,
    error: listState.error,
    refetch: listState.refetch,
    createFeed,
    updateFeed,
    deleteFeed,
    batchDeleteFeeds,
    batchUpdateFeeds,
    apiUtils,
  }
}
