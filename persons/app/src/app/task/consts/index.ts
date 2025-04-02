import type { Edge, Node } from '@xyflow/react'
import type { NodeType } from '../types'
import { createNode } from '../utils'

export const initialNodes: Node[] = [
  createNode('group' as NodeType),
]

export const initialEdges: Edge[] = []

export const emptyPreview = {
  nodes: undefined,
  edges: undefined,
}
