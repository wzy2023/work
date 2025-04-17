import { type Node } from '@xyflow/react'
import { Checkbox, Modal } from '@/components'

import { useFlowState } from './useFlowState'
import type { ElementsChanges } from '../types'
import { getDescendantNodes, getEdgesByNode } from '../utils'

interface Option extends ElementsChanges {
  isPreview: boolean,
}

export const useEventChange = (option: Option) => {
  const { isPreview, onEdgesChange: onEdgesChange_, onNodesChange: onNodesChange_ } = option

  const { nodes, edges } = useFlowState()

  const deleteEdgeByNode = (node: Node) => {
    // 删除与这个节点相关的边
    const edgeChanges = getEdgesByNode(node, edges)

    if (edgeChanges.length > 0) {
      onEdgesChange_(edgeChanges.map(item => ({
        ...item,
        type: 'remove',
      })))
    }
  }

  const onEdgesChange = (changes: any[]) => {
    if (isPreview) {
      return
    }

    const filteredChanges = changes.filter(change => !['remove'].includes(change.type))

    if (filteredChanges.length > 0) {
      onEdgesChange_(filteredChanges)
    }
  }

  const onNodesChange = (changes: any[]) => {
    if (isPreview) {
      return
    }

    const removeChanges = changes.filter(change => change.type === 'remove')

    if (removeChanges.length > 0) {
      Modal.confirm({
        title: '确定要删除选中的节点吗',
        content: (
          <div>
            <Checkbox checked />
            <span className='ml-1'>是否删除所有子节点</span>
          </div>
        ),
        onOk: () => {
          // 删除该节点
          onNodesChange_(removeChanges)
          // 删除该节点 关联的边
          removeChanges.forEach(item => {
            deleteEdgeByNode(item)
          })
          // 删除该节点 所有子节点及关联的边
          removeChanges.forEach(item => {
            const nds = getDescendantNodes(item, nodes, edges)
            onNodesChange_(nds.map(item => ({
              id: item.id,
              type: 'remove',
            })))
            nds.forEach(item => {
              deleteEdgeByNode(item)
            })
          })
        },
      })

    } else {
      onNodesChange_(changes)
    }
  }

  return {
    onNodesChange,
    onEdgesChange,
  }
}
