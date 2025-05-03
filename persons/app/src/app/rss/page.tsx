'use client'

import React, { useState } from 'react'

import { Tabs } from '@/components'
import { FeedTable, ItemTable, LogTable } from './components'

type TabKey = 'feeds' | 'items' | 'logs'

export default function RssPage() {
  const [activeKey, setActiveKey] = useState<TabKey>('feeds')

  const onChange = (key: string) => {
    setActiveKey(key as TabKey)
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-3'>RSS信息抓取工具</h1>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        destroyInactiveTabPane={true}
        items={[
          {
            key: 'feeds',
            label: 'RSS订阅管理',
            children: <FeedTable />,
          },
          {
            key: 'items',
            label: 'RSS内容列表',
            children: <ItemTable />,
          },
          {
            key: 'logs',
            label: '抓取日志',
            children: <LogTable />,
          },
        ]}
      />
    </div>
  )
}
