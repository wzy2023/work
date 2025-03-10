'use client'

import React from 'react'

import { List } from './components/Group/List'
import { Create } from './components/Group/Create'

import { useHabitGroupCRUD } from '@/api/generated/store'

export default () => {
  const { listState } = useHabitGroupCRUD({
    list: { orderBy: { sort: 'asc' } },
  })

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯管理</h1>
        <Create />
      </div>

      <List
        list={listState.data}
        onSuccess={listState.refetch}
      />
    </div>
  )
}
