import { useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'

export const useDeepEffect = (callback: () => void, dependencies: any[]) => {
  const ref = useRef<any[]>([])

  useEffect(() => {
    if (!isEqual(ref.current, dependencies)) {
      callback()
      ref.current = dependencies
    }
  }, [callback, dependencies])
}
