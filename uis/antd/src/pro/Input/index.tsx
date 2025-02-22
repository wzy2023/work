import React, { useState, useEffect, useMemo } from 'react'
import { Input, InputProps } from 'antd'
import { getStrLength } from '@wzyjs/utils'
import { Range } from './components/Range'

export interface InputProProps extends Omit<InputProps, 'onChange'> {
  maxLengthChinese?: boolean; // 限制长度：中文算2个字符
  onChange?: (value: string) => void
}

// 1. 增加对中文字符串的长度限制 (Input的maxLength会认为汉字为1个长度)
export const InputPro = (props: InputProProps) => {
  const {
    value: _value,
    onChange: _onChange,
    addonAfter: _addonAfter,
    maxLength,
    maxLengthChinese,
    ...rest
  } = props

  const [value, setValue] = useState<string>('')

  const addonAfter = useMemo(() => {
    if (!maxLengthChinese) {
      return _addonAfter
    }

    return (
      <>
        {_addonAfter}
        {maxLength ? `${getStrLength(value)} / ${maxLength}` : null}
      </>
    )
  }, [_addonAfter, value, maxLength])

  useEffect(() => {
    _onChange?.(value)
  }, [value])

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLengthChinese && maxLength && getStrLength(ev.target.value) > maxLength) {
      return
    }
    setValue(ev.target.value)
  }

  return (
    <Input
      value={value}
      onChange={onChange}
      addonAfter={addonAfter}
      maxLength={maxLength}
      {...rest}
    />
  )
}

InputPro.Range = Range
