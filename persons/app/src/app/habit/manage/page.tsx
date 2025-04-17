'use client'

import React from 'react'

import { Spin, RadioButton } from '@/components'
import { List } from './components/Group/List'
import { Create } from './components/Group/Create'

import { enableOptions } from '../const'
import { useHabitManageStore } from './store'
import { useHabitGroupCRUD } from '@/api/generated/store'

export default () => {
  const { filterValues, setFilterValues } = useHabitManageStore()

  const { listState } = useHabitGroupCRUD({
    list: {
      query: {
        orderBy: { sort: 'asc' },
        include: { children: true },
      },
    },
  })

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯管理</h1>
        <Create onSuccess={listState.refetch} />
      </div>

      <div className='flex justify-between items-center mb-4'>
        <RadioButton
          value={filterValues.enabled}
          options={enableOptions.enable}
          onChange={enabled => setFilterValues({ enabled })}
        />
      </div>

      <Spin spinning={listState.isLoading} delay={100}>
        <List
          list={listState.data}
          onSuccess={listState.refetch}
        />
      </Spin>
    </div>
  )
}
