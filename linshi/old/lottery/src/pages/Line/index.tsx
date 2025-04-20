import React, { useState } from 'react'

import { Radio, Slider, Space } from '@/components'
import { Line } from './Line'
import { Type } from './utils'

import { useRequestPro } from '@/hooks'
import { lotteryAsalysisLine } from '@/apis'

export default () => {
  const { data } = useRequestPro(lotteryAsalysisLine.list)

  const [type, setType] = useState<Type>('cold')
  const [hotIndex, setHotIndex] = useState(1)
  const [index, setIndex] = useState(5)

  return (
    <div>
      <Space
        size='large'
        style={{
          position: 'fixed',
          zIndex: 1,
          backgroundColor: '#fff',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: 10,
          top: 0,
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        }}
      >
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

      <div style={{ marginTop: 30 }}>
        {data?.data.sort((a, b) => a.info.exec - b.info.exec)?.map((item, idx) => (
          <Line
            key={idx}
            title={`${item.info.exec}_${item.info.possibilitiesLength} (${item.info.runNum}) - ${item.info.remark.slice(7, 25).replace('2024', '')}`}
            json={item.data}
            values={{ hotIndex, type, index }}
          />
        ))}
      </div>
    </div>
  )
}
