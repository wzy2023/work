import { BetaSchemaForm, Modal, SectorButton } from '@/components'

import { typeOptions } from '@/enums'
import { useBoolean, useForm } from '@/hooks'
import { useButtonItemCRUD } from '@/api/generated/crud'
import { ButtonsType } from '@/api/types'

interface CreateHabitProps {
  id?: string
  groupId?: string
  initialValues?: any
  onSuccess?: () => void
}

export const Create = (props: CreateHabitProps) => {
  const { id, initialValues = {}, groupId, onSuccess } = props

  const { form, formProps } = useForm()

  const [visible, { setFalse, setTrue }] = useBoolean()

  const { createState, updateState } = useButtonItemCRUD({
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
        <SectorButton<ButtonsType>
          rectWidth={50}
          rectHeight={32}
          sectors={[
            { id: ButtonsType.Copy },
            { id: ButtonsType.Command },
          ]}
          onClick={async (type: ButtonsType) => {
            if (!groupId) {
              return
            }

            if (type === ButtonsType.Command) {
              setTrue()
              form.setFieldsValue({ type })

            } else {
              const content = await navigator.clipboard.readText()
              if (!content) {
                return
              }
              createState.mutate({
                groupId,
                sort: 99,
                type: ButtonsType.Copy,
                content,
              })
            }
          }}
        />
      )}

      <Modal title={id ? `修改按钮` : '新建按钮'} open={visible} onOk={onOk} onCancel={setFalse}>
        <BetaSchemaForm
          form={form}
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 4 }}
          initialValues={initialValues}
          onValuesChange={formProps.onValuesChange}
          columns={[
            {
              title: '类型',
              dataIndex: 'type',
              valueType: 'radio',
              fieldProps: {
                optionType: 'button',
                buttonStyle: 'solid',
                options: typeOptions,
              },
              formItemProps: {
                rules: [{ required: true }],
              },
            },
            {
              title: '标题',
              dataIndex: 'title',
            },
            {
              title: '内容',
              dataIndex: 'content',
              valueType: 'textarea',
              fieldProps: {
                rows: 5,
              },
              formItemProps: {
                rules: [{ required: true }],
              },
            },
          ]}
        />
      </Modal>
    </>
  )
}
