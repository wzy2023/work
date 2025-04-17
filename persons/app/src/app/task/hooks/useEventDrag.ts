import { useState } from 'react'
import { type Node, useReactFlow } from '@xyflow/react'

import { _ } from '@/utils'
import type { Elements, ElementsFns } from '../types'

import {
  createEdge,
  createPreviewEdge,
  createPreviewNode,
  getDescendantIds,
  layoutedElements,
  getMovedDescendantNodes,
  getSnapNode,
} from '../utils'

import styles from '../styles/index.module.scss'

export const useEventDrag = (elements: Elements & ElementsFns) => {
  const { nodes = [], edges = [], setEdges } = elements

  const { getIntersectingNodes } = useReactFlow()

  const [preview, setPreview] = useState<Elements | null>(null)

  const calcSnapNode = (node: Node, nodes: Node[]) => {
    const intersectingNodes = getIntersectingNodes(node)
    return getSnapNode({ node, nodes, edges, intersectingNodes })
  }

  const onNodeDrag = (__: unknown, node: Node) => {
    let newNodes = _.cloneDeep(nodes)
    let newEdges = _.cloneDeep(edges)

    newNodes = getMovedDescendantNodes({
      node,
      nodes: newNodes,
      descendantIds: getDescendantIds(node, edges),
    })

    const snapNode = calcSnapNode(node, newNodes)

    if (snapNode) {
      // 去掉当前拖拽节点的边
      newEdges = newEdges.filter(item => item.target !== node.id)

      // 创建预览的节点
      const newNode = createPreviewNode(node)

      // 添加预览的边
      newEdges.push(createPreviewEdge(snapNode.id, newNode.id))

      // 添加预览的节点
      newNodes.push(newNode)

      // 计算新添加节点应该显示的位置
      const { nodes } = layoutedElements({
        nodes: newNodes,
        edges: newEdges,
      })

      newNode.position = nodes?.find(n => n.id === newNode.id)?.position || newNode.position

      // 给吸附节点添加高亮样式
      newNodes.forEach(item => {
        if (item.id === snapNode?.id) {
          if (!item.className?.includes(styles.snap!)) {
            item.className = (item.className || '') + styles.snap
          }
        } else {
          item.className = item.className?.replace(styles.snap!, '')
        }
      })
    }

    setPreview({ nodes: newNodes, edges: newEdges })
  }

  const onNodeDragStop = (__: unknown, node: Node) => {
    const newNodes = _.cloneDeep(nodes)
    const newEdges = _.cloneDeep(edges)

    const edge = newEdges.find(item => item.target === node.id)
    const snapNode = calcSnapNode(node, newNodes)

    if (snapNode) {
      if (edge) {
        edge.source = snapNode.id
        setEdges(newEdges)
      } else {
        newEdges.push(createEdge(snapNode.id, node.id))
        setEdges(newEdges)
      }
      snapNode.className = snapNode.className?.replace(styles.snap!, '')
    }

    setPreview(null)
  }

  return {
    onNodeDrag,
    onNodeDragStop,
    preview,
    isPreview: !!(preview?.nodes?.length || preview?.edges?.length),
  }
}
