import React from 'react'
import { Crud, PageContainer } from '@/components'
import { quizUser } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={quizUser}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: 'OpenID',
          dataIndex: 'openID',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: 'UnionID',
          dataIndex: 'unionID',
          ellipsis: true,
          validator: [],
          hideInSearch: false,
        },
        {
          title: '最后登录时间',
          dataIndex: 'lastLoginTime',
          hideInSearch: true,
        },
        {
          title: '登录次数',
          dataIndex: 'loginCount',
          hideInSearch: true,
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
