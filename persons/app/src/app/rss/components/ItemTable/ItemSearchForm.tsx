'use client'

import React from 'react'
import { Form, Select, Input, Button, Radio, message } from '@/components'

import { extractTagsFromFeeds } from '../../utils'
import { readStatusOptions, starredStatusOptions } from '../../consts'

import { api } from '@/api/react'

interface ItemSearchFormProps {
  form: any
  feeds: any[]
  onSearch: (values: Record<string, any>) => void
}

export const ItemSearchForm = (props: ItemSearchFormProps) => {
  const { form, feeds, onSearch } = props

  const aiSummaryState = api.custom.rssItem.aiSummary.useMutation({
    onSuccess: res => {
      message.success(res.message)
    },
  })

  const markAllAsReadState = api.custom.rssItem.markAllAsRead.useMutation({
    onSuccess: () => {
      onSearch(form.getFieldsValue())
    }
  })

  const allTags = extractTagsFromFeeds(feeds)

  return (
    <Form
      form={form}
      layout='inline'
      onFinish={(values: Record<string, any>) => {
        onSearch(values)
      }}
    >
      <Form.Item name='search'>
        <Input placeholder='搜索标题或内容' allowClear />
      </Form.Item>

      <Form.Item name='tags'>
        <Select
          placeholder='选择来源标签'
          options={allTags}
          mode='multiple'
          allowClear
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item name='isRead'>
        <Radio.Group
          options={readStatusOptions}
          optionType='button'
          buttonStyle='solid'
        />
      </Form.Item>

      <Form.Item name='isStarred'>
        <Radio.Group
          options={starredStatusOptions}
          optionType='button'
          buttonStyle='solid'
        />
      </Form.Item>

      {/* 注释掉日期筛选相关的代码
      <Form.Item name='pubDate'>
        <DatePicker.RangePicker
          placeholder={['开始日期', '结束日期']}
          allowClear
        />
      </Form.Item>
      */}

      <Form.Item>
        <Button type='primary' htmlType='submit'>搜索</Button>

        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            form.resetFields();
            setTimeout(() => {
              onSearch(form.getFieldsValue());
            }, 0);
          }}
        >
          重置
        </Button>

        <Button
          style={{ marginLeft: 8 }}
          onClick={() => aiSummaryState.mutate()}
          loading={aiSummaryState.isPending}
        >
          AI 摘要
        </Button>

        <Button
          style={{ marginLeft: 8 }}
          onClick={() => markAllAsReadState.mutate()}
          loading={markAllAsReadState.isPending}
        >
          全部标为已读
        </Button>
      </Form.Item>
    </Form>
  )
}
