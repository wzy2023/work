import React from 'react'
import { useModel } from '@umijs/max'
import { CheckCard, Spin } from '@/components'

export const AsalysisList = () => {
  const { asalysisListLoading, currentId, setCurrentId, asalysisList } = useModel('Analysis.model')

  const onChange = (value: any) => {
    if (!value) {
      return
    }
    setCurrentId(value)
  }

  return (
    <Spin spinning={asalysisListLoading}>
      <CheckCard.Group
        style={{ width: 130, minHeight: 200 }}
        value={currentId}
        onChange={onChange}
      >
        {(asalysisList || []).map(item => (
          <CheckCard
            style={{ width: 130, display: 'inline-block' }}
            key={item.id}
            title={item.name.split(' ')[1]}
            value={item.id}
          />
        ))}
      </CheckCard.Group>
    </Spin>
  )
}
