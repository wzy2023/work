import { ProTable, Space, Tag } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Remove } from './Remove'

import { contentTypeOptions, viewTypeOptions } from '@/enums'
import { getTypeColor, getTypeLabel } from '../../../utils'

import { useStudyOperateCRUD } from '@/api/generated/crud'

export const List = () => {
  const { listState } = useStudyOperateCRUD({
    list: {
      query: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '内容类型',
      dataIndex: 'contentType',
      key: 'contentType',
      width: 120,
      render: (_: any, record: any) => (
        <Tag color={getTypeColor(record.contentType, contentTypeOptions)}>
          {getTypeLabel(record.contentType, contentTypeOptions)}
        </Tag>
      ),
    },
    {
      title: '查看类型',
      dataIndex: 'viewType',
      key: 'viewType',
      width: 120,
      render: (_: any, record: any) => (
        <Tag color={getTypeColor(record.viewType, viewTypeOptions)}>
          {getTypeLabel(record.viewType, viewTypeOptions)}
        </Tag>
      ),
    },
    {
      title: '输入',
      dataIndex: 'input',
      key: 'input',
      width: 200,
    },
    {
      title: '输出',
      dataIndex: 'output',
      key: 'output',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: Study.Operate) => (
        <Space size='small'>
          <CreateUpdate data={record} onSuccess={listState.refetch} />
          <Remove id={record.id} onSuccess={listState.refetch} />
        </Space>
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
