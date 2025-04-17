import { create } from 'zustand'

interface FilterValues {
  enabled?: boolean
}

interface HabitManageStoreValue {
  filterValues: FilterValues
  setFilterValues: (filterValues: FilterValues) => void
}

export const useHabitManageStore = create<HabitManageStoreValue>(set => ({
  filterValues: {
    enabled: undefined,
  },
  setFilterValues: (filterValues: FilterValues) => {
    set(state => ({
      filterValues: {
        ...state.filterValues,
        ...filterValues,
      },
    }))
  },
}))
