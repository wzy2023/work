import { Form } from 'antd'
import { useEffect, useState } from 'react'

interface Option {
  onValueChange?: (changedValues: any, allValues: any) => void
}

export const useForm = (option?: Option) => {
  const { onValueChange } = option || {}

  const [form] = Form.useForm()

  const [values, setValues] = useState()

  const [params, setParams] = useState()

  useEffect(() => {
    // 处理转换
    setParams(values)
  }, [values])

  const onQuery = async (values: any) => {
    await form.validateFields()
    setValues(values)
  }

  const onReset = () => {
    form.resetFields()
    setValues(null)
  }

  return {
    form,

    values,
    setValues,

    params,

    onQuery,
    onReset,
    onValuesChange: (changedValues: any, allValues: any) => {
      setValues(allValues)
      onValueChange?.(changedValues, allValues)
    },
  }
}
