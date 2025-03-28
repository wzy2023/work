import { create } from 'zustand'

interface FilterValues {
  enable?: boolean
}

interface HabitManageStoreValue {
  filterValues: FilterValues
  setFilterValues: (filterValues: FilterValues) => void
}

export const useHabitManageStore = create<HabitManageStoreValue>(set => ({
  filterValues: {
    enable: undefined,
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
