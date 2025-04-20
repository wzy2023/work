<script setup lang='ts'>
import { computed, defineAsyncComponent, ref } from 'vue'
import { HoverButton, SvgIcon, UserAvatar } from '@/components'
import { UserRole, useUserStore } from "@/store/modules/user"
import { useAdminStore, useAppStore, useChatStore } from '@/store'
import { NSpin, useMessage } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { router } from '@/router'
import { trackEvent } from '@/utils/functions'

const Setting = defineAsyncComponent(() => import('@/components/Setting/index.vue'))

const Vip = defineAsyncComponent(() => import('@/components/Vip/index.vue'))

const userStore = useUserStore()
const chatStore = useChatStore()
const appStore = useAppStore()
const adminStore = useAdminStore()

const message = useMessage()

const { isMobile } = useBasicLayout()

const isAdmin = computed(() => router.currentRoute.value.name !== 'Chat')

const show = ref(false)

const onClickManage = () => {
  if (isAdmin.value) {
    router.push({ name: 'Chat', params: { chatId: chatStore.active } })
    return
  }

  adminStore.changeMenu(1)
}

const onClickVip = () => {
  appStore.setVipShowTab('pay')

  trackEvent('click', 'vip')
}
</script>

<template>
  <NSpin size="small" :show="userStore.loading">
    <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
      <div class="flex-1 flex-shrink-0 overflow-hidden">
        <UserAvatar />
      </div>

      <HoverButton v-if="!userStore.loading && userStore.userInfo?.role === UserRole.Admin" @click="onClickManage">
        <span class="text-xl text-[#4f555e] dark:text-white">
          <SvgIcon v-if="isAdmin" icon="ri-message-line" />
          <SvgIcon v-else icon="ri-dashboard-line" />
        </span>
      </HoverButton>

      <HoverButton v-if="userStore.userInfo?.uuid" @click="onClickVip">
        <span class="text-xl text-[#4f555e] dark:text-white">
          <SvgIcon icon="ri:vip-crown-line" />
        </span>
      </HoverButton>

      <HoverButton v-if="!userStore.loading" @click="show = true">
        <span class="text-xl text-[#4f555e] dark:text-white">
          <SvgIcon icon="ri:settings-4-line" />
        </span>
      </HoverButton>

      <Setting v-if="show" v-model:visible="show" />

      <Vip
        v-if="appStore.vipShowTab"
        v-model:visible="appStore.vipShowTab"
        :defaultActiveName="appStore.vipShowTab"
      />
    </footer>
  </NSpin>
</template>
