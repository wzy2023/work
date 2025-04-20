<script setup lang='ts'>
import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NAutoComplete, NButton, NInput, NPopover, useDialog, useMessage, NSelect } from 'naive-ui'
import html2canvas from 'html2canvas'
import { Message } from './components'
import { useScroll } from './hooks/useScroll'
import { useChat } from './hooks/useChat'
import { useCopyCode } from './hooks/useCopyCode'
import { useUsingContext } from './hooks/useUsingContext'
import HeaderComponent from './components/Header/index.vue'
import Plugins from './components/Plugins/index.vue'
import { useAppStore, useChatStore, usePromptStore, useSystemStore, useUserStore } from '@/store'
import { HoverButton, SvgIcon } from '@/components'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { fetchChatAPIProcess } from '@/api'
import { t } from '@/locales'
import { trackEvent } from '@/utils/functions'

let controller = new AbortController()

const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'

const { params: { chatId } } = useRoute()
const dialog = useDialog()
const ms = useMessage()

const chatStore = useChatStore()
const userStore = useUserStore()
const systemStore = useSystemStore()
const appStore = useAppStore()

useCopyCode()

const { isMobile } = useBasicLayout()
const { addChat, updateChat, updateChatSome, getChatByChatIdAndIndex } = useChat()
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
const { usingContext, toggleUsingContext } = useUsingContext()

const dataSources = computed(() => chatStore.getChatByChatId(+chatId))
const conversationList = computed(() => dataSources.value.filter(item => (!item.inversion && !item.error)))

const prompt = ref<string>('')
const loading = ref<boolean>(false)
const inputRef = ref<Ref | null>(null)

// 添加PromptStore
const promptStore = usePromptStore()

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
const { promptList: promptTemplate } = storeToRefs<any>(promptStore)

let destroy: () => void
let retryCount = 3

// 未知原因刷新页面，loading 状态不会重置，手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading) {
    updateChatSome(+chatId, index, { loading: false })
  }
})

const currentBtn = ref<string[]>([])

const gptModel = ref<string>(localStorage.getItem('gptModel') || 'gpt-3.5-turbo')

const gpt4Disabled = computed<boolean>(() => {
  if (systemStore?.systemSetting === null) {
    return undefined
  }
  return !systemStore?.systemSetting?.chat?.openGPT4 || (userStore.userInfo?.payPrice <= 0 && userStore.userInfo?.role !== 999)
})

const alertWaitTips = () => {
  if (isMobile.value) {
    return
  }

  let ms1: any
  let tip1: any

  const { tips = [] } = systemStore.systemSetting?.tutorial

  const alert = () => {
    ms1 = ms.info(`小提示: ${tips[Math.floor(Math.random() * tips.length)]}`, { duration: 10000 })
  }

  alert()
  tip1 = setInterval(alert, 10000)

  return {
    destroy: () => {
      clearTimeout(tip1)
      ms1?.destroy()
    }
  }
}

let alertWaitTipsDestroy: any
const alertLoadingTip = (delay: number = 5, s: number = 15) => {
  let tip1: any
  let tip2: any
  let msg1: any
  let destroy: any

  tip1 = setTimeout(() => {
    const loadingMessage = `当前聊天人数较多，接口请求较慢，请您稍候...`
    msg1 = ms.create(`${loadingMessage} ${s}s`, { type: 'loading', duration: s * 10000 })
    tip2 = setInterval(() => {
      if (s > 0) {
        msg1.content = `${loadingMessage} ${--s}s`
      }
    }, 1000)
  }, delay * 1000)

  return {
    destroy: () => {
      clearTimeout(tip1)
      clearTimeout(tip2)
      msg1?.destroy()
      destroy?.()
    }
  }
}

function handleSubmit() {
  retryCount = 3
  onConversation(`${currentBtn.value.join('\n')}\n\n`)
}

function handleAppSubmit(text: string) {
  retryCount = 3
  onConversation(text)
}

const fetchChatAPIOnce = async (message: string, messageId: number, isConversation: boolean, index: number, options: Chat.ConversationRequest) => {
  if (!chatId) {
    ms.error('遇到点小错误，请刷新页面~')
    throw new Error('[遇到点小错误，请刷新页面~]')
  }

  let lastText = ''

  destroy?.()
  destroy = alertLoadingTip().destroy
  alertWaitTipsDestroy = alertWaitTips()?.destroy

  await fetchChatAPIProcess<Chat.ConversationResponse>({
    chatId: +chatId,
    messageId,
    prompt: message,
    options,
    signal: controller.signal,
    model: gptModel.value,
    onDownloadProgress: ({ event }) => {
      destroy?.()

      const xhr = event.target
      const { responseText } = xhr
      const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
      let chunk = responseText
      if (lastIndex !== -1) {
        chunk = responseText.substring(lastIndex)
      }

      try {
        const data = JSON.parse(chunk)
        if (data?.detail?.choices?.[0]?.finish_reason === 'stop') {
          alertWaitTipsDestroy?.()
        }

        updateChat(
          +chatId,
          index,
          {
            dateTime: new Date().toLocaleString(),
            text: lastText + (data?.text ?? ''),
            inversion: false,
            messageId,
            error: false,
            loading: false,
            conversationOptions: { conversationId: data.conversationId, parentMessageId: data.id },
            requestOptions: { prompt: message, ...options },
          },
        )

        if (openLongReply && data.detail.choices[0].finish_reason === 'length') {
          options.parentMessageId = data.id
          lastText = data.text
          message = ''
          return fetchChatAPIOnce(message, messageId, isConversation, index, options,)
        }

        if (isConversation) {
          scrollToBottomIfAtBottom()
        }

      } catch (error) {
        console.error(error)
      }
    },
  })
}

async function onConversation(text?: string) {
  if (loading.value) {
    return
  }

  let message = ((text || '') + '\n\n' + prompt.value).trim()
  if (!message) {
    return
  }

  // 敏感词检查
  const words = systemStore.systemSetting?.chat?.sensitiveWord?.split('\n').filter((item: string) => item) || []
  if (words.some((item: string) => message?.toLowerCase().includes(item.toLowerCase()))) {
    ms.error('抱歉，你的内容涉及敏感词，请检查后重试~')
    return
  }

  controller = new AbortController()
  const messageId = Date.now()

  trackEvent('click', 'conversation', {
    prompt: message,
  })

  // 显示用户输入的内容
  addChat(
    +chatId,
    {
      dateTime: new Date().toLocaleString(),
      text: message,
      messageId,
      inversion: true,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    },
  )
  scrollToBottom()

  loading.value = true
  prompt.value = ''

  let options: Chat.ConversationRequest = {}
  const lastContext = conversationList.value[conversationList.value.length - 1]?.conversationOptions

  if (lastContext && usingContext.value) {
    options = { ...lastContext }
  }

  // 显示机器人回复的内容
  addChat(
    +chatId,
    {
      dateTime: new Date().toLocaleString(),
      text: '',
      messageId,
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )
  scrollToBottom()

  // 发请求获取机器人回复
  try {
    await fetchChatAPIOnce(message, messageId, true, dataSources.value.length - 1, options)

  } catch (error: any) {
    destroy?.()
    alertWaitTipsDestroy?.()

    // 用户取消请求时
    if (error.message === 'canceled') {
      updateChatSome(
        +chatId,
        dataSources.value.length - 1,
        {
          loading: false,
        },
      )
      scrollToBottomIfAtBottom()
      return
    }

    // 点数用完时，显示充值弹窗
    if (error.status === 'CountEmpty') {
      setTimeout(() => {
        appStore.setVipShowTab('pay')
      }, 1000)
    }

    // 报错自动重试
    if (error.status === 'Retry' && --retryCount > 0) {
      setTimeout(() => onConversation(text), 1000)
      ms.error('请求失败，正在重试...')
      return
    }

    const errorMessage = error?.message ?? t('common.wrong')
    const currentChat = getChatByChatIdAndIndex(+chatId, dataSources.value.length - 1)

    // 更新机器人回复为错误提示
    if (currentChat?.text && currentChat.text !== '') {
      updateChatSome(
        +chatId,
        dataSources.value.length - 1,
        {
          text: `${currentChat.text}\n[${errorMessage}]`,
          error: false,
          loading: false,
        },
      )
      return
    }

    updateChat(
      +chatId,
      dataSources.value.length - 1,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        messageId,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )
    scrollToBottomIfAtBottom()

  } finally {
    loading.value = false
    setTimeout(() => {
      userStore.fetchUserInfo(false)
    }, 500)
  }
}

async function onRegenerate(index: number) {
  if (loading.value) {
    return
  }

  controller = new AbortController()

  const { requestOptions, messageId } = dataSources.value[index]

  let message = requestOptions?.prompt ?? ''
  let options: Chat.ConversationRequest = {}

  if (requestOptions.options) {
    options = { ...requestOptions.options }
  }

  trackEvent('click', 'regenerate', {
    prompt: message,
  })

  loading.value = true

  updateChat(
    +chatId,
    index,
    {
      dateTime: new Date().toLocaleString(),
      messageId,
      text: '',
      inversion: false,
      error: false,
      loading: true,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )

  try {
    await fetchChatAPIOnce(message, messageId, true, index, options)

  } catch (error: any) {
    destroy?.()
    alertWaitTipsDestroy?.()

    // 用户取消请求时
    if (error.message === 'canceled') {
      updateChatSome(
        +chatId,
        index,
        { loading: false },
      )
      return
    }

    // 点数用完时，显示充值弹窗
    if (error.status === 'CountEmpty') {
      setTimeout(() => {
        appStore.setVipShowTab('pay')
      }, 1000)
    }

    const errorMessage = error?.message ?? t('common.wrong')

    // 报错自动重试
    if (error.status === 'Retry' && --retryCount > 0) {
      setTimeout(() => onRegenerate(index), 1000)
      ms.error('请求失败，正在重试...')
      return
    }

    updateChat(
      +chatId,
      index,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        messageId,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )

  } finally {
    loading.value = false
    setTimeout(() => {
      userStore.fetchUserInfo(false)
    }, 500)
  }
}

function handleExport() {
  if (loading.value) {
    return
  }

  const d = dialog.warning({
    title: t('chat.exportImage'),
    content: t('chat.exportImageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: async () => {
      try {
        d.loading = true
        const ele = document.getElementById('image-wrapper')
        const canvas = await html2canvas(ele as HTMLDivElement, {
          useCORS: true,
        })
        const imgUrl = canvas.toDataURL('image/png')
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = imgUrl
        tempLink.setAttribute('download', 'chat-shot.png')
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }

        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(imgUrl)
        d.loading = false
        ms.success(t('chat.exportSuccess'))
        Promise.resolve()
      } catch (error: any) {
        ms.error(t('chat.exportFailed'))
      } finally {
        d.loading = false
      }
    },
  })
}

function handleDelete(index: number) {
  if (loading.value) {
    return
  }

  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.deleteMessageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.deleteChatByChatId(+chatId, index)
    },
  })
}

function handleClear() {
  if (loading.value) {
    return
  }

  dialog.warning({
    title: t('chat.clearChat'),
    content: t('chat.clearChatConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.clearChatByChatId(+chatId)
    },
  })
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
}

function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false
  }
}

function handleClickBtn(item: { label: string; value: string }) {
  if (currentBtn.value.includes(item.value)) {
    currentBtn.value = currentBtn.value.filter(i => i !== item.value)
  } else {
    currentBtn.value.push(item.value)
  }
}

function handleDoubleClickBtn(item: { label: string; value: string }) {
  retryCount = 3
  onConversation(item.value)
}

const searchOptions = computed(() => {
  if (prompt.value.startsWith('/')) {
    return promptTemplate.value.filter((item: {
      key: string
    }) => item.key.toLowerCase().includes(prompt.value.substring(1).toLowerCase())).map((obj: { value: any }) => {
      return {
        label: obj.value,
        value: obj.value,
      }
    })
  } else {
    return []
  }
})

const renderOption = (option: { label: string }) => {
  for (const i of promptTemplate.value) {
    if (i.value === option.label) {
      return [i.key]
    }
  }
  return []
}

const placeholder = computed(() => {
  if (isMobile.value) {
    return t('chat.placeholderMobile')
  }
  return t('chat.placeholder')
})

const buttonDisabled = computed(() => {
  return (loading.value || !prompt.value || prompt.value.trim() === '') && currentBtn.value.length === 0
})

const footerClass = computed(() => {
  let classes = ['p-4']
  if (isMobile.value) {
    classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pr-3', 'overflow-hidden']
  }
  return classes
})

const retryCountAndRegenerate = (index: number) => {
  retryCount = 3
  onRegenerate(index)
}

onMounted(() => {
  if (inputRef.value && !isMobile.value) {
    inputRef.value?.focus()
  }

  watchEffect(() => {
    if (!systemStore.loading) {
      scrollToBottom()
    }
  })

  watchEffect(() => {
    if (gpt4Disabled.value === undefined) {
      return
    }
    if (gptModel.value === 'gpt-4' && gpt4Disabled.value) {
      ms.error('充值过的用户才可以使用 GPT 4 模型哦！')
      gptModel.value = 'gpt-3.5-turbo'
    }
    localStorage.setItem('gptModel', gptModel.value)
  })
})

// @ts-ignore
onUnmounted(() => {
  if (loading.value) {
    controller.abort()
  }
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <HeaderComponent
      v-if="isMobile"
      :using-context="usingContext"
      @export="handleExport"
      @toggle-using-context="toggleUsingContext"
    />
    <main class="flex-1 overflow-hidden">
      <div
        id="scrollRef"
        ref="scrollRef"
        class="h-full overflow-hidden overflow-y-auto"
      >
        <div
          id="image-wrapper"
          class="w-full max-w-screen-xl m-auto dark:bg-[#101014]"
          :class="[isMobile ? 'p-2' : 'p-4']"
        >
          <template v-if="!dataSources.length">
            <div>
              <div class="flex items-center justify-center mt-4 text-center text-neutral-300">
                <SvgIcon icon="ri:bubble-chart-fill" class="mr-2 text-3xl" />
                <span>{{ $t('chat.chatBootStrap') }}</span>
              </div>
              <Plugins @onSubmit='handleAppSubmit' />
            </div>
          </template>
          <template v-else>
            <div>
              <Message
                v-for="(item, index) of dataSources"
                :key="index"
                :date-time="item.dateTime"
                :text="item.text"
                :inversion="item.inversion"
                :error="item.error"
                :loading="item.loading"
                :requestOptions="item.requestOptions"
                :avatar="userStore.userInfo?.wx?.headimgurl"
                @regenerate="retryCountAndRegenerate(index)"
                @delete="handleDelete(index)"
              />
              <div class="sticky bottom-0 left-0 flex justify-center">
                <NButton v-if="loading" type="warning" @click="handleStop">
                  <template #icon>
                    <SvgIcon icon="ri:stop-circle-line" />
                  </template>
                  {{ $t('chat.stopResponding') }}
                </NButton>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
    <footer :class="footerClass">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="flex items-center justify-between space-x-2">
          <div>
            <div class="flex items-center justify-between space-x-2">
              <HoverButton @click="handleClear">
              <span class="text-xl text-[#4f555e] dark:text-white">
                <SvgIcon icon="ri:delete-bin-line" />
              </span>
              </HoverButton>
              <HoverButton v-if="!isMobile" @click="handleExport">
              <span class="text-xl text-[#4f555e] dark:text-white">
                <SvgIcon icon="ri:download-2-line" />
              </span>
              </HoverButton>
              <HoverButton v-if="!isMobile" @click="toggleUsingContext">
              <span class="text-xl" :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }">
                <SvgIcon icon="ri:chat-history-line" />
              </span>
              </HoverButton>
            </div>

            <NSelect
              v-if='!isMobile'
              size='small'
              style='width: 80%; margin: 0 auto'
              v-model:value="gptModel"
              :options="[
                  {label: 'GPT 3.5', value: 'gpt-3.5-turbo'},
                  {label: 'GPT 4', value: 'gpt-4'}
                ]"
            />
          </div>

          <NAutoComplete v-model:value="prompt" :options="searchOptions" :render-label="renderOption">
            <template #default="{ handleInput, handleBlur, handleFocus }">
              <div style="width: 100%">
                <div v-if='!isMobile' class='flex items-center overflow-hidden scrollbar'>
                  <span style='font-size: 12px; color: #aaa; white-space: nowrap'>附带内容： </span>
                  <div class='flex-1 overflow-x-scroll'>
                    <NPopover trigger="hover" v-for="item in systemStore.systemSetting?.chat?.btns || []">
                      <template #trigger>
                        <NButton
                          size="tiny"
                          :type="currentBtn.includes(item.value) ? 'primary' : 'default'"
                          style="margin-right: 3px"
                          @click="() => handleClickBtn(item)"
                          @dblclick="() => handleDoubleClickBtn(item)"
                        >
                          {{ item.label }}
                        </NButton>
                      </template>
                      <span>{{ item?.tip || item.value }}</span>
                    </NPopover>
                  </div>
                </div>
                <NInput
                  ref="inputRef"
                  v-model:value="prompt"
                  style="margin-top: 3px"
                  show-count
                  :maxlength="2000"
                  type="textarea"
                  :placeholder="placeholder"
                  :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
                  @input="handleInput"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @keypress="handleEnter"
                />
              </div>
            </template>
          </NAutoComplete>

          <NButton type="primary" :disabled="buttonDisabled" @click="handleSubmit">
            <template #icon>
              <span class="dark:text-black">
                <SvgIcon icon="ri:send-plane-fill" />
              </span>
            </template>
          </NButton>
        </div>
      </div>
    </footer>
  </div>
</template>
