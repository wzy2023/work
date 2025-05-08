'use client'

import React, { useEffect, useState } from 'react'

import { Form, Input, Select, Modal, message } from '@/components'
import { UrlFormItem } from './UrlFormItem'

import { useRssFeed } from '../../hooks'
import { frequencyOptions } from '../../consts'
import { extractTagsFromFeeds } from '../../utils'

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

  const [batchUrls, setBatchUrls] = useState<string[]>([])
  const [isBatchMode, setIsBatchMode] = useState(false)

  // 获取所有RSS源数据，用于提取已有标签
  const { feeds, createFeed } = useRssFeed()

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

      if (isBatchMode && batchUrls.length > 0) {
        // 批量模式处理
        await handleBatchSubmit(values)
      } else {
        // 单个添加/编辑模式
        await onSubmit(values)
      }
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 处理批量提交
  const handleBatchSubmit = async (values: any) => {
    if (batchUrls.length === 0) {
      message.warning('请至少输入一个有效的RSS链接')
      return
    }

    try {
      const results = { success: 0, fail: 0 }

      // 批量提交
      for (const [index, item] of batchUrls.entries()) {
        const [name, url] = item.split(' - ')

        message.loading(`正在批量添加 ${index} / ${batchUrls.length} 个RSS订阅...`, 0)

        try {
          const feedData = {
            name: `${values.name || ''}${name || ''}`,
            url,
            frequency: values.frequency,
            tags: values.tags || [],
          }
          await createFeed(feedData)
          results.success++

        } catch (err) {
          console.error(`添加RSS失败: ${url}`, err)
          results.fail++
        }
      }

      // 显示结果
      if (results.success > 0) {
        message.success(`成功添加 ${results.success} 个RSS订阅`)
      }

      if (results.fail > 0) {
        message.error(`${results.fail} 个RSS订阅添加失败`)
      }

      // 关闭弹窗
      onCancel()
    } catch (error) {
      message.error('批量添加失败')
      console.error('批量添加失败:', error)
    }
  }

  // 监听批量URL变化
  const handleBatchUrlsChange = (urls: string[]) => {
    setBatchUrls(urls)
    setIsBatchMode(urls.length > 0)
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
          label={isBatchMode ? '名称前缀' : '名称'}
          rules={[{ required: !isBatchMode, message: '请输入RSS名称' }]}
        >
          <Input placeholder="请输入RSS名称" />
        </Form.Item>

        <Form.Item
          name="url"
          label="RSS链接"
          rules={[{ required: !isBatchMode, message: '请输入RSS链接' }]}
        >
          <UrlFormItem currentId={currentId} onBatchChange={handleBatchUrlsChange} />
        </Form.Item>

        {isBatchMode && (
          <div style={{ marginBottom: 16, padding: 8, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
            <div>批量模式说明:</div>
            <ul style={{ marginLeft: 20, marginBottom: 0 }}>
              <li>识别到 {batchUrls.length} 个链接</li>
              <li>名称将自动使用&#34;输入名称 - 链接末尾标识&#34;命名</li>
              <li>所有链接将使用相同的抓取频率和标签</li>
            </ul>
          </div>
        )}

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
