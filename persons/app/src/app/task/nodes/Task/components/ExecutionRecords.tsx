import React, { useState } from 'react'

import { Button, DatePicker, Form, DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined } from '@/components'

import { dayjs } from '@/utils'
import { calculateTotalDuration, formatDuration, formatText } from '../utils'

import type { TaskExecutionRecord } from '../../../types'

interface ExecutionRecordsProps {
  executionRecords: TaskExecutionRecord[]
  isEdit: boolean
  onChange?: (value: { executionRecords: TaskExecutionRecord[] }) => void
}

export const ExecutionRecords = (props: ExecutionRecordsProps) => {
  const { executionRecords, isEdit, onChange } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const { hours, minutes, seconds } = calculateTotalDuration(executionRecords)

  if (isEdit) {
    return (
      <div className='mt-1.5'>
        <div className='text-[11px] text-gray-600 mb-2'>
          总耗时：{formatText({ hours, minutes, seconds })}
        </div>

        <Form
          initialValues={{
            executionRecords: executionRecords.map(item => ({
              start: dayjs(item.start),
              end: dayjs(item.end),
            })),
          }}
          onValuesChange={(_, values) => {
            onChange?.({
              executionRecords: values.executionRecords.map((item: any) => ({
                start: item.start?.valueOf(),
                end: item.end?.valueOf(),
              })),
            })
          }}
        >
          <Form.List name='executionRecords'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='mb-2 flex items-center'>
                    <Form.Item
                      {...restField}
                      noStyle
                      name={[name, 'start']}
                      className='mb-0 flex-1'
                      rules={[{ required: true, message: '请选择开始时间' }]}
                    >
                      <DatePicker
                        showTime
                        placeholder='开始时间'
                        className='w-full'
                        format='DD HH:mm'
                      />
                    </Form.Item>
                    <div className='mx-1'>至</div>
                    <Form.Item
                      {...restField}
                      noStyle
                      name={[name, 'end']}
                      className='mb-0 flex-1'
                    >
                      <DatePicker
                        showTime
                        placeholder='结束时间'
                        className='w-full'
                        format='DD HH:mm'
                      />
                    </Form.Item>
                    <Button
                      type='text'
                      className='ml-2'
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add({})}
                    block
                    icon={<PlusOutlined />}
                    className='text-[11px]'
                  >
                    添加执行记录
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    )
  }

  return (
    <div className='mt-1.5'>
      {!!executionRecords.length && (
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
      )}

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
