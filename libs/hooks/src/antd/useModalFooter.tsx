import { useState } from 'react'
import { Space, Popconfirm, Button } from 'antd'

interface Option {
  onOk?: () => Promise<void>
  onConfirm?: () => void
}

export const useModalFooter = ({ onOk, onConfirm }: Option) => {
  const [open, setOpen] = useState(false)
  const onCancel = () => {
    setOpen(false)
  }
  const onOpenChange = async (newOpen: boolean) => {
    if (!newOpen) {
      setOpen(false)
      return
    }
    await onOk?.()
    setOpen(true)
  }
  return {
    footer: (_: unknown, extra: any) => (
      <Space>
        <extra.CancelBtn />
        <Popconfirm title='确认操作吗?' open={open} onCancel={onCancel} onConfirm={onConfirm} onOpenChange={onOpenChange}>
          <Button type='primary'>确定</Button>
        </Popconfirm>
      </Space>
    ),
  }
}
