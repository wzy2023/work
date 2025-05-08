import { type ProColumns, Tag } from '@/components'
import { FeedActions } from './FeedActions'
import { FeedStatusSwitch } from './FeedStatusSwitch'

import { frequencyOptions } from '../../consts'

export interface FeedColumnProps {
  onAction: (actionType: Rss.FeedActionType, id: string) => void
  onEnabledChange: (checked: boolean, id: string) => Promise<void>
  getItemCount: (feedId: string) => number
}

export const getColumns = ({ onAction, onEnabledChange, getItemCount }: FeedColumnProps): ProColumns[] => [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'RSS链接',
    dataIndex: 'url',
    render: (text) => (
      <a href={'http://localhost:1200' + text as unknown as string} target='_blank' rel='noopener noreferrer'>
        {text}
      </a>
    ),
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (
      <>
        {(tags as string[] || []).map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '频率',
    dataIndex: 'frequency',
    key: 'frequency',
    render: (frequency) => {
      const option = frequencyOptions.find(opt => opt.value === frequency)
      return option ? option.label : frequency
    },
  },
  {
    title: '文章数',
    key: 'itemCount',
    render: (_, record) => getItemCount(record.id),
  },
  {
    title: '启用',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (_, record) => (
      <FeedStatusSwitch record={record} onChange={onEnabledChange} />
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <FeedActions record={record} onAction={onAction} />
    ),
  },
]
