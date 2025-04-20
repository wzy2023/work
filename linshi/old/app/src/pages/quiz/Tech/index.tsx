import React from 'react'
import { Crud, PageContainer, Image } from '@/components'
import { tech } from '@/apis'
import { useRequestPro } from '@/hooks'

export default () => {
  const { data } = useRequestPro(tech.getEnumsMap)

  return (
    <PageContainer>
      <Crud
        apis={tech}
        columns={[
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
          },
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Icon',
            dataIndex: 'icon',
            hideInSearch: false,
            width: 200,
            render: (_, record) => <Image width={100} src={record?.icon} />,
          },
          {
            title: 'Category',
            dataIndex: 'category',
            valueType: 'radio',
            valueEnum: data?.category,
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
}
