import { type ChangeEvent } from 'react'

import { Input as AntdInput } from '@/components'

interface InputProps {
  isEdit: boolean
  autoFocus?: boolean
  value: any
  mode?: 'input' | 'textarea'
  onChange: (value: any) => void
}

export const Input = (props: InputProps) => {
  const { isEdit, autoFocus, value, mode = 'input', onChange } = props

  const onInput = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(ev.target.value || '')
  }

  const Com = mode === 'input' ? AntdInput : AntdInput.TextArea

  if (isEdit) {
    return (
      <Com
        autoFocus={autoFocus}
        value={value}
        onChange={onInput}
        placeholder='请输入内容'
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
