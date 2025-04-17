import { useHabitRecordStore } from '../store'

export const useFilterValues = () => {
  const { filterValues, setFilterValues } = useHabitRecordStore()

  return {
    filterValues,
    setFilterValues,
  }
}
