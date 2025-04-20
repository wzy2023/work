import { ChatTalk } from '../entities/ChatTalk'
import { ChatUser } from '../entities/ChatUser'
import { handleSoter } from '../utils'
import { Page, Sort, Talk, Where } from '../types'

export const addOrUpdate = async (uuid: string, chatId: number, {
  messageId,
  prompt,
  text,
  isSuccess,
  count
}: Talk) => {
  if (!chatId || !messageId || !uuid || !prompt) {
    return
  }

  const talk: any = await ChatTalk.findOneBy({ uuid, chatId })

  if (talk) {
    const message = talk.talks?.find((item: any) => item.messageId === messageId)
    if (message) {
      message.text = text
      message.isSuccess = isSuccess
      message.count = count || 0
      message.updateAt = Date.now()
    } else {
      talk.talks.push({ prompt, text, messageId, isSuccess, count: 0, createAt: Date.now(), updateAt: Date.now() })
    }
    talk.updateAt = Date.now()
    await talk.save()
    return
  }

  const user = await ChatUser.findOneBy({ uuid })

  const newTalk = new ChatTalk()
  newTalk.chatId = chatId
  newTalk.uuid = uuid
  newTalk.user = user
  newTalk.talks = [
    { prompt, text, messageId, isSuccess, count: 0, createAt: Date.now(), updateAt: Date.now() },
  ]
  newTalk.createAt = Date.now()
  newTalk.updateAt = Date.now()
  await newTalk.save()
}

export const list = async (page: Page, where: Where, sort: Sort) => {
  const { current, pageSize } = page
  const skip = (current - 1) * pageSize

  const [list, total] = await ChatTalk.findAndCount({
    where,
    skip,
    take: pageSize,
    order: handleSoter(sort, { createAt: 'DESC' }),
    relations: ['user'],
    select: ['uuid', 'chatId', 'user', 'talks', 'createAt', 'updateAt'],
  })

  return { list, total }
}
