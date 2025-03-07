import React, { useState } from 'react'

import { Input, message } from 'antd'

import { api } from '@/server/trpc/react'

interface GroupTitleProps {
  item: any
}

export const GroupTitle = (props: GroupTitleProps) => {
  const { item } = props
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(item.name)

  const onDoubleClick = () => {
    setIsEditing(true)
  }

  const updateMutation = api.habitGroup.update.useMutation({
    onSuccess: () => {
      message.success('名称更新成功')
    },
    onError: () => {
      message.error('名称更新失败')
    },
  })

  const onSubmit = async () => {
    if (!inputValue.trim()) return

    try {
      await updateMutation.mutateAsync({
        id: item.id,
        data: {
          name: inputValue.trim(),
        },
      })
      // 更新本地数据
      item.name = inputValue.trim()
    } finally {
      setIsEditing(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div onDoubleClick={onDoubleClick} style={{ cursor: 'text' }}>
      {isEditing ? (
        <Input
          value={inputValue}
          onChange={ev => setInputValue(ev.target.value)}
          onBlur={onSubmit}
          onKeyDown={onKeyDown}
          autoFocus
          size='small'
          style={{ width: 200 }}
        />
      ) : (
        item.name
      )}
    </div>
  )
}
