import { useEffect } from 'react'
import { type Dayjs } from '@/utils'
import { api } from '@/api/react'
import { HabitFrequencyType } from '@/api/types'

export const useData = (selectedDate: Dayjs) => {
  const listState = api.custom.habitItem.list.useQuery({
    date: selectedDate.valueOf(),
  })

  const prevDate = selectedDate.subtract(1, 'day').valueOf()
  const nextDate = selectedDate.add(1, 'day').valueOf()

  // 日期改变时，预请求前后两天的数据
  const apiUtils = api.useUtils()
  useEffect(() => {
    apiUtils.custom.habitItem.list.prefetch({ date: prevDate })
    apiUtils.custom.habitItem.list.prefetch({ date: nextDate })
  }, [apiUtils, nextDate, prevDate])

  // 使预请求的数据无效
  const invalidate = (habit: Habit.Item) => {
    apiUtils.custom.habitItem.list.refetch({ date: selectedDate.valueOf() })

    if (habit.frequency?.type !== HabitFrequencyType.DAILY) {
      apiUtils.custom.habitItem.list.refetch({ date: prevDate })
      apiUtils.custom.habitItem.list.refetch({ date: nextDate })
    }
  }

  return {
    data: listState.data,
    refetch: listState.refetch,
    isLoading: listState.isLoading,

    invalidate,
  }
}
