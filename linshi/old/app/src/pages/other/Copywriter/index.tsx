import React from 'react'
import { Button, Crud, FormPro, PageContainer, Upload, UploadOutlined, message } from '@/components'

import { copywriter } from '@/apis'
import { removeSimilarDuplicates, uniq } from '@/utils'

import { processFile, processText } from './utils'

export default () => {

  const onSubmit = async (values: any) => {
    const files = values?.fileList?.fileList || []

    const arr = (await Promise.all(files.map(processFile))).map(processText).flat()
    const arrFilter = removeSimilarDuplicates(uniq(arr), 5)

    message.success(`总数：${arr.length} 条，去重后：${arrFilter.length} 条`, 5)

    const batchSize = 3000
    const totalBatches = Math.ceil(arrFilter.length / batchSize)
    for (let i = 0; i < totalBatches; i++) {
      const batch = arrFilter.slice(i * batchSize, (i + 1) * batchSize)
      await copywriter.create(batch.map(text => ({ text })))
      message.success(`第 ${i + 1} 、 ${totalBatches} 执行完成`)
    }
  }

  return (
    <PageContainer>
      <Crud
        apis={copywriter}
        columns={[
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
          },
          {
            title: '内容',
            dataIndex: 'text',
            validator: ['require', ['unique', '该 text 已存在']],
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'dateRange',
            hideInTable: true,
            hideInForm: true,
            search: {
              transform: (value) => ({
                createAt: {
                  type: 'gtlt',
                  value: value.map((item: any) => item.$d.getTime()),
                },
              }),
            },
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: '操作',
            key: 'option',
            valueType: 'option',
          },
        ]}
        toolBarRender={() => [
          <FormPro
            layout='horizontal'
            layoutType='ModalForm'
            title='从文件导入'
            labelCol={{ span: 4 }}
            onFinish={onSubmit}
            columns={[
              {
                title: '选择文件',
                dataIndex: 'fileList',
                renderFormItem: () => (
                  <Upload
                    multiple
                    beforeUpload={() => false}
                  >
                    {/* @ts-ignore */}
                    <Button icon={<UploadOutlined />}>Upload DOCX files</Button>
                  </Upload>
                ),
              },
            ]}
            trigger={(
              <Button>从文件导入</Button>
            )}
          />,
        ]}
      />
    </PageContainer>
  )
}
