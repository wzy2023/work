'use client'

import React from 'react'
import { Popconfirm, PopconfirmProps } from 'antd'

export type PopconfirmProProps = PopconfirmProps

export const PopconfirmPro = (props: PopconfirmProProps) => {
  return (
    <Popconfirm
      okText="确定"
      cancelText="取消"
      {...props}
    />
  )
}
