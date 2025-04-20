import React from 'react'
import { Button, Crud, FormPro } from '@/components'
import { lotteryRule } from '@/apis'
import { useRequestPro } from '@/hooks'

export default () => {
  const initialValues = {
    minSize: 3,
    content: 'a+b+c',
  }

  const { runAsync: onClickBatch } = useRequestPro(lotteryRule.batch, {
    manual: true,
    alertSuccessMessage: true,
  })

  return (
    <Crud
      name='规则'
      search={false}
      initialValues={initialValues}
      apis={lotteryRule}
      columns={({ isCreate }) => ([
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: '算法内容',
          dataIndex: 'content',
          validator: [
            'require',
            isCreate ? ['unique', '该算法内容已存在'] : null,
          ],
        },
        {
          title: '最少号码数量',
          dataIndex: 'minSize',
          validator: ['require'],
          valueType: 'digit',
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
        },
      ])}
      toolBarRender={() => [
        <FormPro
          layout='horizontal'
          layoutType='ModalForm'
          title='批量创建'
          labelCol={{ span: 4 }}
          initialValues={{
            num: 10000,
            minSize: 3,
            size: 4,
            remark: (new Date()).toString(),
          }}
          onFinish={async (values: any) => {
            await onClickBatch(values)
            return Promise.resolve(true)
          }}
          columns={[
            {
              title: '数量',
              dataIndex: 'num',
              valueType: 'digit',
            },
            {
              title: '最少号码数量',
              dataIndex: 'minSize',
              valueType: 'digit',
            },
            {
              title: '规则长度',
              dataIndex: 'size',
              valueType: 'digit',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              valueType: 'textarea',
            },
          ]}
          trigger={(
            <Button onClick={undefined}>批量新建</Button>
          )}
        />,
      ]}
    />
  )
}
