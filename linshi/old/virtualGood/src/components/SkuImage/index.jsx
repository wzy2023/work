import React, { useState, useEffect, useMemo } from 'react'
import { FormPro } from '@/components'
import { Com2Canvas } from '@/components'

export default ({ size = 240, value = {}, onChange, component, props }) => {

  const [values, setValues] = useState(value)
  const [imgBase64, setImgBase64] = useState()

  useEffect(() => {
    onChange({ ...values, imgBase64 })
  }, [values, imgBase64])

  const fieldList = useMemo(() => {
    if (!Array.isArray(props) || !props.length) {
      return []
    }
    return props.map((item, index) => {
      if (typeof props[index] === 'string') {
        return { type: 'input', name: item, label: item }
      }
      return props[index]
    })
  }, props)

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: size, marginRight: 20 }}>
        <Com2Canvas onChange={setImgBase64}>
          {React.createElement(component, { ...value, size })}
        </Com2Canvas>
      </div>
      <div style={{ flex: 1, height: size, overflowY: 'scroll' }}>
        <FormPro
          itemLayout={{ labelCol: { span: 3 }, wrapperCol: { span: 20 } }}
          values={values}
          fieldList={fieldList}
          onValueChange={setValues}
        />
      </div>
    </div>
  )
}
