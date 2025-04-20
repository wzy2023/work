import React from 'react'
import { Crud, Image, PageContainer } from '@/components'
import { profession } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={profession}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          ellipsis: true,
        },
        {
          // title: 'Desc',
          // dataIndex: 'desc',
          // ellipsis: true,
        },
        {
          title: 'Icon',
          dataIndex: 'icon',
          hideInSearch: false,
          width: 200,
          render: (_, record) => <Image width={100} src={record?.icon} />,
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
