import { useReactFlow } from '@xyflow/react'

export const useFlowState = () => {
  const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow()

  const nodes = getNodes()
  const edges = getEdges()

  const isDragging = nodes.some(item => item.dragging)

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    isDragging,
    fitView,
  }
}
