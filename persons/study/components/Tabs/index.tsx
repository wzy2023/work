import React, { useState } from 'react'

import { Tabs as AntdTabs } from 'antd'
import type { TabsProps as AntdTabsProps } from 'antd'

import { ContentTab } from './ContentTab'
import { PureContentTab } from './PureContentTab'
import { AiOptimizedTab } from './AiOptimizedTab'

import { getTokens } from '@/utils'
import { useContent, usePureContent } from '@/hooks'

interface TabsProps {
  pageContent: string
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const { pageContent } = props

  const [activeTab, setActiveTab] = useState<string>('content')

  const { extractedContent } = useContent({ pageContent })

  const { pureContent } = usePureContent({ pageContent })

  const items: AntdTabsProps['items'] = [
    {
      key: 'content',
      label: `网页正文 (${extractedContent.length}) (${getTokens(extractedContent)})`,
      children: (
        <ContentTab
          extractedContent={extractedContent}
        />
      ),
    },
    {
      key: 'pure-content',
      label: `网页纯内容 (${pureContent.length}) (${getTokens(pureContent)})`,
      children: (
        <PureContentTab
          pureContent={pureContent}
        />
      ),
    },
    {
      key: 'ai-content',
      label: 'AI优化内容',
      children: (
        <AiOptimizedTab
          pageContent={pageContent}
        />
      ),
    },
  ]

  return (
    <AntdTabs
      defaultActiveKey='content'
      style={{ height: '100%' }}
      items={items}
      activeKey={activeTab}
      onChange={setActiveTab}
    />
  )
}
