import { useEffect, useState } from 'react'
import { useUrlState } from '@/hooks'

export const useDefault = (asalysisList: any) => {
  // 当前分析的id
  const [currentId, setCurrentId] = useState<string>()

  // 同步到地址栏
  // const [state, setState] = useUrlState({ currentId: '' })

  // useEffect(() => {
  //   if (!currentId) {
  //     return
  //   }
  //   setState({ currentId })
  // }, [currentId])
  //
  useEffect(() => {
    if (!asalysisList.length || !!currentId) {
      return
    }

    const current = asalysisList.find((i: any) => i.id === currentId) || asalysisList[0]
    setCurrentId(current.id)

  }, [asalysisList])

  return {
    currentId,
    setCurrentId,
  }
}
