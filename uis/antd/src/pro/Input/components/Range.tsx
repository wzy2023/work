'use client'

import React from 'react'
import { InputNumber, InputNumberProps, Space } from 'antd'
import { _ } from '@wzyjs/utils'

export interface RangeProps extends Omit<InputNumberProps, 'value' | 'onChange'> {
  value?: number[];
  min?: number;
  max?: number;
  onChange?: (numbers: number[]) => void;
}

// 最小值 最大值 的输入框
export const Range = (props: RangeProps) => {
  const { value = [], min, max, onChange } = props

  const onNumberChange = (index: 0 | 1, v: number | null) => {
    if (Number.isNaN(v) || v === null) {
      return
    }

    const numbers = _.cloneDeep(value) || []
    numbers[index] = v

    onChange?.(numbers)
  }

  return (
    <Space>
      <InputNumber
        min={min}
        max={max}
        value={value[0]}
        onChange={(v: number | null) => onNumberChange(0, v)}
      />
      <span style={{ margin: '0 3px' }}> - </span>
      <InputNumber
        min={min}
        max={max}
        value={value[1]}
        onChange={(v: number | null) => onNumberChange(1, v)}
      />
    </Space>
  )
}
