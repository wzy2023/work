import { ChatUser } from '../entities/ChatUser'
import { ChatIncome } from '../entities/ChatIncome'
import { Page, Where } from '../types'

export const add = async (inviter: string, invitee: string, price: number, income: number) => {
  if (!inviter || !invitee) {
    return
  }

  const inviterUser = await ChatUser.findOneBy({ uuid: inviter })
  const inviteeUser = await ChatUser.findOneBy({ uuid: invitee })
  if (!inviterUser || !inviteeUser) {
    return
  }

  const share = new ChatIncome()
  share.inviter = inviterUser
  share.invitee = inviteeUser
  share.price = Number(price)
  share.income = Number(income)
  share.createAt = Date.now()

  await share.save()
}

export const list = async (page: Page, where: Where, isAdmin?: boolean) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  let [list, total] = await ChatIncome.findAndCount({
    where,
    skip,
    take: pageSize,
    order: { createAt: 'DESC' },
    relations: ['inviter', 'invitee'],
    select: ['incomeId', 'inviter', 'invitee', 'price', 'income', 'createAt'],
  })

  if (!isAdmin) {
    list = list.map(item => ({
      shareId: item.incomeId,
      createAt: item.createAt,
      price: item.price,
      income: item.income,
      invitee: {
        wx: {
          nickname: item.invitee?.wx?.nickname,
          headimgurl: item.invitee?.wx?.headimgurl,
        }
      }
    })) as any[]
  }

  return { list, total }
}
