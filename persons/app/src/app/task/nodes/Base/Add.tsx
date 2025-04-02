import { type ReactNode } from 'react'

import { AddChildren } from '../../components/AddChildren'

import { type NodeRecord, NodeType } from '../../types'

import styles from './base.module.scss'

interface AddProps {
  children: ReactNode
  parentNode: NodeRecord
  showAddBtn?: boolean // undedined 全显示，true 显示创建分组、false 显示创建任务
  selected: boolean
  isHovered: boolean
  dragging: boolean
}

export const Add = (props: AddProps) => {
  const { children, parentNode, selected, isHovered, dragging, showAddBtn } = props

  const isShow = (isHovered || selected) && !dragging

  const showGroup = isShow && [undefined, true].includes(showAddBtn)
  const showTask = isShow && [undefined, false].includes(showAddBtn)

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
      </div>
    </div>
  )
}
