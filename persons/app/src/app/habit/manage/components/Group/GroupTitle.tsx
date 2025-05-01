import React from 'react'

import { TextInput } from '@/components'

import { useHabitGroupCRUD } from '@/api/generated/crud'

interface GroupTitleProps<I> {
  item: I
  onSuccess?: () => void
}

export const GroupTitle = <I extends { id: string, name: string }>(props: GroupTitleProps<I>) => {
  const { item, onSuccess } = props

  const { updateState } = useHabitGroupCRUD({
    list: false,
    update: {
      onSuccess: () => {
        onSuccess?.()
      },
    },
  })

  return (
    <TextInput
      value={item.name}
      onChange={name => {
        updateState.mutate(item.id, { name })
      }}
    />
  )
}
