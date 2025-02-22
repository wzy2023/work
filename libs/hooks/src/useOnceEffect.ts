import { useEffect, useState } from 'react'

export const useOnceEffect = (effect: () => boolean, deps: React.DependencyList) => {
  const [hasRun, setHasRun] = useState<boolean>(false)

  useEffect(() => {
    if (hasRun) {
      return
    }

    const res = effect()
    setHasRun(res)

  }, [hasRun, effect, ...deps])
}
