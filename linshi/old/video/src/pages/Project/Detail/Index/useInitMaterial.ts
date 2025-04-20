import { useEffect } from 'react'
import { history, useMatch, useParams, useModel } from '@umijs/max'
import { Params } from '../../types'

export const useInitMaterial = () => {
  const { projectId } = useParams<Params>()
  const { materialListState } = useModel('Project.Detail.Material.model')

  const match = useMatch(`/project/detail/${projectId}/:tab`)
  useEffect(() => {
    if (!match) {
      history.push(`/project/detail/${projectId}/prompt`)
    }
  }, [match])

  useEffect(() => {
    materialListState.run(projectId)
  }, [projectId])

  return {
    projectId,
    tab: match?.params?.tab,
  }
}
