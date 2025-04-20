import { ChatPoint } from '../entities/ChatPoint'
import * as chatUser from './user'
import { handleSoter } from '../utils'
import { Page, Point, Sort, Where } from '../types'

export const add = async ({ pointType, pointName, pointDesc, pageUrl, userAgent, extraData }: Point, uuid?: string) => {
  const point = new ChatPoint()

  if (uuid) {
    point.user = await chatUser.find({ uuid })
  }

  point.pointType = pointType
  point.pointName = pointName
  point.pointDesc = pointDesc
  point.pageUrl = pageUrl
  point.userAgent = userAgent
  point.extraData = extraData
  point.createAt = Date.now()

  return await ChatPoint.save(point)
}

export const list = async (page: Page, where: Where, sort: Sort) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  const [list, total] = await ChatPoint.findAndCount({
    where,
    skip,
    take: pageSize,
    order: handleSoter(sort, { createAt: 'DESC' }),
    relations: ['user'],
    select: ['pointId', 'pointType', 'pointName', 'pointDesc', 'pageUrl', 'userAgent', 'user', 'extraData', 'createAt'],
  })

  return { list, total }
}
