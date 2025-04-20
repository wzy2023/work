<script setup lang='ts'>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useChatStore, useUserStore } from '@/store'
import { loginByWeChat } from '@/api'

const emit = defineEmits(['success'])

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()

const ms = useMessage()

export type WeChatRes = { token: string } | {
  openid: string,
  unionid: string,
  access_token: string,
}

// @ts-ignore
onMounted(() => {
  if (userStore.userInfo?.openid) {
    return
  }

  new window.WxLogin({
    id: 'qrcode',
    appid: 'wx5f23db3636fc5cbc',
    scope: 'snsapi_login',
    redirect_uri: encodeURIComponent(window.location.href),
  })

  // 监听地址栏的改动
  window.addEventListener('hashchange', async () => {
    const { query: { code } } = route as unknown as { query: { code: string } }

    if (!code) {
      ms.error('登录失败，请刷新页面后重新扫码登录~')
      return
    }

    const hide = ms.loading('登录中~')
    const { data } = await loginByWeChat<WeChatRes>({ code: Array.isArray(code) ? code[code.length - 1] : code })

    if (!data?.token && !data?.openid) {
      ms.error('登录失败，请刷新页面后重新扫码登录~')
      return
    }

    hide.destroy()
    emit('success', data)
  })
})
</script>

<template>
  <div id="qrcode" />
</template>
