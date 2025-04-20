import React from 'react'
import { DynamicSelect, Columns } from '@/components'
import { taskLog } from '@/apis'
import { dayjs } from '@/utils'
import { transformOptions } from '../../utils'

export const getColumns = (allList?: taskLog.TaskLog[], curList?: taskLog.TaskLog[]): Columns<taskLog.TaskLog> => {
  return [
    {
      title: '日期',
      dataIndex: 'dateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
      validator: ['require'],
    },
    {
      title: '日期',
      dataIndex: 'dateTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a?.dateTime - b?.dateTime,
      defaultSortOrder: 'descend',
      onCell: (_, index) => {
        if (index === undefined) {
          return { rowSpan: 1 }
        }

        if (index == 0 || dayjs(curList?.[index]?.dateTime).format('YYYY-MM-DD') !== dayjs(curList?.[index - 1]?.dateTime).format('YYYY-MM-DD')) {
          return { rowSpan: curList?.filter(item => dayjs(item.dateTime).format('YYYY-MM-DD') === dayjs(curList?.[index]?.dateTime).format('YYYY-MM-DD')).length }

        } else {
          return { rowSpan: 0 }
        }
      },
    },
    {
      title: '任务',
      dataIndex: 'categorize',
      validator: ['require'],
      hideInSearch: true,
      render: (_: unknown, record: taskLog.TaskLog) => record.categorize?.join(' - '),
      renderFormItem: () => (
        <DynamicSelect
          options={transformOptions((allList || []).map(item => item.categorize))}
        />
      ),
    },
    {
      title: '时长',
      dataIndex: 'duration',
      valueType: 'digit',
      validator: ['require'],
      hideInSearch: true,
      fieldProps: {
        min: 0.5,
        max: 10,
        step: 0.5,
      },
      summary: (list) => {
        const total = list?.reduce((pre, item) => pre + item.duration, 0)
        return total !== 0 ? total : ''
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
    },
  ]
}
