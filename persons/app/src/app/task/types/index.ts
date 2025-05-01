import type { Edge, Node, NodeProps as NodeBaseProps } from '@xyflow/react'

export interface Elements {
  nodes: Node[],
  edges: Edge[],
}

export interface ElementsFns {
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
}

export interface ElementsChanges {
  onNodesChange: any,
  onEdgesChange: any
}

export enum NodeType {
  Group = 'group',
  TaskCard = 'taskCard',
}

export interface TaskExecutionRecord {
  start: number;
  end?: number;
}

export enum TaskStatus {
  NOT_DUE = '未到期',
  NOT_FATHER = '前置任务未完成',

  NOT_STARTED = '待开始',
  IN_PROGRESS = '进行中',
  TIMEOUT = '超时',

  COMPLETED = '已完成',
  FAILED = '失败',
}

export interface Task {
  title: string;
  description?: string;
  dates?: [number, number];
  executionRecords?: TaskExecutionRecord[];
  tags: string[];
  preTaskStatus: TaskStatus;
  result?: boolean; // 任务执行结果
  fold?: boolean; // 是否折叠子节点
}

export type NodeRecord = NodeBaseProps & {
  type: NodeType; // 节点类型
  data: Task; // 数据
}
