import React, { useEffect } from 'react'

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  message,
} from '@/components'

import { useBoolean } from '@/hooks'

import { useTaskStore } from '../../../store'
import { type TaskExecutionRecord, TaskStatus } from '../../../types'

interface ActionButtonsProps {
  status: TaskStatus
  executionRecords: TaskExecutionRecord[]
  onChange: (value: any) => void
}

export const ActionButtons = (props: ActionButtonsProps) => {
  const { status, executionRecords = [], onChange } = props

  const lastRecord = executionRecords[executionRecords.length - 1]

  const [isExec, { setTrue, setFalse }] = useBoolean(
    Boolean(
      executionRecords[executionRecords.length - 1]?.start &&
      !executionRecords[executionRecords.length - 1]?.end,
    ),
  )

  const { setExecuting, isExecuting } = useTaskStore()
  useEffect(() => {
    setExecuting(isExec)
  }, [isExec, setExecuting])

  if ([TaskStatus.NOT_DUE, TaskStatus.NOT_FATHER, TaskStatus.COMPLETED, TaskStatus.FAILED].includes(status)) {
    return null
  }

  const onExecute = () => {
    if (isExec) {
      setFalse()
      lastRecord!.end = Date.now()
      onChange({ executionRecords })

    } else {
      if (lastRecord && !lastRecord.end) {
        message.error('请先结束上次执行')
        return
      }
      if (isExecuting) {
        message.error('请先结束别的任务')
        return
      }
      setTrue()
      executionRecords.push({ start: Date.now() })
      onChange({ executionRecords })
    }
  }

  const onComplete = () => {
    onChange({ result: true })
  }

  const onFail = () => {
    onChange({ result: false })
  }

  return (
    <div className='flex items-center gap-1.5'>
      {isExec && (
        <div className='flex items-center'>
          <div className='animate-spin h-2.5 w-2.5 border border-blue-500 border-t-transparent rounded-full' />
          <span className='ml-1 text-[11px] text-blue-500 whitespace-nowrap'>执行中</span>
        </div>
      )}

      <button
        onClick={onExecute}
        className={`
          p-0.5 rounded transition-colors
          ${isExec
          ? 'text-blue-500 hover:text-blue-600'
          : 'text-gray-400 hover:text-gray-500'
        }
        `}
        title={isExec ? '停止执行' : '开始执行'}
      >
        {isExec ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      </button>

      {!!lastRecord?.end && (
        <>
          <button
            onClick={onComplete}
            className='p-0.5 rounded text-green-500 hover:text-green-600 transition-colors'
            title='标记完成'
          >
            <CheckCircleOutlined />
          </button>
          <button
            onClick={onFail}
            className='p-0.5 rounded text-red-500 hover:text-red-600 transition-colors'
            title='标记失败'
          >
            <CloseCircleOutlined />
          </button>
        </>
      )}
    </div>
  )
}
