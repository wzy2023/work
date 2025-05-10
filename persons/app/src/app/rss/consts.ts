import { RssFrequency } from '@/api/types/rss'

// RSS频率选项
export const frequencyOptions = [
  { label: '每5分钟', value: RssFrequency.Minutes5 },
  { label: '每10分钟', value: RssFrequency.Minutes10 },
  { label: '每20分钟', value: RssFrequency.Minutes20 },
  { label: '每30分钟', value: RssFrequency.Minutes30 },
  { label: '每小时', value: RssFrequency.Hourly },
  { label: '每天', value: RssFrequency.Daily },
  { label: '每周', value: RssFrequency.Weekly },
]

// 已读/未读筛选选项
export const readStatusOptions = [
  { label: '全部', value: undefined },
  { label: '已读', value: true },
  { label: '未读', value: false },
]

// 收藏/未收藏筛选选项
export const starredStatusOptions = [
  { label: '全部', value: undefined },
  { label: '已收藏', value: true },
  { label: '未收藏', value: false },
]

// 抓取状态筛选选项
export const fetchStatusOptions = [
  { label: '全部', value: '' },
  { label: '成功', value: 'success' },
  { label: '失败', value: 'error' },
]
