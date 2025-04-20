import { dayjs } from '@wzyjs/utils/node'
import { NeedJobType } from '@/apis/entities'
import { nameMap } from './config'
import { batchCreate, tranData } from './data'
import { Info, Res, RetType } from './types'

export const needJobTypeMap: any = {
  [NeedJobType.Need]: '需求',
  [NeedJobType.Job]: '岗位',
}

export const isBetweenTime = (start: number, end: number) => {
  const currentTime = dayjs()
  const startTime = currentTime.hour(start).startOf('hour')
  const endTime = currentTime.hour(end).startOf('hour')
  return currentTime.isBetween(startTime, endTime, 'minute', '[]')
}

export const processList = async (data = [], dataSource: any, info: Info): Promise<Res[]> => {
  let num = 0

  const { name, type } = info

  try {
    if (!data.length) {
      throw new Error('无数据')
    }

    const filterData = data.map((item: any) => {
      if (dataSource?.find((i: any) => i[nameMap['url']] === item.url)) {
        return
      }

      item.type = needJobTypeMap[type]

      num++

      return item
    }).filter(Boolean)

    const records = tranData(filterData)
    if (!records.length) {
      throw new Error('无最新数据')
    }

    const res: any = await batchCreate(records)
    if (res.code !== 0) {
      throw new Error(res?.error?.message)
    }

    return [
      {
        name,
        type,
        msg: `新增 ${num} 条${needJobTypeMap[type]}`,
        retType: RetType.SuccessExec,
      },
      ...filterData.map(item => ({
        name,
        type,
        data: item,
        msg: '获取成功',
        retType: RetType.SuccessGet,
      })),
    ]

  } catch (e: any) {
    return [{
      name,
      type,
      msg: e.message,
      retType: RetType.Fail,
    }]
  }
}

// export const sendEmail = async (res: Res) => {
//   let mails = toEmail.list
//
//   const blackList = setting?.black || []
//   const whiteList = setting?.white || []
//
// // 在黑名单里，并且不在白名单里的，则发到忽略邮箱
//   const isBlack = blackList.some((word: string) => item.desc.toLowerCase().includes(word))
//   const isWhite = whiteList.some((word: string) => item.desc.toLowerCase().includes(word))
//   if (isBlack && !isWhite) {
//     mails = toEmail.list_ignore
//   }
//
//   const title = `[新${needJobTypeMap[type]}] [${item.source}] (${item.price}) ${item.title}`.replace(/\s/g, '')
//   const content = item.desc
//   console.log(666, title, content)
//
//   mails.forEach(mail => {
//     sendMail(mail, title, content)
//   })
// }
