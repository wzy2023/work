import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { get, post } from '@/utils/request'

export function fetchChatAPIProcess<T = any>(
  params: {
    chatId: number
    messageId: number
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
    model: string
  },
) {
  return post<T>({
    url: '/chat/process',
    data: {
      chatId: params.chatId,
      messageId: params.messageId,
      prompt: params.prompt,
      options: params.options,
      model: params.model
    },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function loginByMobile<T>(params: { mobile?: string, code: string, share?: string, weChatRes: any }) {
  return get<T>({
    url: '/user/login/mobile',
    data: params,
  })
}

export function loginByWeChat<T>(params: { code: string }) {
  return get<T>({
    url: '/user/login/wechat',
    data: params,
  })
}

export function fetchUserInfo<T>(token: string) {
  return get<T>({
    url: '/user/info',
    data: { token },
  })
}

export function fetchUserList<T>(params: any) {
  return get<T>({
    url: '/manage/user/list',
    data: params,
  })
}

export function updateInfo<T>(params: any) {
  return post<T>({
    url: '/manage/user/update/info',
    data: params,
  })
}

export function updateStatus<T>(params: any) {
  return post<T>({
    url: '/manage/user/update/status',
    data: params,
  })
}

export function fetchTalkList<T>(params: any) {
  return get<T>({
    url: '/manage/talk/list',
    data: params,
  })
}

export function fetchSetting<T>() {
  return get<T>({
    url: '/system/setting',
  })
}

export function updateSetting<T>(params: any) {
  return post<T>({
    url: '/manage/system/setting/update',
    data: params,
  })
}

export function fetchShareList<T>(params: any) {
  return get<T>({
    url: '/manage/share/list',
    data: params,
  })
}

export function fetchUserShareList<T>() {
  return get<T>({
    url: '/share/list',
  })
}

export function fetchOrderList<T>() {
  return get<T>({
    url: '/manage/order/list',
  })
}

export function fetchUserOrderList<T>() {
  return get<T>({
    url: '/order/list',
  })
}

export function addOrder<T>(params: any) {
  return post<T>({
    url: '/order/add',
    data: params,
  })
}

export function fetchOrderInfo<T>(params: any) {
  return get<T>({
    url: '/order/info',
    data: params,
  })
}

export function addPoint<T>(params: any) {
  return post<T>({
    url: '/point/add',
    data: params,
  })
}

export function fetchPointList<T>(params: any) {
  return get<T>({
    url: '/manage/point/list',
    data: params,
  })
}

export function sendSMSCode<T>(mobile: string) {
  return post<T>({
    url: '/user/sms/send',
    data: {
      mobile
    },
  })
}

export function fetchIncomeList<T>(params: any) {
  return get<T>({
    url: '/manage/income/list',
    data: params,
  })
}

export function fetchUserIncomeList<T>() {
  return get<T>({
    url: '/income/list',
  })
}
