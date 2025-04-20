<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NModal, useMessage, useNotification } from 'naive-ui'
import { useChatStore, useSystemStore, useUserStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import Mobile from './Mobile.vue'
import WeChat, { WeChatRes } from './WeChat.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const systemStore = useSystemStore()
const chatStore = useChatStore()

const ms = useMessage()
const notification = useNotification()
const { isMobile } = useBasicLayout()
const loading = ref(false)
const weChatRes = ref('')

const alertNotification = () => {
  notification?.info({
    title: '这是与 AI 的聊天界面!',
    content: '看到最下面的输入框了吗，有什么想问的呢？',
    duration: 120 * 1000,
    keepAliveOnHover: true
  })

  setTimeout(() => {
    if (isMobile.value) {
      return
    }

    notification?.info({
      title: '比如，你可以问我这些内容：',
      content: () => systemStore.systemSetting?.tutorial?.demoQuestions?.map((item: string, index: number) => `${index + 1}. ${item.replace('\\n', '\n')}`).join('\n\n'),
      duration: 120 * 1000,
      keepAliveOnHover: true
    })
  }, 2500)
}

const onWeChatSuccess = (data: WeChatRes) => {
  if (data?.token) {
    onSuccess(data.token)
    return
  }

  weChatRes.value = data
}

const onSuccess = (token: string) => {
  if (!token) {
    ms.error('登录失败，请刷新页面后重新登录~')
    return
  }

  ms.success('登录成功~')
  userStore.setToken(token)

  router.replace({
    name: 'Chat',
    params: { chatId: chatStore.active },
  })

  alertNotification()
}

const hasUuid = computed(() => userStore.userInfo?.uuid)

const hasOpenid = computed(() => userStore.userInfo?.wx?.openid || weChatRes.value?.openid || isMobile.value)
</script>

<template>
  <NModal v-if='!userStore.loading && !userStore.token' :show="!hasUuid || !hasOpenid" style="width: 90%; max-width: 460px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="flex justify-center">
        <WeChat v-if="!hasOpenid" @success='onWeChatSuccess' />
        <Mobile v-if="hasOpenid && !hasUuid" @success='onSuccess' :weChatRes='weChatRes' />
      </div>
    </div>
  </NModal>
</template>
