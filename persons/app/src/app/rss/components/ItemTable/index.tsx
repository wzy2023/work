'use client'

import React, { useRef, useState } from 'react'

import { message, Form, ProTable, type ActionType } from '@/components'
import { ItemSearchForm } from './ItemSearchForm'

import { getColumns } from './config'

import { useRssItem } from '../../hooks'
import { getRssItemSearchParams } from '../../utils'

import { RssItemActionType } from '@/api/types'

export const ItemTable = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    feedIds: [] as string[],
    tags: [] as string[],
    isRead: undefined as boolean | undefined,
    isStarred: undefined as boolean | undefined,
    pubDateStart: undefined as string | undefined,
    pubDateEnd: undefined as string | undefined,
    page: 1,
    pageSize: 10,
  })

  const { items, isLoading, toggleRead, toggleStar, pagination } = useRssItem(searchParams)

  const actionRef = useRef<ActionType>(null)
  const [form] = Form.useForm<Record<string, any>>()

  const onSearch = (values: any) => {
    const params = getRssItemSearchParams(values)
    setSearchParams({
      ...params,
      page: 1, // 搜索时重置页码
      pageSize: searchParams.pageSize,
    })
  }

  const onTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  const onAction = async (actionType: RssItemActionType, id: string) => {
    switch (actionType) {
      case RssItemActionType.MarkAsRead:
        await toggleRead(id, true)
        message.success('标记已读成功')
        break
      case RssItemActionType.MarkAsUnread:
        await toggleRead(id, false)
        message.success('标记未读成功')
        break
      case RssItemActionType.Star:
        await toggleStar(id, true)
        message.success('收藏成功')
        break
      case RssItemActionType.Unstar:
        await toggleStar(id, false)
        message.success('取消收藏成功')
        break
    }
  }

  const handleToggleRead = async (id: string, isRead: boolean) => {
    await toggleRead(id, isRead)
    message.success(isRead ? '标记已读成功' : '标记未读成功')
  }

  const columns = getColumns(onAction, handleToggleRead)

  return (
    <div className='rss-item-table'>
      <div className='mb-3'>
        <ItemSearchForm form={form} onSearch={onSearch} />
      </div>

      <ProTable
        actionRef={actionRef}
        rowKey='id'
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={items}
        loading={isLoading}
        search={false}
        options={false}
        onChange={onTableChange}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
    </div>
  )
}
