import React, { useMemo } from 'react'

import { PageContainer, Tabs, DatePicker, Space, Button, LeftOutlined, RightOutlined } from '@/components'
import { DataTable } from './components/DataTable'
import { Summary } from './components/Summary'

import { OperatorType } from '@/types'
import { rangePresets, useDateRange, PresetType } from '@/hooks'

import { Params } from './types'

export default () => {
  const { dateRange, onChange, onClickPrev, onClickNext } = useDateRange({
    defaultDateRange: PresetType.THIS_WEEK,
  })

  const params = useMemo<Params>(() => {
    return {
      dateTime: {
        _type: OperatorType.Between,
        _value: dateRange.map(item => item.valueOf()),
      },
    }
  }, [dateRange])

  return (
    <PageContainer>
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            label: '任务日志',
            key: 'taskLog',
            children: <DataTable params={params} />,
          },
          {
            label: '统计',
            key: 'summary',
            children: <Summary params={params} />,
          },
        ]}
        tabBarExtraContent={(
          <Space>
            <Button onClick={onClickPrev} icon={<LeftOutlined />} />
            <DatePicker.RangePicker
              presets={rangePresets}
              value={dateRange}
              onChange={onChange}
            />
            <Button onClick={onClickNext} icon={<RightOutlined />} />
          </Space>
        )}
      />
    </PageContainer>
  )
}
