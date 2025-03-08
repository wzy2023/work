import { Button, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BetaSchemaForm } from '@ant-design/pro-components'

import { useBoolean } from 'ahooks'
import { api } from '@/api/react'

interface CreateHabitProps {
  habitGroupId: number
  onSubmit: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { habitGroupId, onSubmit } = props

  const [form] = Form.useForm()

  const [visible, { setFalse, setTrue }] = useBoolean()

  const createState = api.habit.item.create.useMutation({
    onSuccess: () => {
      onSubmit()
    },
  })

  const onOk = (values: any) => {
    createState.mutate({
      ...values,
      habitGroupId,
    })
  }

  return (
    <>
      <div className='text-center'>
        <Button
          type='dashed'
          shape='circle'
          icon={<PlusOutlined />}
          className='w-16 h-16 text-2xl shadow-sm hover:shadow-md transition-shadow'
          onClick={setTrue}
        />
      </div>

      <Modal title='新建习惯' open={visible} onOk={onOk} onCancel={setFalse}>
        <BetaSchemaForm
          form={form}
          submitter={false}
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
              formItemProps: { rules: [{ required: true }] },
            },
          ]}
        />
      </Modal>
    </>
  )
}
