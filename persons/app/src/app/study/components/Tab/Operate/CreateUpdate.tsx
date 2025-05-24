import { useEffect } from 'react'

import { BetaSchemaForm, Button, Form, Modal, PlusOutlined, EditOutlined } from '@/components'

import { _ } from '@/utils'
import { useBoolean } from '@/hooks'
import { modelOptions } from '@/consts'
import { contentTypeOptions, viewTypeOptions } from '@/enums'

import { useStudyOperateCRUD } from '@/api/generated/crud'

type CreateUpdateProps = {
  data?: Study.Operate
  onSuccess?: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { data, onSuccess } = props

  const isEdit = !!data

  const [form] = Form.useForm<Study.CreateValues>()

  const [isModalOpen, { setTrue, setFalse }] = useBoolean(false)

  const { createState, updateState } = useStudyOperateCRUD({
    list: false,
    create: {
      onSuccess: () => {
        setFalse()
        form.resetFields()
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

  // 编辑时填充表单数据
  useEffect(() => {
    if (isModalOpen && data) {
      form.setFieldsValue(_.pick(data, ['name', 'contentType', 'viewType', 'input', 'output', 'model', 'prompt']))
    }
  }, [isModalOpen, data, form])

  const onOk = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    if (isEdit && data) {
      updateState.mutate(data.id, values)
    } else {
      createState.mutate(values)
    }
  }

  const onCancel = () => {
    setFalse()
    if (!isEdit) {
      form.resetFields()
    }
  }

  return (
    <>
      <Modal
        title={isEdit ? '编辑' : '创建'}
        open={isModalOpen}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={createState.isPending || updateState.isPending}
        width={600}
      >
        <BetaSchemaForm
          form={form}
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
              formItemProps: {
                rules: [{ required: true, message: '请输入名称' }],
              },
            },
            {
              title: '内容类型',
              dataIndex: 'contentType',
              valueType: 'radioButton',
              fieldProps: {
                options: contentTypeOptions,
              },
              formItemProps: {
                rules: [{ required: true, message: '请选择内容类型' }],
              },
            },
            {
              title: '查看类型',
              dataIndex: 'viewType',
              valueType: 'radioButton',
              fieldProps: {
                options: viewTypeOptions,
              },
              formItemProps: {
                rules: [{ required: true, message: '请选择查看类型' }],
              },
            },
            {
              title: '输入字段',
              dataIndex: 'input',
              valueType: 'text',
              fieldProps: {
                rows: 4,
                placeholder: '请输入输入字段（可选）',
              },
            },
            {
              title: '输出字段',
              dataIndex: 'output',
              valueType: 'text',
              fieldProps: {
                rows: 4,
                placeholder: '请输入输出字段',
              },
              formItemProps: {
                rules: [{ required: true, message: '请输入输出字段' }],
              },
            },
            {
              title: '模型',
              dataIndex: 'model',
              valueType: 'select',
              fieldProps: {
                options: modelOptions,
              },
            },
            {
              title: '提示词',
              dataIndex: 'prompt',
              valueType: 'textarea',
            },
          ]}
        />
      </Modal>

      {isEdit ? (
        <Button
          type='text'
          size='small'
          icon={<EditOutlined />}
          onClick={setTrue}
        />
      ) : (
        <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
          创建
        </Button>
      )}
    </>
  )
}
