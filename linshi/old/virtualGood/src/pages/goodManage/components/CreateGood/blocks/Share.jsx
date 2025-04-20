import React from 'react'
import { FormPro } from '@/components'

export default (props) => {
  const { data = {}, onChange = () => undefined } = props

  return (
    <div style={{ margin: 20 }}>
      <FormPro
        values={data}
        onValueChange={onChange}
        fieldList={[
          {
            type: 'panSearch',
            name: 'pan',
            label: '网盘分享',
            data,
          },
        ]}
      />
    </div>
  )
}
