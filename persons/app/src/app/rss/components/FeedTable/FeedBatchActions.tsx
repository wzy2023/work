'use client'

import React from 'react'
import { Button, Dropdown, DownOutlined, type MenuProps } from '@/components'

interface FeedBatchActionsProps {
  selectedRowKeys: string[]
  onBatchDelete: () => void
  onBatchEnable: () => void
  onBatchDisable: () => void
}

export const FeedBatchActions = (props: FeedBatchActionsProps) => {
  const {
    selectedRowKeys,
    onBatchDelete,
    onBatchEnable,
    onBatchDisable,
  } = props

  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '批量删除',
      onClick: onBatchDelete,
    },
    {
      key: 'enable',
      label: '批量启用',
      onClick: onBatchEnable,
    },
    {
      key: 'disable',
      label: '批量禁用',
      onClick: onBatchDisable,
    },
  ]

  return (
    <Dropdown menu={{ items }} disabled={selectedRowKeys.length === 0}>
      <Button>
        批量操作 <DownOutlined />
      </Button>
    </Dropdown>
  )
}
