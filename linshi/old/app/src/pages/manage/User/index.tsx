import React from 'react'
import { Crud, PageContainer } from '@/components'
import { user } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={user}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: '名称',
          dataIndex: 'name',
          validator: ['require', ['unique', '该 name 已存在']],
        },
        {
          title: '密码',
          dataIndex: 'password',
          ellipsis: true,
          validator: ['require'],
          hideInSearch: true,
        },
        {
          title: '备注',
          dataIndex: 'desc',
          valueType: 'textarea',
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
