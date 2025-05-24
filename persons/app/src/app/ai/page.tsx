'use client'

import { useState } from 'react'

import { Tabs } from '@/components'
import { Role, Info } from './components'

export default () => {
  const [activeTab, setActiveTab] = useState('info')

  const tabItems = [
    {
      key: 'info',
      label: '信息管理',
      children: <Info />,
    },
    {
      key: 'role',
      label: '角色管理',
      children: <Role />,
    },
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='p-6'>
        <h1 className='text-2xl font-medium text-gray-900 mb-6'>AI 角色</h1>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />
      </div>
    </div>
  )
}
