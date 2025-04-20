import { dayjs, Timezone } from '@wzyjs/utils/node'
import { userId } from './config'

export const options = (cookie?: string) => ({
  referrer: 'https://www.proginn.com/wo/work_todo',
  headers: {
    cookie,
    'Content-Type': 'multipart/form-data',
  },
})

export const getCurrentTime = () => {
  return dayjs().format('HH:mm')
}

export const userIsExists = (list: string[]) => {
  if (!Array.isArray(list)) {
    return false
  }
  return list.some(item => item.includes(userId))

  // 用户是否处于于列表的前 20 位
  // const findIndex = list.findIndex(item => item.includes(userId))
  // return findIndex >= 0 && findIndex <= 19
}
