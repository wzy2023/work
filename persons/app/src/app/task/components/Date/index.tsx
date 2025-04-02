import React from 'react'
import { DatePicker } from '@/components'
import { dayjs } from '@/utils'

interface DateProps {
  isEdit: boolean
  value?: (number | undefined)[]
  onChange: (value?: (number | undefined)[]) => void
}

export const Date = (props: DateProps) => {
  const { isEdit, value, onChange } = props

  if (isEdit) {
    return (
      <DatePicker.RangePicker
        value={[
          value?.[0] ? dayjs(value[0]) : null,
          value?.[1] ? dayjs(value[1]) : null,
        ]}
        onChange={value => {
          onChange(value?.map(item => item?.valueOf()))
        }}
      />
    )
  }

  if (value?.length !== 2) {
    return null
  }

  return (
    <div>
      {dayjs(value[0])?.format('YYYY-MM-DD')} 至 {dayjs(value[1])?.format('YYYY-MM-DD')}
    </div>
  )
}
