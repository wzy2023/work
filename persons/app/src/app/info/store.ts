import { create } from 'zustand'

interface FilterValues {
  enabled?: boolean
  title?: string
}

interface InfoState {
  filterValues: FilterValues
  setFilterValues: (values: Partial<FilterValues>) => void
}

export const useInfoStore = create<InfoState>((set) => ({
  filterValues: {
    enabled: undefined,
    title: '',
  },
  setFilterValues: (values) => {
    set((state) => ({
      filterValues: { ...state.filterValues, ...values },
    }))
  },
}))
