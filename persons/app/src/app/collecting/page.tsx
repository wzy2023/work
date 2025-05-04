'use client'

import React, { useState } from 'react'

import { Tabs } from '@/components'
import { Tab } from './components'

import { TAB_ITEMS } from './consts'
import { CollectingType } from '@/api/types'

export default () => {
  const [activeKey, setActiveKey] = useState<CollectingType>(CollectingType.Url)

  const onChange = (key: string) => {
    setActiveKey(key as CollectingType)
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-3'>资料收集</h1>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        items={TAB_ITEMS.map(item => ({
          key: item.key,
          label: item.label,
          children: <Tab type={item.key} />,
        }))}
      />
    </div>
  )
}
