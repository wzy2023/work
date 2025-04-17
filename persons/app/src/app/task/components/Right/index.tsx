import { type ReactNode } from 'react'
import type { Node } from '@xyflow/react'

import { AddChildren } from './Add'
import { HideChildren } from './Hide'

import { useFlowState } from '../../hooks'
import { getDescendantIds } from '../../utils'
import { type NodeRecord, NodeType } from '../../types'

import styles from './index.module.scss'

interface RightProps {
  children: ReactNode
  parentNode: NodeRecord
  showAddBtn?: boolean // undedined 全显示，true 显示创建分组、false 显示创建任务
  selected: boolean
  isHovered: boolean
  dragging: boolean
}

export const Right = (props: RightProps) => {
  const { children, parentNode, selected, isHovered, dragging, showAddBtn } = props

  const { edges } = useFlowState()

  const hasChildren = !!getDescendantIds(parentNode as unknown as Node, edges).length

  const showFold = !selected && !dragging && isHovered && hasChildren
  const showGroup = selected && !dragging && [undefined, true].includes(showAddBtn)
  const showTask = selected && !dragging && [undefined, false].includes(showAddBtn)

  return (
    <div>
      {children}

      <div className={styles.add}>
        {showGroup && (
          <AddChildren
            type={NodeType.Group}
            {...{ selected, parentNode }}
          />
        )}

        {showTask && (
          <AddChildren
            type={NodeType.TaskCard}
            {...{ selected, parentNode }}
          />
        )}

        {showFold && (
          <HideChildren
            parentNode={parentNode}
          />
        )}
      </div>
    </div>
  )
}
