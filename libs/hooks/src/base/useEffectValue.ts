import { useEffect, useState } from 'react'

export const useEffectValue = (defaultValue: any, fn: any, deps: any[] = []) => {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => setValue(fn()), deps)
  return [value, setValue]
}
