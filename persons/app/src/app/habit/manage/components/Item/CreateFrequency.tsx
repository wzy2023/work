import { forwardRef } from 'react'

import { BetaSchemaForm, CheckboxButton, type FormInstance } from '@/components'

import { useImperativeHandleForm } from '@/hooks'
import { HabitFrequencyType } from '@/api/types'

interface Value {
  type: Habit.FrequencyType
  weekDays: number[]
  dayOfMonth: number[]
}

interface CreateFrequencyProps {
  value?: Value
  onChange?: (value: Value) => void
}

export const CreateFrequency = forwardRef<FormInstance, CreateFrequencyProps>((props, ref) => {
  const { value, onChange } = props

  const { form } = useImperativeHandleForm(ref)

  return (
    <BetaSchemaForm<Value>
      form={form}
      initialValues={value}
      submitter={false}
      onValuesChange={(_, values) => onChange?.(values)}
      columns={[
        {
          dataIndex: 'type',
          title: '周期',
          valueType: 'radio',
          formItemProps: { rules: [{ required: true }] },
          fieldProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: '每天', value: HabitFrequencyType.DAILY },
              { label: '每周', value: HabitFrequencyType.WEEKLY },
              { label: '每月', value: HabitFrequencyType.MONTHLY },
            ],
          },
        },
        {
          dataIndex: 'weekDays',
          title: '周几',
          renderFormItem: () => (
            <CheckboxButton
              options={[
                { label: '周一', value: 1 },
                { label: '周二', value: 2 },
                { label: '周三', value: 3 },
                { label: '周四', value: 4 },
                { label: '周五', value: 5 },
                { label: '周六', value: 6 },
                { label: '周日', value: 0 },
              ]}
            />
          ),
        },
        {
          dataIndex: 'dayOfMonth',
          title: '几号',
          renderFormItem: () => (
            <CheckboxButton
              options={Array(31).fill(true).map((_, index) => ({
                label: index + 1 + '',
                value: index + 1,
              }))}
            />
          ),
        },
      ]}
    />
  )
})
