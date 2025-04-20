import React, { useEffect, useState } from 'react'
import { FormPro } from '@/components'

export default (props) => {
  const { data = {}, onChange = () => undefined } = props
  const [values, setValues] = useState(data.base || { cat1: 'video', cat2: 'movie' })

  useEffect(() => {
    onChange({ base: values })
  }, [values])

  return (
    <div style={{ margin: 20 }}>
      <FormPro
        values={values}
        onValueChange={(_, v) => {
          if (v.name) {
            v.name_tm = v.name
          }
          setValues({ ...values, ...v })
        }}
        fieldList={[
          {
            type: 'input',
            name: 'name',
            label: '名称',
          },
          {
            type: 'input',
            name: 'name_tm',
            label: '名称(脱敏)',
            defaultValue: values.name,
          },
          {
            type: 'radio',
            name: 'cat1',
            label: '主分类',
            disabled: true,
            optionType: 'button',
            options: [
              { value: 'video', label: '视频' },
              { value: 'exe', label: '软件' },
              { value: 'text', label: '文本' },
              { value: 'image', label: '图片' },
              { value: 'game', label: '游戏' },
            ],
          },
          {
            type: 'radio',
            name: 'cat2',
            label: '子分类',
            optionType: 'button',
            options: [
              { value: 'movie', label: '电影' },
              { value: 'tv', label: '剧集' },
              { value: 'animation', label: '动画' },
              { value: 'documentary', label: '纪录片' },
              { value: 'curriculum', label: '课程' },
            ],
          },
        ]}
      />
    </div>
  )
}
