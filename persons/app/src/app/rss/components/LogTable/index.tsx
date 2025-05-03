'use client'

import React from 'react'

import { ProTable } from '@/components'

import { getColumns } from './config'
import { useRssFetchLogCRUD } from '@/api/generated/crud'
import { useRssFeed } from '../../hooks'

export const LogTable = () => {
  const { listState } = useRssFetchLogCRUD({
    list: {
      query: {
        orderBy: { executedAt: 'desc' },
      },
    },
  })

  const { feeds } = useRssFeed()

  return (
    <ProTable
      rowKey='id'
      headerTitle='抓取日志'
      search={false}
      options={false}
      dataSource={listState.data}
      loading={listState.isLoading}
      columns={getColumns(feeds)}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        defaultPageSize: 10,
      }}
    />
  )
}
