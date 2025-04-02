import { type Node, useReactFlow } from '@xyflow/react'

export const useIntersecting = () => {
  const { getIntersectingNodes } = useReactFlow()

  const getIntersectingIds = (node: Node) => {
    return getIntersectingNodes(node).map(node => node.id)
  }

  return {
    getIntersectingNodes,
    getIntersectingIds,
  }
}
