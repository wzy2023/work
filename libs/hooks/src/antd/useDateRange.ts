// import { useState } from 'react'
// import { dayjs, Dayjs } from '@wzyjs/utils'
//
// export enum PresetType {
//   TODAY = '今天',
//   THIS_WEEK = '本周',
//   LAST_WEEK = '上周',
//   THIS_MONTH = '本月',
//   LAST_MONTH = '上月',
// }
//
// export const rangePresets: { label: string; value: [Dayjs, Dayjs] }[] = [
//   {
//     label: PresetType.TODAY,
//     value: [dayjs().startOf('day'), dayjs().endOf('day')],
//   },
//   {
//     label: PresetType.THIS_WEEK,
//     value: [dayjs().startOf('week'), dayjs().endOf('week')],
//   },
//   {
//     label: PresetType.LAST_WEEK,
//     value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
//   },
//   {
//     label: PresetType.THIS_MONTH,
//     value: [dayjs().startOf('month'), dayjs().endOf('month')],
//   },
//   {
//     label: PresetType.LAST_MONTH,
//     value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
//   },
// ]
//
// const checkDateRules = (dateRange: [Dayjs, Dayjs]): number => {
//   const [date1, date2] = dateRange
//
//   // 规则1: 判断是否为同一天
//   if (date1.isSame(date2, 'day')) {
//     return 1
//   }
//
//   // 规则2: 判断是否为周一和周日
//   if ((date1.day() === 1 && date2.day() === 0) || (date1.day() === 0 && date2.day() === 1)) {
//     return 2
//   }
//
//   // 规则3: 判断是否为月初和月末
//   const isStartOrEndOfMonth = (date: Dayjs) => {
//     return date.date() === 1 || date.date() === date.daysInMonth()
//   }
//
//   if (isStartOrEndOfMonth(date1) && isStartOrEndOfMonth(date2)) {
//     return 3
//   }
//
//   // 如果没有匹配到任何规则，可以根据需要返回默认值，这里假设返回 0
//   return 0
// }
//
// interface Config {
//   defaultDateRange?: PresetType | [Dayjs, Dayjs]
// }
//
// export const useDateRange = (config: Config) => {
//   const { defaultDateRange = PresetType.TODAY } = config
//
//   const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(
//     Array.isArray(defaultDateRange)
//       ? defaultDateRange
//       : rangePresets.find((item) => item.label === defaultDateRange)?.value || [dayjs().startOf('day'), dayjs().endOf('day')],
//   )
//
//   const rangeType = checkDateRules(dateRange)
//
//   return {
//     dateRange,
//
//     // 这里的 any 实际应该是 antd 的 RangeValue<Dayjs> 类型，
//     // 但是这个类型不好获取，所以这里先用 any 代替
//     onChange: (dateRange?: any) => {
//       if (!dateRange) {
//         return
//       }
//       setDateRange(dateRange as [Dayjs, Dayjs])
//     },
//
//     onClickPrev: () => {
//       switch (rangeType) {
//         case 1:
//           setDateRange([dateRange[0].subtract(1, 'day'), dateRange[1].subtract(1, 'day')])
//           break
//         case 2:
//           setDateRange([dateRange[0].subtract(1, 'week'), dateRange[1].subtract(1, 'week')])
//           break
//         case 3:
//           setDateRange([dateRange[0].subtract(1, 'month').startOf('month'), dateRange[1].subtract(1, 'month').endOf('month')])
//           break
//         default:
//           setDateRange([dateRange[0].subtract(1, 'day'), dateRange[1]])
//           break
//       }
//     },
//
//     onClickNext: () => {
//       switch (rangeType) {
//         case 1:
//           setDateRange([dateRange[0].add(1, 'day'), dateRange[1].add(1, 'day')])
//           break
//         case 2:
//           setDateRange([dateRange[0].add(1, 'week'), dateRange[1].add(1, 'week')])
//           break
//         case 3:
//           setDateRange([dateRange[0].add(1, 'month').startOf('month'), dateRange[1].add(1, 'month').endOf('month')])
//           break
//         default:
//           setDateRange([dateRange[0], dateRange[1].add(1, 'day')])
//           break
//       }
//     },
//   }
// }
