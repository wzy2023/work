import { dayjs } from '@/utils'

export const getNewExecItem = (habit: Habit.RunTime.ItemRecord) => {
  return {
    count: habit.count?.single || 1,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
}

export const getNum = (data?: Habit.RunTime.ItemRecord[], type?: Habit.FrequencyType) => {
  return data?.filter(item => item.frequency?.type === type).length
}
