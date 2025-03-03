import { useState } from 'react'

import { Button, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BetaSchemaForm } from '@ant-design/pro-components'

import { useBoolean } from 'ahooks'
import { api } from '@/trpc/react'

interface CreateButtonProps {
  onSuccess?: () => void
}

interface Values {
  name: string
}

export const CreateButton = (props: CreateButtonProps) => {
  const { onSuccess } = props

  const [isModalOpen, { setTrue, setFalse }] = useBoolean(false)

  const [values, setValues] = useState<Values>()

  const createState = api.habitGroup.create.useMutation({
    onSuccess: () => {
      message.success('创建成功')
      onSuccess?.()
    },
  })

  const onOk = async () => {
    if (!values) {
      return
    }
    await createState.mutateAsync(values)
    setFalse()
  }

  return (
    <>
      <Modal title='创建分组' open={isModalOpen} onCancel={setFalse} onOk={onOk}>
        <BetaSchemaForm<Values>
          submitter={false}
          onValuesChange={(_, values) => setValues(values)}
          columns={[
            {
              title: '标题',
              dataIndex: 'name',
            },
          ]}
        />
      </Modal>

      <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
        添加习惯分组
      </Button>
    </>
  )
}
