import { type ReactNode } from 'react'

import { classnames } from '@/utils'

import styles from './index.module.scss'

interface BaseProps {
  children: ReactNode
  selected: boolean
  isHovered: boolean
  style?: string
}

export const Border = (props: BaseProps) => {
  const { style = '', children, selected, isHovered } = props

  return (
    <div
      className={classnames(
        styles.border,
        isHovered && styles.hover,
        selected && styles.selected,
        style,
      )}
    >
      {children}
    </div>
  )
}
