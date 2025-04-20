import React from 'react'

import { Button, Space, Tooltip, CloudUploadOutlined, DownloadOutlined, CloseCircleOutlined } from '@/components'

import { material } from '@/apis'
import { MaterialSourceType, MaterialType, MaterialStatus } from '../../../types'
import { useToggleFavorite } from './useToggleFavorite'

export const useCardExtra = (data: material.Material, active: boolean) => {
  const { renderFavoriteBtn } = useToggleFavorite(data)

  return {
    style: {
      width: 200,
      border: `solid 1px ${active ? '#1890ff' : '#f0f0f0'}`,
      cursor: 'default',
    },
    renderExtra: (elements?: any[]) => (
      <Space size={2}>
        {data.children?.length ? (
          <span style={{ color: '#ccc', fontSize: 10 }}>{data.children?.length}</span>
        ) : null}

        {((data.data as any).sourceType === MaterialSourceType.Import && data.type !== MaterialType.IMAGE) && (
          <CloudUploadOutlined style={{ marginRight: 4 }} />
        )}

        {[MaterialType.IMAGE, MaterialType.VIDEO, MaterialType.VIDEOHANDLE].includes(data.type) && (
          <Button
            type='text'
            size='small'
            download
            href={(data.data as any).url}
            icon={<DownloadOutlined />}
          />
        )}

        {data.status === MaterialStatus.Failed ? (
          <Tooltip title={data.failReason}>
            <CloseCircleOutlined title='345' style={{ color: 'red' }} />
          </Tooltip>
        ) : (
          renderFavoriteBtn()
        )}

        {(elements || []).map((item: any, index: number) => (
          <div key={index}>{item}</div>
        ))}
      </Space>
    ),
  }
}
