import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Card, Button, CardProps } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface CardProProps extends CardProps {
  collapsedHeight?: number; // 默认折叠高度，可根据需要调整
}

export const CardPro = forwardRef((props: CardProProps, ref: any) => {
  const { collapsedHeight = 300, children, ...rest } = props

  const [collapsed, setCollapsed] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const contentRef = useRef<HTMLSpanElement>(null)

  const toggleCollapse = (ev: any) => {
    ev.stopPropagation()
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    const contentEl = contentRef.current
    if (contentEl) {
      // 获取内容的实际高度
      const actualHeight = contentEl.scrollHeight
      if (actualHeight > collapsedHeight) {
        setIsOverflow(true)
      } else {
        setIsOverflow(false)
      }
    }
  }, [children, collapsedHeight])

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
  }

  const contentStyle: React.CSSProperties = {
    maxHeight: collapsed ? `${collapsedHeight}px` : 'none',
    overflowY: collapsed ? 'auto' : 'visible',
    transition: 'max-height 0.3s ease',
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }

  const buttonContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: hovered ? '10px' : '-40px', // 增加隐藏时的负值，确保按钮完全隐藏
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'bottom 0.3s ease, opacity 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    pointerEvents: 'none', // 默认情况下，禁止点击
    opacity: hovered && isOverflow ? 1 : 0, // 控制按钮的透明度
  }

  const buttonStyle: React.CSSProperties = {
    pointerEvents: 'auto', // 允许按钮在悬停时可点击
    border: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  }

  return (
    <Card
      ref={ref}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <span style={contentStyle} ref={contentRef}>
        {children}
      </span>
      {isOverflow && (
        <div style={buttonContainerStyle}>
          <Button
            icon={collapsed ? <DownOutlined /> : <UpOutlined />}
            onClick={toggleCollapse}
            style={buttonStyle}
          />
        </div>
      )}
    </Card>
  )
})
