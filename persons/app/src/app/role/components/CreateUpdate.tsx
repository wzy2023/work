import React, { useEffect } from 'react'

import {
  Button,
  Form,
  Modal,
  Select,
  Input,
  Switch,
  PlusOutlined,
  Mentions,
} from '@/components'
import { useAiRoleCRUD, useAiInfoCRUD } from '@/api/generated/crud'
import { useBoolean } from '@/hooks'

interface FormValues {
  title: string
  content: string
  tags: string[]
  project?: string
  enabled: boolean
}

interface CreateUpdateProps {
  initialValues?: AiRole.Item & { enabled?: boolean }
  onSuccess?: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { initialValues, onSuccess } = props

  const [form] = Form.useForm<FormValues>()
  const [visible, { setTrue, setFalse }] = useBoolean(false)

  // 获取信息列表用于提及
  const { listState: infoListState } = useAiInfoCRUD({
    list: {
      query: {
        where: {
          enabled: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  const { createState, updateState } = useAiRoleCRUD({
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
    if (initialValues && visible) {
      form.setFieldsValue({
        title: initialValues.title,
        content: initialValues.content,
        tags: initialValues.tags as string[],
        project: initialValues.project || undefined,
        enabled: initialValues.enabled !== undefined ? initialValues.enabled : true,
      })
    } else {
      form.resetFields()
    }
  }, [form, initialValues, visible])

  const handleClose = () => {
    setFalse()
    form.resetFields()
  }

  const onOk = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    if (initialValues?.id) {
      // 编辑
      updateState.mutate(initialValues.id, values)
    } else {
      // 新建
      createState.mutate(values)
    }
  }

  // 信息列表选项
  const infoOptions = (infoListState.data || []).map((item: Info.Item) => ({
    key: item.id,
    value: item.title,
    label: item.title,
  }))

  return (
    <>
      {initialValues ? (
        <Button type='link' onClick={setTrue}>
          编辑
        </Button>
      ) : (
        <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
          添加角色
        </Button>
      )}

      <Modal
        title={initialValues ? '编辑角色' : '新建角色'}
        open={visible}
        onCancel={handleClose}
        onOk={onOk}
        confirmLoading={createState.isPending || updateState.isPending}
        width={600}
      >
        <Form
          form={form}
          layout='horizontal'
          labelCol={{ span: 3 }}
          initialValues={{ enabled: true }}
        >
          <Form.Item
            name='title'
            label='标题'
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input
              placeholder='请输入标题'
            />
          </Form.Item>

          <Form.Item
            name='content'
            label='内容'
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Mentions
              placeholder='请输入内容，输入 @ 可以提及信息项'
              autoSize={{ minRows: 5, maxRows: 15 }}
              options={infoOptions}
            />
          </Form.Item>

          <Form.Item
            name='tags'
            label='标签'
            rules={[{ required: true, message: '请添加标签' }]}
          >
            <Select
              placeholder='输入标签后按回车'
              mode='tags'
            />
          </Form.Item>

          <Form.Item
            name='project'
            label='项目'
          >
            <Select
              placeholder='请选择项目'
              showSearch
              allowClear
              options={infoOptions}
            />
          </Form.Item>

          <Form.Item
            name='enabled'
            label='状态'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
