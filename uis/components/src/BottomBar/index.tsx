import { ReactNode } from 'react'
import styles from './index.less'

interface BottomBarProps {
  children?: ReactNode
  collapsed?: boolean
}

export const BottomBar = (props: BottomBarProps) => {
  const { children, collapsed } = props

  return (
    <div className={styles.bottomBar} style={{ left: collapsed ? 64 : 256 }}>
      {children}
    </div>
  )
}
