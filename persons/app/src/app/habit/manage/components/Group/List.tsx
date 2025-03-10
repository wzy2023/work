import React from 'react'

import { DragSort } from '@/components'
import { Group } from './Group'

import { api } from '@/api/react'

interface ListProps<I> {
  list?: I[]
  onSuccess: () => void
}

export const List = <I extends { id: number }>(props: ListProps<I>) => {
  const { list, onSuccess } = props

  const utils = api.useUtils()

  const updateSortState = api.habit.group.updateSort.useMutation({
    onSuccess: onSuccess,
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newItemsOrder = Array.from(list || [])
    const [removed] = newItemsOrder.splice(result.source.index, 1)
    if (removed) {
      newItemsOrder.splice(result.destination.index, 0, removed)
    }

    // 乐观更新
    utils.habitGroup.findMany.setData(undefined, newItemsOrder as any)

    updateSortState.mutate(
      newItemsOrder.map((item, index) => ({
        id: item.id,
        sort: index,
      })),
    )
  }

  return (
    <DragSort list={list} onDragEnd={onDragEnd}>
      {(item, provided: any) => (
        <Group
          item={item}
          provided={provided}
          onSuccess={onSuccess}
        />
      )}
    </DragSort>
  )
}
