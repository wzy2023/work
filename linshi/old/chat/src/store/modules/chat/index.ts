import { defineStore } from 'pinia'
import { getLocalState, setLocalState } from './helper'
import { router } from '@/router'
import dayjs from 'dayjs'
import { useSystemStore } from '@/store'

export const useChatStore = defineStore('chat-store', {
  state: (): Chat.ChatState => getLocalState(),

  getters: {
    getChatHistoryByCurrentActive(state: Chat.ChatState) {
      const index = state.history.findIndex(item => item.chatId === state.active)
      if (index !== -1) {
        return state.history[index]
      }
      return null
    },

    getChatByChatId(state: Chat.ChatState) {
      return (chatId?: number) => {
        if (chatId) { return state.chat.find(item => item.chatId === chatId)?.data ?? [] }
        return state.chat.find(item => item.chatId === state.active)?.data ?? []
      }
    },
  },

  actions: {
    setUsingContext(context: boolean) {
      this.usingContext = context
      this.recordState()
    },

    addHistory(history: Chat.History, chatData: Chat.Chat[] = []) {
      this.history.unshift(history)
      this.chat.unshift({ chatId: history.chatId, data: chatData })
      this.active = history.chatId
      this.reloadRoute(history.chatId)
    },

    updateHistory(chatId: number, edit: Partial<Chat.History>) {
      const index = this.history.findIndex(item => item.chatId === chatId)
      if (index !== -1) {
        this.history[index] = { ...this.history[index], ...edit }
        this.recordState()
      }
    },

    async deleteHistory(index: number) {
      this.history.splice(index, 1)
      this.chat.splice(index, 1)

      if (this.history.length === 0) {
        this.active = null
        this.reloadRoute()
        return
      }

      if (index > 0 && index <= this.history.length) {
        const chatId = this.history[index - 1].chatId
        this.active = chatId
        this.reloadRoute(chatId)
        return
      }

      if (index === 0) {
        if (this.history.length > 0) {
          const chatId = this.history[0].chatId
          this.active = chatId
          this.reloadRoute(chatId)
        }
      }

      if (index > this.history.length) {
        const chatId = this.history[this.history.length - 1].chatId
        this.active = chatId
        this.reloadRoute(chatId)
      }
    },

    async setActive(chatId: number) {
      this.active = chatId
      return await this.reloadRoute(chatId)
    },

    getChatByChatIdAndIndex(chatId: number, index: number) {
      if (!chatId || chatId === 0) {
        if (this.chat.length) { return this.chat[0].data[index] }
        return null
      }
      const chatIndex = this.chat.findIndex(item => item.chatId === chatId)
      if (chatIndex !== -1) { return this.chat[chatIndex].data[index] }
      return null
    },

    addChatByChatId(chatId: number, chat: Chat.Chat) {
      if (!chatId || chatId === 0) {
        if (this.history.length === 0) {
          const chatId = Date.now()
          this.history.push({ chatId, title: chat.text, isEdit: false })
          this.chat.push({ chatId, data: [chat] })
          this.active = chatId
          this.recordState()
        }
        else {
          this.chat[0].data.push(chat)
          if (this.history[0].title === 'New Chat') { this.history[0].title = chat.text }
          this.recordState()
        }
      }

      const index = this.chat.findIndex(item => item.chatId === chatId)
      if (index !== -1) {
        this.chat[index].data.push(chat)
        if (this.history[index].title === 'New Chat') { this.history[index].title = chat.text }
        this.recordState()
      }
    },

    updateChatByChatId(chatId: number, index: number, chat: Chat.Chat) {
      if (!chatId || chatId === 0) {
        if (this.chat.length) {
          this.chat[0].data[index] = chat
          this.recordState()
        }
        return
      }

      const chatIndex = this.chat.findIndex(item => item.chatId === chatId)
      if (chatIndex !== -1) {
        this.chat[chatIndex].data[index] = chat
        this.recordState()
      }
    },

    updateChatSomeByChatId(chatId: number, index: number, chat: Partial<Chat.Chat>) {
      if (!chatId || chatId === 0) {
        if (this.chat.length) {
          this.chat[0].data[index] = { ...this.chat[0].data[index], ...chat }
          this.recordState()
        }
        return
      }

      const chatIndex = this.chat.findIndex(item => item.chatId === chatId)
      if (chatIndex !== -1) {
        this.chat[chatIndex].data[index] = { ...this.chat[chatIndex].data[index], ...chat }
        this.recordState()
      }
    },

    deleteChatByChatId(chatId: number, index: number) {
      if (!chatId || chatId === 0) {
        if (this.chat.length) {
          this.chat[0].data.splice(index, 1)
          this.recordState()
        }
        return
      }

      const chatIndex = this.chat.findIndex(item => item.chatId === chatId)
      if (chatIndex !== -1) {
        this.chat[chatIndex].data.splice(index, 1)
        this.recordState()
      }
    },

    clearChatByChatId(chatId: number) {
      if (!chatId || chatId === 0) {
        if (this.chat.length) {
          this.chat[0].data = []
          this.recordState()
        }
        return
      }

      const index = this.chat.findIndex(item => item.chatId === chatId)
      if (index !== -1) {
        this.chat[index].data = []
        this.recordState()
      }
    },

    async reloadRoute(chatId?: number, query?: any) {
      this.recordState()
      await router.push({ name: 'Chat', params: { chatId }, query })
    },

    recordState() {
      setLocalState(this.$state)
    },

    // 初始化引导对话
    initTutorialChat() {
      const chatId = this.active
      const systemStore = useSystemStore()

      this.addHistory({ title: '使用帮助', chatId, isEdit: false });

      ;(systemStore.systemSetting?.tutorial?.demoTalks || []).forEach((item) => {
        if (item.key) {
          this.addChatByChatId(chatId, {
            dateTime: dayjs(item.dateTime).format('YYYY/MM/DD HH:mm:ss'),
            text: item.key.replace(/\\n/g, '\n'),
            inversion: true,
          } as Chat.Chat)
        }
        if (item.value) {
          this.addChatByChatId(chatId, {
            dateTime: dayjs(item.dateTime).format('YYYY/MM/DD HH:mm:ss'),
            text: item.value.replace(/\\n/g, '\n'),
            inversion: false,
          } as Chat.Chat)
        }
      })
    },
  },
})
