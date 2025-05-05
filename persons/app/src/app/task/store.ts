import { create } from 'zustand'

interface HabitManageStoreValue {
  isEditing: boolean
  setEditing: (isEditing: boolean) => void
  isExecuting: boolean
  setExecuting: (isExecuting: boolean) => void
}

export const useTaskStore = create<HabitManageStoreValue>(set => ({
  isEditing: false,
  setEditing: (isEditing: boolean) => {
    set({ isEditing })
  },
  isExecuting: false,
  setExecuting: (isExecuting: boolean) => {
    set({ isExecuting })
  },
}))
