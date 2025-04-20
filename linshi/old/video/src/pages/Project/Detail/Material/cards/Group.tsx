import React from 'react'
import { Card } from '@/components'
import { useDragCom, useDropCom, useIsShow } from '../hooks'

interface GroupProps {
  active: boolean
  data: any
}

export const Group = (props: GroupProps) => {
  const { data, active } = props

  const { opacity, drag } = useDragCom(data, false)

  const { drop, isOver } = useDropCom(data)

  if (useIsShow(data)) {
    return null
  }

  return (
    <Card
      ref={r => drop(drag(r))}
      size='small'
      style={{
        opacity,
        maxWidth: 200,
        cursor: 'pointer',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        backgroundColor: isOver ? '#7fb80e' : '',
        border: `solid 1px ${active ? '#1890ff' : '#f0f0f0'}`,
      }}
    >
      {data.data?.title}
    </Card>
  )
}
