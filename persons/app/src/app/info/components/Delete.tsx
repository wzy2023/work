import React from 'react'

import { Button, Popconfirm, DeleteOutlined } from '@/components'

import { useAiInfoCRUD } from '@/api/generated/crud'

interface DeleteProps {
  id: string
  onSuccess: () => void
}

export const Delete = (props: DeleteProps) => {
  const { id, onSuccess } = props

  const { removeState } = useAiInfoCRUD({
    list: false,
    remove: {
      onSuccess,
    },
  })

  const onDelete = () => {
    removeState.mutate(id)
  }

  return (
    <Popconfirm
      title="确定删除该信息吗？"
      onConfirm={onDelete}
      okText="确定"
      cancelText="取消"
    >
      <Button type="link" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
