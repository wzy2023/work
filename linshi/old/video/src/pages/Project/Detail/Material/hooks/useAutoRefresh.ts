import { useEffect } from 'react'
import { useModel } from '@umijs/max'

import { material } from '@/apis'
import { useRequestPro } from '@/hooks'
import { MaterialStatus } from '../../../types'

function compareUpdatedAt(data1: any, data2: any) {
  const data1Updated = data1?.updatedAt ? new Date(data1.updatedAt) : null
  const data2Updated = data2?.updatedAt ? new Date(data2.updatedAt) : null

  // 检查是否存在更新时间，并进行比较
  if (data1Updated && data2Updated) {
    return data1Updated > data2Updated ? data1 : data2
  } else if (data1Updated) {
    return data1
  } else if (data2Updated) {
    return data2
  } else {
    throw new Error('Both objects lack an "updatedAt" property.')
  }
}

export const useAutoRefresh = (data: material.Material) => {
  const { materialListState } = useModel('Project.Detail.Material.model')

  const materialInfoState = useRequestPro(material.info, {
    manual: true,
  })

  useEffect(() => {
    let timer = null
    if (data.status === MaterialStatus.Doing) {
      timer = autoRefreshInfo()
    }
    return () => clearTimeout(timer)
  }, [data])

  const autoRefreshInfo = (): any => {
    return setTimeout(async () => {
      const res = await materialInfoState.runAsync(data.id)
      if (res.data.status === MaterialStatus.Doing) {
        return autoRefreshInfo()
      } else {
        materialListState.refresh()
      }
    }, 5000)
  }

  return {
    info: compareUpdatedAt(materialInfoState?.data, data),
  }
}
