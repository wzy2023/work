import { Popconfirm } from '@/components'

import { useButtonItemCRUD } from '@/api/generated/crud'

interface DeleteProps {
  id: string
  onSuccess?: () => void
}

export const Delete = (props: DeleteProps) => {
  const { id, onSuccess } = props

  const { removeState } = useButtonItemCRUD({
    list: false,
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
      <span>删除</span>
    </Popconfirm>
  )
}
