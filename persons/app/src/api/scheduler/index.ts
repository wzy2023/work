import { schedule } from '@/api/utils/schedule'
// import { order } from './order'
import { rssItem } from './rssItem'
import { rssMail } from './rssMail'
import { rssMailToday } from './rssMailToday'

if (process.env.NODE_ENV !== 'development') {
  // schedule('*/30 8-23 * * * ', false, order)

  schedule('*/30 8-23 * * * ', false, rssItem)
  schedule('1 8-23 * * * ', false, rssMail)
  schedule('0 8 * * *', false, rssMailToday)
}
