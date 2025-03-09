import React, { useState } from 'react'

import { Input, message } from 'antd'

import { useBoolean } from 'ahooks'

import { api } from '@/api/react'

interface GroupTitleProps<I> {
  item: I
}

export const GroupTitle = <I extends { id: number, name: string }>(props: GroupTitleProps<I>) => {
  const { item } = props

  const [isEditing, { setTrue, setFalse }] = useBoolean(false)

  const [name, setName] = useState(item.name)

  const updateMutation = api.habit.group.update.useMutation({
    onSuccess: () => {
      message.success('名称更新成功')
      setFalse()
    }
  })

  const onSubmit = () => {
    if (!name.trim()) return

    updateMutation.mutate({
      id: item.id,
      data: {
        name: name.trim(),
      },
    })
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
          onBlur={onSubmit}
          onKeyDown={onKeyDown}
          autoFocus
          size='small'
          style={{ width: 200 }}
        />
      )}
    </div>
  )
}
