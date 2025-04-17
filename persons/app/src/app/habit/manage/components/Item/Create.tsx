import { useRef } from 'react'
import { BetaSchemaForm, Button, type FormInstance, Modal, PlusOutlined } from '@/components'

import { CreateNums } from './CreateNums'
import { CreateFrequency } from './CreateFrequency'

import { useBoolean, useForm } from '@/hooks'
import { useHabitItemCRUD } from '@/api/generated/store'

interface CreateHabitProps {
  id?: string
  groupId: string
  initialValues?: any
  onSuccess?: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { id, initialValues = { enabled: true }, groupId, onSuccess } = props

  const { form, formValues, formProps } = useForm()

  const frequencyRef = useRef<FormInstance>(null)
  const numsRef = useRef<FormInstance>(null)

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
    await Promise.all([
      form.validateFields(),
      frequencyRef.current?.validateFields(),
      numsRef.current?.validateFields(),
    ])

    const values = form.getFieldsValue()

    if (id) {
      updateState.mutate(id, values)
      return
    }

    createState.mutate({
      groupId,
      sort: 99,
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
          onValuesChange={formProps.onValuesChange}
          columns={[
            {
              title: '启用',
              dataIndex: 'enabled',
              valueType: 'switch',
            },
            {
              title: '名称',
              dataIndex: 'name',
              formItemProps: {
                rules: [
                  { required: true },
                  { max: 8 },
                ],
              },
            },
            {
              dataIndex: 'frequency',
              renderFormItem: () => (
                <CreateFrequency ref={frequencyRef} />
              ),
            },
            {
              title: '数量',
              dataIndex: 'count',
              dependencies: ['frequency'],
              renderFormItem: () => (
                <CreateNums ref={numsRef} values={formValues} />
              ),
            },
          ]}
        />
      </Modal>
    </>
  )
}
