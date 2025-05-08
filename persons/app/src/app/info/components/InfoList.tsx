import React from 'react'

import { Space, Switch, Table, type TableProps, Tag } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Delete } from './Delete'

import { useAiInfoCRUD } from '@/api/generated/crud'

interface InfoListProps {
  list?: Info.Item[]
  onSuccess: () => void
}

export const InfoList = (props: InfoListProps) => {
  const { list, onSuccess } = props

  const { updateState } = useAiInfoCRUD({
    list: false,
    update: {
      onSuccess,
    },
  })

  const onSwitch = (checked: boolean, record: Info.Item) => {
    updateState.mutate(record.id, { enabled: checked })
  }

  const columns: TableProps<Info.Item>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      width: 100,
      render: (enabled) => (
        <Tag color={enabled ? 'success' : 'error'}>
          {enabled ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size='middle'>
          <Switch
            size='small'
            checked={record.enabled}
            onChange={(checked) => onSwitch(checked, record)}
          />
          <CreateUpdate
            item={record}
            onSuccess={onSuccess}
          />
          <Delete id={record.id} onSuccess={onSuccess} />
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={list || []}
      pagination={{
        hideOnSinglePage: true,
      }}
    />
  )
}
