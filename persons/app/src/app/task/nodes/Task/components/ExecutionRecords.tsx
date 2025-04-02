import React, { useState } from 'react'
import { DownOutlined, UpOutlined } from '@/components'
import type { TaskExecutionRecord } from '../../../types'
import { calculateTotalDuration, formatDuration, formatText } from '../utils'
import dayjs from 'dayjs'

interface ExecutionRecordsProps {
  executionRecords: TaskExecutionRecord[]
  isEdit: boolean
}

export const ExecutionRecords = (props: ExecutionRecordsProps) => {
  const { executionRecords, isEdit } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const { hours, minutes, seconds } = calculateTotalDuration(executionRecords)

  if (isEdit || executionRecords.length === 0) {
    return null
  }

  return (
    <div className='mt-1.5'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between text-[11px] text-gray-500 hover:text-gray-600'
      >
        <span>总耗时：{formatText({ hours, minutes, seconds })}</span>
        <div>
          <span className='mr-1'>共 {executionRecords.length} 次执行</span>
          {isExpanded ? <UpOutlined className='text-xs' /> : <DownOutlined className='text-xs' />}
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isExpanded ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
        `}
      >
        <div className='space-y-2'>
          {executionRecords.map((record, index) => (
            <div
              key={index}
              className='relative border-l border-gray-200'
            >
              <div className='flex flex-row pl-1 justify-between align-middle text-[11px]'>
                <div className='text-gray-400' style={{ width: '33.33%' }}>
                  {dayjs(record.start).format('MM-DD HH:mm')}
                </div>
                <div className='text-gray-400' style={{ width: '33.33%' }}>
                  {record.end ? dayjs(record.end).format('MM-DD HH:mm') : '-'}
                </div>
                <div className='text-gray-400' style={{ width: '33.33%', textAlign: 'right' }}>
                  {formatDuration(record.start, record.end)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
