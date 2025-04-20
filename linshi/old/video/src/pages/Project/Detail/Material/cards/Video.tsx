import React from 'react'

import { Card, Spin, Tag, Video as VideoCom } from '@/components'

import { MaterialStatus } from '../../../types'
import { useAutoRefresh, useCardExtra } from '../hooks'

interface VideoProps {
  active: boolean
  data: any
}

export const Video = (props: VideoProps) => {
  const { data, active } = props

  const { renderExtra, style } = useCardExtra(data, active)

  const { info } = useAutoRefresh(data) as any

  return (
    <Spin spinning={info.status === MaterialStatus.Doing} tip={info?.progress + '%'}>
      <Card
        size='small'
        style={style}
        extra={renderExtra()}
        title={<Tag color='purple'>视频</Tag>}
      >
        {(info?.data as any).url ? (
          <VideoCom url={(info?.data as any).url} />
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div>{info.data?.taskId}</div>
          </div>
        )}
      </Card>
    </Spin>
  )
}
