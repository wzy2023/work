import React, { useEffect, useState, useMemo } from 'react'

import {
  Button,
  Form,
  Drawer,
  Select,
  Input,
  Switch,
  PlusOutlined,
  Mentions,
  Tabs,
  Markdown, EditOutlined,
} from '@/components'
import { useAiRoleCRUD, useAiInfoCRUD } from '@/api/generated/crud'
import { useBoolean } from '@/hooks'

interface FormValues {
  title: string
  content: string
  tags: string[]
  // project?: string
  enabled: boolean
}

interface CreateUpdateProps {
  initialValues?: Ai.Role
  onSuccess?: () => void
}

export const CreateUpdate = (props: CreateUpdateProps) => {
  const { initialValues, onSuccess } = props

  const [form] = Form.useForm<FormValues>()

  const [visible, { setTrue, setFalse }] = useBoolean(false)

  const [activeTab, setActiveTab] = useState<string>('edit')

  const [content, setContent] = useState<string>('')

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

  // 使用 useMemo 计算预览内容，替换@开头的信息名称为实际内容
  const previewContent = useMemo(() => {
    let processedContent = content
    const infoList = infoListState.data || []

    if (content && infoList.length > 0) {
      // 修正正则表达式，匹配@开头直到换行符的内容，可以包含空格
      const mentionRegex = /@([^\n@]+?)(?=\n|@|$)/g

      // 替换所有@信息名称为实际内容
      processedContent = content.replace(mentionRegex, (match, title) => {
        const trimmedTitle = title.trim()
        const info = infoList.find(info => info.title === trimmedTitle)
        return info ? info.content || match : match
      })
    }

    return processedContent
  }, [content, infoListState.data])

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
      const values = {
        title: initialValues.title,
        content: initialValues.content,
        tags: initialValues.tags || [],
        project: initialValues.project || undefined,
        enabled: initialValues.enabled !== undefined ? initialValues.enabled : true,
      }

      form.setFieldsValue(values)
      setContent(values.content)
    } else {
      form.resetFields()
      setContent('')
    }
  }, [form, initialValues, visible])

  const handleClose = () => {
    setFalse()
    form.resetFields()
    setActiveTab('edit')
    setContent('')
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

  const handleContentChange = (text: string) => {
    setContent(text)
    form.setFieldValue('content', text)
  }

  // 信息列表选项
  const infoOptions = (infoListState.data || []).map((item: Ai.Info) => ({
    key: item.id,
    value: item.title,
    label: item.title,
  }))

  return (
    <>
      {initialValues ? (
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={setTrue}
        />
      ) : (
        <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
          添加角色
        </Button>
      )}

      <Drawer
        title={initialValues ? '编辑角色' : '新建角色'}
        open={visible}
        onClose={handleClose}
        width="80%"
        extra={
          <Button
            type="primary"
            onClick={onOk}
            loading={createState.isPending || updateState.isPending}
          >
            保存
          </Button>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'edit',
              label: '编辑',
              children: (
                <Form
                  form={form}
                  layout='horizontal'
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 21 }}
                  initialValues={{ enabled: true }}
                >

                  <Form.Item
                    name='enabled'
                    label='状态'
                    valuePropName='checked'
                  >
                    <Switch />
                  </Form.Item>

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
                    name='tags'
                    label='标签'
                    rules={[{ required: true, message: '请添加标签' }]}
                  >
                    <Select
                      placeholder='输入标签后按回车'
                      mode='tags'
                    />
                  </Form.Item>

                  {/*<Form.Item*/}
                  {/*  name='project'*/}
                  {/*  label='项目'*/}
                  {/*>*/}
                  {/*  <Select*/}
                  {/*    placeholder='请选择项目'*/}
                  {/*    showSearch*/}
                  {/*    allowClear*/}
                  {/*    options={infoOptions}*/}
                  {/*  />*/}
                  {/*</Form.Item>*/}

                  <Form.Item
                    name='content'
                    label='内容'
                    rules={[{ required: true, message: '请输入内容' }]}
                  >
                    <Mentions
                      placeholder='请输入内容，输入 @ 可以提及信息项'
                      autoSize={{ minRows: 15, maxRows: 27 }}
                      options={infoOptions}
                      onChange={handleContentChange}
                    />
                  </Form.Item>
                </Form>
              )
            },
            {
              key: 'preview',
              label: '预览',
              children: (
                <div className='p-4 border rounded-md bg-white overflow-y-auto h-[830px]'>
                  <Markdown content={previewContent} />
                </div>
              )
            }
          ]}
        />
      </Drawer>
    </>
  )
}
