'use client'

import React from 'react'
import { Checkbox, CheckboxProps, CheckboxOptionType } from 'antd'

export interface CancelProps {
  value: CheckboxProps['value'];
  options: CheckboxOptionType[];
  onChange?: CheckboxProps['onChange'];
}

// 给Radio组件增加取消选择的功能，是用Checkbox组件实现的
export const Cancel = (props: CancelProps) => {
  const { value, options, onChange } = props

  const evs = {
    onChange: (checkedValue: CheckboxProps['value'][]) => {
      onChange?.(checkedValue.find(i => i !== value) || '')
    },
  }

  return (
    <Checkbox.Group
      value={[value]}
      prefixCls='ant-radio'
      options={options}
      onChange={evs.onChange}
    />
  )
}
