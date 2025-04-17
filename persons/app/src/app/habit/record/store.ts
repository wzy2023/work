import { create } from 'zustand'
import { dayjs, type Dayjs } from '@/utils'
import { type HabitFrequencyType, type HabitProgressStatus } from '@/api/types'

export interface FilterValue {
  frequency?: HabitFrequencyType | null
  status?: HabitProgressStatus | null
}

interface HabitRecordStoreValue {
  selectedDate: Dayjs
  setSelectedDate: (selectedDate: Dayjs) => void

  filterValues: FilterValue
  setFilterValues: (filterValues: FilterValue) => void
}

export const useHabitRecordStore = create<HabitRecordStoreValue>(set => ({
  selectedDate: dayjs().startOf('day'),
  setSelectedDate: (selectedDate: Dayjs) => {
    set({ selectedDate: selectedDate.startOf('day') })
  },

  filterValues: {
    frequency: null,
    status: null,
  },
  setFilterValues: (filterValues: FilterValue) => {
    set(state => ({
      filterValues: {
        ...state.filterValues,
        ...filterValues,
      },
    }))
  },
}))
