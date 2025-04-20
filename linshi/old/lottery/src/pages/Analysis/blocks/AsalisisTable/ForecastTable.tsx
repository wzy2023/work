import React, { useMemo, useState } from 'react'
import { useModel } from '@umijs/max'
import { Radio, Table } from '@/components'
import { roundToDecimalPlaces } from '@/pages/Analysis/utils'

export const ForecastTable = () => {
  const { hotIndex, calcIndexNum, asalysisDetail } = useModel('Analysis.model')

  const dataSource = useMemo(() => {
    return asalysisDetail?.recommendTables[hotIndex - 1]?.tables[calcIndexNum - 1].table
  }, [hotIndex, calcIndexNum, asalysisDetail])

  return (
    <>
      <Table
        style={{ width: 220 }}
        key={JSON.stringify(dataSource) + calcIndexNum}
        dataSource={dataSource}
        columns={[
          {
            title: '号码',
            dataIndex: 'nums',
            width: 60,
            render: (value: number[], _, index) => {
              // 如果别的table也包含此号码，则标为绿色
              const isAllHasNum = [1, 2, 3].filter(i => i !== hotIndex).every(i => {
                return asalysisDetail?.recommendTables[i - 1]?.tables[calcIndexNum - 1].table.slice(0, 5).some(item => item.nums.join() === value.join())
              })
              const color = isAllHasNum ? 'green' : index < 5 ? 'red' : ''
              return (
                <span style={{ color }}>{value}</span>
              )
            },
          },
          {
            title: '推荐',
            dataIndex: 'num',
            width: 90,
            render: (value: string) => roundToDecimalPlaces(value, 2),
          },
          {
            title: '索引',
            width: 70,
            dataIndex: 'indexs',
            render: (value: number[]) => value[0] || '',
          },
        ]}
        pagination={false}
        scroll={{ y: 'calc(100vh - 200px)' }}
      />
    </>
  )
}
