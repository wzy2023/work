'use client'

import React, { useEffect, useState } from 'react'
import { Cascader, Input, Space, Tabs } from '@/components'

const platformOptions = [
  {
    value: 'jike',
    label: '即刻',
    children: [
      {
        value: 'user',
        label: '用户',
      },
      {
        value: 'topic',
        label: '圈子',
      },
    ],
  },
]

const urlTemplates: Record<string, Record<string, string>> = {
  jike: {
    user: '/jike/user/{value}',
    topic: '/jike/topic/{value}',
  },
}

enum Mode {
  CUSTOM = 'custom',
  SELECT = 'select',
  BATCH = 'batch',
}

interface UrlFormItemProps {
  value?: string
  currentId?: string
  onChange?: (value: string) => void
  onBatchChange?: (urls: string[]) => void
}

export const UrlFormItem = (props: UrlFormItemProps) => {
  const { currentId, value, onChange, onBatchChange } = props

  const [mode, setMode] = useState<Mode>(Mode.CUSTOM)

  // 自定义输入的URL
  const [customUrl, setCustomUrl] = useState('')

  // 选择模式的值
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  // 批量模式的值
  const [batchUrls, setBatchUrls] = useState('')

  // 生成的URL
  const [generatedUrl, setGeneratedUrl] = useState('')

  // 初始化表单值
  useEffect(() => {
    if (value) {
      setCustomUrl(value)
    }
  }, [])

  // 当外部value变化时更新内部状态
  useEffect(() => {
    if (value && mode === Mode.SELECT) {
      setCustomUrl(value)
    }
  }, [value, mode])

  // 当自定义URL变化时触发onChange
  useEffect(() => {
    if (mode === Mode.CUSTOM && onChange) {
      onChange(customUrl)
    }
  }, [customUrl, mode, onChange])

  // 当生成的URL变化时触发onChange
  useEffect(() => {
    if (mode === Mode.SELECT && generatedUrl && onChange) {
      onChange(generatedUrl)
    }
  }, [generatedUrl, mode, onChange])

  // 处理批量URL变化
  useEffect(() => {
    if (mode === Mode.BATCH && onChange) {
      // 如果是批量模式，但有单个 onChange 处理，使用第一个有效URL
      const urls = parseMultiUrls(batchUrls)
      if (urls.length > 0) {
        onChange(urls[0] || '')
      } else {
        onChange('')
      }
    }
  }, [batchUrls, mode, onChange])

  // 解析多个URL
  const parseMultiUrls = (text: string): string[] => {
    if (!text) return []

    return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.length > 0)
  }

  // 当批量URL变化时，处理并传递给父组件
  const handleBatchUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setBatchUrls(value)

    if (onBatchChange) {
      const urls = parseMultiUrls(value)
      onBatchChange(urls)
    }
  }

  // 根据选择的平台、渠道和输入值生成URL
  const generateUrl = () => {
    if (selectedPlatform.length !== 2) {
      return ''
    }
    if (inputValue) {
      const [platform, channel] = selectedPlatform as [string, string]
      const template = urlTemplates[platform]?.[channel]

      if (template) {
        const url = template.replace('{value}', inputValue)
        setGeneratedUrl(url)
        return url
      }
    }
    setGeneratedUrl('')
    return ''
  }

  // 当平台选择变化时
  const handlePlatformChange = (value: string[]) => {
    setSelectedPlatform(value)
    // 清空生成的URL，等待用户输入值
    setGeneratedUrl('')
  }

  // 当输入值变化时
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // 当输入值失去焦点时生成URL
  const handleInputBlur = () => {
    generateUrl()
  }

  // 当按下回车键时生成URL
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      generateUrl()
    }
  }

  return (
    <Tabs
      size='small'
      activeKey={mode}
      onChange={key => setMode(key as Mode)}
      items={[
        {
          key: Mode.CUSTOM,
          label: '自定义',
          children: (
            <Input
              placeholder="请输入RSS链接"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
          ),
        },
        {
          key: 'select',
          label: '选择',
          children: (
            <div>
              <Space style={{ width: '100%' }}>
                <Cascader
                  options={platformOptions}
                  placeholder='选择平台和渠道'
                  onChange={handlePlatformChange}
                />
                <Input
                  placeholder='请输入值'
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  disabled={selectedPlatform.length !== 2}
                />
              </Space>

              {generatedUrl && (
                <div style={{ marginTop: 8, color: '#666' }}>
                  {generatedUrl}
                </div>
              )}
            </div>
          ),
        },
        ...(currentId ? [] : [{
          key: 'batch',
          label: '批量',
          children: (
            <div>
              <Input.TextArea
                placeholder='请输入多个RSS链接，每行一个'
                value={batchUrls}
                onChange={handleBatchUrlsChange}
                autoSize={{ minRows: 3, maxRows: 10 }}
              />
              <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                已识别 {parseMultiUrls(batchUrls).length} 个链接
              </div>
            </div>
          ),
        }]),
      ]}
    />
  )
}
