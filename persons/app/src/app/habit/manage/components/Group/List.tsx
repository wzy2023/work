import React from 'react'

import { DragSort, type DropResult } from '@/components'
import { Group } from './Group'

import { api } from '@/api/react'
import { type Habit } from '@/api/types'

interface ListProps {
  list?: (Habit.Group & { children: Habit.Item[] })[]
  onSuccess: () => void
}

export const List = (props: ListProps) => {
  const { list, onSuccess } = props

  const utils = api.useUtils()

  const updateGroupSortState = api.custom.habitGroup.updateSort.useMutation({
    onSuccess,
  })

  const updateHabitSortState = api.custom.habitItem.updateSort.useMutation({
    onSuccess,
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    if (result.type === 'group') {
      const newItemsOrder = Array.from(list || [])

      const [removed] = newItemsOrder.splice(result.source.index, 1)
      if (removed) {
        newItemsOrder.splice(result.destination.index, 0, removed)
      }

      // 乐观更新
      utils.habitGroup.findMany.setData(
        {
          orderBy: { sort: 'asc' },
          include: { children: true },
        },
        newItemsOrder,
      )

      updateGroupSortState.mutate(
        newItemsOrder.map((item, index) => ({
          id: item.id,
          sort: index,
        })),
      )
    }

    if (result.type === 'habit') {
      const sourceGroupId = result.source.droppableId.replace('group-', '')
      const targetGroupId = result.destination.droppableId.replace('group-', '')

      // 获取源组和目标组的 habits
      const sourceGroup = list?.find(group => group.id === sourceGroupId)
      const targetGroup = list?.find(group => group.id === targetGroupId)

      if (!sourceGroup || !targetGroup) return

      // 更新源组和目标组的 habits 排序
      const sourceHabits = Array.from(sourceGroup.children || [])
      const targetHabits = Array.from(targetGroup.children || [])

      // 从源组中移除
      const [draggedHabit] = sourceHabits.splice(result.source.index, 1)
      if (!draggedHabit) return

      // 添加到目标组
      targetHabits.splice(result.destination.index, 0, {
        ...draggedHabit,
        groupId: targetGroupId,
      })
      // 更新目标组的 habits 排序
      for (let i = 0; i < targetHabits.length; i++) {
        targetHabits[i]!.sort = i
      }

      // 乐观更新
      utils.habitGroup.findMany.setData(
        {
          orderBy: { sort: 'asc' },
          include: { children: true },
        },
        list?.map(group => {
          if (group.id === sourceGroupId) {
            return {
              ...group,
              children: sourceHabits,
            }
          }
          if (group.id === targetGroupId) {
            return {
              ...group,
              children: targetHabits,
            }
          }
          return group
        }),
      )

      // 调用接口更新 habit 的 groupId 和排序
      updateHabitSortState.mutate([
        ...sourceHabits.map((habit, index) => ({
          id: habit.id,
          sort: index,
          groupId: sourceGroupId,
        })),
        ...targetHabits.map((habit, index) => ({
          id: habit.id,
          sort: index,
          groupId: targetGroupId,
        })),
      ])
    }
  }

  return (
    <DragSort list={list} dropType='group' onDragEnd={onDragEnd}>
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
