import React from 'react'
import { Button, DeleteOutlined } from '@/components'
import { useCollectingCRUD } from '@/api/generated/crud'

interface DeleteProps {
  id: string
  onSuccess: () => void
}

export const Delete = (props: DeleteProps) => {
  const { id, onSuccess } = props

  const { removeState } = useCollectingCRUD({
    list: false,
    remove: {
      onSuccess,
    },
  })

  return (
    <Button
      type='text'
      danger
      icon={<DeleteOutlined />}
      onClick={() => removeState.mutate(id)}
    />
  )
}
