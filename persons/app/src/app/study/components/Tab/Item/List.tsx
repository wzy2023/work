import { ProTable } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Remove } from './Remove'
import { Detail } from './Detail'

import { useStudyItemCRUD } from '@/api/generated/crud'

export const List = () => {
  const { listState } = useStudyItemCRUD({
    list: {
      query: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (_: any, record: any) => record.tags?.join(', ') || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div className='flex gap-2'>
          <Detail item={record} />
          <CreateUpdate item={record} onSuccess={listState.refetch} />
          <Remove id={record.id} onSuccess={listState.refetch} />
        </div>
      ),
    },
  ]

  return (
    <ProTable
      cardProps={{
        bodyStyle: { padding: 0 },
      }}
      dataSource={listState.data || []}
      columns={columns}
      loading={listState.isLoading}
      search={false}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: [number, number]) =>
          `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
      }}
      toolBarRender={() => [
        <CreateUpdate key='create' onSuccess={listState.refetch} />,
      ]}
    />
  )
}
