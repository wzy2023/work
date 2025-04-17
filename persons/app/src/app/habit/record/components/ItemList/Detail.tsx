import { forwardRef } from 'react'

import { Button, Form, type FormInstance, InputNumber, SpacePro, Input, Select } from '@/components'

import { getNewExecItem } from '../../../utils'

interface DetailProps {
  data: Habit.RunTime.ItemRecord
}

export const Detail = forwardRef<FormInstance, DetailProps>((props, ref) => {
  const { data } = props

  const [form] = Form.useForm()

  return (
    <div className='mt-5'>
      <Form
        ref={ref}
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{
          execList: data?.record?.execList,
          reason: data?.record?.reason,
        }}
      >
        <Form.Item label='执行记录'>
          <Form.List name='execList'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='mb-4'>
                    <SpacePro>
                      <Form.Item
                        {...restField}
                        name={[name, 'count']}
                        rules={[{ required: true, message: '请输入数量' }]}
                      >
                        <InputNumber min={1} placeholder='数量' />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'time']}
                        rules={[{ required: true, message: '请选择日期' }]}
                      >
                        <Input disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'feeling']}
                      >
                        <Select
                          placeholder='完成感受'
                          options={[
                            { label: '非常棒', value: 'excellent' },
                            { label: '不错', value: 'good' },
                            { label: '一般', value: 'normal' },
                            { label: '不太好', value: 'bad' },
                            { label: '很差', value: 'terrible' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button type='text' danger onClick={() => remove(name)}>删除</Button>
                      </Form.Item>
                    </SpacePro>
                  </div>
                ))}

                <Button onClick={() => add(getNewExecItem(data))} type='dashed' block>
                  添加记录
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item name='reason' label='未完成原因'>
          <Input.TextArea
            placeholder='请输入未完成的原因（选填）'
            rows={3}
          />
        </Form.Item>
      </Form>
    </div>
  )
})
