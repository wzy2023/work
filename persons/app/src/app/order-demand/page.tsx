'use client'

import { useState } from 'react'

import { ProTable, Tabs } from '@/components'

import { columns } from './config'
import { useOrderDemandCRUD } from '@/api/generated/crud'

type OrderDemand = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  isDeleted: boolean | null
  type: string
  source: string
  confirmed: boolean | null
  title: string | null
  desc: string | null
  url: string | null
  person: string | null
  price: string | null
  applyNum: string | null
  createTime: string | null
}

export default () => {
  const [activeTab, setActiveTab] = useState<string>('order')

  // 创建订单需求列表查询
  const { listState } = useOrderDemandCRUD({
    list: {
      query: {
        where: {
          type: activeTab === 'order' ? '需求' : '岗位',
        },
      },
    },
  })

  const items = [
    {
      key: 'order',
      label: '需求',
      children: (
        <ProTable<OrderDemand>
          rowKey='id'
          columns={columns}
          dataSource={listState.data}
          loading={listState.isLoading}
          scroll={{ x: 1500 }}
          search={false}
          toolbar={false}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 15,
          }}
        />
      ),
    },
    {
      key: 'parttime',
      label: '岗位',
      children: (
        <ProTable<OrderDemand>
          rowKey='id'
          columns={columns}
          dataSource={listState.data}
          loading={listState.isLoading}
          scroll={{ x: 1500 }}
          search={false}
          toolbar={false}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 15,
          }}
        />
      ),
    },
  ]

  // 切换标签页时重新加载数据
  const handleTabChange = (key: string) => {
    setActiveTab(key)
    listState.refetch()
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>订单兼职</h1>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={handleTabChange}
      />
    </div>
  )
}
