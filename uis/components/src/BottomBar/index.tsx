'use client'

import { ReactNode } from 'react'

interface BottomBarProps {
  children?: ReactNode
  collapsed?: boolean
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  padding: 10,
  right: 0,
  bottom: 0,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)',
  background: '#fff',
}

export const BottomBar = (props: BottomBarProps) => {
  const { children, collapsed } = props

  return (
    <div style={{ ...style, left: collapsed ? 64 : 256, position: 'fixed' }}>
      {children}
    </div>
  )
}
