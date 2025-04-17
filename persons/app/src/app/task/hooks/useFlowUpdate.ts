import { type RefObject } from 'react'

import { _ } from '@/utils'
import { useDebouncedEffect } from '@/hooks'
import type { Elements, NodeRecord } from '../types'

import { api } from '@/api/react'

type Option = Elements & {
  prevStateRef: RefObject<Elements | null>
}

export const useFlowUpdate = (option: Option) => {
  const { nodes, edges, prevStateRef } = option

  const { nodes: prevNodes, edges: prevEdges } = prevStateRef.current || {}

  const createNodeMutation = api.taskNode.create.useMutation()
  const updateNodeMutation = api.taskNode.update.useMutation()
  const deleteNodeMutation = api.taskNode.delete.useMutation()

  const createEdgeMutation = api.taskEdge.create.useMutation()
  const updateEdgeMutation = api.taskEdge.update.useMutation()
  const deleteEdgeMutation = api.taskEdge.delete.useMutation()

  useDebouncedEffect(async () => {
    if (!prevNodes || !prevEdges) {
      return
    }

    // 处理节点的变化
    const nodesToUpdate = nodes.filter(node => {
      const prevNode = prevNodes.find(p => p.id === node.id)
      return prevNode && (
        JSON.stringify(prevNode.data) !== JSON.stringify(node.data)
      )
    })

    const nodesToCreate = nodes.filter(node =>
      !prevNodes.find(p => p.id === node.id),
    )

    const nodesToDelete = prevNodes.filter(prevNode =>
      !nodes.find(n => n.id === prevNode.id),
    )

    const edgesToUpdate = edges.filter(edge => {
      const l = prevEdges.find(p => p.id === edge.id)
      return l && l.target === edge.target && l.source !== edge.source
    })

    const edgesToCreate = edges.filter(edge =>
      !prevEdges.find(p => p.id === edge.id),
    )

    const edgesToDelete = prevEdges.filter(prevEdge =>
      !edges.find(e => e.id === prevEdge.id),
    )

    const r = {
      nodesToCreate: nodesToCreate.length,
      nodesToUpdate: nodesToUpdate.length,
      nodesToDelete: nodesToDelete.length,
      edgesToCreate: edgesToCreate.length,
      edgesToUpdate: edgesToUpdate.length,
      edgesToDelete: edgesToDelete.length,
    }
    if (Object.values(r).reduce((acc, node) => acc + node, 0) > 0) {
      console.log(666, '变更统计', r)
    }

    // 执行节点操作
    await Promise.all([
      ...nodesToUpdate.map(node =>
        updateNodeMutation.mutateAsync({
          where: { id: node.id },
          data: _.pick(node, ['data']),
        }),
      ),
      ...nodesToCreate.map(node =>
        createNodeMutation.mutateAsync({
          data: _.pick(node, ['id', 'type', 'data']) as NodeRecord,
        }),
      ),
      ...nodesToDelete.map(node =>
        deleteNodeMutation.mutateAsync({
          where: { id: node.id },
        }),
      ),
    ])

    // 执行边操作
    await Promise.all([
      ...edgesToCreate.map(edge =>
        createEdgeMutation.mutateAsync({
          data: _.pick(edge, ['id', 'type', 'source', 'target']) as any,
        }),
      ),
      ...edgesToUpdate.map(edge =>
        updateEdgeMutation.mutateAsync({
          where: { id: edge.id },
          data: _.pick(edge, ['source', 'target']),
        }),
      ),
      ...edgesToDelete.map(edge => {
        deleteEdgeMutation.mutateAsync({
          where: { id: edge.id },
        })
      }),
    ])

    prevStateRef.current = {
      nodes: _.cloneDeep(nodes),
      edges: _.cloneDeep(edges),
    }
  }, [nodes, edges])

  return {
    prevStateRef,
  }
}
