import React from 'react'
import { BetaSchemaForm, Button, PlusOutlined, type ProFormInstance } from '@/components'
import { usePromptCRUD } from '@/api/generated/crud'

interface CreateUpdateProps {
  initialValues?: any
  onSuccess?: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { initialValues, onSuccess } = props

  const formRef = React.useRef<ProFormInstance>(null)

  const title = initialValues ? '编辑' : '添加提示词'

  const { createState, updateState } = usePromptCRUD({
    list: false,
    create: {
      onSuccess,
    },
    update: {
      onSuccess,
    },
  })

  const onSubmit = async (values: any) => {
    if (initialValues?.id) {
      await updateState.mutateAsync(initialValues.id, values as any)
    } else {
      await createState.mutateAsync(values as any)
    }
    return true
  }

  return (
    <BetaSchemaForm
      layoutType='ModalForm'
      formRef={formRef}
      title={title}
      initialValues={initialValues}
      layout='horizontal'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 20 }}
      onFinish={onSubmit}
      columns={[
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          valueType: 'text',
          formItemProps: {
            rules: [{ required: true, message: '请输入标题' }],
          },
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          valueType: 'textarea',
          formItemProps: {
            rules: [{ required: true, message: '请输入内容' }],
          },
        },
        {
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
          valueType: 'select',
          fieldProps: {
            mode: 'tags',
            placeholder: '输入标签后按回车',
          },
          formItemProps: {
            rules: [{ required: true, message: '请添加标签' }],
          },
        },
        {
          title: 'Key',
          dataIndex: 'key',
          key: 'key',
          valueType: 'text',
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          valueType: 'select',
          fieldProps: {
            showSearch: true,
            allowClear: true,
          },
        },
      ]}
      trigger={(
        <Button
          type={initialValues ? 'link' : 'primary'}
          icon={initialValues ? null : <PlusOutlined />}
        >
          {title}
        </Button>
      )}
    />
  )
}
