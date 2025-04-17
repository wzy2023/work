'use client'

import React, { useEffect, useMemo } from 'react'

import { DateSwitcher, RadioButton, Spin } from '@/components'
import { GroupList } from './components/GroupList'

import { _ } from '@/utils'
import { api } from '@/api/react'
import { useHabitRecordStore } from './store'

import {
  type HabitFrequencyType,
  HabitFrequencyTypeText,
  type HabitProgressStatus,
  habitProgressStatusText,
} from '@/api/types'

export default () => {
  const { selectedDate, filterValues, setFilterValues, setSelectedDate } = useHabitRecordStore()

  const apiUtils = api.useUtils()

  const listState = api.custom.habitItem.list.useQuery({
    date: selectedDate.valueOf(),
  })

  // 预请求前后两天的数据
  useEffect(() => {
    apiUtils.custom.habitItem.list.prefetch({ date: selectedDate.subtract(1, 'day').valueOf() })
    apiUtils.custom.habitItem.list.prefetch({ date: selectedDate.add(1, 'day').valueOf() })
  }, [apiUtils, selectedDate])

  const data = useMemo(() => {
    const filterList = listState.data?.filter(item => {
      if (filterValues.frequency && item.frequency?.type !== filterValues.frequency) {
        return false
      }
      if (filterValues.status && item.status.record !== filterValues.status) {
        return false
      }
      return true
    })

    return Object.entries(_.groupBy(filterList, item => item.groupId)).map(([, value]) => ({
      group: value[0]!.group,
      list: value,
    })).sort((a, b) => (a.group?.sort || 0) - (b.group?.sort || 0))
  }, [listState.data, filterValues])

  const options = useMemo(() => {
    return {
      frequency: Object.keys(_.groupBy(listState.data, item => item.frequency?.type)).map(key => ({
        label: HabitFrequencyTypeText[key as HabitFrequencyType],
        value: key as HabitFrequencyType,
      })),
      status: [
        { label: '全部', value: undefined },
        ...Object.keys(_.groupBy(listState.data, item => item.status?.record)).map(key => ({
          label: habitProgressStatusText[key as HabitProgressStatus],
          value: key as HabitProgressStatus,
        })),
      ],
    }
  }, [listState.data])

  useEffect(() => {
    if (!options.frequency.some(item => item.value === filterValues.frequency)) {
      if (options.frequency?.[0]?.value) {
        setFilterValues({ frequency: options.frequency?.[0]?.value })
      }
    }
    if (!options.status.some(item => item.value === filterValues.status)) {
      if (options.status?.[0]?.value) {
        setFilterValues({ status: options.status?.[0]?.value })
      }
    }
  }, [options, filterValues, setFilterValues])

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯记录</h1>
        <DateSwitcher value={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className='flex justify-between items-center mb-4'>
        <RadioButton<HabitFrequencyType>
          value={filterValues.frequency}
          options={options.frequency}
          onChange={value => setFilterValues({ frequency: value })}
        />
        <RadioButton<HabitProgressStatus>
          value={filterValues.status}
          options={options.status}
          onChange={value => setFilterValues({ status: value })}
        />
      </div>

      <Spin spinning={listState.isLoading} delay={100}>
        <GroupList data={data} onSuccess={listState.refetch} />
      </Spin>
    </div>
  )
}
