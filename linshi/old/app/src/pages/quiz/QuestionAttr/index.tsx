import React from 'react'
import { Crud, PageContainer } from '@/components'
import { questionAttr } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={questionAttr}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: 'Tech',
          dataIndex: 'tech',
          render: (_, record) => record.tech?.name,
        },
        {
          title: 'Profession',
          dataIndex: 'profession',
          render: (_, record) => record.profession?.name,
        },
        {
          title: 'questions',
          dataIndex: 'questions',
          render: (_, record) => record.questions?.length,
        },
        {
          title: 'Source',
          dataIndex: 'source',
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
