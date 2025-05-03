'use client'

import React from 'react'
import { Space, Tooltip, BookOutlined, BookFilled, StarOutlined, StarFilled, LinkOutlined } from '@/components'

import { ensureHttpPrefix } from '../../utils'

interface ItemActionsProps {
  record: any
  onAction: (actionType: Rss.ItemActionType, id: string) => void
}

export const ItemActions = (props: ItemActionsProps) => {
  const { record, onAction } = props

  return (
    <Space size='middle'>
      <Tooltip title={record.isRead ? '标记为未读' : '标记为已读'}>
        <a
          onClick={() => {
            const actionType = record.isRead
              ? Rss.ItemActionType.MarkAsUnread
              : Rss.ItemActionType.MarkAsRead
            onAction(actionType, record.id)
          }}
        >
          {record.isRead ?
            <BookFilled style={{ color: '#d9d9d9' }} /> :
            <BookOutlined style={{ color: '#1890ff' }} />
          }
        </a>
      </Tooltip>

      <Tooltip title={record.isStarred ? '取消收藏' : '收藏'}>
        <a
          onClick={() => {
            const actionType = record.isStarred
              ? Rss.ItemActionType.Unstar
              : Rss.ItemActionType.Star
            onAction(actionType, record.id)
          }}
        >
          {record.isStarred ?
            <StarFilled style={{ color: '#faad14' }} /> :
            <StarOutlined />
          }
        </a>
      </Tooltip>

      <Tooltip title='打开原文'>
        <a
          href={ensureHttpPrefix(record.link)}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => onAction(Rss.ItemActionType.OpenLink, record.id)}
        >
          <LinkOutlined />
        </a>
      </Tooltip>
    </Space>
  )
}
