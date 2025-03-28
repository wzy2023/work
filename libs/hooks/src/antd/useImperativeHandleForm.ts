import { type Ref, useImperativeHandle } from 'react'
import { Form, type FormInstance } from 'antd'

export const useImperativeHandleForm = (ref: Ref<FormInstance>) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => form)

  return {
    form,
  }
}
