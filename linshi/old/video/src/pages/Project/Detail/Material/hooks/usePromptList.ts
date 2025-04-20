import { useParams } from '@umijs/max'

import { prompt } from '@/apis'
import { useRequestPro } from '@/hooks'

import { MenuKey } from '../../config'
import { Params } from '../../../types'

export const usePromptList = () => {
  const { projectId } = useParams<Params>()

  const promptListState = useRequestPro(() => prompt.list({ where: { project: { id: projectId } } }), {
    cacheKey: 'prompt.list',
    staleTime: 5 * 1000,
  })

  const promptOptions = promptListState.data?.data?.filter(item => !item.showInMenu)?.map(item => ({
    label: item.name,
    value: item.id,
  }))

  const promptMenus = promptListState.data?.data?.filter(item => item.showInMenu)?.map((item, index) => ({
    label: item.name,
    value: item.content,
    key: MenuKey.addChildPrompt + '_' + index,
  }))

  const getDataById = (id: string) => {
    return promptListState.data?.data?.find(item => item.id === id)
  }

  return {
    promptListState,
    promptOptions,
    promptMenus,
    getDataById,
  }
}
