import React from 'react'

import { Card, Spin, Tag, Video as VideoCom } from '@/components'

import { MaterialStatus } from '../../../types'
import { useAutoRefresh, useCardExtra } from '../hooks'

interface VideoHandleProps {
  active: boolean
  data: any
}

export const VideoHandle = (props: VideoHandleProps) => {
  const { data, active } = props

  const { renderExtra, style } = useCardExtra(data, active)

  const { info } = useAutoRefresh(data)

  return (
    <Spin spinning={info.status === MaterialStatus.Doing}>
      <Card
        size='small'
        style={style}
        extra={renderExtra()}
        title={<Tag color='purple'>处理视频</Tag>}
      >
        <VideoCom url={(info?.data as any).url} />
      </Card>
    </Spin>
  )
}
