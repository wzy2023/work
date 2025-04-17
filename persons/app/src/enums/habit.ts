import { HabitFrequencyType, HabitProgressStatus } from '@/api/types'

export const habitProgressStatusText = {
  [HabitProgressStatus.Disabled]: '已禁用',
  [HabitProgressStatus.Enabled]: '已启用',
  [HabitProgressStatus.Pending]: '待开始',
  [HabitProgressStatus.Doing]: '进行中',
  [HabitProgressStatus.Done]: '已完成',
  [HabitProgressStatus.Failed]: '已失败',
}

export const HabitFrequencyTypeText = {
  [HabitFrequencyType.DAILY]: '每日',
  [HabitFrequencyType.WEEKLY]: '每周',
  [HabitFrequencyType.MONTHLY]: '每月',
}

export const habitFrequencyTypeMap = {
  [HabitFrequencyType.DAILY]: '日',
  [HabitFrequencyType.WEEKLY]: '周',
  [HabitFrequencyType.MONTHLY]: '月',
}

export const habitStatusColors = {
  [HabitProgressStatus.Enabled]: { bg: 'bg-blue-500 hover:bg-blue-600', ring: '' },
  [HabitProgressStatus.Disabled]: { bg: 'bg-gray-400 hover:bg-gray-500', ring: '' },
  [HabitProgressStatus.Pending]: { bg: 'bg-gray-300 hover:bg-gray-400', ring: '' },
  [HabitProgressStatus.Done]: { bg: 'bg-green-500 hover:bg-green-600', ring: '' },
  [HabitProgressStatus.Doing]: { bg: 'bg-yellow-500 hover:bg-yellow-600', ring: 'text-yellow-300' },
  [HabitProgressStatus.Failed]: { bg: 'text-red-300 hover:bg-red-600', ring: 'bg-red-500' },
}
