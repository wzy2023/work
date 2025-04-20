import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { fetchUserInfo } from '@/api'

export enum UserRole {
  User = 1,
  Promoter = 2,
  Admin = 999,
}

export enum UserStatus {
  Normal = 1,
  Disabled = 2,
}

export const userStatusMap = {
  [UserStatus.Normal]: {
    label: '正常',
    type: 'success',
  },
  [UserStatus.Disabled]: {
    label: '禁用',
    type: 'error',
  }
}

export const userRoleMap = {
  [UserRole.User]: {
    label: '普通用户',
    type: 'default',
  },
  [UserRole.Promoter]: {
    label: '分成者',
    type: 'warning',
  },
  [UserRole.Admin]: {
    label: '管理员',
    type: 'success',
  }
}

export interface UserInfo {
  uuid: string,
  mobile: string,
  status: UserStatus,
  role: UserRole,
  count?: number,
  income?: number,
  wx: {
    openid: string,
    nickname: string
    headimgurl: string
  }
}

interface UserStore {
  loading?: boolean
  token?: string
  userInfo?: UserInfo
}

export const useUserStore = defineStore('user-store', {
  state: (): UserStore => ({
    loading: undefined,
    token: getToken(),
    userInfo: {
      uuid: '',
      mobile: '',
      status: UserStatus.Normal,
      role: UserRole.User,
      count: undefined,
      wx: {
        openid: '',
        headimgurl: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
        nickname: '未登录',
      },
    },
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
      this.fetchUserInfo()
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },

    removeUserInfo() {
      this.userInfo = undefined
    },

    async fetchUserInfo(isShowLoading: boolean = true) {
      if (!this.token) {
        return
      }

      this.loading = isShowLoading && true
      const { data } = await fetchUserInfo<UserInfo>(this.token)
      this.userInfo = data
      this.loading = false
    },
  },
})
