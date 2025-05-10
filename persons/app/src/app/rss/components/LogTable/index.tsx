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
        where: { itemCount: { gt: 0 } },
        orderBy: { executedAt: 'desc' },
        include: {
          feed: {
            select: { name: true },
          },
        },
      },
    },
  })

  return (
    <ProTable
      rowKey='id'
      headerTitle='抓取日志'
      search={false}
      options={false}
      dataSource={listState.data}
      loading={listState.isLoading}
      columns={getColumns()}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        defaultPageSize: 10,
      }}
    />
  )
}
