import React, { useEffect } from 'react'

import {
  BetaSchemaForm,
  Button,
  Form,
  Drawer,
  PlusOutlined,
  EditOutlined,
} from '@/components'

import { useBoolean } from '@/hooks'
import { useAiInfoCRUD } from '@/api/generated/crud'

interface FormValues {
  title: string
  content: string
  key: string
  enabled: boolean
  tags?: string[]
}

interface CreateUpdateProps {
  item?: Ai.Info
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
        // handleClose()
        onSuccess?.()
        form.setFieldsValue({
          title: '',
          content: '',
        })
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
        content: item.content,
        enabled: item.enabled,
        tags: item.tags!,
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
          添加信息
        </Button>
      )}

      <Drawer
        title={item ? '编辑信息' : '新建信息'}
        open={visible}
        onClose={handleClose}
        width='80%'
        extra={
          <Button
            type='primary'
            onClick={onOk}
            loading={createState.isPending || updateState.isPending}
          >
            保存
          </Button>
        }
      >
        <BetaSchemaForm<FormValues>
          form={form}
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 1 }}
          columns={[
            {
              title: '状态',
              dataIndex: 'enabled',
              valueType: 'switch',
              initialValue: true,
            },
            {
              title: '标题',
              dataIndex: 'title',
              formItemProps: {
                rules: [{ required: true, message: '请输入标题' }],
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
            {
              title: '内容',
              dataIndex: 'content',
              valueType: 'textarea',
              fieldProps: {
                rows: 30,
              },
              formItemProps: {
                rules: [{ required: true, message: '请输入内容' }],
              },
            },
          ]}
        />
      </Drawer>
    </>
  )
}
