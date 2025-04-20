import React from 'react'
import { Card, Image as AntdImage, Tag } from '@/components'
import { useIsShow, useCardExtra } from '../hooks'

interface ImageProps {
  active: boolean
  data: any
}

export const Image = (props: ImageProps) => {
  const { data, active } = props

  const { renderExtra, style } = useCardExtra(data, active)

  if (useIsShow(data)) {
    return null
  }

  return (
    <Card
      size='small'
      style={style}
      extra={renderExtra()}
      title={<Tag color='purple'>图片</Tag>}
    >
      {data?.data.url && (
        <AntdImage src={data.data.url} />
      )}
      {data?.data?.prompt && (
        <div>{data.data.prompt}</div>
      )}
    </Card>
  )
}
