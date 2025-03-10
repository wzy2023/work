'use client'

import React, { ReactNode } from 'react'
import { Alert, AlertProps, Space } from 'antd'

export interface AlertProProps extends AlertProps {
  children?: ReactNode,
}

// 1. 支持 children 作为 description 显示
export const AlertPro = (props: AlertProProps) => {
  const { children, description = children } = props

  return (
    <Alert
      {...props}
      description={(
        <Space style={{ width: '100%' }} direction='vertical'>
          {description}
        </Space>
      )}
    />
  )
}
