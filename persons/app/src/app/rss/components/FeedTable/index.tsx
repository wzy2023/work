'use client'

import React, { useRef, useState, useEffect } from 'react'

import {
  Modal,
  message,
  Button,
  ProTable,
  type ActionType,
  ExclamationCircleOutlined,
  PlusOutlined,
  SyncOutlined,
  notification,
} from '@/components'

import { FeedForm } from './FeedForm'
import { FeedBatchActions } from './FeedBatchActions'

import { api } from '@/api/react'
import { getColumns } from './config'
import { useRssFeed } from '../../hooks'
import { RssFetchTriggerType, RssFeedActionType } from '@/api/types'

const getDetailMessage = (feedsCount: number, successFeeds: any[], failedFeeds: any[]) => {
  let detailedMessage = ''
  const totalSuccessCount = successFeeds?.reduce((total, item) => total + item.newItemCount, 0) || 0

  detailedMessage += successFeeds.length ? `抓取成功的订阅源 (${successFeeds.length})\n` : ''
  successFeeds.forEach(feed => {
    detailedMessage += feed.newItemCount ? `\t${feed.name} (${feed.newItemCount})\n` : ''
  })

  detailedMessage += failedFeeds.length ? `\n抓取失败的订阅源 (${failedFeeds.length})\n` : ''
  failedFeeds.forEach(feed => {
    detailedMessage += `\t${feed.name} (${feed.error})\n`
  })

  return {
    title: `订阅源 (${feedsCount}) 个、新数据 (${totalSuccessCount}) 条`,
    description: detailedMessage,
  }
}

export const FeedTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [currentId, setCurrentId] = useState<string | undefined>()
  const [formVisible, setFormVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<any>(null)

  const actionRef = useRef<ActionType>(null)

  const {
    feeds,
    isLoading,
    createFeed,
    updateFeed,
    deleteFeed,
    batchDeleteFeeds,
    batchUpdateFeeds,
    refetch,
  } = useRssFeed()

  const fetchAllMutation = api.custom.rssFeed.batchFetchNow.useMutation()

  const itemCountsQuery = api.custom.rssFeed.getCountByFeed.useQuery()

  // 当currentId变化时，查找对应的记录
  useEffect(() => {
    if (currentId) {
      const record = feeds?.find(item => item.id === currentId)
      if (record) {
        setCurrentRecord(record)
        setFormVisible(true)
      }
    }
  }, [currentId, feeds])

  const onAction = (actionType: RssFeedActionType, id: string) => {
    switch (actionType) {
      case RssFeedActionType.Edit:
        setCurrentId(id)
        break
      case RssFeedActionType.Delete:
        showDeleteConfirm(id)
        break
      case RssFeedActionType.Fetch:
        handleFetchNow(id)
        break
    }
  }

  // 处理立即抓取单个订阅源
  const [isFetchingAll, setIsFetchingAll] = useState(false)

  const handleFetchNow = async (id: string) => {
    const result = await fetchAllMutation.mutateAsync({
      ids: [id],
      triggerType: RssFetchTriggerType.Manual,
    })
    if (result.successFeeds?.length) {
      message.success(`抓取完成：${result.successFeeds[0]?.newItemCount} 条新内容`)
    } else {
      message.error(`抓取失败：${result.failedFeeds?.[0]?.error}`)
    }
    refetch()
  }

  const handleFetchAll = async () => {
    try {
      setIsFetchingAll(true)

      const { successFeeds = [], failedFeeds = [] } = await fetchAllMutation.mutateAsync({
        triggerType: RssFetchTriggerType.Manual,
      })
      const { title, description } = getDetailMessage(feeds.length, successFeeds, failedFeeds)

      notification.success({
        message: title,
        duration: null,
        description: (
          <div className='whitespace-pre'>
            {description}
          </div>
        ),
      })

      refetch()
    } finally {
      setIsFetchingAll(false)
    }
  }

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，是否继续？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await deleteFeed(id)
        message.success('删除成功')
        actionRef.current?.reload()
      },
    })
  }

  const onEnabledChange = async (checked: boolean, id: string) => {
    await updateFeed(id, { enabled: checked })
    message.success(`${checked ? '启用' : '禁用'}成功`)
    actionRef.current?.reload()
  }

  const onBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的项')
      return
    }

    Modal.confirm({
      title: '批量删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除选中的 ${selectedRowKeys.length} 项吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await batchDeleteFeeds(selectedRowKeys)
        message.success('批量删除成功')
        setSelectedRowKeys([])
        actionRef.current?.reload()
      },
    })
  }

  const onBatchEnable = () => {
    onBatchToggleEnabled(true)
  }

  const onBatchDisable = () => {
    onBatchToggleEnabled(false)
  }

  const onBatchToggleEnabled = (enabled: boolean) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要操作的项')
      return
    }

    const action = enabled ? '启用' : '禁用'

    Modal.confirm({
      title: `批量${action}`,
      content: `确定要${action}选中的 ${selectedRowKeys.length} 项吗？`,
      onOk: async () => {
        try {
          await batchUpdateFeeds(selectedRowKeys.map(id => ({
            id,
            data: { enabled },
          })))
          message.success(`批量${action}成功`)
          setSelectedRowKeys([])
          actionRef.current?.reload()
        } catch (error) {
          console.error(`批量${action}失败:`, error)
          message.error(`批量${action}失败，请稍后重试`)
        }
      },
    })
  }

  // 处理表单取消
  const handleFormCancel = () => {
    setFormVisible(false)
    setCurrentId(undefined)
    setCurrentRecord(null)
  }

  // 处理表单提交
  const handleFormSubmit = async (values: any) => {
    try {
      if (currentId) {
        // 编辑模式
        await updateFeed(currentId, values)
        message.success('更新成功')
      } else {
        // 添加模式
        await createFeed(values)
        message.success('添加成功')
      }
      // 关闭表单并刷新列表
      setFormVisible(false)
      setCurrentId(undefined)
      setCurrentRecord(null)
      actionRef.current?.reload()
    } catch (error) {
      console.error('提交失败:', error)
      message.error('操作失败，请稍后重试')
    }
  }

  const getItemCount = (feedId: string) => {
    if (!itemCountsQuery.data) {
      return 0
    }
    const count = itemCountsQuery.data.find(item => item.feedId === feedId)
    return count ? count.count : 0
  }

  const columns = getColumns({
    onAction,
    onEnabledChange,
    getItemCount,
  })

  return (
    <div className='rss-feed-table'>
      <div className='flex justify-between mb-4'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentId(undefined)
            setFormVisible(true)
          }}
        >
          添加订阅
        </Button>
        <div className='flex gap-2'>
          <Button
            icon={<SyncOutlined spin={isFetchingAll} />}
            onClick={handleFetchAll}
            loading={isFetchingAll}
          >
            全部抓取
          </Button>
          <FeedBatchActions
            selectedRowKeys={selectedRowKeys}
            onBatchDelete={onBatchDelete}
            onBatchEnable={onBatchEnable}
            onBatchDisable={onBatchDisable}
          />
        </div>
      </div>

      <ProTable
        actionRef={actionRef}
        rowKey='id'
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={feeds}
        loading={isLoading}
        search={false}
        options={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys.map(key => String(key)))
          },
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          defaultPageSize: 15,
        }}
      />

      <FeedForm
        visible={formVisible}
        currentId={currentId}
        record={currentRecord}
        onCancel={handleFormCancel}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}
