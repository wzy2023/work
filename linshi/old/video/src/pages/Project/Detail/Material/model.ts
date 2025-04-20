import { useState } from 'react'
import { ai } from '@/utils'
import { OperatorType } from '@/types'
import { useRequestPro } from '@/hooks'
import { material, work } from '@/apis'
import { toggleVisible } from '@/apis/routes/material'

const recursiveFilterArr = (data: any[]): any[] => {
  return data
  .filter(item => !item.isDeleted)
  .filter(item => !item.isHidden)
  .map(item => {
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: recursiveFilterArr(item.children),
      }
    }
    return item
  })
}

export default () => {
  const [filter, setFilter] = useState('group')

  const aiChatState = useRequestPro(ai.ai302.chat, {
    manual: true,
    alertErrorMessage: false,
  })

  const workCreateState = useRequestPro(work.add, {
    manual: true,
  })

  const workUpdateState = useRequestPro(work.update, {
    manual: true,
  })

  const workSubmitState = useRequestPro(work.submit, {
    manual: true,
  })

  const materialListState = useRequestPro((projectId: string) => material.list({
    where: {
      project: { id: projectId },
      parent: { _type: OperatorType.IsNull },
    },
  }), {
    manual: true,
    onSuccess: (res) => {
      res.data.data = recursiveFilterArr(res.data.data)
      materialListState.mutate(res)
    },
  })

  const materialVisibleState = useRequestPro(material.toggleVisible, {
    manual: true,
  })

  const materialUpdateState = useRequestPro(material.update, {
    manual: true,
    debounceWait: undefined,
    throttleWait: undefined,
  })

  const materialRemoveState = useRequestPro(material.remove, {
    manual: true,
  })

  const addMaterialState = useRequestPro(material.addMaterial, {
    manual: true,
  })

  const addChildMaterialState = useRequestPro(material.addChildMaterial, {
    manual: true,
  })

  const addChildTextPromptState = useRequestPro(material.addChildTextPrompt, {
    manual: true,
  })

  return {
    aiChatState,

    materialListState,

    materialRemoveState,

    addMaterialState,
    addChildMaterialState,
    addChildTextPromptState,

    workCreateState,
    workUpdateState,
    workSubmitState,

    materialUpdateState,
    materialVisibleState,

    filter,
    setFilter,
  }
}
