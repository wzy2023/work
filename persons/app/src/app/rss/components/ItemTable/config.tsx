import React from 'react'
import { Popover, type ProColumns, Tag } from '@/components'
import { ItemActions } from './ItemActions'
import { ItemTitle } from './ItemTitle'

import { dayjs } from '@/utils'

export const getColumns = (onAction: (actionType: Rss.ItemActionType, id: string) => Promise<void>,
  onToggleRead?: (id: string, isRead: boolean) => Promise<void>,
): ProColumns[] => [
  {
    title: '标题',
    dataIndex: 'title',
    width: '15%',
    ellipsis: true,
    render: (_, record) => <ItemTitle record={record} />,
  },
  {
    title: '内容',
    dataIndex: 'summary',
    render: (_: unknown, record?: any) => {
      const hasImg = record.content?.includes('<img')

      const content = (
        <div
          className='max-w-lg max-h-96 overflow-auto'
          dangerouslySetInnerHTML={{ __html: record.content || '' }}
        />
      )

      return (
        <Popover
          content={content}
          trigger='hover'
          placement='right'
          overlayClassName='rss-content-popover'
        >
          <div
            className='px-1 max-h-40 overflow-auto'
            onDoubleClick={() => {
              if (onToggleRead && record.id) {
                onToggleRead(record.id, !record.isRead)
              }
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: record.summary || record.title || '' }} />
          </div>
          {hasImg && <Tag>是</Tag>}
        </Popover>
      )
    },
  },
  {
    title: '来源及标签',
    key: 'feedInfo',
    width: 180,
    render: (_, record: any) => (
      <div>
        <div><Tag>{record.feed?.name}</Tag></div>
        <div className='mt-1'>
          {(record.feed?.tags || []).map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'AI 标签',
    dataIndex: 'tags',
    width: 150,
    render: (text: any, record: any) => {
      const tags = record.tags || []
      return (
        <>
          {Array.isArray(tags) && tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      )
    },
  },
  {
    title: '发布时间',
    dataIndex: 'pubDate',
    width: 180,
    render: pubDate => dayjs(pubDate as string).format('YYYY-MM-DD HH:mm'),
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: (_, record) => <ItemActions record={record} onAction={onAction} />,
  },
]
