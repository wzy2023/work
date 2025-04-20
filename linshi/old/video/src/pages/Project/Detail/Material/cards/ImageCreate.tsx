import React from 'react'

import { CardPro, MultiImageDisplay, Spin, Tag } from '@/components'

import { MaterialStatus } from '../../../types'
import { useIsShow, useAutoRefresh, useCardExtra } from '../hooks'

interface ImageCreateProps {
  active: boolean
  data: any
}

export const ImageCreate = (props: ImageCreateProps) => {
  const { data, active } = props

  const { renderExtra, style } = useCardExtra(data, active)

  const { info } = useAutoRefresh(data) as any

  if (useIsShow(data)) {
    return null
  }

  return (
    <Spin spinning={info.status === MaterialStatus.Doing} tip={info?.progress + '%'}>
      <CardPro
        size='small'
        style={style}
        collapsedHeight={312}
        extra={renderExtra()}
        title={(
          <Tag color='purple'>图片组</Tag>
        )}
      >
        {info.data?.urls?.length ? (
          <MultiImageDisplay images={info.data?.urls} />
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div>{info.data?.taskId}</div>
            <div>{info?.failReason}</div>
          </div>
        )}
      </CardPro>
    </Spin>
  )
}
