import { useChatStore } from '@/store'

export function useChat() {
  const chatStore = useChatStore()

  const getChatByChatIdAndIndex = (chatId: number, index: number) => {
    return chatStore.getChatByChatIdAndIndex(chatId, index)
  }

  const addChat = (chatId: number, chat: Chat.Chat) => {
    chatStore.addChatByChatId(chatId, chat)
  }

  const updateChat = (chatId: number, index: number, chat: Chat.Chat) => {
    chatStore.updateChatByChatId(chatId, index, chat)
  }

  const updateChatSome = (chatId: number, index: number, chat: Partial<Chat.Chat>) => {
    chatStore.updateChatSomeByChatId(chatId, index, chat)
  }

  return {
    addChat,
    updateChat,
    updateChatSome,
    getChatByChatIdAndIndex,
  }
}
