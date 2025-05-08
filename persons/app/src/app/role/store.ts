import { create } from 'zustand'

interface FilterValues {
  enabled?: boolean
  title?: string
}

interface RoleState {
  filterValues: FilterValues
  setFilterValues: (values: Partial<FilterValues>) => void
}

export const useRoleStore = create<RoleState>((set) => ({
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
