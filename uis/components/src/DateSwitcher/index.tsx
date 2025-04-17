'use client'

import React, { useState } from 'react'

import { DatePicker, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { dayjs, type Dayjs } from '@wzyjs/utils'

import styles from './index.module.scss'

interface DateSwitcherProps {
  value?: Dayjs
  onChange?: (date: Dayjs) => void
}

export const DateSwitcher = (props: DateSwitcherProps) => {
  const { value = dayjs(), onChange } = props

  const [selectedDate, setSelectedDate] = useState(value)

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date)
      onChange?.(date)
    }
  }

  const handlePrevDay = () => {
    const newDate = selectedDate.subtract(1, 'day')
    handleDateChange(newDate)
  }

  const handleNextDay = () => {
    const newDate = selectedDate.add(1, 'day')
    handleDateChange(newDate)
  }

  const isToday = selectedDate.isSame(dayjs(), 'day')

  return (
    <div className={styles.picker}>
      <Button
        type='text'
        icon={<LeftOutlined />}
        onClick={handlePrevDay}
        className='flex items-center justify-center'
      />
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        allowClear={false}
        suffixIcon={null}
        className='w-40 text-center cursor-pointer'
        style={{ border: 'none' }}
        components={{
          input: props => (
            <div {...props} className={isToday ? 'text-green-600' : ''}>
              <span>{selectedDate.format('YYYY-MM-DD')}</span>
              <span style={{ marginLeft: 5 }}>
                (周{['日', '一', '二', '三', '四', '五', '六'][dayjs(selectedDate).day()]})
              </span>
            </div>
          ),
        }}
      />
      <Button
        type='text'
        icon={<RightOutlined />}
        onClick={handleNextDay}
        className='flex items-center justify-center'
      />
    </div>
  )
}
