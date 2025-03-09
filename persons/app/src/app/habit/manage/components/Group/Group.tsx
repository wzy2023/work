import React from 'react'

import { Card, message, Popconfirm, Space } from 'antd'
import { DeleteOutlined, DragOutlined } from '@ant-design/icons'

import { GroupTitle } from './GroupTitle'
import { List as ItemList } from '../Item/List'

import { useHovered } from '@/hooks'
import { api } from '@/api/react'

interface GroupProps {
  item: any
  provided: any
  // TODO store
  onSuccess?: () => void
}

export const Group = (props: GroupProps) => {
  const { item, provided, onSuccess } = props

  const { isHovered, onMouseEnter, onMouseLeave } = useHovered()

  const removeState = api.habit.group.remove.useMutation({
    onSuccess: () => {
      message.success('删除成功')
      onSuccess?.()
    },
  })

  return (
    <Card
      size='small'
      title={<GroupTitle item={item} />}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: `linear-gradient(to bottom, ${item.color}40 0%, ${item.color}10 100%)`,
        borderColor: item.color,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      extra={
        <Space className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <DragOutlined {...provided.dragHandleProps} className='cursor-grab' />
          <Popconfirm
            title='确定要删除吗？'
            okText='确定'
            cancelText='取消'
            onConfirm={() => removeState.mutate({ id: item.id })}
          >
            <DeleteOutlined className='cursor-pointer' />
          </Popconfirm>
        </Space>
      }
    >
      <ItemList groupId={item.id} />
    </Card>
  )
}
