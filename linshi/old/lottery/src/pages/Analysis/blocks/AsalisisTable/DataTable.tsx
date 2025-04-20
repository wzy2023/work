import { useModel } from '@umijs/max'
import { Space, Table } from '@/components'
import { IndexList } from '../../components/IndexList'
import { roundToDecimalPlaces } from '../../utils'

export const DataTable = () => {
  const { hotIndex, calcIndexNum, showIndexNum, asalysisDetail } = useModel('Analysis.model')
  const dataSource = asalysisDetail?.possibilities || []

  const columns = [
    {
      title: 'group',
      align: 'center',
      width: 200,
      dataIndex: 'group',
      render: (value: number[][]) => {
        return value?.map(i => i).map(item => item.join('')).join(' ')
      },
    },
    {
      title: '概率',
      width: 80,
      align: 'center',
      dataIndex: 'probability',
      render: (value: string) => roundToDecimalPlaces(value),
    },
    {
      title: 'num',
      width: 80,
      align: 'center',
      dataIndex: 'probabilityNum',
      render: (value: string) => roundToDecimalPlaces(value, 1),
    },
  ]

  return (
    <Space align='start'>
      <Table
        rowKey='id'
        pagination={false}
        dataSource={dataSource}
        scroll={{ y: 'calc(100vh - 200px)' }}
        columns={columns as any[]}
        expandable={{
          expandedRowKeys: dataSource?.map(item => item.id),
          expandedRowRender: (record) => (
            <Space size={60} style={{ display: 'flex', justifyContent: 'center' }}>
              <IndexList
                type='prev'
                showIndexNum={showIndexNum}
                calcIndexNum={calcIndexNum}
                indexs={record.prevIndexs}
                hots={record.hots[hotIndex - 1]}
                num={record.probabilityNum}
              />
              <IndexList
                type='next'
                showIndexNum={showIndexNum}
                calcIndexNum={calcIndexNum}
                indexs={record.nextIndexs}
                num={record.probabilityNum}
              />
            </Space>
          ),
        }}
      />
    </Space>
  )
}
