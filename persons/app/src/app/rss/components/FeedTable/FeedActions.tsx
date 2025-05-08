'use client'

import React, { useState } from 'react'
import { Space, Tooltip, EditOutlined, DeleteOutlined, SyncOutlined } from '@/components'
import { RssFeedActionType } from '@/api/types'

interface FeedActionsProps {
  record: any
  onAction: (actionType: Rss.FeedActionType, id: string) => void
}

export const FeedActions = (props: FeedActionsProps) => {
  const { record, onAction } = props
  const [isFetching, setIsFetching] = useState(false)

  const handleFetch = () => {
    setIsFetching(true)
    onAction(RssFeedActionType.Fetch, record.id)
    setTimeout(() => setIsFetching(false), 10000)
  }

  return (
    <Space size='middle'>
      <Tooltip title='编辑'>
        <a onClick={() => onAction(RssFeedActionType.Edit, record.id)}>
          <EditOutlined />
        </a>
      </Tooltip>

      <Tooltip title='删除'>
        <a onClick={() => onAction(RssFeedActionType.Delete, record.id)}>
          <DeleteOutlined />
        </a>
      </Tooltip>

      <Tooltip title='立即抓取'>
        <a onClick={handleFetch}>
          <SyncOutlined spin={isFetching} />
        </a>
      </Tooltip>
    </Space>
  )
}
