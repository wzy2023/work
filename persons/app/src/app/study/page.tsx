'use client'

import { useState } from 'react'

import { Tabs } from '@/components'
import { Operate, Item } from './components'

export default () => {
  const [activeTab, setActiveTab] = useState('operate')

  const tabItems = [
    {
      key: 'operate',
      label: '处理操作',
      children: <Operate />,
    },
    {
      key: 'item',
      label: '学习项目',
      children: <Item />,
    },
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='p-6'>
        <h1 className='text-2xl font-medium text-gray-900 mb-6'>学习辅助</h1>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />
      </div>
    </div>
  )
}
