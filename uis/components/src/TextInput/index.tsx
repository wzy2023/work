'use client'

import React, { useState } from 'react'

import { Input } from 'app/src/components'
import { useBoolean } from 'app/src/hooks'

interface TextInputProps {
  value: string
  onChange?: (value: string) => void
}

export const TextInput = (props: TextInputProps) => {
  const { value, onChange } = props

  const [text, setText] = useState(value)

  const [isEditing, { setTrue, setFalse }] = useBoolean(false)

  const onSubmit = () => {
    if (!text.trim()) {
      return
    }

    if (text === value) {
      setFalse()
      return
    }

    onChange?.(text.trim())
    setFalse()
  }

  const onBlur = () => {
    onSubmit()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div onDoubleClick={setTrue}>
      {!isEditing ? (
        <span>{text}</span>
      ) : (
        <Input
          value={text}
          onChange={ev => setText(ev.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          autoFocus
          size='small'
          style={{ width: 200 }}
        />
      )}
    </div>
  )
}
