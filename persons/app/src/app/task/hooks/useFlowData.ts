import { useEffect } from 'react'

import { type Edge, type Node, useEdgesState, useNodesState } from '@xyflow/react'

import { useFlowUpdate } from './useFlowUpdate'
import { useFlowLayout } from './useFlowLayout'

import { api } from '@/api/react'
import { initialEdges, initialNodes } from '../consts'

export const useFlowData = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  useFlowLayout(nodes, edges)

  const { prevStateRef } = useFlowUpdate(nodes, edges)

  const nodeListState = api.taskNode.findMany.useQuery()
  useEffect(() => {
    if (nodeListState.isLoading || nodes.length) {
      return
    }
    if (!nodeListState?.data?.length) {
      setNodes(initialNodes)
      return
    }
    const nodes_ = nodeListState?.data.map(i => ({ ...i, position: { x: 0, y: 0 } })) as unknown as Node[]
    prevStateRef.current.nodes = nodes_
    setNodes(nodes_)
  }, [nodeListState.isLoading])

  const edgeListState = api.taskEdge.findMany.useQuery()
  useEffect(() => {
    if (edgeListState.isLoading || edges.length) {
      return
    }
    if (!edgeListState?.data?.length) {
      setEdges(initialEdges)
      return
    }
    const edges_ = edgeListState.data as unknown as Edge[]
    prevStateRef.current.edges = edges_
    setEdges(edges_)
  }, [edgeListState.isLoading])

  return {
    nodes,
    setNodes,
    onNodesChange,

    edges,
    setEdges,
    onEdgesChange,
  }
}
