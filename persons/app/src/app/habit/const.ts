import { HabitFrequencyType } from '@/api/types'

export const enableOptions = {
  enable: [
    { label: '全部', value: undefined },
    { label: '启用', value: true },
    { label: '禁用', value: false },
  ],
}

export const habitFrequencyTypeMap: Record<HabitFrequencyType, string> = {
  [HabitFrequencyType.DAILY]: '日',
  [HabitFrequencyType.WEEKLY]: '周',
  [HabitFrequencyType.MONTHLY]: '月',
}
