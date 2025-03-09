import { BetaSchemaForm } from '@ant-design/pro-components'

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

  return (
    <BetaSchemaForm<Value>
      initialValues={value}
      submitter={false}
      layout='inline'
      onValuesChange={(_, values) => onChange?.(values)}
      columns={[
        {
          dataIndex: 'total',
          title: '总量',
          valueType: 'digit',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
          },
        },
        {
          dataIndex: 'times',
          title: '次数',
          valueType: 'digit',
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
          },
        },
        {
          dataIndex: 'single',
          title: '单次数量',
          valueType: 'digit',
          fieldProps: {
            step: 1,
            precision: 0,
            style: { width: 100 },
          },
        },
      ]}
    />
  )
}
