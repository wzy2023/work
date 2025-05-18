import React from 'react'
import { FloatButton } from 'antd'
import { ReadOutlined } from '@ant-design/icons'

interface FloatingButtonProps {
  onClick: () => void
}

export const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <FloatButton
      icon={<ReadOutlined />}
      type="primary"
      tooltip='查看网页内容'
      onClick={onClick}
      style={{
        right: 24,
        bottom: 24,
      }}
    />
  )
}
