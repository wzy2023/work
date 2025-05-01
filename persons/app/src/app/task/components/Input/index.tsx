import { type ChangeEvent, useState } from 'react'

import { Input as AntdInput } from '@/components'
import { useDebounceEffect } from '@/hooks'

interface InputProps {
  isEdit: boolean
  autoFocus?: boolean
  value: any
  mode?: 'input' | 'textarea'
  onChange: (value: any) => void
}

export const Input = (props: InputProps) => {
  const { isEdit, autoFocus, value, mode = 'input', onChange } = props

  const [text, setText] = useState<string>(value)

  useDebounceEffect(() => {
    onChange(text)
  }, [text])

  const Com = mode === 'input' ? AntdInput : AntdInput.TextArea

  if (isEdit) {
    return (
      <Com
        autoFocus={autoFocus}
        value={text}
        placeholder='请输入内容'
        onChange={ev => {
          setText(ev.target.value || '')
        }}
      />
    )
  }

  return (
    <div
      className='overflow-hidden text-ellipsis whitespace-pre'
      style={{ color: !value ? '#ddd' : '' }}
    >
      {value || '请输入内容'}
    </div>
  )
}
