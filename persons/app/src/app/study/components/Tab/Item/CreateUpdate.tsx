import React, { useEffect } from 'react'

import {
  BetaSchemaForm,
  Button,
  Form,
  Modal,
  PlusOutlined,
  EditOutlined,
} from '@/components'

import { useBoolean } from '@/hooks'
import { useStudyItemCRUD } from '@/api/generated/crud'

interface FormValues {
  name?: string
  tags?: string[]
}

interface CreateUpdateProps {
  item?: any
  onSuccess: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { item, onSuccess } = props

  const [form] = Form.useForm<FormValues>()

  const [visible, { setTrue, setFalse }] = useBoolean(false)

  const { createState, updateState } = useStudyItemCRUD({
    list: false,
    create: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
        form.resetFields()
      },
    },
    update: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
      },
    },
  })

  // 编辑时初始化表单
  useEffect(() => {
    if (item && visible) {
      form.setFieldsValue({
        name: item.name,
        tags: item.tags,
      })
    } else {
      form.resetFields()
    }
  }, [form, item, visible])

  const onOk = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    if (item) {
      updateState.mutate(item.id, values)
    } else {
      createState.mutate(values)
    }
  }

  return (
    <>
      {item ? (
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={setTrue}
        />
      ) : (
        <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
          创建
        </Button>
      )}

      <Modal
        title={item ? '编辑' : '创建'}
        open={visible}
        onOk={onOk}
        onCancel={setFalse}
        confirmLoading={createState.isPending || updateState.isPending}
      >
        <BetaSchemaForm<FormValues>
          form={form}
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 4 }}
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
              valueType: 'text',
              fieldProps: {
                placeholder: '请输入项目名称',
              },
            },
            {
              title: '标签',
              dataIndex: 'tags',
              valueType: 'select',
              fieldProps: {
                mode: 'tags',
                placeholder: '输入标签后按回车',
              },
            },
          ]}
        />
      </Modal>
    </>
  )
}
