import type { Edge, Node } from '@xyflow/react'
import { NodeType } from '../types'
import { createNode } from '../utils'

export const initialNodes: Node[] = [
  createNode(NodeType.Group),
]

export const initialEdges: Edge[] = []
