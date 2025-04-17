'use client'

import React, { useEffect } from 'react'

import { DateSwitcher, RadioButton, Spin } from '@/components'
import { GroupList } from './components/GroupList'

import { useData } from './hooks/useData'
import { useOptions } from './hooks/useOptions'
import { useFilterData } from './hooks/useFilterData'
import { useSelectedDate } from './hooks/useSelectedDate'
import { useFilterValues } from './hooks/useFilterValues'

export default () => {
  const { selectedDate, setSelectedDate } = useSelectedDate()

  const { filterValues, setFilterValues } = useFilterValues()

  const { data, isLoading, invalidate } = useData(selectedDate)

  const { options } = useOptions(data, filterValues)

  const { showData } = useFilterData(data, filterValues)

  useEffect(() => {
    if (!options.frequency.some(item => item.value === filterValues.frequency)) {
      if (options.frequency?.[0]?.value !== undefined) {
        setFilterValues({ frequency: options.frequency[0].value })
      }
    }
    if (!options.status.some(item => item.value === filterValues.status)) {
      if (options.status?.[0]?.value !== undefined) {
        setFilterValues({ status: options.status[0].value })
      }
    }
  }, [filterValues.frequency, filterValues.status, options, setFilterValues])

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯记录</h1>
        <DateSwitcher value={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className='flex justify-between items-center mb-4'>
        <RadioButton
          value={filterValues.frequency}
          options={options.frequency}
          onChange={frequency => setFilterValues({ frequency })}
        />
        <RadioButton
          value={filterValues.status}
          options={options.status}
          onChange={status => setFilterValues({ status })}
        />
      </div>

      <Spin spinning={isLoading} delay={100}>
        <GroupList
          data={showData}
          onSuccess={invalidate}
        />
      </Spin>
    </div>
  )
}
