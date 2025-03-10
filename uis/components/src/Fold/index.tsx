'use client'

import React, { useState } from 'react'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface FoldProps {
  max: number
  children?: React.ReactNode
  btnStyle?: React.CSSProperties
}

export const Fold = (props: FoldProps) => {
  const { max, children, btnStyle = {} } = props

  const [collapsed, setCollapsed] = useState<boolean | undefined>(undefined)

  const divRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (divRef.current) {
      const { clientHeight } = divRef.current
      if (clientHeight > max) {
        setCollapsed(true)
      }
    }
  }, [divRef.current])

  return (
    <div ref={divRef} style={{ overflow: 'hidden' }}>
      <div style={{ maxHeight: collapsed ? max : undefined }}>
        {children}
      </div>

      <div style={{ textAlign: 'center', ...btnStyle }}>
        {collapsed === undefined ? null : collapsed ? (
          <Button
            size='small'
            icon={<DownOutlined />}
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <Button
            size='small'
            icon={<UpOutlined />}
            onClick={() => setCollapsed(true)}
          />
        )}
      </div>
    </div>
  )
}
