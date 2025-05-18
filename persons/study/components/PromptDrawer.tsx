import React from 'react'
import { Button, Drawer, Input, Space } from 'antd'
import { useAiConfigStore } from '@/store'

interface PromptDrawerProps {
  visible: boolean
  onClose: () => void
}

export const PromptDrawer = (props: PromptDrawerProps) => {
  const { visible, onClose } = props

  const { prompt, setPrompt, resetPrompt } = useAiConfigStore()

  return (
    <Drawer
      title='设置提示词'
      width='50%'
      placement='right'
      open={visible}
      onClose={onClose}
      styles={{ body: { padding: 20, display: 'flex', flexDirection: 'column', height: '100%' } }}
      extra={
        <Space>
          <Button onClick={resetPrompt}>
            恢复默认提示词
          </Button>
          <Button type='primary' onClick={onClose}>
            关闭
          </Button>
        </Space>
      }
    >
      <Input.TextArea
        value={prompt}
        onChange={ev => setPrompt(ev.target.value)}
        placeholder='请输入提示词...'
        style={{ height: 'calc(100% - 50px)', resize: 'none', flex: 1 }}
      />
    </Drawer>
  )
}
