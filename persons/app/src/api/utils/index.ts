import { _, dayjs, type Dayjs } from '@wzyjs/utils'
import { HabitFrequencyType, HabitProgressStatus, HabitStatusMode } from '@/api/types'

// 计算[习惯]和[习惯记录]的状态
export const calcStatus = (data: Habit.RunTime.ItemRecord, date: Dayjs) => {
  const check = () => {
    const isPastTime = {
      [HabitFrequencyType.DAILY]: date.startOf('day').valueOf() < dayjs().startOf('day').valueOf(),
      [HabitFrequencyType.WEEKLY]: date.startOf('week').valueOf() < dayjs().startOf('week').valueOf(),
      [HabitFrequencyType.MONTHLY]: date.startOf('month').valueOf() < dayjs().startOf('month').valueOf(),
    }[data?.frequency!.type]

    // 已经过去的 但没打卡，显示为[失败]还是[未打卡]
    const faildStatus = HabitProgressStatus.Failed // 显示为[失败]
    // const faildStatus = HabitProgressStatus.Pending // 显示为[未打卡]

    // 没有执行记录
    if (!data.record?.progress) {
      return isPastTime ? faildStatus : HabitProgressStatus.Pending
    }

    // 已完成
    if (data.record?.progress >= 1) {
      return HabitProgressStatus.Done
    }

    // 进行中
    if (data.record?.progress > 0) {
      return isPastTime ? faildStatus : HabitProgressStatus.Doing
    }

    return HabitProgressStatus.Pending
  }

  return {
    [HabitStatusMode.Habit]: data.enabled ? HabitProgressStatus.Enabled : HabitProgressStatus.Disabled,
    [HabitStatusMode.Record]: check(),
  }
}

// 计算进度
export const calcProgress = (data: Habit.RunTime.ItemRecord) => {
  const total = (data.record?.execList || []).reduce((acc: number, cur: Habit.Exec) => acc + cur.count, 0)
  return total / data.count!.total
}

// 获取指定日期所在天的起止时间
const getDayRange = (date: Dayjs) => {
  return {
    start: date.startOf('day'),
    end: date.endOf('day'),
  }
}

// 获取指定日期所在周的起止时间（基于中国习惯，周一作为周起始）
const getWeekRange = (date: Dayjs) => {
  const day = dayjs(date)
  return {
    start: day.startOf('week').add(1, 'day'), // 转换为周一
    end: day.endOf('week').add(1, 'day'),     // 转换为周日
  }
}

// 获取指定日期所在月的起止时间，并返回那一个月有几天
const getMonthRange = (date: Dayjs) => {
  const day = dayjs(date)
  return {
    start: day.startOf('month'),
    end: day.endOf('month'),
    nums: day.daysInMonth(),
  }
}

const checkDaily = (today: Dayjs, frequency: Habit.Frequency) => {
  const weekDay = today.day()
  const dayOfMonth = today.date()

  if (frequency?.weekDays?.length) {
    if (!frequency.weekDays.includes(weekDay)) {
      return false
    }
  }

  if (frequency?.dayOfMonth?.length) {
    if (!frequency.dayOfMonth.includes(dayOfMonth)) {
      return false
    }
  }

  return true
}

const checkWeekly = (today: Dayjs, frequency: Habit.Frequency) => {
  const { start } = getWeekRange(today)

  // 获取到这一周 在该月的日期
  const monthDays = _.range(0, 7).map(item => (
    dayjs(start).add(item, 'day').date()
  ))

  // 判断该日期 是否在频率范围内
  if (frequency?.dayOfMonth?.length) {
    return frequency?.dayOfMonth?.some((item: number) => (
      monthDays.includes(item)
    ))
  }

  return true
}

const checkMonth = (today: Dayjs, frequency: Habit.Frequency) => {
  const { start, nums } = getMonthRange(today)

  // 获取到这一月的日期
  const monthDays = _.range(0, nums).map(item => (
    dayjs(start).add(item, 'day').date()
  ))

  // 判断该日期 是否在频率范围内
  if (frequency?.dayOfMonth?.length) {
    return frequency?.dayOfMonth?.some((item: number) => (
      monthDays.includes(item)
    ))
  }

  return true
}

export const checkMap = {
  [HabitFrequencyType.DAILY]: checkDaily,
  [HabitFrequencyType.WEEKLY]: checkWeekly,
  [HabitFrequencyType.MONTHLY]: checkMonth,
}

export const dayRangeMap = {
  [HabitFrequencyType.DAILY]: getDayRange,
  [HabitFrequencyType.WEEKLY]: getWeekRange,
  [HabitFrequencyType.MONTHLY]: getMonthRange,
}
