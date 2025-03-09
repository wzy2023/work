import { BetaSchemaForm } from '@ant-design/pro-components'

import { FrequencyType } from '../../../../../api/routes/habit/item/types'

interface Value {
  type: FrequencyType
  weekDays: number[]
  dayOfMonth: number[]
}

interface CreateFrequencyProps {
  value?: Value
  onChange?: (value: Value) => void
}

export const CreateFrequency = (props: CreateFrequencyProps) => {
  const { value, onChange } = props

  return (
    <BetaSchemaForm<Value>
      initialValues={value}
      submitter={false}
      onValuesChange={(_, values) => onChange?.(values)}
      columns={[
        {
          dataIndex: 'type',
          title: '频率',
          valueType: 'radio',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: '每天', value: FrequencyType.DAILY },
              { label: '每周', value: FrequencyType.WEEKLY },
              { label: '每月', value: FrequencyType.MONTHLY },
            ],
          },
        },
        {
          dataIndex: 'weekDays',
          title: '周几',
          valueType: 'checkbox',
          fieldProps: {
            options: Array(7).fill(true).map((_, index) => ({ label: '周' + (index + 1), value: index + 1 })),
          },
        },
        {
          dataIndex: 'dayOfMonth',
          title: '几号',
          valueType: 'checkbox',
          fieldProps: {
            options: Array(31).fill(true).map((_, index) => ({ label: index + 1, value: index + 1 })),
          },
        },
      ]}
    />
  )
}
