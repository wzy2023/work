import { ss } from '@/utils/storage'
import { useRoute } from 'vue-router'

const LOCAL_NAME = 'chatStorage'

const getDefaultActive = () => {
  const { chatId } = useRoute()?.params
  const localState = ss.get(LOCAL_NAME)

  if (localState?.history.some(item => item.chatId === chatId)) {
    return chatId
  }

  return localState?.active || Date.now()
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)

  const defaultState = {
    chat: [],
    history: [],
    usingContext: true,
  }

  return {
    ...defaultState,
    ...localState,
    active: getDefaultActive()
  }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
