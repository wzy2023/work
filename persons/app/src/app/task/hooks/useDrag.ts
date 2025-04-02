import { type Edge, type Node } from '@xyflow/react'

import { useSetState } from '@/hooks'
import { useIntersecting } from '../hooks'

import { _ } from '@/utils'
import { emptyPreview } from '../consts'

import {
  createPreviewEdge,
  createPreviewNode,
  getDescendantIds,
  getLayoutedElements,
  getMovedDescendantNodes,
  getSnapNode,
} from '../utils'

interface Option {
  nodes: Node[];
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}

export const useDrag = (option: Option) => {
  const { nodes, edges, setEdges } = option

  const [preview, setPreview] = useSetState<{ nodes?: Node[], edges?: Edge[] }>(emptyPreview)

  const { getIntersectingNodes } = useIntersecting()

  const calcSnapNode = (node: Node, nodes: Node[]) => {
    const intersectingNodes = getIntersectingNodes(node)
    return getSnapNode({ node, nodes, intersectingNodes })
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
      const newLayoutNodes = getLayoutedElements(newNodes, newEdges)
      newNode.position = newLayoutNodes.find(n => n.id === newNode.id)?.position || newNode.position
    }

    setPreview({ nodes: newNodes, edges: newEdges })
  }

  const onNodeDragStop = (__: unknown, node: Node) => {
    const newNodes = _.cloneDeep(nodes)
    const newEdges = _.cloneDeep(edges)

    const edge = newEdges.find(item => item.target === node.id)
    const snapNode = calcSnapNode(node, newNodes)

    if (edge && snapNode) {
      edge.source = snapNode.id
      setEdges(newEdges)
    }

    setPreview(emptyPreview)
  }

  return {
    onNodeDrag,
    onNodeDragStop,
    preview,
    isPreview: !!(preview.nodes?.length || preview.edges?.length),
  }
}
