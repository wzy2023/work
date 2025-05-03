import { type ProColumns, Tag } from '@/components'
import { RssFetchTriggerType } from '@/api/types'

export const getColumns = (feeds?: any[]): ProColumns[] => [
  {
    title: 'RSS源',
    dataIndex: ['feed', 'name'],
    key: 'feedName',
    width: 300,
    render: (_, record: any) => {
      // 如果record中有feed信息且有name，直接使用
      if (record.feed?.name) {
        return <Tag>{record.feed.name}</Tag>
      }

      // 否则尝试从feeds列表中查找匹配的feed
      if (feeds && record.feedId) {
        const feed = feeds.find(f => f.id === record.feedId)
        if (feed) {
          return <Tag>{feed.name}</Tag>
        }
      }

      // 如果都没有找到，显示未知
      return <Tag>未知</Tag>
    },
  },
  {
    title: '执行时间',
    dataIndex: 'executedAt',
    key: 'executedAt',
    valueType: 'dateTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueEnum: {
      success: {
        text: '成功',
        status: 'Success',
      },
      error: {
        text: '失败',
        status: 'Error',
      },
    },
  },
  {
    title: '触发方式',
    dataIndex: 'triggerType',
    width: 100,
    render: (_, record) => (
      <Tag color={record.triggerType === RssFetchTriggerType.Manual ? 'blue' : 'green'}>
        {record.triggerType === RssFetchTriggerType.Manual ? '手动' : '定时'}
      </Tag>
    ),
  },
  {
    title: '新增内容',
    dataIndex: 'itemCount',
    key: 'itemCount',
  },
  {
    title: '错误信息',
    dataIndex: 'errorMessage',
    key: 'errorMessage',
    ellipsis: true,
  },
]
