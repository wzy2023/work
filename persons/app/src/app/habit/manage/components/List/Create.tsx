import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Form, message } from 'antd'
import { BetaSchemaForm } from '@ant-design/pro-components'

import { useBoolean } from 'ahooks'
import { api } from '@/api/react'

interface CreateHabitProps {
  id?: number
  habitGroupId: number
  initialValues?: any
  onSubmit: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { id, initialValues, habitGroupId, onSubmit } = props

  const [form] = Form.useForm()

  const [visible, { setFalse, setTrue }] = useBoolean()

  const createState = api.habit.item.create.useMutation({
    onSuccess: () => {
      message.success('创建成功')
      onSubmit()
    },
  })

  const updateState = api.habit.item.update.useMutation({
    onSuccess: () => {
      message.success('修改成功')
      onSubmit()
    },
  })

  const onOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()

    if (id) {
      updateState.mutate({
        id: 1,
        data: values,
      })
      return
    }

    createState.mutate({
      ...values,
      habitGroupId,
    })
  }

  return (
    <>
      {id ? (
        <span onClick={setTrue}>
          修改
        </span>
      ) : (
        <Button
          type='dashed'
          shape='circle'
          size='large'
          icon={<PlusOutlined />}
          onClick={setTrue}
        />
      )}

      <Modal title={id ? '修改习惯' : '新建习惯'} open={visible} onOk={onOk} onCancel={setFalse}>
        <BetaSchemaForm
          form={form}
          submitter={false}
          initialValues={initialValues}
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
