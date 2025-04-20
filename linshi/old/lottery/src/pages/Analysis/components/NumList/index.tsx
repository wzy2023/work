import { useModel } from '@umijs/max'
import { Table } from '@/components'
import { useTable } from './useTable'

export const NumList = () => {
  const { asalysisDetail, asalysisDetailLoading } = useModel('Analysis.model')

  const { rowKey, columns, dataSource, pagination } = useTable({
    lottery: asalysisDetail?.lottery,
    numLists: asalysisDetail?.numLists,
  })

  return (
    <Table
      rowKey={rowKey}
      loading={asalysisDetailLoading}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      style={{ width: 200 }}
      scroll={{ y: 'calc(100vh - 200px)' }}
    />
  )
}
