'use client'

import React, { useRef, useState } from 'react'

import { message, Form, ProTable, type ActionType } from '@/components'
import { ItemSearchForm } from './ItemSearchForm'

import { getColumns } from './config'

import { useRssItem, useRssFeed } from '../../hooks'
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
  })

  const { feeds } = useRssFeed()
  const { items, isLoading, refetch, toggleRead, toggleStar } = useRssItem(searchParams)

  const actionRef = useRef<ActionType>(null)
  const [form] = Form.useForm<Record<string, any>>()

  const onSearch = (values: any) => {
    const params = getRssItemSearchParams(values)
    setSearchParams(params)
    refetch()
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
    await refetch()
    if (actionRef.current) {
      actionRef.current.reload()
    }
  }

  // 处理双击切换已读/未读的回调函数
  const handleToggleRead = async (id: string, isRead: boolean) => {
    await toggleRead(id, isRead)
    message.success(isRead ? '标记已读成功' : '标记未读成功')
    await refetch()
    if (actionRef.current) {
      actionRef.current.reload()
    }
  }

  const columns = getColumns(onAction, handleToggleRead)

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
        onRow={(record) => ({
          onDoubleClick: () => {
            if (record.id) {
              handleToggleRead(record.id, !record.isRead)
            }
          },
        })}
      />
    </div>
  )
}
