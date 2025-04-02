import type { Edge, Node } from '@xyflow/react'

import { dayjs } from '@/utils'
import { getParentNodes, PREVIEW_NODE_ID } from '../utils'

import { type Task, TaskStatus, NodeType } from '../types'

export const statusStyleMap = {
  [TaskStatus.NOT_DUE]: 'outline-gray-200 bg-gray-50',
  [TaskStatus.NOT_FATHER]: 'outline-gray-200 bg-gray-50',
  [TaskStatus.NOT_STARTED]: 'outline-gray-200 bg-white',
  [TaskStatus.IN_PROGRESS]: 'outline-blue-200 bg-blue-50',
  [TaskStatus.TIMEOUT]: 'outline-yellow-200 bg-yellow-50',
  [TaskStatus.COMPLETED]: 'outline-green-200 bg-green-100',
  [TaskStatus.FAILED]: 'outline-red-200 bg-red-100',
}

// 获取节点的状态
const getStatus = (node: Node, nodes: Node[], edges: Edge[]) => {
  const { dates, result, executionRecords, preTaskStatus } = node.data as unknown as Task

  // 计算父节点的状态
  const parents = getParentNodes(node, nodes, edges)
  .filter(i => i.type === NodeType.TaskCard)
  .map(i => ({
    ...i,
    data: {
      ...i.data,
      status: i.data.status || getStatus(i, nodes, edges),
    },
  }))
  if (parents?.length && parents.some(item => !preTaskStatus?.includes(item.data?.status as TaskStatus))) {
    return TaskStatus.NOT_FATHER
  }

  if (!dates?.length) {
    return TaskStatus.NOT_DUE
  }

  if (result === true) {
    return TaskStatus.COMPLETED
  }

  if (result === false) {
    return TaskStatus.FAILED
  }

  if (dayjs().isBefore(dayjs(dates?.[0]).startOf('day'))) {
    return TaskStatus.NOT_DUE
  }

  if (dayjs().isAfter(dayjs(dates?.[1]).endOf('day'))) {
    return TaskStatus.TIMEOUT
  }

  if (executionRecords?.length) {
    return TaskStatus.IN_PROGRESS
  }

  return TaskStatus.NOT_STARTED
}

export const useTaskStatus = (node: Node, nodes: Node[], edges: Edge[]) => {
  const status = node.id === PREVIEW_NODE_ID ?
    TaskStatus.NOT_DUE : // 预览节点不计算状态
    getStatus(node, nodes, edges)

  return {
    status,
    statusStyle: statusStyleMap[status],
  }
}
