<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { NaiveProvider } from '@/components'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { onMounted } from 'vue'
import { useChatStore, useSystemStore, useUserStore } from '@/store'
import { trackEvent } from '@/utils/functions'

const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()

const route = useRoute()
const router = useRouter()

// @ts-ignore
onMounted(async () => {
  useUserStore()?.fetchUserInfo()
  await useSystemStore().fetchSystemSetting()

  if (route.name !== 'Chat') {
    return
  }

  const chatStore = useChatStore()
  if (!chatStore.history.length) {
    chatStore.initTutorialChat()
  }

  if (chatStore.active) {
    chatStore.reloadRoute(chatStore.active, route.query)
  }

  trackEvent('view', 'chat')
})
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>
