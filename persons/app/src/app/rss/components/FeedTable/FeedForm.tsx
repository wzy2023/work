'use client'

import React, { useEffect } from 'react'
import { Form, Input, Select, Modal } from '@/components'
import { frequencyOptions } from '../../consts'
import { extractTagsFromFeeds } from '../../utils'
import { useRssFeed } from '../../hooks'
import { UrlFormItem } from './UrlFormItem'
import { RssFrequency } from '@/api/types'

interface FeedFormProps {
  visible: boolean
  currentId?: string
  record?: any
  onCancel: () => void
  onSubmit: (values: any) => Promise<void>
}

export const FeedForm = (props: FeedFormProps) => {
  const { visible, currentId, record, onCancel, onSubmit } = props
  const [form] = Form.useForm()

  // 获取所有RSS源数据，用于提取已有标签
  const { feeds } = useRssFeed()

  // 从所有feeds中提取标签列表
  const allTags = extractTagsFromFeeds(feeds || [])

  // 当编辑记录变化时，设置表单值
  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue({
        name: record.name,
        url: record.url,
        frequency: record.frequency,
        tags: record.tags || [],
      })
    } else {
      form.resetFields()
    }
  }, [visible, record, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await onSubmit(values)
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <Modal
      title={currentId ? '编辑RSS订阅' : '添加RSS订阅'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          frequency: RssFrequency.Minutes10,
        }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入RSS名称' }]}
        >
          <Input placeholder="请输入RSS名称" />
        </Form.Item>

        <Form.Item
          name="url"
          label="RSS链接"
          rules={[{ required: true, message: '请输入RSS链接' }]}
        >
          <UrlFormItem />
        </Form.Item>

        <Form.Item
          name="frequency"
          label="抓取频率"
          rules={[{ required: true, message: '请选择抓取频率' }]}
        >
          <Select
            placeholder="请选择抓取频率"
            options={frequencyOptions}
          />
        </Form.Item>

        <Form.Item
          name="tags"
          label="标签"
        >
          <Select
            mode="tags"
            placeholder="请输入标签，按回车确认"
            options={allTags}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
