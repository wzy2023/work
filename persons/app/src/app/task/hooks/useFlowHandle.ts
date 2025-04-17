import { _ } from '@/utils'
import { useDebouncedEffect } from '@/hooks'
import { useFlowState } from '../hooks'
import { type Elements } from '../types'

type Option = Elements & {
  handles: ((elements: Elements) => Elements)[]
}

export const useFlowHandle = (opiton: Option) => {
  const { nodes, edges, handles } = opiton

  const { setNodes, setEdges } = useFlowState()

  useDebouncedEffect(() => {
    if (!nodes?.length || !edges?.length) {
      return
    }
    if (!nodes.every(item => item.measured)) {
      return
    }
    const elements = handles.reduce((acc, handle) => handle(acc), { nodes, edges })
    setNodes(_.cloneDeep(elements.nodes))
    setEdges(_.cloneDeep(elements.edges))
  }, [nodes, edges], { wait: 10 })
}
