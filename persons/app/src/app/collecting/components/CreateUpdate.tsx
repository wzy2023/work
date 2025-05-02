import React, { useState } from 'react'

import { Button, Form, Modal, EditOutlined, PlusOutlined, BetaSchemaForm, UploadImage } from '@/components'

import { _ } from '@/utils'
import { CollectingType } from '@/api/types'
import { useCollectingCRUD } from '@/api/generated/crud'

interface CreateUpdateProps {
  type?: CollectingType
  item?: any
  onSuccess: (params?: any) => any
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { item, type = item.type, onSuccess } = props

  const [form] = Form.useForm<Collecting.Item>()

  const [visible, setVisible] = useState(false)

  const { createState, updateState } = useCollectingCRUD({
    list: false,
  })

  const isEdit = !!item
  const title = isEdit ? '编辑资料' : '添加资料'
  const currentType = isEdit ? item.type : type

  const showModal = () => {
    if (isEdit) {
      form.setFieldsValue(_.omit(item, ['id']))
    } else {
      form.setFieldsValue({ type: currentType })
    }
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  const onSubmit = async () => {
    const values = await form.validateFields()

    if (isEdit) {
      await updateState.mutateAsync(item.id, values as any)
    } else {
      await createState.mutateAsync(values as any)
    }

    setVisible(false)
    form.resetFields()

    onSuccess()
  }

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        [CollectingType.Url]: { text: '网址' },
        [CollectingType.Prompt]: { text: '提示词' },
        [CollectingType.Copy]: { text: '文案' },
      },
      fieldProps: {
        disabled: !!currentType,
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择类型' }],
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '请输入标题' }],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      fieldProps: {
        rows: 2,
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      fieldProps: {
        rows: 4,
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入内容' }],
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
      formItemProps: {
        rules: [{ required: true, message: '请添加至少一个标签' }],
      },
    },
    ...(type !== CollectingType.Prompt ? [] : [
      {
        title: '示例',
        dataIndex: 'images',
        renderFormItem: () => {
          return (
            <UploadImage />
          )
        },
      },
    ]),
  ]

  return (
    <>
      <Button
        type={isEdit ? 'text' : 'primary'}
        icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      />

      <Modal
        title={title}
        open={visible}
        onCancel={onCancel}
        onOk={onSubmit}
      >
        <BetaSchemaForm
          layoutType='Form'
          form={form}
          columns={columns}
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 4 }}
          initialValues={{ type: currentType }}
        />
      </Modal>
    </>
  )
}
