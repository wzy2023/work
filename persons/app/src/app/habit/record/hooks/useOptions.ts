import { useMemo } from 'react'

import { _ } from '@/utils'

import {
  type Habit,
  type HabitFrequencyType,
  HabitFrequencyTypeText,
  type HabitProgressStatus,
  habitProgressStatusText,
} from '@/api/types'

import { getNum } from '../../utils'
import { type FilterValue } from '../store'

export interface Options {
  frequency: {
    label: string
    value: HabitFrequencyType
  }[]
  status: {
    label: string
    value: HabitProgressStatus | null
  }[]
}

export const useOptions = (data?: Habit.ItemRecord[], filterValues?: FilterValue) => {
  const options = useMemo(() => {
    return {
      frequency: Object.keys(_.groupBy(data, item => item.frequency?.type)).map(key => ({
        label: HabitFrequencyTypeText[key as HabitFrequencyType] + ` (${getNum(data, key as HabitFrequencyType)})`,
        value: key as HabitFrequencyType,
      })),
      status: [
        { label: '全部', value: null },
        ...Object.keys(_.groupBy(data?.filter(item => item.frequency.type === filterValues?.frequency), item => item.status?.record)).map(key => ({
          label: habitProgressStatusText[key as HabitProgressStatus],
          value: key as HabitProgressStatus,
        })),
      ],
    }
  }, [data, filterValues?.frequency])

  return {
    options,
  }
}
