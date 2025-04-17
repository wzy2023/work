import { useEventKey } from './useEventKey'
import { useEventDrag } from './useEventDrag'
import { useEventChange } from './useEventChange'
import type { Elements, ElementsChanges, ElementsFns } from '../types'

type Option = Elements & ElementsFns & ElementsChanges

export const useEvent = (option: Option) => {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange } = option

  const { onKeyDown } = useEventKey({
    nodes,
    edges,
    setNodes,
    setEdges,
  })

  const { preview, isPreview, onNodeDrag, onNodeDragStop } = useEventDrag({
    nodes,
    edges,
    setNodes,
    setEdges,
  })

  const eventProps = useEventChange({
    isPreview,
    onNodesChange,
    onEdgesChange,
  })

  return {
    preview,
    onKeyDown,
    onNodeDrag,
    onNodeDragStop,
    ...eventProps,
  }
}
