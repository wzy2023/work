import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useModel, useParams } from '@umijs/max'

import { Button, Card, FormPro, Table, ProFormInstance, Tooltip, Select, Space } from '@/components'
import { useSetting } from '@/hooks'

import { Params } from '../../../types'
import { usePromptList } from '../hooks'

export const TextFormItem = (props: any) => {
  const { onChange } = props

  const { projectId } = useParams<Params>()

  const { aiChatState } = useModel('Project.Detail.Material.model')

  const [model, setModel] = useSetting(`prompt.${projectId}.model`, 'o1-mini')
  const { promptOptions, getDataById } = usePromptList()

  const formRef = useRef<ProFormInstance>()
  const [values, setValues] = useSetting(`prompt.${projectId}.values`, {})

  const [columns, setColumns] = useState<any[]>([])
  const [dataSource, setDataSource] = useState<{ content: string }[]>([])

  const content = useMemo(() => {
    const prompt = getDataById(values.prompt)

    return prompt?.columns.reduce((acc, item) => {
      acc = acc.replace(`{{ ${item.dataIndex} }}`, values[item.dataIndex] || item.initialValue || '')
      return acc
    }, prompt?.content || '')
  }, [values])

  useEffect(() => {
    if (!values?.prompt) {
      setColumns([])
      return
    }

    const prompt = getDataById(values.prompt)

    setColumns(prompt?.columns?.map(item => ({
      title: item.dataIndex,
      dataIndex: item.dataIndex,
      valueType: item.valueType,
      initialValue: item.initialValue,
      fieldProps: {
        options: item.options,
        optionType: 'button',
      },
    })) || [])

    formRef.current?.resetFields()
    formRef.current?.setFieldsValue(values)
  }, [values?.prompt])

  const onClickHandle = async () => {
    if (!values?.prompt) {
      return
    }
    setDataSource([])

    if (!content) {
      return
    }

    const data = await aiChatState.runAsync(content, model)
    setDataSource(data.map((item: any) => ({
      ...item,
      content: item.content?.replaceAll(' ', '\n'),
      model,
    })))
  }

  return (
    <>
      <FormPro
        formRef={formRef}
        layout='horizontal'
        submitter={false}
        labelCol={{ span: 3 }}
        onValuesChange={(_, allValues) => setValues(allValues)}
        columns={[
          {
            title: 'Prompt',
            dataIndex: 'prompt',
            valueType: 'radio',
            fieldProps: {
              options: promptOptions,
              optionType: 'button',
            },
          },
          ...columns,
        ]}
      />

      <Card
        size='small'
        extra={(
          <Space size='small'>
            <Select
              value={model}
              onChange={setModel}
              size='small'
              options={[
                { label: 'claude-3.5', value: 'claude-3-5-sonnet-20241022' },
                { label: 'o1-mini', value: 'o1-mini' },
                { label: 'gpt-4o', value: 'gpt-4o' },
              ]}
            />
            <Tooltip
              title={(
                <div style={{ whiteSpace: 'pre', overflow: 'auto' }}>
                  {content}
                </div>
              )}
            >
              <Button
                size='small'
                disabled={!values?.prompt && !values?.content}
                onClick={onClickHandle}
                loading={aiChatState.loading}
              >
                生成
              </Button>
            </Tooltip>
          </Space>
        )}
      >
        <Table
          rowKey='content'
          dataSource={dataSource}
          pagination={false}
          size='small'
          scroll={{ x: 'max-content' }}
          rowSelection={{
            type: 'checkbox',
            onChange: (_, selectedRows) => onChange(selectedRows),
          }}
          columns={[
            {
              title: '关键词',
              dataIndex: 'keyword',
              width: 120,
            },
            {
              title: '内容',
              dataIndex: 'content',
              render: (_, record) => <div style={{ whiteSpace: 'pre' }}>{record.content}</div>,
            },
          ]}
        />
      </Card>
    </>
  )
}
