import { useMemo } from 'react'

import { _ } from '@/utils'

import { getNum } from '../../utils'
import { type FilterValue } from '../store'
import { HabitFrequencyTypeText, habitProgressStatusText } from '@/enums'

export interface Options {
  frequency: {
    label: string
    value: Habit.FrequencyType
  }[]
  status: {
    label: string
    value: Habit.ProgressStatus | null
  }[]
}

export const useOptions = (data?: Habit.RunTime.ItemRecord[], filterValues?: FilterValue) => {
  const options = useMemo(() => {
    return {
      frequency: Object.keys(_.groupBy(data, item => item.frequency?.type)).map(key => ({
        label: HabitFrequencyTypeText[key as Habit.FrequencyType] + ` (${getNum(data, key as Habit.FrequencyType)})`,
        value: key as Habit.FrequencyType,
      })),
      status: [
        { label: '全部', value: null },
        ...Object.keys(_.groupBy(data?.filter(item => item.frequency?.type === filterValues?.frequency), item => item.status?.record)).map(key => ({
          label: habitProgressStatusText[key as Habit.ProgressStatus],
          value: key as Habit.ProgressStatus,
        })),
      ],
    }
  }, [data, filterValues?.frequency])

  return {
    options,
  }
}
