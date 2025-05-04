import { schedule } from '@/api/utils/schedule'
import { rssItem } from './rssItem'

if (process.env.NODE_ENV === 'development') {
  schedule('*/10 8-23 * * * ', rssItem)
}
