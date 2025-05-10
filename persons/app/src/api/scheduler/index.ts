import { schedule } from '@/api/utils/schedule'
import { order } from './order'
import { rssItem } from './rssItem'
import { rssMail } from './rssMail'

let isRun = false

if (process.env.NODE_ENV === 'development' && !isRun) {
  isRun = true

  schedule('*/30 8-23 * * * ', false, order)

  schedule('*/30 8-23 * * * ', false, rssItem)
  schedule('0 * * * * ', false, rssMail)
}
