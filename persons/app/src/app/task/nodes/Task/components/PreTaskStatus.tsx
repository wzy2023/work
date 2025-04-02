import React from 'react'
import { Select } from '@/components'
import { TaskStatus } from '../../../types'

interface PreTaskStatusProps {
  isEdit: boolean
  preTaskStatus: TaskStatus
  onChange: (value: any) => void
}

export const PreTaskStatus = (props: PreTaskStatusProps) => {
  const { isEdit, preTaskStatus = TaskStatus.COMPLETED, onChange } = props

  if (!isEdit) {
    return null
  }

  return (
    <div className='mt-1.5 text-sm font-medium text-gray-900 truncate' style={{ width: '100%' }}>
      <Select
        mode='tags'
        style={{ width: '100%' }}
        placeholder='请选择标签'
        value={preTaskStatus}
        onChange={preTaskStatus => onChange({ preTaskStatus })}
        options={[TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS].map(value => ({
          label: value,
          value,
        }))}
      />
    </div>
  )
}
