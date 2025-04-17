import { useMemo } from 'react'
import { _ } from '@/utils'
import { type FilterValue } from '../store'

export const useFilterData = (data?: Habit.RunTime.ItemRecord[], filterValues?: FilterValue) => {
  const showData = useMemo(() => {
    const filterList = data?.filter(item => {
      if (filterValues?.frequency && item.frequency?.type !== filterValues.frequency) {
        return false
      }
      if (filterValues?.status && item.status.record !== filterValues.status) {
        return false
      }
      return true
    })

    return Object.entries(_.groupBy(filterList, item => item.groupId)).map(([, value]) => ({
      group: value[0]!.group,
      list: value,
    })).sort((a, b) => (a.group?.sort || 0) - (b.group?.sort || 0))
  }, [data, filterValues])

  return {
    showData,
  }
}
