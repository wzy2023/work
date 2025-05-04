import React from 'react'

import { Button, type ProColumns, Space, Tag, Tooltip } from '@/components'
import { CreateUpdate } from './components'

interface Option {
  onDelete: (id: string) => void
  onSuccess: () => void
}

export const getColumns = (option: Option): ProColumns[] => [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    ellipsis: true,
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 300,
    ellipsis: true,
    render: (text: any) => (
      <Tooltip title={text}>
        <div className='truncate max-w-md'>{text}</div>
      </Tooltip>
    ),
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 200,
    render: (tags: any) => {
      return (
        <>
          {tags?.map((tag: any) => (
            <Tag key={tag} className='mr-1 mb-1'>
              {tag}
            </Tag>
          ))}
        </>
      )
    },
  },
  {
    title: 'Key',
    dataIndex: 'key',
    width: 150,
    ellipsis: true,
  },
  {
    title: '项目',
    dataIndex: 'project',
    key: 'project',
    width: 150,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    render: (text: any) => new Date(text).toLocaleString(),
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: (_: unknown, record: any) => (
      <Space size='middle'>
        <CreateUpdate
          initialValues={record}
          onSuccess={option.onSuccess}
        />

        <Button danger type='text' onClick={() => option.onDelete(record.id)}>
          删除
        </Button>
      </Space>
    )
  },
]
