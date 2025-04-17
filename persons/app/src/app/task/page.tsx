'use client'

import React, { type KeyboardEvent } from 'react'
import { Background, ReactFlow } from '@xyflow/react'

import { nodeTypes } from './nodes'
import { type NodeType } from './types'
import { createNodeEdge } from './utils'
import { useChange, useDrag, useFlowData } from './hooks'

export default () => {
  const { nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange } = useFlowData()

  const { preview, isPreview, onNodeDrag, onNodeDragStop } = useDrag({
    nodes,
    edges,
    setEdges,
  })

  const { onEdgesChange_, onNodesChange_ } = useChange({
    isPreview,
    onNodesChange,
    onEdgesChange,
  })

  const onKeyDown = (ev: KeyboardEvent<HTMLElement>) => {
    const nodeId = (ev.target as any).dataset.id
    const node = nodes.find(item => item.id === nodeId)

    const fatherId = edges.find(item => item.target === nodeId)?.source
    const father = nodes.find(item => item.id === fatherId)

    switch (ev.key) {
      case 'Enter':
        if (!father || !node?.type) {
          return
        }

        console.log(666, 38, 'createNodeEdge', createNodeEdge)
        const { node: n, edge: e } = createNodeEdge(father, node.type as NodeType)

        setNodes(nodes => {
          nodes.push(n)
          return [...nodes]
        })

        setEdges(edges => {
          edges.push(e)
          return [...edges]
        })
        break
    }
  }

  return (
    <ReactFlow
      nodes={preview.nodes || nodes}
      edges={preview.edges || edges}
      nodeTypes={nodeTypes}
      minZoom={0.5}
      maxZoom={1}
      fitView
      selectNodesOnDrag={false}
      fitViewOptions={{ padding: 0.5 }}
      onNodesChange={onNodesChange_}
      onEdgesChange={onEdgesChange_}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onKeyDown={onKeyDown}
    >
      <Background />
    </ReactFlow>
  )
}
