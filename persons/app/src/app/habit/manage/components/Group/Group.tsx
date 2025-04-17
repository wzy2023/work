import React from 'react'

import {
  Card,
  Popconfirm,
  Space,
  DeleteOutlined,
  DragOutlined,
  type DraggableProvided,
} from '@/components'

import { GroupTitle } from './GroupTitle'
import { List as ItemList } from '../Item/List'

import { useHovered } from '@/hooks'

import { type Habit } from '@/api/types'
import { useHabitManageStore } from '../../store'

import { useHabitGroupCRUD } from '@/api/generated/store'

interface GroupProps {
  item: Habit.Group & { children?: Habit.Item[] }
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

  const data = filterValues.enabled === undefined ?
    item.children :
    (item.children || []).filter(item => item.enabled === filterValues.enabled)

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
        onSuccess={onSuccess}
      />
    </Card>
  )
}
