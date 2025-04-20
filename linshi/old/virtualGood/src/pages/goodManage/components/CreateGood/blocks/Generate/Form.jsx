import React, { useState, useEffect } from 'react'
import { FormPro } from '@/components'
import utils from '@/utils'
import MasterImg, { MasterProps } from '../../../../image/Master'

export default (props) => {
  const { data = {}, value, onChange } = props

  const [values, setValues] = useState(value || {
    name: `${data.base.name} 未删减超清高清 网盘资源秒发 其它休闲娱乐`,
    price: [1.28, 2.29],
    image_master: {
      ...data.dou,
      name: `${data.dou.name}${data.dou.runnum ? ` (全${data.dou.runnum}集)` : ''}`,
      fileSize: data.pan.file.fileSize,
    },
  })

  useEffect(() => {
    onChange(values)
  }, [values])

  return (
    <FormPro
      values={values}
      onValueChange={v => setValues({ ...values, ...v })}
      fieldList={[
        {
          type: 'input-maxlength',
          name: 'name',
          label: '标题',
          maxLength: 60,
          placeholder: '请输入标题',
          rules: [
            'required',
            {
              validator: (_, value, callback) => {
                callback(utils.getLength(value) <= 60 ? undefined : '标题最大长度不能超过60')
              },
            },
          ],
        },
        {
          name: 'price',
          label: '拼单-单买',
          type: 'input-range',
          rules: ['required'],
          placeholder: '请输入价格',
        },
        {
          name: 'image_master',
          label: '主图',
          type: 'sku-image',
          component: MasterImg,
          props: MasterProps(data),
        },
      ]}
    />
  )
}
