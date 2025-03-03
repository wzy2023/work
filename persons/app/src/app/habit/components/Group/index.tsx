import { ReactNode } from 'react'
import { Card, Space, Popconfirm } from 'antd'
import { DragOutlined, DeleteOutlined } from '@ant-design/icons'
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
      title={item.name}
      onMouseEnter={setTrue}
      onMouseLeave={setFalse}
      extra={
        <Space className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <DragOutlined {...provided.dragHandleProps} />
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
