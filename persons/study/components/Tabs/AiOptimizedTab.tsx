import React from 'react'

import { Button, Space, Spin, Tag } from 'antd'
import { JsonRenderer } from '../JsonRenderer'

import { useAiConfigStore } from '@/store'
import { useAiOptimizedContent, usePureContent } from '@/hooks'

interface AiOptimizedTabProps {
  pageContent: string
}

export const AiOptimizedTab = (props: AiOptimizedTabProps) => {
  const { pageContent } = props

  const { model, prompt } = useAiConfigStore()

  const { pureContent } = usePureContent({ pageContent })

  const { loading, error, result, hasCache, contentHolder, clearCache, handleAiOptimize } = useAiOptimizedContent({
    manual: true,
    model,
    content: prompt + pureContent,
  })

  if (loading) {
    return (
      <div className='loading-container'>
        <Spin size='large'>
          {contentHolder}
          <p>正在使用 {model} 优化内容，请稍候...</p>
        </Spin>
      </div>
    )
  }

  if (!result?.length) {
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
        <p>将使用<Tag color='blue'>{model}</Tag>模型进行内容优化</p>
        {contentHolder}
        <Button type='primary' onClick={handleAiOptimize}>
          开始 AI 优化
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
        <p>{error}</p>
        {contentHolder}
        <Button type='primary' onClick={handleAiOptimize}>
          重试
        </Button>
      </div>
    )
  }

  return (
    <div style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
      {contentHolder}
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Space>
            {hasCache && (
              <Button onClick={clearCache}>
                清除缓存
              </Button>
            )}
            <Button type='primary' onClick={handleAiOptimize}>
              重新优化
            </Button>
          </Space>
        </div>
        <JsonRenderer content={result} />
      </div>
    </div>
  )
}
