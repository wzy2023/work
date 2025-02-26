import { ReactNode } from 'react'
import { Card } from 'antd'
import { DragOutlined } from '@ant-design/icons'
import { spans } from 'next/dist/build/webpack/plugins/profiling-plugin'

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
      title={item}
      extra={<DragOutlined {...provided.dragHandleProps} />}
    >
      {children}
    </Card>
  )
}
