import { forwardRef, useEffect } from 'react'

import { BetaSchemaForm, type FormInstance } from '@/components'

import { useForm } from '@/hooks'
import { habitFrequencyTypeMap } from '../../../const'
import { type HabitFrequencyType } from '@/api/types'

interface Value {
  total: number
  times: number
  single: number
  unit: string
}

interface CreateNumsProps {
  value?: Value
  values?: any
  onChange?: (value: Value) => void
}

export const CreateNums = forwardRef<FormInstance, CreateNumsProps>((props, ref) => {
  const { value, values, onChange } = props

  const { form } = useForm({ ref })

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
      return
    }
    form.setFieldsValue({ times: 1, single: 1, total: 1, unit: '次' })
    onChange?.({ times: 1, single: 1, total: 1, unit: '次' })
  }, [form, onChange, value])

  const text = habitFrequencyTypeMap[values?.frequency?.type as HabitFrequencyType]

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
          title: text ? `每${text}执行总量` : '执行总量',
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
        {
          dataIndex: 'unit',
          title: '单位',
          width: 80,
          valueType: 'select',
          fieldProps: {
            options: [
              { label: '次', value: '次' },
              { label: '毫升', value: '毫升' },
              { label: '克', value: '克' },
              { label: '斤', value: '斤' },
              { label: '小时', value: '小时' },
              { label: '分钟', value: '分钟' },
            ],
          },
        },
      ]}
    />
  )
})
