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

interface UrlFormItemProps {
  value?: string
  onChange?: (value: string) => void
}

export const UrlFormItem: React.FC<UrlFormItemProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<'custom' | 'select'>('custom')

  // 自定义输入的URL
  const [customUrl, setCustomUrl] = useState('')

  // 选择模式的值
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

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
    if (value && mode === 'custom') {
      setCustomUrl(value)
    }
  }, [value, mode])

  // 当自定义URL变化时触发onChange
  useEffect(() => {
    if (mode === 'custom' && onChange) {
      onChange(customUrl)
    }
  }, [customUrl, mode, onChange])

  // 当生成的URL变化时触发onChange
  useEffect(() => {
    if (mode === 'select' && generatedUrl && onChange) {
      onChange(generatedUrl)
    }
  }, [generatedUrl, mode, onChange])

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
      onChange={(key) => setMode(key as 'custom' | 'select')}
      items={[
        {
          key: 'custom',
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
      ]}
    />
  )
}
