// @ts-nocheck

// @ts-ignore
import { message } from '@/components'

// @ts-ignore
import { api } from '@/api/react'

interface Option {
  showTip?: boolean,
  list?: false | {
    query?: Parameters<typeof api.taskNode.findMany.useQuery>[0],
    option?: Parameters<typeof api.taskNode.findMany.useQuery>[1],
  },
  create?: Parameters<typeof api.taskNode.create.useMutation>[0],
  update?: Parameters<typeof api.taskNode.update.useMutation>[0],
  remove?: Parameters<typeof api.taskNode.update.useMutation>[0],
}

export const useTaskNodeCRUD = (option: Option = {}) => {
  const { list, create, update, remove, showTip = true } = option

  const apiUtils = api.useUtils()

  const listState = api.taskNode.findMany.useQuery(list ? list.query : {}, {
    ...list.option,
  })

  const onSuccess = (tip: string) => {
    message.destroy()
    if (showTip) {
      message.success(tip)
    }
    if (list) {
      listState.refetch()
    }
  }

  const baseCreateState = api.taskNode.create.useMutation({
    ...create,
    onSuccess: (...args) => {
      if (create?.onSuccess) {
        create.onSuccess(...args)
      }
      onSuccess('创建成功')
    },
  })

  const createState = {
    ...baseCreateState as unknown as typeof baseCreateState,
    mutate: (data: Parameters<typeof baseCreateState.mutate>[0]['data']) => {
      return baseCreateState.mutate({ data })
    },
    mutateAsync: (data: Parameters<typeof baseCreateState.mutateAsync>[0]['data']) => {
      return baseCreateState.mutateAsync({ data })
    },
  }

  const baseUpdateState = api.taskNode.update.useMutation({
    ...update,
    onSuccess: (...args) => {
      if (update?.onSuccess) {
        update.onSuccess(...args)
      }
      onSuccess('更新成功')
    },
  })

  const updateState = {
    ...baseUpdateState as unknown as typeof baseUpdateState,
    mutate: (id: string, data: Parameters<typeof baseUpdateState.mutate>[0]['data']) => {
      return baseUpdateState.mutate({
        where: { id },
        data,
      })
    },
    mutateAsync: (id: string, data: Parameters<typeof baseUpdateState.mutateAsync>[0]['data']) => {
      return baseUpdateState.mutateAsync({
        where: { id },
        data,
      })
    },
  }

  const baseRemoveState = api.taskNode.update.useMutation({
    ...remove,
    onSuccess: (...args) => {
      if (remove?.onSuccess) {
        remove.onSuccess(...args)
      }
      onSuccess('删除成功')
    },
  })

  const removeState = {
    ...baseRemoveState as unknown as typeof baseRemoveState,
    mutate: (id: string) => {
      return baseRemoveState.mutate({
        where: { id },
        data: { isDeleted: true },
      })
    },
    mutateAsync: (id: string) => {
      return baseRemoveState.mutateAsync({
        where: { id },
        data: { isDeleted: true },
      })
    },
  }

  return {
    listState,
    createState,
    removeState,
    updateState,
    apiUtils,
  }
}
