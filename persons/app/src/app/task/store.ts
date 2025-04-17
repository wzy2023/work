import { create } from 'zustand'

interface HabitManageStoreValue {
  isEditing: boolean
  setEditing: (isEditing: boolean) => void
}

export const useTaskStore = create<HabitManageStoreValue>(set => ({
  isEditing: false,
  setEditing: (isEditing: boolean) => {
    set({ isEditing })
  },
}))
