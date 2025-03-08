import { Popconfirm, message } from 'antd'

import { api } from '@/api/react'

interface DeleteProps {
  id: number
  onSuccess?: () => void
}

export const Delete = ({ id, onSuccess }: DeleteProps) => {
  const deleteState = api.habit.item.delete.useMutation({
    onSuccess: () => {
      message.success('删除成功')
      onSuccess?.()
    },
  })

  return (
    <Popconfirm
      title='确定要删除吗？'
      okText='确定'
      cancelText='取消'
      onConfirm={() => deleteState.mutate({ id })}
    >
      <span className='text-red-500 cursor-pointer'>删除</span>
    </Popconfirm>
  )
}
