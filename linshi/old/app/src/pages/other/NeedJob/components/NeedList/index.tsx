import React from 'react'
import { Button, Crud } from '@/components'
import { needJob } from '@/apis'

export default () => {
  return (
    <Crud
      size='small'
      search={false}
      apis={needJob}
      columns={[
        {
          title: '来源',
          dataIndex: 'source',
          width: 100,
        },
        {
          title: '名称',
          width: 300,
          render: (record: any) => <Button target='_blank' type='link' href={record.url}>{record.title}</Button>
        },
        { title: '描述', dataIndex: 'desc', width: 300, ellipsis: true },
        { title: '预算', dataIndex: 'price', width: 100 },
        { title: '发布时间', dataIndex: 'createTime', width: 100 },
        { title: '截止时间', dataIndex: 'deadTime' },
        { title: '报名人数', dataIndex: 'applyNum', width: 50 },
        {
          title: '发布人',
          dataIndex: 'person',
          render: (_: any) => {
            if (!_ || _ === '-') {
              return null
            }
            return <Button target='_blank' type='link' href={_}>发布人</Button>
          }
        },
      ]}
      apiParams={{
        list: {
          type: 'need',
        },
      }}
    />
  )
}
