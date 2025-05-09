import { schedule } from '@/api/utils/schedule'
import { rssItem } from './rssItem'
import { order } from './order'

let isRun = false

if (process.env.NODE_ENV === 'development' && !isRun) {
  isRun = true

  schedule('*/30 8-23 * * * ', false, rssItem)
  schedule('*/30 8-23 * * * ', false, order)
}
