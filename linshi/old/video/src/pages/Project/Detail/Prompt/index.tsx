import React from 'react'
import { useParams } from '@umijs/max'

import { Crud } from '@/components'
import { ColumnsFormItem } from './FormItem-Columns'

import { prompt } from '@/apis'
import { Params } from '../../types'

export default () => {
  const { projectId } = useParams<Params>()

  return (
    <Crud
      apis={prompt}
      search={false}
      apiParams={{
        list: {
          project: { id: projectId },
        },
        create: {
          project: projectId,
        },
      }}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
          fixed: 'left',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          ellipsis: true,
          hideInSearch: false,
          fixed: 'left',
        },
        {
          title: '显示在菜单',
          dataIndex: 'showInMenu',
          valueType: 'switch',
        },
        {
          title: 'Content',
          dataIndex: 'content',
          valueType: 'textarea',
          width: 300,
          fieldProps: {
            style: {
              width: '100%',
            },
            autoSize: {
              minRows: 10,
              maxRows: 20,
            },
          },
          render: (content: any) => {
            return <pre>{content}</pre>
          },
        },
        {
          valueType: 'dependency',
          name: ['showInMenu'],
          hideInSearch: true,
          hideInTable: true,
          columns: ({ showInMenu }: any) => {
            return showInMenu ? [] :
              [{
                title: '设置选项',
                dataIndex: 'columns',
                hideInSearch: true,
                renderFormItem: () => <ColumnsFormItem />,
              }]
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
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
          fixed: 'right',
        },
      ]}
    />
  )
}
