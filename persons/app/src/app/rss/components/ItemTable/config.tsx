import React from 'react'
import { Popover, type ProColumns, Tag } from '@/components'
import { ItemActions } from './ItemActions'
import { ItemTitle } from './ItemTitle'

import { dayjs } from '@/utils'

export const getColumns = (onAction: (actionType: Rss.ItemActionType, id: string) => Promise<void>): ProColumns[] => [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: '15%',
    ellipsis: true,
    render: (_, record) => <ItemTitle record={record} />,
  },
  {
    title: '摘要',
    dataIndex: 'content',
    key: 'content',
    render: (text: any, record?: any) => {
      const hasImg = text?.includes('<img')

      const content = hasImg && (
        <div
          className='max-w-lg max-h-96 overflow-auto'
          dangerouslySetInnerHTML={{ __html: text || '' }}
        />
      )

      return (
        <Popover
          content={content}
          trigger='hover'
          placement='right'
          overlayClassName='rss-content-popover'
        >
          <div className='px-1 max-h-40 overflow-auto'>
            <span dangerouslySetInnerHTML={{ __html: hasImg ? record.title : text || '' }} />
          </div>
          {hasImg && <Tag>是</Tag>}
        </Popover>
      )
    },
  },
  {
    title: '来源',
    dataIndex: ['feed', 'name'],
    key: 'feedName',
    width: 150,
    render: (_, record: any) => (
      <Tag>{record.feed?.name}</Tag>
    ),
  },
  {
    title: '标签',
    dataIndex: ['feed', 'tags'],
    key: 'tags',
    width: 120,
    render: (_, record: any) => (
      <>
        {(record.feed?.tags || []).map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '发送',
    dataIndex: 'isSent',
    width: 120,
    render: (isSent) => (
      <Tag>{isSent ? '是' : '否'}</Tag>
    ),
  },
  {
    title: '发布时间',
    dataIndex: 'pubDate',
    key: 'pubDate',
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
