import type { Habit, HabitFrequencyType } from '@/api/types'
import { dayjs } from '@/utils'

export const getNewExecItem = (habit: Habit.ItemRecord) => {
  return {
    count: habit.count?.single || 1,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
}

export const getNum = (data?: Habit.ItemRecord[], type?: HabitFrequencyType) => {
  return data?.filter(item => item.frequency?.type === type).length
}
