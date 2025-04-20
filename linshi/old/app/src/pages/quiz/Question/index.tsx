import React from 'react'
import { Crud, PageContainer } from '@/components'
import { question } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={question}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: 'Content',
          dataIndex: 'content',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: 'Type',
          dataIndex: 'type',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: 'Answer',
          dataIndex: 'answer',
          ellipsis: true,
          width: 50,
        },
        {
          title: 'Options',
          dataIndex: 'options',
          ellipsis: true,
          render: (_, record) => JSON.stringify(record?.options, null, 2),
        },
        {
          title: 'Point',
          dataIndex: 'point',
          ellipsis: true,
          render: (_, record) => record?.point?.join('、'),
        },
        {
          title: 'Level',
          dataIndex: 'level',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          valueType: 'dateRange',
          hideInTable: true,
          hideInForm: true,
          search: {
            transform: (value) => ({
              createAt: {
                type: 'gtlt',
                value: value.map((item: any) => item.$d.getTime()),
              },
            }),
          },
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
        },
      ]}
    />
  </PageContainer>
)
