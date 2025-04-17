import type { Edge, Node } from '@xyflow/react'

import dagre from 'dagre'
import { Chain } from './Chain'
import { NodeType } from '../types'

import styles from '../styles/index.module.scss'

export const PREVIEW_NODE_ID = 'preview-node'
export const PREVIEW_EDGE_ID = 'preview-edge'
export const SNAP_THRESHOLD = 150 // 吸附距离阈值

export * from './Chain'

export const createNode = (type: NodeType): Node => {
  return {
    id: Date.now().toString(),
    type,
    position: { x: 0, y: 0 },
    data: {
      title: '',
    },
  }
}

export const createEdge = (parentNodeId: string, nodeId: string): Edge => {
  return {
    id: Date.now().toString(),
    type: 'smoothstep',
    source: parentNodeId,
    target: nodeId,
  }
}

export const createNodeEdge = (parentNode: Node, type: NodeType): { node: Node, edge: Edge } => {
  const node = createNode(type)
  const edge = createEdge(parentNode.id, node.id)

  return {
    node,
    edge,
  }
}

export const createPreviewEdge = (source: string, target: string) => {
  return {
    id: PREVIEW_EDGE_ID,
    source,
    target,
    type: 'smoothstep',
    animated: true,
    style: {
      opacity: 0.5,
      strokeDasharray: '5,5',
      stroke: '#6495ED',
      strokeWidth: 2.5,
    },
  }
}

export const createPreviewNode = (node: Node) => {
  return {
    ...node,
    id: PREVIEW_NODE_ID,
    draggable: false,
    style: {
      ...node.style,
      opacity: 0.5,
      outline: 'dashed 2.5px rgba(24, 144, 255, 1)',
      borderRadius: 4,
      backgroundColor: '#fff',
    },
  }
}

// 重新布局
export const getLayoutedElements = (nodes: Node[], edges: Edge[]): Node[] => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 10, ranksep: 50 })

  edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target))
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { ...node, width: node.measured?.width ?? 0, height: node.measured?.height ?? 0 })
  })

  dagre.layout(dagreGraph)

  return nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const x = nodeWithPosition.x - (node.type === 'taskCard' ? (node.measured?.width ?? 0) / 3 : 0)
    const y = nodeWithPosition.y - (node.measured?.height ?? 0) / 2
    // const x = nodeWithPosition.x - (node.measured?.width ?? 0) / 2
    // const y = nodeWithPosition.y - (node.measured?.height ?? 0) / 2
    return { ...node, position: { x, y } }
  })
}

// 计算两个点之间的距离
export const getDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
}

// 获取后代节点的id
export const getDescendantIds = (node: Node, edges: Edge[]): string[] => {
  // 使用Map提高查找效率
  const edgeMap = new Map<string, string[]>()
  edges.forEach(edge => {
    if (!edgeMap.has(edge.source)) {
      edgeMap.set(edge.source, [])
    }
    edgeMap.get(edge.source)?.push(edge.target)
  })

  // 使用队列进行广度优先搜索
  const descendantIds: string[] = []
  const visited = new Set<string>()
  const queue = [node.id]

  while (queue.length > 0) {
    const currentId = queue.shift()!
    const children = edgeMap.get(currentId) || []

    children.forEach(childId => {
      if (!visited.has(childId)) {
        visited.add(childId)
        descendantIds.push(childId)
        queue.push(childId)
      }
    })
  }

  return descendantIds
}

// 获取后代节点的node
export const getDescendantNodes = (node: Node, nodes: Node[], edges: Edge[]) => {
  const descendantIds = getDescendantIds(node, edges)
  return nodes.filter(node => descendantIds.includes(node.id))
}

// 获取上级节点的id
export const getParentIds = (node: Node, edges: Edge[]): string[] => {
  const parentIds: string[] = []
  edges.forEach(edge => {
    if (edge.target === node.id && !parentIds.includes(edge.source)) {
      parentIds.push(edge.source)
    }
  })
  return parentIds
}

// 获取上级节点的node
export const getParentNodes = (node: Node, nodes: Node[], edges: Edge[]) => {
  const parentIds = getParentIds(node, edges)
  return nodes.filter(item => parentIds.includes(item.id))
}

// 获取后代节点 跟随拖拽节点 位置更新后的数据
export const getMovedDescendantNodes = (option: { node: Node; nodes: Node[]; descendantIds: string[] }) => {
  const { node, nodes, descendantIds } = option

  if (!node || !nodes?.length) {
    return nodes
  }

  const prevNode = nodes.find(n => n.id === node.id)
  if (!prevNode) {
    return nodes
  }

  const deltaX = node.position.x - prevNode.position.x
  const deltaY = node.position.y - prevNode.position.y

  return new Chain(nodes)
  .updateManyBy(nd => {
    if (descendantIds?.includes(nd.id) || node.id === nd.id) {
      nd.position.x += deltaX
      nd.position.y += deltaY
      nd.style = { zIndex: 1 }
    }
    return nd
  })
  .result()
}

// 获取拖拽时的吸附节点
export const getSnapNode = (option: { node?: Node; nodes?: Node[]; intersectingNodes?: Node[] }): Node | undefined => {
  const { node, nodes, intersectingNodes } = option

  if (!node || !nodes?.length) {
    return
  }

  // 查找最近的节点并检查是否需要吸附
  let snapToNode: Node | undefined

  // 查找交叉节点
  if (intersectingNodes?.length === 1 && intersectingNodes[0]) {
    snapToNode = intersectingNodes[0]

  } else {
    // 查找吸附节点
    const distanceNodes = nodes.map(item => ({
      node: item,
      distance: getDistance(node.position, item.position),
    })).filter(item => item.node.id !== node.id).sort((a, b) => a.distance - b.distance)
    if ((distanceNodes[0]?.distance || 0) < SNAP_THRESHOLD) {
      snapToNode = distanceNodes[0]?.node
    }
  }

  // 如果找到的是任务卡片，则判断：分组节点不能拖拽到任务卡片上
  if (node.type === NodeType.Group && snapToNode?.type === NodeType.TaskCard) {
    snapToNode = undefined
  }

  // 给吸附节点添加高亮样式
  nodes.forEach(item => {
    if (item.id === snapToNode?.id) {
      if (!item.className?.includes(styles.snap!)) {
        item.className = (item.className || '') + styles.snap
      }
    } else {
      item.className = item.className?.replace(styles.snap! as string, '')
    }
  })

  return snapToNode
}
