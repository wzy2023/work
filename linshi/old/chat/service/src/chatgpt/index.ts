import * as dotenv from 'dotenv'
import 'isomorphic-fetch'
import type { ChatGPTAPIOptions, ChatMessage, SendMessageOptions } from 'chatgpt'
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { SocksProxyAgent } from 'socks-proxy-agent'
import httpsProxyAgent from 'https-proxy-agent'
import fetch from 'node-fetch'
import Keyv from "keyv"
import QuickLRU from "quick-lru"
import { sendResponse } from '../utils'
import { isNotEmptyString } from '../utils/is'
import type { ApiModel, ChatContext, ChatGPTUnofficialProxyAPIOptions } from '../types'
import type { RequestOptions } from './types'

const { HttpsProxyAgent } = httpsProxyAgent

dotenv.config()

const ErrorCodeMessage: Record<string, string> = {
  401: '[OpenAI] 提供错误的API密钥 | Incorrect API key provided',
  403: '[OpenAI] 服务器拒绝访问，请稍后再试 | Server refused to access, please try again later',
  502: '[OpenAI] 错误的网关 |  Bad Gateway',
  503: '[OpenAI] 服务器繁忙，请稍后再试 | Server is busy, please try again later',
  504: '[OpenAI] 网关超时 | Gateway Time-out',
  500: '[OpenAI] 服务器繁忙，请稍后再试 | Internal Server Error',
}

const timeoutMs: number = !isNaN(+process.env.TIMEOUT_MS) ? +process.env.TIMEOUT_MS : 300 * 1000

if (!isNotEmptyString(process.env.OPENAI_API_KEY) && !isNotEmptyString(process.env.OPENAI_ACCESS_TOKEN)) {
  throw new Error('Missing OPENAI_API_KEY or OPENAI_ACCESS_TOKEN environment variable')
}

const messageStore = new Keyv({
  store: new QuickLRU({ maxSize: 1e4 })
})

const init = (OPENAI_API_MODEL: string): { api: ChatGPTAPI | ChatGPTUnofficialProxyAPI, apiModel: ApiModel } => {
  if (isNotEmptyString(process.env.OPENAI_API_KEY)) {
    const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL
    const model = OPENAI_API_MODEL || 'gpt-3.5-turbo'

    const options: ChatGPTAPIOptions = {
      apiKey: process.env.OPENAI_API_KEY,
      completionParams: { model },
      debug: true,
      maxModelTokens: 4000
    }

    if (model.toLowerCase().includes('gpt-4')) {
      if (model.toLowerCase().includes('32k')) {
        options.maxModelTokens = 32768
        options.maxResponseTokens = 8192
      } else {
        options.maxModelTokens = 8192
        options.maxResponseTokens = 2048
      }
    }

    if (isNotEmptyString(OPENAI_API_BASE_URL)) {
      options.apiBaseUrl = `${OPENAI_API_BASE_URL}/v1`
    }

    setupProxy(options)

    return {
      api: new ChatGPTAPI({ ...options, messageStore }),
      apiModel: 'ChatGPTAPI'
    }

  } else {
    const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL
    const options: ChatGPTUnofficialProxyAPIOptions = {
      accessToken: process.env.OPENAI_ACCESS_TOKEN,
      debug: true,
    }
    if (isNotEmptyString(OPENAI_API_MODEL)) {
      options.model = OPENAI_API_MODEL
    }

    if (isNotEmptyString(process.env.API_REVERSE_PROXY)) {
      options.apiReverseProxyUrl = process.env.API_REVERSE_PROXY
    }

    setupProxy(options)

    return {
      api: new ChatGPTUnofficialProxyAPI({ ...options }),
      apiModel: 'ChatGPTUnofficialProxyAPI'
    }
  }
}

const modelMap = {
  'gpt-3.5-turbo': init('gpt-3.5-turbo'),
  'gpt-4': init('gpt-4'),
}

async function chatReplyProcess(options: RequestOptions) {
  const { message, lastContext, process, systemMessage, model } = options
  const { api, apiModel } = modelMap[model]

  try {
    let options: SendMessageOptions = { timeoutMs }

    if (apiModel === 'ChatGPTAPI') {
      if (isNotEmptyString(systemMessage)) {
        options.systemMessage = systemMessage
      }
    }

    if (lastContext != null) {
      if (apiModel === 'ChatGPTAPI') {
        options.parentMessageId = lastContext.parentMessageId
      } else {
        options = { ...lastContext }
      }
    }

    const response = await api.sendMessage(message, {
      ...options,
      onProgress: (partialResponse) => {
        process?.(partialResponse)
      },
    })

    return sendResponse({ type: 'Success', data: response })

  } catch (error: any) {
    const code = error.statusCode
    global.console.log(error)
    if (Reflect.has(ErrorCodeMessage, code)) {
      return sendResponse({ type: 'Fail', message: ErrorCodeMessage[code] })
    }
    return sendResponse({ type: 'Fail', message: error.message ?? 'Please check the back-end console' })
  }
}

function setupProxy(options: ChatGPTAPIOptions | ChatGPTUnofficialProxyAPIOptions) {
  if (process.env.SOCKS_PROXY_HOST && process.env.SOCKS_PROXY_PORT) {
    const agent = new SocksProxyAgent({
      hostname: process.env.SOCKS_PROXY_HOST,
      port: process.env.SOCKS_PROXY_PORT,
    })
    options.fetch = (url, options) => {
      return fetch(url, { agent, ...options })
    }
  } else {
    if (process.env.HTTPS_PROXY || process.env.ALL_PROXY) {
      const httpsProxy = process.env.HTTPS_PROXY || process.env.ALL_PROXY
      if (httpsProxy) {
        const agent = new HttpsProxyAgent(httpsProxy)
        options.fetch = (url, options) => {
          return fetch(url, { agent, ...options })
        }
      }
    }
  }
}

export type { ChatContext, ChatMessage }

export { chatReplyProcess }
