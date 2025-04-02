import type { NodeTypes } from '@xyflow/react'

import { NodeType } from '../types'

import { Group } from './Group'
import { TaskCard } from './Task'

export const nodeTypes: NodeTypes = {
  [NodeType.Group]: Group,
  [NodeType.TaskCard]: TaskCard,
}
