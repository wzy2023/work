'use client'

import React from 'react'

import { ProTable } from '@/components'
import { CreateUpdate } from './components'

import { getColumns } from './config'
import { useAiRoleCRUD } from '@/api/generated/crud'

export default () => {

  const { listState, removeState } = useAiRoleCRUD({
    list: {
      query: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  const columns = getColumns({
    onDelete: id => {
      removeState.mutate(id)
    },
    onSuccess: () => {
      listState.refetch()
    },
  })

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-3'>角色管理</h1>

      <ProTable
        rowKey='id'
        columns={columns}
        dataSource={listState.data}
        loading={listState.isLoading}
        search={false}
        options={false}
        toolBarRender={() => [
          <CreateUpdate
            key='create'
            onSuccess={listState.refetch}
          />,
        ]}
      />
    </div>
  )
}
