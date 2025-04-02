import { type ReactNode } from 'react'

import { classnames } from '@/utils'

import styles from './base.module.scss'

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
      className={classnames({
        [(styles as any).border]: true,
        [(styles as any).hover]: isHovered,
        [(styles as any).selected]: selected,
        [style]: true,
      })}
    >
      {children}
    </div>
  )
}
