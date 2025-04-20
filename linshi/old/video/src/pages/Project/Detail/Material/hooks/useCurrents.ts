import { useEffect, useMemo } from 'react'
import { useModel, useParams } from '@umijs/max'

import { material } from '@/apis'
import { useUrlState, useSetting } from '@/hooks'

import { Params } from '../../../types'

const sortArr = (arr: material.Material[]) => {
  if (arr.some(item => item.order !== null)) {
    return arr.sort((a: any, b: any) => a?.order - b?.order)
  }

  // 分组：有children的项
  const withChildren = arr.filter(item => item.children?.length)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // 分组：无children的项
  const withoutChildren = arr.filter(item => !item.children?.length)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // 合并结果：先有children的，再无children的
  return [...withChildren, ...withoutChildren]
}

export const useCurrents = (index?: number) => {
  const { projectId } = useParams<Params>()

  const { materialListState } = useModel('Project.Detail.Material.model')

  const [setting, setSetting] = useSetting(`material.${projectId}.currents`, [])

  const [urlState, setUrlState] = useUrlState(
    { currents: [] },
    {
      parseOptions: {
        arrayFormat: 'bracket',
      },
      stringifyOptions: {
        arrayFormat: 'bracket',
      },
    },
  )

  const currentData = useMemo(() => {
    if (index === undefined) {
      return []
    }

    let data = materialListState.data?.data

    if (index === 0) {
      return sortArr(data || [])
    }

    for (let i = 0; i < index; i++) {
      if (!data || !Array.isArray(data)) {
        return []
      }
      const childData = data.find(item => item.id === urlState.currents[i])

      if (!childData || !childData.children) {
        return []
      }
      data = childData.children
    }

    return sortArr(data || [])
  }, [materialListState.data?.data, index, urlState.currents])

  useEffect(() => {
    if (!urlState.currents.length) {
      setUrlState({ currents: setting || [] })
    }
  }, [])

  useEffect(() => {
    if (urlState.currents?.length) {
      setSetting(urlState.currents)
    }
  }, [urlState.currents])

  const changeCurrent = (index: number, item: material.Material) => {
    if (urlState.currents[index] === item.id) {
      return
    }

    urlState.currents[index] = item.id
    urlState.currents = urlState.currents.slice(0, index + 1)
    setUrlState({ currents: [...urlState.currents] })

    setTimeout(() => {
      // 如果下级只有一个 children，则自动选上
      if (item.children?.length === 1 && urlState.currents[index] !== item.children?.[0].id) {
        changeCurrent(index + 1, item.children?.[0])
        return
      }

      // 如果下下级只有一个 children，则自动选上
      const findItems = (item.children || []).filter(i => i?.children?.length)
      if (findItems.length === 1 && urlState.currents[index] !== findItems?.[0].id) {
        changeCurrent(index + 1, findItems?.[0])
      }
    }, 0)
  }

  return {
    currents: urlState.currents,
    changeCurrent,
    currentData,
  }
}
