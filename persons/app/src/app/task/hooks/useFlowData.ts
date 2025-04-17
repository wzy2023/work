import { useEffect, useRef } from 'react'

import { type Edge, type Node, useEdgesState, useNodesState } from '@xyflow/react'

import { useFlowState } from './useFlowState'

import { _ } from '@/utils'
import type { Elements } from '../types'
import { initialEdges, initialNodes } from '../consts'

import { api } from '@/api/react'

export const useFlowData = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const { fitView } = useFlowState()

  const prevStateRef = useRef<Elements | null>(null)

  const nodeListState = api.taskNode.findMany.useQuery()

  const edgeListState = api.taskEdge.findMany.useQuery()

  useEffect(() => {
    if (nodeListState.isLoading || nodes?.length || edgeListState.isLoading || edges?.length) {
      return
    }

    const nds = nodeListState?.data?.map(i => ({ ...i, position: { x: 0, y: 0 } })) as unknown as Node[] || []
    const eds = edgeListState.data as unknown as Edge[] || []

    const initNodes = !nodeListState?.data?.length ? initialNodes : nds
    const initEdges = !edgeListState?.data?.length ? initialEdges : eds

    prevStateRef.current = {
      nodes: _.cloneDeep(nds),
      edges: _.cloneDeep(eds),
    }

    setNodes(initNodes)
    setEdges(initEdges)

    setTimeout(() => {
      fitView()
    }, 200)
  }, [edgeListState, edges?.length, fitView, nodeListState, nodes?.length, setEdges, setNodes])

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    prevStateRef,
  }
}
