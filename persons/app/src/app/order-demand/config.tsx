import type { ProColumns } from '@/components'

export const columns: ProColumns<Order.Demand>[] = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: '来源平台',
    dataIndex: 'source',
    width: 120,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 180,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 200,
    ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 120,
  },
  {
    title: '详情链接',
    dataIndex: 'url',
    width: 120,
    render: (text) => text ? (
      <a href={text as string} target='_blank' rel='noopener noreferrer'>
        查看详情
      </a>
    ) : '-',
  },
  {
    title: '个人链接',
    dataIndex: 'person',
    width: 120,
    render: (text) => text ? (
      <a href={text as string} target='_blank' rel='noopener noreferrer'>
        查看个人
      </a>
    ) : '-',
  },
  {
    title: '申请人数',
    dataIndex: 'applyNum',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    sorter: true,
  },
  {
    title: '确认状态',
    dataIndex: 'confirmed',
    width: 100,
    render: (text) => text ? '已确认' : '未确认',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: true,
  },
]
