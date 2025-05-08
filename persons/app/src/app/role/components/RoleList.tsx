import React from 'react'

import { Space, Switch, Table, type TableProps, Tag } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Delete } from './Delete'

import { useAiRoleCRUD } from '@/api/generated/crud'

interface RoleListProps {
  list?: AiRole.Item[]
  onSuccess: () => void
}

export const RoleList = (props: RoleListProps) => {
  const { list, onSuccess } = props

  const { updateState } = useAiRoleCRUD({
    list: false,
    update: {
      onSuccess,
    },
  })

  const onSwitch = (checked: boolean, record: AiRole.Item) => {
    updateState.mutate(record.id, { enabled: checked })
  }

  const columns: TableProps<AiRole.Item>['columns'] = [
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
      title: '标签',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags?.map((tag: string) => (
            <Tag key={tag} className='mr-1 mb-1'>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '项目',
      dataIndex: 'project',
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
            initialValues={record}
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
