import { Button, Popconfirm, DeleteOutlined } from '@/components'

import { useStudyItemCRUD } from '@/api/generated/crud'

interface RemoveProps {
  id: string
  onSuccess?: () => void
}

export const Remove = (props: RemoveProps) => {
  const { id, onSuccess } = props

  const { removeState } = useStudyItemCRUD({
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
      <Button
        type='text'
        danger
        icon={<DeleteOutlined />}
        loading={removeState.isPending}
      />
    </Popconfirm>
  )
}
