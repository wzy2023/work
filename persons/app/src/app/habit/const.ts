import { dayjs } from '@wzyjs/utils'
import { type Habit } from '@/api/types'

export const enableOptions = {
  enable: [
    { label: '全部', value: undefined },
    { label: '启用', value: true },
    { label: '禁用', value: false },
  ],
}

export const getNewExecItem = (habit: Habit.ItemRecord) => {
  return {
    count: habit.count?.single || 1,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
}
