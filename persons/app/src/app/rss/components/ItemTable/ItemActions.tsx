'use client'

import React from 'react'
import {
  Space,
  Tooltip,
  BookOutlined,
  BookFilled,
  StarOutlined,
  StarFilled,
  MailTwoTone,
  MailFilled,
  LikeTwoTone,
  DislikeTwoTone,
  QuestionOutlined,
} from '@/components'

import { RssItemActionType } from '@/api/types'

interface ItemActionsProps {
  record: any
  onAction: (actionType: Rss.ItemActionType, id: string) => void
}

export const ItemActions = (props: ItemActionsProps) => {
  const { record, onAction } = props

  const renderInterestIcon = () => {
    if (record.isInterested === 1) {
      return (
        <Tooltip title='AI认为你会感兴趣'>
          <LikeTwoTone twoToneColor='#52c41a' />
        </Tooltip>
      )
    } else if (record.isInterested === -1) {
      return (
        <Tooltip title='AI认为你不会感兴趣'>
          <DislikeTwoTone twoToneColor='#ff4d4f' />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title='AI未判断兴趣'>
          <QuestionOutlined style={{ color: '#d9d9d9' }} />
        </Tooltip>
      )
    }
  }

  return (
    <Space size='middle'>
      <Tooltip title={record.isRead ? '标记为未读' : '标记为已读'}>
        <a
          onClick={() => {
            const actionType = record.isRead
              ? RssItemActionType.MarkAsUnread
              : RssItemActionType.MarkAsRead
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
              ? RssItemActionType.Unstar
              : RssItemActionType.Star
            onAction(actionType, record.id)
          }}
        >
          {record.isStarred ?
            <StarFilled style={{ color: '#faad14' }} /> :
            <StarOutlined />
          }
        </a>
      </Tooltip>

      <Tooltip title={record.isSent ? '已发送' : '未发送'}>
        {record.isSent ?
          <MailFilled style={{ color: '#faad14' }} /> :
          <MailTwoTone />
        }
      </Tooltip>

      {renderInterestIcon()}
    </Space>
  )
}
