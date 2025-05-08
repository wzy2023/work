'use client'

import React from 'react'

import { Input, RadioButton, Spin } from '@/components'
import { CreateUpdate, InfoList } from './components'

import { enableOptions } from '@/consts'
import { useInfoStore } from './store'
import { useAiInfoCRUD } from '@/api/generated/crud'

export default () => {
  const { filterValues, setFilterValues } = useInfoStore()

  const { listState } = useAiInfoCRUD({
    list: {
      query: {
        where: {
          enabled: filterValues.enabled,
          title: filterValues.title ? { contains: filterValues.title } : undefined,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return (
    <div className='p-5 mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>信息管理</h1>
        <CreateUpdate onSuccess={listState.refetch} />
      </div>

      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-4'>
          <RadioButton
            value={filterValues.enabled}
            options={enableOptions}
            style={{ width: 300 }}
            onChange={enabled => setFilterValues({ enabled })}
          />
          <Input
            placeholder='搜索标题'
            allowClear
            value={filterValues.title}
            onChange={e => setFilterValues({ title: e.target.value })}
            onPressEnter={() => listState.refetch()}
          />
        </div>
      </div>

      <Spin spinning={listState.isLoading} delay={100}>
        <InfoList
          list={listState.data as Info.Item[]}
          onSuccess={listState.refetch}
        />
      </Spin>
    </div>
  )
}
