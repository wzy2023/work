import React from 'react'
import { CardPro, Tag } from '@/components'
import { useIsShow, useCardExtra, useDragCom } from '../hooks'

interface TextProps {
  active: boolean
  data: any
}

export const Text = (props: TextProps) => {
  const { data, active } = props

  const { opacity, preview, dragHandle } = useDragCom(data)

  const { renderExtra, style } = useCardExtra(data, active)

  if (useIsShow(data)) {
    return null
  }

  return (
    <CardPro
      ref={preview}
      size='small'
      style={{ ...style, opacity }}
      extra={renderExtra([dragHandle])}
      collapsedHeight={312}
      title={<Tag color='green'>文本</Tag>}
    >
      <div style={{ whiteSpace: 'break-spaces' }}>{data.data?.content}</div>
    </CardPro>
  )
}
