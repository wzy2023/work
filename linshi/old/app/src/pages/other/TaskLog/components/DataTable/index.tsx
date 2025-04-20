import React, { useState } from 'react'
import { Crud } from '@/components'

import { taskLog } from '@/apis'
import { dayjs } from '@/utils'
import { useRequestPro } from '@/hooks'

import { getColumns } from './config'
import { Params } from '../../types'

interface TableProps {
  params: Params | null,
}

export const DataTable = ({ params }: TableProps) => {
  const { data } = useRequestPro(taskLog.list)

  const [currentData, setCurrentData] = useState<taskLog.TaskLog[]>([])

  return (
    <Crud
      layoutType='DrawerForm'
      search={false}
      style={{ marginTop: 10 }}
      initialValues={{ duration: 1, dateTime: dayjs().valueOf() }}
      columns={getColumns(data?.data, currentData)}
      apiParams={{
        list: params as any,
      }}
      apis={{
        list: taskLog.list,
        create: taskLog.create,
        update: taskLog.update,
        remove: taskLog.remove,
      }}
      onLoadData={setCurrentData}
      convertValues={values => {
        values.categorize = values.categorize?.map((item: string) => item.trim()).filter(Boolean)
        values.dateTime = dayjs(values.dateTime).valueOf()
        return values
      }}
    />
  )
}
