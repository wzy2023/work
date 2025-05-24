import { Button, Popconfirm, DeleteOutlined } from '@/components'

import { useStudyOperateCRUD } from '@/api/generated/crud'

type RemoveProps = {
  id: string
  onSuccess?: () => void
}

export const Remove = (props: RemoveProps) => {
  const { id, onSuccess } = props

  const { removeState } = useStudyOperateCRUD({
    list: false,
    remove: {
      onSuccess: () => {
        onSuccess?.()
      },
    },
  })

  const onConfirm = () => {
    removeState.mutate(id)
  }

  return (
    <Popconfirm
      title='确定要删除吗?'
      onConfirm={onConfirm}
      okText='确定'
      cancelText='取消'
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
