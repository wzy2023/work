import { BetaSchemaForm } from '@ant-design/pro-components'

enum HabitItemFrequencyType {
  DAILY = 1, // 每天
  WEEKLY = 2, // 每周
  MONTHLY = 3, // 每月
}

interface Value {
  type: HabitItemFrequencyType
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
            options: [
              { label: '每天', value: HabitItemFrequencyType.DAILY },
              { label: '每周', value: HabitItemFrequencyType.WEEKLY },
              { label: '每月', value: HabitItemFrequencyType.MONTHLY },
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
