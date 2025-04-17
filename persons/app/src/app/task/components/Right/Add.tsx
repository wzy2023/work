import { type Node, useReactFlow } from '@xyflow/react'
import { PlusCircleOutlined } from '@/components'

import { createNodeEdge } from '../../utils'
import { type NodeRecord, type NodeType } from '../../types'

interface AddChildrenProps {
  parentNode: NodeRecord
  type: NodeType
  selected: boolean
}

export const AddChildren = (props: AddChildrenProps) => {
  const { parentNode, type, selected } = props

  const { addNodes, addEdges } = useReactFlow()

  const onClick = () => {
    const { node, edge } = createNodeEdge(parentNode as unknown as Node, type)
    addNodes(node)
    addEdges(edge)
  }

  return (
    <div onClick={onClick}>
      <PlusCircleOutlined
        style={{
          color: `rgba(24, 144, 255, ${selected ? 1 : 0.5})`,
          fontSize: 14,
          cursor: 'copy',
          backgroundColor: '#fff',
        }}
      />
    </div>
  )
}
