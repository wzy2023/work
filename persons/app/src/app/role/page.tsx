'use client'

import React from 'react'

import { Spin, RadioButton, Input } from '@/components'
import { CreateUpdate, RoleList } from './components'

import { enableOptions } from '@/consts'
import { useRoleStore } from './store'
import { useAiRoleCRUD } from '@/api/generated/crud'

export default () => {
  const { filterValues, setFilterValues } = useRoleStore()

  const { listState } = useAiRoleCRUD({
    list: {
      query: {
        where: {
          ...(filterValues.enabled !== undefined ? { enabled: filterValues.enabled } : {}),
          ...(filterValues.title ? { title: { contains: filterValues.title } } : {}),
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return (
    <div className='p-5 mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>角色管理</h1>
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
        <RoleList
          list={listState.data as AiRole.Item[]}
          onSuccess={listState.refetch}
        />
      </Spin>
    </div>
  )
}
