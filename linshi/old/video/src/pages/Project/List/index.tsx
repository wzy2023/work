import React from 'react'
import { history } from '@umijs/max'
import { Crud, PageContainer, Button } from '@/components'
import { project } from '@/apis'

export default () => (
  <PageContainer>
    <Crud
      apis={project}
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
          render: (_, record) => [
            <Button
              type='link'
              onClick={() => {
                history.push(`/project/detail/${record.id}`)
              }}
            >
              详情
            </Button>,
          ],
        },
      ]}
    />
  </PageContainer>
)
