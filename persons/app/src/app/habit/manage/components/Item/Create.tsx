import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, message, Modal } from 'antd'
import { BetaSchemaForm } from '@ant-design/pro-components'

import { CreateNums } from './CreateNums'
import { CreateFrequency } from './CreateFrequency'

import { useBoolean } from 'ahooks'
import { api } from '@/api/react'

interface CreateHabitProps {
  id?: number
  groupId: number
  initialValues?: any
  onSubmit: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { id, initialValues, groupId, onSubmit } = props

  const [form] = Form.useForm()

  const [visible, { setFalse, setTrue }] = useBoolean()

  const createState = api.habit.item.create.useMutation({
    onSuccess: () => {
      message.success('创建成功')
      setFalse()
      onSubmit()
    },
  })

  const updateState = api.habit.item.update.useMutation({
    onSuccess: () => {
      message.success('修改成功')
      setFalse()
      onSubmit()
    },
  })

  const onOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()

    if (id) {
      updateState.mutate({ id, data: values })
      return
    }

    createState.mutate({
      groupId,
      sort: 99999,
      ...values,
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

      <Modal title={id ? '修改习惯 ' + id : '新建习惯'} open={visible} onOk={onOk} onCancel={setFalse}>
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
            {
              title: '频率',
              dataIndex: 'frequency',
              renderFormItem: () => <CreateFrequency />,
            },
            {
              title: '数量',
              dataIndex: 'count',
              renderFormItem: () => <CreateNums />,
            },
          ]}
        />
      </Modal>
    </>
  )
}
