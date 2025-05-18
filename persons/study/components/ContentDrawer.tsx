import React from 'react'

import { Drawer, Space } from 'antd'

import { Tabs } from './Tabs'
import { AiConfigHeader } from './AiConfigHeader'
import { ExcludeUrlManager } from './ExcludeUrlManager'

interface ContentDrawerProps {
  visible: boolean
  pageContent: string
  onClose: () => void
}

export const ContentDrawer = (props: ContentDrawerProps) => {
  const { visible, onClose, pageContent } = props

  return (
    <Drawer
      title={`网页内容查看器 (${pageContent.length})`}
      width='90%'
      placement='right'
      destroyOnClose
      open={visible}
      onClose={onClose}
      styles={{ body: { padding: 20 } }}
      extra={(
        <Space>
          <ExcludeUrlManager onClose={onClose} />
          <AiConfigHeader />
        </Space>
      )}
    >
      <Tabs pageContent={pageContent} />
    </Drawer>
  )
}
