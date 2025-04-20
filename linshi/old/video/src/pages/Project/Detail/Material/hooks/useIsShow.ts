import { useMemo } from 'react'
import { useModel } from '@umijs/max'
import { filterOptions } from '../../../types'

const flatChildrens = (data: any[]): any => {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item: any) => {
    return [
      data,
      item.children,
      flatChildrens(item.children),
    ]
  })
}

export const useIsShow = (data: any) => {
  const { filter } = useModel('Project.Detail.Material.model')

  const c1 = filterOptions.find(i => i.value === data.type)?.num || 0
  const c2 = filterOptions.find(i => i.value === filter)?.num || 0

  return useMemo(() => {
    return c1 < c2 && !flatChildrens(data.children).flat(99).find((i: any) => i.type === filter)
  }, [data, filter, c1, c2])
}
