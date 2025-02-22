import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from 'dayjs/plugin/updateLocale'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.extend(isBetween)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(isoWeek)
dayjs.extend(updateLocale)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

dayjs.locale('zh-cn')
dayjs.tz.setDefault('Asia/Shanghai')
dayjs.updateLocale('zh-cn', {
  weekStart: 1,
})

export enum Timezone {
  AsiaShanghai = 'Asia/Shanghai',
}

export { Dayjs } from 'dayjs'

export default dayjs as typeof dayjs & {
  isBetween: typeof isBetween;
  isSameOrAfter: typeof isSameOrAfter;
  isSameOrBefore: typeof isSameOrBefore;
  tz: typeof timezone;
  updateLocale: typeof updateLocale;
}
