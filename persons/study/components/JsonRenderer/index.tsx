import React from 'react'
import {
  Divider,
  Flex,
  Space,
  Typography,
  Steps,
  Tabs,
  Collapse,
  Descriptions,
  Image,
  List,
  Popover,
  Tooltip,
  Card,
  QRCode,
  Segmented,
  Table,
  Tag,
  Timeline,
  Tree,
  Alert,
  Progress,
} from 'antd'

const ComponentMap = {
  // 布局结构类
  Divider,
  Flex,
  Space,

  // 信息展示类
  Typography,
  'Typography.Title': Typography.Title,
  'Typography.Text': Typography.Text,
  'Typography.Paragraph': Typography.Paragraph,
  Steps,
  Tabs,
  Collapse,
  'Collapse.Panel': Collapse.Panel,
  Description: Descriptions,
  Image,
  List,
  Popover,
  Tooltip,
  Card,
  QRCode,
  Segmented,
  Table,
  Tag,
  Timeline,
  Tree,
  Alert,
  Progress,
}

export interface Content {
  component: keyof typeof ComponentMap // 对应 Ant Design 组件的枚举值
  props?: Record<string, any>       // 对应组件的 props 配置
  children?: Content[] | string     // 子节点，可递归嵌套，或直接是字符串
}

interface JsonRendererProps {
  content: Content[]
}

export const JsonRenderer = (props: JsonRendererProps) => {
  const { content } = props

  // 递归渲染组件的函数
  const renderContent = (item: Content | string) => {
    // 如果是字符串，直接返回
    if (typeof item === 'string') {
      return item
    }

    const { component, props = {}, children } = item

    // 获取对应的组件
    const Component = ComponentMap[component] as React.ComponentType<any>

    if (!Component) {
      return <Alert type='error' message={`未找到组件: ${component}`} />
    }

    // 处理子节点
    let childrenContent
    if (children) {
      if (Array.isArray(children)) {
        childrenContent = children.map((child, index) => (
          <React.Fragment key={index}>
            {renderContent(child)}
          </React.Fragment>
        ))
      } else {
        childrenContent = renderContent(children)
      }
    }

    // 渲染组件，传递 props 和 children
    return <Component {...props}>{childrenContent}</Component>
  }

  return (
    <>
      {content.map((item, index) => (
        <React.Fragment key={index}>
          {renderContent(item)}
        </React.Fragment>
      ))}
    </>
  )
}
