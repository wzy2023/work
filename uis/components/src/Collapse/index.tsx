'use client'

import { ReactNode } from 'react'
import { useBoolean } from '@wzyjs/hooks'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

interface CollapseProps {
  children: ReactNode
}

export const Collapse = (props: CollapseProps) => {
  const { children } = props

  const [collapse, { setTrue, setFalse }] = useBoolean(false)

  return (
    <div>
      <div style={{ transform: 'translateY(100px)' }}>
        {collapse ? <LeftOutlined onClick={setFalse} /> : <RightOutlined onClick={setTrue} />}
      </div>
      <div style={{ width: collapse ? 0 : 'auto', visibility: collapse ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </div>
  )
}
