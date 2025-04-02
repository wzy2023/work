import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { TaskExecutionRecord } from '../../types'

dayjs.extend(duration)

export const calculateTotalDuration = (records: TaskExecutionRecord[]) => {
  const totalTime = records.reduce((acc, record) => {
    return acc + dayjs(record.end).diff(dayjs(record.start))
  }, 0)

  const dur = dayjs.duration(totalTime)
  return {
    hours: Math.floor(dur.asHours()),
    minutes: dur.minutes(),
    seconds: dur.seconds(),
  }
}

export const formatText = (params: { hours?: number, minutes?: number, seconds?: number }) => {
  const { hours, minutes, seconds } = params

  let text = ''
  if (hours) {
    text += `${hours}h `
  }
  if (minutes) {
    text += `${minutes}m `
  }
  if (seconds) {
    text += `${seconds}s`
  }

  return text
}

export const formatDuration = (start: number, end?: number) => {
  const dur = dayjs.duration(dayjs(end).diff(dayjs(start)))

  const hours = Math.floor(dur.asHours())
  const minutes = dur.minutes()
  const seconds = dur.seconds()

  return formatText({
    hours,
    minutes,
    seconds,
  })
}
