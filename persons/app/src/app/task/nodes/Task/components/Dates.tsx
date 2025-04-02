import React from 'react'
import { CalendarOutlined } from '@/components'
import { Date } from '../../../components/Date'

interface DatesProps {
  dates?: [number, number]
  isEdit: boolean
  onChange: (value: any) => void
}

export const Dates = (props: DatesProps) => {
  const { isEdit, dates, onChange } = props

  if (!isEdit && dates?.length !== 2) {
    return null
  }

  return (
    <div className='mt-1.5 flex items-center text-[11px] text-gray-400'>
      {!isEdit && (
        <CalendarOutlined className='text-xs mr-1' />
      )}

      <Date
        value={dates}
        isEdit={isEdit}
        onChange={dates => onChange({ dates })}
      />
    </div>
  )
}
