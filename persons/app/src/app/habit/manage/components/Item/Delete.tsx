import { Popconfirm } from '@/components'

import { useHabitItemCRUD } from '@/api/generated/store'

interface DeleteProps {
  id: number
  onSuccess?: () => void
}

export const Delete = ({ id, onSuccess }: DeleteProps) => {
  const { removeState } = useHabitItemCRUD({
    remove: {
      onSuccess,
    },
  })

  return (
    <Popconfirm
      title='确定要删除吗？'
      okText='确定'
      cancelText='取消'
      onConfirm={() => removeState.mutate(id)}
    >
      <span className='text-red-500 cursor-pointer'>删除</span>
    </Popconfirm>
  )
}
