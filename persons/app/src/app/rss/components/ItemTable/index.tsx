'use client'

import React, { useRef, useState } from 'react'

import { message, Form, ProTable, type ActionType } from '@/components'
import { ItemSearchForm } from './ItemSearchForm'

import { getColumns } from './config'

import { useRssItem, useRssFeed } from '../../hooks'
import { getRssItemSearchParams } from '../../utils'

export const ItemTable = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    feedIds: [] as string[],
    tags: [] as string[],
    isRead: undefined as boolean | undefined,
    isStarred: undefined as boolean | undefined,
    pubDateStart: undefined as string | undefined,
    pubDateEnd: undefined as string | undefined,
  })

  const { feeds } = useRssFeed()
  const { items, isLoading, refetch, toggleRead, toggleStar } = useRssItem(searchParams)

  const actionRef = useRef<ActionType>(null)
  const [form] = Form.useForm<Record<string, any>>()

  const onSearch = (values: any) => {
    const params = getRssItemSearchParams(values)
    setSearchParams(params)
    // 触发重新获取数据
    refetch()
  }

  const onAction = async (actionType: Rss.ItemActionType, id: string) => {
    switch (actionType) {
      case Rss.ItemActionType.MarkAsRead:
        await toggleRead(id, true)
        message.success('标记已读成功')
        break
      case Rss.ItemActionType.MarkAsUnread:
        await toggleRead(id, false)
        message.success('标记未读成功')
        break
      case Rss.ItemActionType.Star:
        await toggleStar(id, true)
        message.success('收藏成功')
        break
      case Rss.ItemActionType.Unstar:
        await toggleStar(id, false)
        message.success('取消收藏成功')
        break
    }
    await refetch()
    if (actionRef.current) {
      actionRef.current.reload()
    }
  }

  const columns = getColumns(onAction)

  return (
    <div className='rss-item-table'>
      <div className='mb-3'>
        <ItemSearchForm form={form} feeds={feeds || []} onSearch={onSearch} />
      </div>

      <ProTable
        actionRef={actionRef}
        rowKey='id'
        columns={columns}
        dataSource={items}
        loading={isLoading}
        search={false}
        options={false}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          defaultPageSize: 10,
        }}
      />
    </div>
  )
}
