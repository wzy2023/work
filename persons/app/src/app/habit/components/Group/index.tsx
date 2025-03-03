import { ReactNode } from 'react'
import { Card } from 'antd'
import { DragOutlined } from '@ant-design/icons'

interface GroupProps {
  item: any
  children: ReactNode | ReactNode[]
  provided: any
}

export const Group = (props: GroupProps) => {
  const { item, children, provided } = props

  return (
    <Card
      size='small'
      title={item.name}
      extra={<DragOutlined {...provided.dragHandleProps} />}
    >
      {children}
    </Card>
  )
}
