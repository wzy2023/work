import { ChatUser } from '../entities/ChatUser'
import { ChatShare } from '../entities/ChatShare'
import { Page, Where } from '../types'

export const add = async (inviter: string, invitee: string, num: number) => {
  if (!inviter || !invitee) {
    throw new Error('inviter 或 invitee 不能为空')
  }

  const inviterUser = await ChatUser.findOneBy({ uuid: inviter })
  const inviteeUser = await ChatUser.findOneBy({ uuid: invitee })
  if (!inviterUser || !inviteeUser) {
    return
  }

  const share = new ChatShare()
  share.inviter = inviterUser
  share.invitee = inviteeUser
  share.num = num
  share.createAt = Date.now()

  await share.save()
}

export const list = async (page: Page, where: Where, isAdmin?: boolean) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  let [list, total] = await ChatShare.findAndCount({
    where,
    skip,
    take: pageSize,
    order: { createAt: 'DESC' },
    relations: ['inviter', 'invitee'],
    select: ['shareId', 'inviter', 'invitee', 'num', 'createAt'],
  })

  if (!isAdmin) {
    list = list.map(item => ({
      shareId: item.shareId,
      createAt: item.createAt,
      num: item.num,
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

// 查找指定用户的邀请人
export const findInviter = async (uuid: string) => {
  const share = await ChatShare.findOne({
    where: { invitee: { uuid } },
    relations: ['inviter'],
  })
  if (!share) {
    return
  }
  return share.inviter
}
