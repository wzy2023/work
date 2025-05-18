import React, { useState, CSSProperties } from 'react'

import { Select, Button, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

import { PromptDrawer } from './PromptDrawer'
import { useAiConfigStore } from '@/store'

interface AiConfigHeaderProps {
  style?: CSSProperties
}

export const AiConfigHeader = (props: AiConfigHeaderProps) => {
  const { style } = props

  const [promptDrawerVisible, setPromptDrawerVisible] = useState(false)

  const { model, setModel, modelOptions } = useAiConfigStore()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        ...style,
      }}
    >
      <Space>
        <span style={{ fontSize: 14 }}>选择模型：</span>
        <Select
          style={{ width: 180 }}
          options={modelOptions}
          value={model}
          onChange={setModel}
        />
        <Button
          icon={<SettingOutlined />}
          onClick={() => setPromptDrawerVisible(true)}
        >
          设置提示词
        </Button>
      </Space>

      <PromptDrawer
        visible={promptDrawerVisible}
        onClose={() => setPromptDrawerVisible(false)}
      />
    </div>
  )
}
