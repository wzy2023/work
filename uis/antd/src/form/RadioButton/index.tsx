'use client'

import { CSSProperties } from 'react'
import { Radio } from 'antd'

interface FilterButtonProps<V> {
  options: { label: string; value: V }[]
  value: V
  onChange: (value: V) => void
  style?: CSSProperties
}

export const RadioButton = <V = string | number | boolean | null>(props: FilterButtonProps<V>) => {
  const { value, options, style, onChange } = props

  return (
    <Radio.Group
      optionType='button'
      buttonStyle='solid'
      value={value}
      style={style}
      onChange={e => onChange(e.target.value as V)}
    >
      {options.filter(item => item.label).map(item => (
        <Radio key={String(item.value)} value={item.value}>{item.label}</Radio>
      ))}
    </Radio.Group>
  )
}
