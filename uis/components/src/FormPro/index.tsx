import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-components'
import { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm'

export type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'

export type FormProProps<T, ValueType> = FormSchema<T, ValueType>

export const FormPro = <T, ValueType>(props: FormProProps<T, ValueType>) => {

  const formRef = useRef<ProFormInstance>()
  useImperativeHandle(props.formRef, () => formRef?.current, [formRef])

  // useEffect(() => {
  //   if (props.value) {
  //     formRef.current?.setFieldsValue(props.value)
  //   }
  // }, [JSON.stringify(props.value)])

  return (
    <BetaSchemaForm
      {...props}
      formRef={formRef}
    />
  )
}
