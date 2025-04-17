import { create } from 'zustand'
import { dayjs, type Dayjs } from '@/utils'

export interface FilterValue {
  frequency?: Habit.FrequencyType | null
  status?: Habit.ProgressStatus | null
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
