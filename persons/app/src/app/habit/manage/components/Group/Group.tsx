import React from 'react'

import {
  Card,
  Popconfirm,
  Space,
  DeleteOutlined,
  DragOutlined,
  type DropResult,
  type DraggableProvided,
} from '@/components'

import { GroupTitle } from './GroupTitle'
import { List as ItemList } from '../Item/List'

import { useHovered } from '@/hooks'

import { type Habit } from '@/api/types'
import { useHabitManageStore } from '../../store'

import { api } from '@/api/react'
import { useHabitGroupCRUD, useHabitItemCRUD } from '@/api/generated/store'

interface GroupProps {
  item: Habit.Group
  provided: DraggableProvided
  onSuccess?: () => void
}

export const Group = (props: GroupProps) => {
  const { item, provided, onSuccess } = props

  const { filterValues } = useHabitManageStore()

  const { isHovered, onMouseEnter, onMouseLeave } = useHovered()

  const { removeState } = useHabitGroupCRUD({
    list: false,
    remove: { onSuccess },
  })

  const { listState, apiUtils } = useHabitItemCRUD({
    list: {
      query: {
        where: { groupId: item.id, enable: filterValues.enable },
        orderBy: { sort: 'asc' },
      },
    },
  })

  const updateSortState = api.custom.habitItem.updateSort.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(listState.data || [])
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed!)

    apiUtils.habitItem.findMany.setData({
      where: { groupId: item.id },
      orderBy: { sort: 'asc' },
    }, newItems)

    updateSortState.mutate(newItems.map((item, index) => ({
      id: item.id,
      sort: index + 1,
    })))
  }

  const data = filterValues.enable === undefined ?
    listState.data :
    (listState.data || []).filter(item => item.enable === filterValues.enable)

  if (!data?.length) {
    // return null
  }

  return (
    <Card
      size='small'
      title={<GroupTitle item={item} onSuccess={onSuccess} />}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      extra={
        <Space className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <DragOutlined {...provided.dragHandleProps} className='cursor-grab' />
          <Popconfirm
            title='确定要删除吗？'
            okText='确定'
            cancelText='取消'
            onConfirm={() => removeState.mutate(item.id)}
          >
            <DeleteOutlined className='cursor-pointer' />
          </Popconfirm>
        </Space>
      }
    >
      <ItemList
        groupId={item.id}
        data={data}
        onDragEnd={onDragEnd}
        onSuccess={listState.refetch}
      />
    </Card>
  )
}
