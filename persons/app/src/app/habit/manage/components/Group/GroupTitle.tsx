import React, { useState } from 'react'

import { Input } from '@/components'

import { useBoolean } from 'ahooks'

import { useHabitGroupCRUD } from '@/api/generated/store'

interface GroupTitleProps<I> {
  item: I
  onSuccess?: () => void
}

export const GroupTitle = <I extends { id: string, name: string }>(props: GroupTitleProps<I>) => {
  const { item, onSuccess } = props

  const [name, setName] = useState(item.name)

  const [isEditing, { setTrue, setFalse }] = useBoolean(false)

  const { updateState } = useHabitGroupCRUD({
    list: false,
    update: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
      },
    },
  })

  const onSubmit = () => {
    if (!name.trim()) {
      return
    }

    if (item.name === name) {
      setFalse()
      return
    }

    updateState.mutate(item.id, {
      name: name.trim(),
    })
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
    <div onDoubleClick={setTrue} style={{ cursor: 'text' }}>
      {!isEditing ? name : (
        <Input
          value={name}
          onChange={ev => setName(ev.target.value)}
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
