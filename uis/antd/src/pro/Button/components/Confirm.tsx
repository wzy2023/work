import React from 'react'
import { _ } from '@wzyjs/utils'
import { Button, Popconfirm, PopconfirmProps, ButtonProps } from 'antd'

export interface ConfirmProps extends PopconfirmProps {
  btnProps?: ButtonProps
}

// 1. 给按钮增加了确认功能
export const Confirm = (props: ConfirmProps) => {
  const { children, btnProps } = props

  return (
    <Popconfirm
      okText='是'
      cancelText='否'
      {..._.omit(props, ['children', 'btnProps'])}
    >
      <Button type='link' {...btnProps}>{children}</Button>
    </Popconfirm>
  )
}
