import { BetaSchemaForm, Button, Form, Modal, PlusOutlined } from '@/components'

import { CreateNums } from './CreateNums'
import { CreateFrequency } from './CreateFrequency'

import { useBoolean } from 'ahooks'
import { useHabitItemCRUD } from '@/api/generated/store'

interface CreateHabitProps {
  id?: number
  groupId: number
  initialValues?: any
  onSuccess?: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { id, initialValues = { enable: true }, groupId, onSuccess } = props

  const [form] = Form.useForm()

  const [visible, { setFalse, setTrue }] = useBoolean()

  const { createState, updateState } = useHabitItemCRUD({
    list: false,
    create: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
      },
    },
    update: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
      },
    },
  })

  const onOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()

    if (id) {
      updateState.mutate(id, values)
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

      <Modal title={id ? `修改 [${initialValues.name}]` : '新建习惯'} open={visible} onOk={onOk} onCancel={setFalse}>
        <BetaSchemaForm
          form={form}
          submitter={false}
          initialValues={initialValues}
          columns={[
            {
              title: '启用',
              dataIndex: 'enable',
              valueType: 'switch',
            },
            {
              title: '名称',
              dataIndex: 'name',
              formItemProps: { rules: [{ required: true }] },
            },
            {
              dataIndex: 'frequency',
              renderFormItem: () => <CreateFrequency />,
              formItemProps: {
                rules: [
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.reject('请选择频率')
                      }
                      return Promise.resolve()
                    },
                  },
                ],
              },
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
