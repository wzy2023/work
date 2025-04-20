import { AsalysisList, AsalisisTable } from './blocks'
import { Space } from '@/components'

export default () => {
  return (
    <div style={{ flexDirection: 'row' }}>
      <Space direction='horizontal'>
        <div style={{ height: 'calc(100vh - 40px)', overflow: 'auto' }}>
          <AsalysisList />
        </div>
        <div style={{ flex: 1 }}>
          <AsalisisTable />
        </div>
      </Space>
    </div>
  )
}
