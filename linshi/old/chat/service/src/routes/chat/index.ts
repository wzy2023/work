import express from 'express'
import { count, login } from '../../middleware'
import { chatSystem, chatTalk, chatUser } from '../../database'
import { calculateCount, countTokens } from '../../utils'
import { ChatContext, ChatMessage, chatReplyProcess } from '../../chatgpt'
import { throttle } from 'lodash-es'

interface RequestProps {
  token: string
  chatId: number
  messageId: number
  prompt: string
  model: string
  options?: ChatContext
}

const router = express.Router()

router.post('/process', [login, count], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    let firstChunk = true
    const { token: uuid, chatId, messageId, prompt, model, options = {} } = req.body as RequestProps

    if (!chatId) {
      throw new Error('请刷新页面后重试~')
    }
    if (!prompt) {
      throw new Error('请输入问题~')
    }

    const setting = await chatSystem.get('setting')

    // 保存聊天记录
    const recordMessageSql = throttle((isSuccess: boolean, text?: string, count?: number) => {
      chatTalk.addOrUpdate(uuid, chatId, { messageId, prompt, text, isSuccess, count })
    }, 1000)

    recordMessageSql(false)

    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      model,
      systemMessage: setting.value?.chat?.globalPrompt,
      process: async (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false

        // 回复中
        if (chat.delta) {
          recordMessageSql(false, chat.text)
        }

        // 回复结束时
        if (!chat.delta && chat.text) {
          // 分级别扣点
          const tokens = countTokens(chat.text + prompt)
          const count = Math.min(3, calculateCount(tokens, model === 'gpt-4'))
          console.log('tokens', tokens, 'count', count)
          await chatUser.reduceCount(uuid, count)

          // 保存聊天记录
          recordMessageSql(true, chat.text, count)
        }
      },
    })
  } catch (error) {
    console.error(666, '报错', Date.now(), (new Date).toLocaleTimeString(), error)

    const errorMap = {
      'fetch failed': '[服务器不稳定，请稍后再试]',
      'Network Error': '[服务器不稳定，请稍后再试]',
    }
    const errorMsg = errorMap[error.message]

    await res.send({ status: errorMsg ? 'Retry' : 'Fail', message: errorMsg || error.message, data: Date.now() })
  } finally {
    res.end()
  }
})

export default router
