import { useHabitRecordStore } from '../store'

export const useSelectedDate = () => {
  const { selectedDate, setSelectedDate } = useHabitRecordStore()

  return {
    selectedDate,
    setSelectedDate,
  }
}
