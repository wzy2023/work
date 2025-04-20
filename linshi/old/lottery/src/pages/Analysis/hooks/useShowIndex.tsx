import React, { useState } from 'react'
import { Radio, Slider, Space } from '@/components'

export const useShowIndex = () => {
  const [showIndexNum, setShowIndexNum] = useState(9)
  const [calcIndexNum, setCalcIndexNum] = useState(1)
  const [hotIndex, setHotIndex] = useState(1)

  return {
    showIndexNum,
    setShowIndexNum,
    calcIndexNum,
    setCalcIndexNum,
    hotIndex,
    renderShowIndex: () => (
      <Space>
        <>
          <span>showIndexNum</span>
          <Slider
            style={{ width: 250 }}
            min={2}
            max={20}
            value={showIndexNum}
            onChange={setShowIndexNum}
          />
        </>

        <>
          <span>calcIndexNum</span>
          <Slider
            style={{ width: 250 }}
            min={1}
            max={30}
            value={calcIndexNum}
            onChange={setCalcIndexNum}
          />
        </>

        <Radio.Group onChange={e => setHotIndex(e.target.value)} value={hotIndex}>
          <Radio value={1}>1</Radio>
          <Radio value={2}>2</Radio>
          <Radio value={3}>3</Radio>
          <Radio value={4}>4</Radio>
        </Radio.Group>
      </Space>
    ),
  }
}
