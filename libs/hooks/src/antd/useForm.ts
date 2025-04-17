import { useEffect, useImperativeHandle, useMemo, useState, Ref } from 'react'
import { Form } from 'antd'

const cloneDeep = (value: any) => {
  return JSON.parse(JSON.stringify(value))
}

interface Options<P, V> {
  transform?: ((values: V) => any)[];
  onChange?: (values: P) => void;
  initialValues?: any;
  ref?: Ref<unknown>;
}

export const useForm = <P = any, V = P>(options: Options<P, V> = {}) => {
  const [form] = Form.useForm()

  useImperativeHandle(options.ref, () => form)

  const [formValues, setFormValues] = useState<V>(options.initialValues)

  const formParams = useMemo(() => {
    if (!formValues) {
      return null as P
    }
    if (!options.transform?.length) {
      return formValues as unknown as P
    }
    return options.transform.reduce((values, handle) => {
      return handle(values)
    }, cloneDeep(formValues)) as P
  }, [formValues])

  useEffect(() => {
    options.onChange?.(formParams)
  }, [formParams])

  const onQuery = async () => {
    await form.validateFields()
    setFormValues(form.getFieldsValue())
  }

  const onReset = () => {
    form.resetFields()
    onQuery()
  }

  const onValuesChange = (_: unknown, values: V) => {
    setFormValues(values)
  }

  const clearFieldsValues = () => {
    form.resetFields()
    setFormValues(null as V)
  }

  const setFieldsValues = (values: V) => {
    form.setFieldsValue(values)
    setFormValues(values)
  }

  return {
    // 表单组件的引用
    form,

    // 表单的原始数据
    formValues,
    setFormValues,

    // 表单数据转换为后端格式的数据
    formParams,
    clearFieldsValues,
    setFieldsValues,
    onQuery,
    onReset,

    formProps: {
      form,
      onValuesChange,
      preserve: false, // 字段被删除时，是否保留字段值
      labelCol: { span: 4 },
      style: { marginTop: 20 },
    },
  }
}
