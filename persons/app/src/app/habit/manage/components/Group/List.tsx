import React from 'react'

import { DragSort, type DropResult } from '@/components'
import { Group } from './Group'

import { api } from '@/api/react'
import { type Habit } from '@/api/types'

interface ListProps {
  list?: Habit.Group[]
  onSuccess: () => void
}

export const List = (props: ListProps) => {
  const { list, onSuccess } = props

  const utils = api.useUtils()

  const updateSortState = api.custom.habitGroup.updateSort.useMutation({
    onSuccess,
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItemsOrder = Array.from(list || [])
    const [removed] = newItemsOrder.splice(result.source.index, 1)
    if (removed) {
      newItemsOrder.splice(result.destination.index, 0, removed)
    }

    // 乐观更新
    utils.habitGroup.findMany.setData({ orderBy: { sort: 'asc' } }, newItemsOrder)

    updateSortState.mutate(
      newItemsOrder.map((item, index) => ({
        id: item.id,
        sort: index,
      })),
    )
  }

  return (
    <DragSort list={list} onDragEnd={onDragEnd}>
      {(item, provided) => (
        <Group
          key={item.id}
          item={item}
          provided={provided}
          onSuccess={onSuccess}
        />
      )}
    </DragSort>
  )
}
