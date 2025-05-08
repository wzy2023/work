import React, { useEffect } from 'react'

import {
  BetaSchemaForm,
  Button,
  Form,
  Modal,
  PlusOutlined,
} from '@/components'

import { useBoolean } from '@/hooks'
import { useAiInfoCRUD } from '@/api/generated/crud'

interface FormValues {
  title: string
  content?: string
  key: string
  enabled: boolean
}

interface CreateUpdateProps {
  item?: Info.Item
  onSuccess: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { item, onSuccess } = props

  const [form] = Form.useForm<FormValues>()

  const [visible, { setTrue, setFalse }] = useBoolean(false)

  const { createState, updateState } = useAiInfoCRUD({
    list: false,
    create: {
      onSuccess: () => {
        handleClose()
        onSuccess?.()
      },
    },
    update: {
      onSuccess: () => {
        handleClose()
        onSuccess?.()
      },
    },
  })

  // 编辑时初始化表单
  useEffect(() => {
    if (item && visible) {
      form.setFieldsValue({
        title: item.title,
        content: item.content || undefined,
        key: item.key || '',
        enabled: item.enabled,
      })
    } else {
      form.resetFields()
    }
  }, [form, item, visible])

  const handleClose = () => {
    setFalse()
    form.resetFields()
  }

  const onOk = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    if (item) {
      // 编辑
      updateState.mutate(item.id, values)
    } else {
      // 新建
      createState.mutate(values)
    }
  }

  return (
    <>
      {item ? (
        <Button type='link' onClick={setTrue}>
          编辑
        </Button>
      ) : (
        <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
          添加信息
        </Button>
      )}

      <Modal
        title={item ? '编辑信息' : '新建信息'}
        open={visible}
        onCancel={handleClose}
        onOk={onOk}
        confirmLoading={createState.isPending || updateState.isPending}
      >
        <BetaSchemaForm<FormValues>
          form={form}
          submitter={false}
          layout='horizontal'
          columns={[
            {
              title: '标题',
              dataIndex: 'title',
              formItemProps: {
                rules: [{ required: true, message: '请输入标题' }],
              },
            },
            {
              title: '内容',
              dataIndex: 'content',
              valueType: 'textarea',
              fieldProps: {
                rows: 10,
              },
              formItemProps: {
                rules: [{ required: true, message: '请输入标题' }],
              },
            },
            {
              title: '状态',
              dataIndex: 'enabled',
              valueType: 'switch',
              initialValue: true,
            },
          ]}
        />
      </Modal>
    </>
  )
}
