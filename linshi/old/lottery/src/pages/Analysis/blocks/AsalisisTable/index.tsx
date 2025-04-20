import React from 'react'
import { useModel } from '@umijs/max'

import { Card, Space, Spin } from '@/components'
import { DataTable } from './DataTable'
import { ForecastTable } from './ForecastTable'
import { NumList } from '../../components/NumList'

export const AsalisisTable = () => {
  const { asalysisDetailLoading, renderShowIndex } = useModel('Analysis.model')

  return (
    <Spin spinning={asalysisDetailLoading}>
      <Card
        size='small'
        bodyStyle={{ padding: 0 }}
        title={(
          <Space>
            {renderShowIndex()}
          </Space>
        )}
      >
        <Space direction='horizontal' align='start'>
          <NumList />
          <ForecastTable />
          <DataTable />
        </Space>
      </Card>
    </Spin>
  )
}
