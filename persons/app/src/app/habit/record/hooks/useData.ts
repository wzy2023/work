import { useEffect } from 'react'
import { type Dayjs } from '@/utils'
import { api } from '@/api/react'

export const useData = (selectedDate: Dayjs) => {
  const listState = api.custom.habitItem.list.useQuery({
    date: selectedDate.valueOf(),
  })

  // 日期改变时，预请求前后两天的数据
  const apiUtils = api.useUtils()
  useEffect(() => {
    apiUtils.custom.habitItem.list.prefetch({ date: selectedDate.subtract(1, 'day').valueOf() })
    apiUtils.custom.habitItem.list.prefetch({ date: selectedDate.add(1, 'day').valueOf() })
  }, [apiUtils, selectedDate])

  // 使预请求的数据无效
  const invalidate = () => {
    apiUtils.custom.habitItem.list.refetch()
  }

  return {
    data: listState.data,
    refetch: listState.refetch,
    isLoading: listState.isLoading,

    invalidate,
  }
}
