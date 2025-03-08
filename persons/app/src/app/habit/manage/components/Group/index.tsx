import { type ReactNode } from 'react'

import { Card, message, Popconfirm, Space } from 'antd'
import { DeleteOutlined, DragOutlined } from '@ant-design/icons'

import { useBoolean } from 'ahooks'

import { api } from '@/api/react'

import { GroupTitle } from './GroupTitle'

interface GroupProps {
  item: any
  children: ReactNode | ReactNode[]
  provided: any
  onSuccess?: () => void
}

export const Group = (props: GroupProps) => {
  const { item, children, provided, onSuccess } = props

  const [isHovered, { setTrue, setFalse }] = useBoolean(false)

  const deleteState = api.habit.group.delete.useMutation({
    onSuccess: () => {
      message.success('删除成功')
      onSuccess?.()
    },
  })

  return (
    <Card
      size='small'
      title={<GroupTitle item={item} />}
      onMouseEnter={setTrue}
      onMouseLeave={setFalse}
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
            onConfirm={() => deleteState.mutate({ id: item.id })}
          >
            <DeleteOutlined className='cursor-pointer' />
          </Popconfirm>
        </Space>
      }
    >
      {children}
    </Card>
  )
}
