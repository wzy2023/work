'use client'

import React from 'react'
import { Form, Select, Input, DatePicker, Button } from '@/components'

import { extractTagsFromFeeds, feedsToOptions } from '../../utils'
import { readStatusOptions, starredStatusOptions } from '../../consts'

import { api } from '@/api/react'

interface ItemSearchFormProps {
  form: any
  feeds: any[]
  onSearch: (values: Record<string, any>) => void
}

export const ItemSearchForm = (props: ItemSearchFormProps) => {
  const { form, feeds, onSearch } = props

  const aiSummaryState = api.custom.rssItem.aiSummary.useMutation()

  const allTags = extractTagsFromFeeds(feeds)

  const feedOptions = feedsToOptions(feeds)

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

      <Form.Item name='feedIds'>
        <Select
          placeholder='选择来源'
          options={feedOptions}
          mode='multiple'
          allowClear
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item name='tags'>
        <Select
          placeholder='选择标签'
          options={allTags}
          mode='multiple'
          allowClear
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item name='isRead'>
        <Select
          placeholder='阅读状态'
          options={readStatusOptions}
          allowClear
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item name='isStarred'>
        <Select
          placeholder='收藏状态'
          options={starredStatusOptions}
          allowClear
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item name='pubDate'>
        <DatePicker.RangePicker
          placeholder={['开始日期', '结束日期']}
          allowClear
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>搜索</Button>

        <Button style={{ marginLeft: 8 }} onClick={() => aiSummaryState.mutate()}>AI 摘要</Button>

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
      </Form.Item>
    </Form>
  )
}
