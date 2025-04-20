import React, { useEffect, useState } from 'react'
import { Radio, Slider, Space, Card, ReactEcharts } from '@/components'
import { createLines, createOption, Type } from './utils'

export const Line = (props: { values: any, title: string, json: any }) => {
  const { values, title, json } = props

  const [type, setType] = useState<Type>('cold')
  const [hotIndex, setHotIndex] = useState(1)
  const [index, setIndex] = useState(5)

  useEffect(() => {
    if (values.type !== type) {
      setType(values.type)
    }
    if (values.hotIndex !== hotIndex) {
      setHotIndex(values.hotIndex)
    }
    if (values.index !== index) {
      setIndex(values.index)
    }
  }, [values])

  const five = createLines(json, hotIndex, type, index, 5)
  const ten = createLines(json, hotIndex, type, index, 10)

  const optionFive = createOption('Five', five, index, type)
  const optionTen = createOption('Ten', ten, index, type)

  return (
    <Card title={title}>
      <Space style={{ flexDirection: 'column' }}>
        <Space size='large'>
          <Radio.Group onChange={e => setHotIndex(e.target.value)} value={hotIndex}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
          </Radio.Group>

          <Radio.Group onChange={e => setType(e.target.value)} value={type}>
            <Radio value='cold'>cold</Radio>
            <Radio value='moderate'>moderate</Radio>
            <Radio value='hot'>hot</Radio>
            <Radio value='random'>random</Radio>
            <Radio value='total'>total</Radio>
          </Radio.Group>

          <Slider
            min={1}
            max={15}
            value={index}
            onChange={setIndex}
            style={{ width: 200 }}
          />
        </Space>
        <Space>
          {/*/  @ts-ignore /*/}
          <ReactEcharts style={{ width: '45vw', height: 300 }} option={optionFive} />
          {/*/  @ts-ignore /*/}
          <ReactEcharts style={{ width: '45vw', height: 300 }} option={optionTen} />
        </Space>
      </Space>
    </Card>
  )
}
