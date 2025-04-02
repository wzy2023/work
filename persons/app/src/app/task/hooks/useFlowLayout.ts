import { type Node, type Edge, useReactFlow } from '@xyflow/react'
import { useDebounceFn, useDeepCompareEffect } from '@/hooks'
import { getLayoutedElements } from '../utils'

export const useFlowLayout = (nodes: Node[], edges: Edge[]) => {
  const { setNodes } = useReactFlow()

  const isDragging = nodes.some(item => item.dragging)

  const update = useDebounceFn(() => {
    const newNodes = getLayoutedElements(nodes, edges)
    setNodes(newNodes)
    // console.log(666, '重新布局', nds.length)
  }, { wait: 10 })

  useDeepCompareEffect(() => {
    if (isDragging || !nodes.length) {
      return
    }
    update.run()
  }, [nodes, edges, isDragging])
}
