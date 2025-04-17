import { type DependencyList, useState } from 'react'
import { useDebounceFn, useDeepCompareEffect } from 'ahooks'

export const useDebouncedEffect = <T>(
  effect: () => (T | Promise<T>),
  deps: DependencyList,
  options: any = { wait: 300 },
): T => {
  const { run, cancel } = useDebounceFn(effect, options)

  const [value, setValue] = useState<any>()

  useDeepCompareEffect(() => {
    setValue(run())

    return () => {
      cancel()
    }
  }, deps)

  return value
}
