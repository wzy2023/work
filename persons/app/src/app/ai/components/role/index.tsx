'use client'

import React, { useMemo } from 'react'

import { Spin, RadioButton, Input, Select } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { List } from './List'

import { enableOptions } from '@/consts'
import { useRoleStore } from '../../stores/role'
import { useAiRoleCRUD } from '@/api/generated/crud'

export const Role = () => {
  const { filterValues, setFilterValues } = useRoleStore()

  // 构建包含标签过滤的查询条件
  const queryWhere = useMemo(() => {
    const where: any = {}

    // 状态过滤
    if (filterValues.enabled !== undefined) {
      where.enabled = filterValues.enabled
    }

    // 标题过滤
    if (filterValues.title) {
      where.title = { contains: filterValues.title }
    }

    // 标签过滤 - 只有当选择了标签时才添加到查询中
    if (filterValues.tag) {
      where.tags = { equals: [filterValues.tag] }
    }

    return where
  }, [filterValues])

  const { listState } = useAiRoleCRUD({
    list: {
      query: {
        where: queryWhere,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  // 从所有角色中收集唯一的标签列表，用于 Select 选项
  const tagOptions = useMemo(() => {
    if (!listState.data) {
      return []
    }

    const tagsSet = new Set<string>()

    listState.data.forEach(role => {
      if (role.tags && Array.isArray(role.tags)) {
        role.tags.forEach(tag => tagsSet.add(tag))
      }
    })

    return Array.from(tagsSet).map(tag => ({ label: tag, value: tag }))
  }, [listState.data])

  return (
    <div className='mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-4 w-full mr-3'>
          <RadioButton
            value={filterValues.enabled}
            options={enableOptions}
            style={{ width: 300 }}
            onChange={enabled => setFilterValues({ enabled })}
          />
          <Select
            placeholder='根据标签筛选'
            allowClear
            style={{ width: 300 }}
            value={filterValues.tag}
            options={tagOptions}
            onChange={tag => setFilterValues({ tag })}
          />
          <Input
            placeholder='搜索标题'
            allowClear
            value={filterValues.title}
            onChange={e => setFilterValues({ title: e.target.value })}
          />
        </div>

        <CreateUpdate onSuccess={listState.refetch} />
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
