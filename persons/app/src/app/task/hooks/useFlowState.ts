import { useReactFlow } from '@xyflow/react'

export const useFlowState = () => {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow()
  const nodes = getNodes()
  const edges = getEdges()

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
  }
}
