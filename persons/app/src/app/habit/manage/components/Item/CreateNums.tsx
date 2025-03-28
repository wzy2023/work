import { useEffect, forwardRef, useImperativeHandle } from 'react'

import { Form, BetaSchemaForm, type FormInstance } from '@/components'

interface Value {
  total: number
  times: number
  single: number
}

interface CreateNumsProps {
  value?: Value
  onChange?: (value: Value) => void
}

export const CreateNums = forwardRef<FormInstance, CreateNumsProps>((props, ref) => {
  const { value, onChange } = props

  const [form] = Form.useForm()

  useImperativeHandle(ref, () => form)

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
      return
    }
    form.setFieldsValue({ times: 1, single: 1, total: 1 })
    onChange?.({ times: 1, single: 1, total: 1 })
  }, [form, onChange, value])

  return (
    <BetaSchemaForm<Value>
      form={form}
      initialValues={value}
      submitter={false}
      layout='inline'
      onValuesChange={(_, values) => {
        if (values.total && values.single) {
          values.times = values.total / values.single
        }
        onChange?.(values)
      }}
      columns={[
        {
          dataIndex: 'total',
          title: '执行总量',
          valueType: 'digit',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
          },
        },
        {
          dataIndex: 'single',
          title: '每次执行量',
          valueType: 'digit',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
            min: 1,
          },
        },
        {
          dataIndex: 'times',
          title: '执行几次',
          valueType: 'digit',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
            min: 1,
            disabled: true,
          },
        },
      ]}
    />
  )
})
