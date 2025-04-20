import React from 'react'
import { Button, Crud } from '@/components'
import { needJob } from '@/apis'

export default () => {
  return (
    <Crud
      size='small'
      search={false}
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
        { title: '报名人数', dataIndex: 'applyNum', width: 50 },
      ]}
      apiParams={{
        list: {
          type: 'job',
        },
      }}
      apis={{
        list: needJob.list,
      }}
    />
  )
}
