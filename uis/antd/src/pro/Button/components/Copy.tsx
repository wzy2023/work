import React, { useState, ReactNode } from 'react'

import { Button, ButtonProps, message } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import { copy, readClipboard } from '@wzyjs/utils'
import { useControllableValue } from '@wzyjs/hooks'

export interface CopyProps extends ButtonProps {
  value?: string,
  canPaste?: boolean,
}

export const Copy = (props: CopyProps) => {
  const [icon, setIcon] = useState<ReactNode>(null)

  const [value, setValue] = useControllableValue<string>(props, {
    defaultValue: props.value,
  })

  const onContextMenu = async () => {
    setValue(await readClipboard())
  }

  return (
    <Button
      {...props}
      icon={icon}
      onContextMenu={props.canPaste ? onContextMenu : undefined}
      children={props.children || value || '记录'}
      onClick={(ev: any) => {
        props.onClick?.(ev)

        copy(value)
        message.success('复制成功')

        setIcon(<CheckOutlined />)
        setTimeout(() => {
          setIcon(null)
        }, 1000)
      }}
    />
  )
}
