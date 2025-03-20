import { useEffect } from 'react'

import { Form, BetaSchemaForm } from '@/components'

interface Value {
  total: number
  times: number
  single: number
}

interface CreateNumsProps {
  value?: Value
  onChange?: (value: Value) => void
}

export const CreateNums = (props: CreateNumsProps) => {
  const { value, onChange } = props

  const [form] = Form.useForm()

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
      return
    }
    form.setFieldsValue({ times: 1, single: 1, total: 1 })
    onChange?.({ times: 1, single: 1, total: 1 })
  }, [value])

  return (
    <BetaSchemaForm<Value>
      form={form}
      initialValues={value}
      submitter={false}
      layout='inline'
      onValuesChange={(_, values) => {
        values.total = values.times * values.single
        onChange?.(values)
      }}
      columns={[
        {
          dataIndex: 'times',
          title: '每天想执行几次',
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
          dataIndex: 'single',
          title: '每次执行的数量',
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
          dataIndex: 'total',
          title: '累计',
          valueType: 'digit',
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
            disabled: true,
          },
        },
      ]}
    />
  )
}
