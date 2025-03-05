import { ReactNode } from 'react'

import { Card, Popconfirm, Space } from 'antd'
import { DeleteOutlined, DragOutlined } from '@ant-design/icons'
import { GroupTitle } from './GroupTitle'

import { useBoolean } from 'ahooks'

interface GroupProps {
  item: any
  children: ReactNode | ReactNode[]
  provided: any
  onDelete?: () => void
}

export const Group = (props: GroupProps) => {
  const { item, children, provided, onDelete } = props
  const [isHovered, { setTrue, setFalse }] = useBoolean(false)

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
            onConfirm={onDelete}
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
