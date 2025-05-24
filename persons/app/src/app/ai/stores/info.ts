import { create } from 'zustand'

interface FilterValues {
  enabled?: boolean
  title?: string
  tag?: string
}

interface InfoState {
  filterValues: FilterValues
  setFilterValues: (values: Partial<FilterValues>) => void
}

export const useInfoStore = create<InfoState>((set) => ({
  filterValues: {
    enabled: undefined,
    title: undefined,
    tag: undefined,
  },
  setFilterValues: (values) => {
    set((state) => ({
      filterValues: { ...state.filterValues, ...values },
    }))
  },
}))
