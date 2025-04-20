import React from 'react'

import { Crud } from '@/components'

import { dayjs } from '@/utils'
import { lotteryType } from '@/apis'

export default () => {
  const initialValues = {
    range: [1, 6] as [number, number],
  }

  return (
    <Crud
      name='彩种'
      search={false}
      initialValues={initialValues}
      apis={lotteryType}
      columns={({ isCreate }) => ([
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: '彩种名称',
          dataIndex: 'name',
          validator: [
            'require',
            isCreate ? ['unique', '该 key 已存在'] : null,
          ],
        },
        {
          title: '彩种代码',
          dataIndex: 'code',
          validator: ['require'],
        },
        {
          title: '号码长度',
          dataIndex: 'size',
          validator: ['require'],
          valueType: 'digit',
        },
        {
          title: '取值范围',
          dataIndex: 'range',
          validator: ['require'],
          valueType: 'slider',
          fieldProps: {
            max: 20,
            range: true,
          },
          renderText: (_: number[]) => _.join(' - '),
        },
        {
          title: '开彩时间',
          dataIndex: 'timeRange',
          valueType: 'timeRange',
          validator: ['require'],
        },
        {
          title: '出彩间隔',
          dataIndex: 'gapMinute',
          validator: ['require'],
          valueType: 'digit',
        },
        {
          title: '号码是否排序',
          dataIndex: 'isSort',
          valueType: 'switch',
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
        },
      ])}
      convertValues={(values) => {
        values.timeRange = values.timeRange?.map((item: any) => {
          return dayjs(item.$d).valueOf()
        })
        return values
      }}
    />
  )
}
