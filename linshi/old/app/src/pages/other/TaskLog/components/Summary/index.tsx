import React from 'react'
import { JsonView, Spin } from '@/components'
import { useRequestPro } from '@wzyjs/hooks'
import { taskLog } from '@/apis'
import { transformJson } from '../../utils'
import { Params } from '../../types'

interface SummaryProps {
  params: Params,
}

export const Summary = ({ params }: SummaryProps) => {
  const { data, loading } = useRequestPro(() => taskLog.list({ where: params }), {
    refreshDeps: [params],
  })

  return (
    <div style={{ marginTop: 10 }}>
      <Spin spinning={loading}>
        <JsonView
          src={transformJson(data?.data)}
          collapsed={false}
        />
      </Spin>
    </div>
  )
}
