'use client'

import React from 'react'
import { Background, ReactFlow } from '@xyflow/react'

import { nodeTypes } from './nodes'
import { useTaskStore } from './store'
import { filterElements, layoutedElements } from './utils'
import { useEvent, useFlowData, useFlowHandle, useFlowUpdate } from './hooks'

export default () => {
  const { isEditing } = useTaskStore()

  const { nodes, edges, prevStateRef, setNodes, setEdges, onEdgesChange, onNodesChange } = useFlowData()

  useFlowUpdate({ nodes, edges, prevStateRef })

  const { preview, ...eventProps } = useEvent({
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  })

  useFlowHandle({
    nodes,
    edges,
    handles: [
      filterElements,
      layoutedElements,
    ],
  })

  return (
    <ReactFlow
      nodes={preview?.nodes || nodes}
      edges={preview?.edges || edges}
      nodeTypes={nodeTypes}
      minZoom={1}
      maxZoom={1}
      fitView
      panOnDrag={!isEditing}
      nodesDraggable={!isEditing}
      selectNodesOnDrag={false}
      fitViewOptions={{ padding: 0.5 }}
      {...eventProps}
    >
      <Background />
    </ReactFlow>
  )
}
