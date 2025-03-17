import { BetaSchemaForm, CheckboxButton } from '@/components'

import { FrequencyType } from '../../../types'

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
          title: '周期',
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
          renderFormItem: () => (
            <div className='checkboxSmall'>
              <CheckboxButton
                options={Array(7).fill(true).map((_, index) => ({ label: '周' + (index + 1), value: index + 1 }))}
              />
            </div>
          ),
        },
        {
          dataIndex: 'dayOfMonth',
          title: '几号',
          renderFormItem: () => (
            <div className='checkboxSmall'>
              <CheckboxButton
                options={Array(31).fill(true).map((_, index) => ({ label: index + 1 + '', value: index + 1 }))}
              />
            </div>
          ),
        },
      ]}
    />
  )
}
