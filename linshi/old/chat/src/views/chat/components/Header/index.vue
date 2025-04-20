<script lang="ts" setup>
import { computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { HoverButton, SvgIcon } from '@/components'
import { UserRole } from "@/store/modules/user"
import { useAppStore, useChatStore, useAdminStore, useUserStore } from '@/store'
import { menuData } from '@/router/menu'
import { trackEvent } from '@/utils/functions';
import { router } from '@/router';

interface Props {
  usingContext?: boolean
  isManage?: boolean
}

interface Emit {
  (ev: 'export'): void
  (ev: 'toggleUsingContext'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const route = useRoute()

const appStore = useAppStore()
const chatStore = useChatStore()
const adminStore = useAdminStore()
const userStore = useUserStore()

const adminCollapsed = computed(() => adminStore.collapsed)
const collapsed = computed(() => appStore.siderCollapsed)
const userInfo = computed(() => userStore.userInfo)
const isAdmin = computed(() => router.currentRoute.value.name !== 'Chat')

const title = computed(() => {
  if (props?.isManage) {
    return menuData?.find(item => item.name === route?.name)?.title
  }
  return chatStore?.getChatHistoryByCurrentActive?.title ?? ''
})

function handleUpdateCollapsed() {
  if (props.isManage) {
    adminStore.setSiderCollapsed(!adminCollapsed.value)
  }
  appStore.setSiderCollapsed(!collapsed.value)
}

function onScrollToTop() {
  const scrollRef = document.querySelector('#scrollRef')
  if (scrollRef) {
    nextTick(() => scrollRef.scrollTop = 0)
  }
}

function handleExport() {
  emit('export')
}

function toggleUsingContext() {
  emit('toggleUsingContext')
}

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
  <header
    class="sticky top-0 left-0 right-0 z-30 border-b dark:border-neutral-800 bg-white/80 dark:bg-black/20 backdrop-blur"
  >
    <div class="relative flex items-center justify-between min-w-0 overflow-hidden h-14">
      <div class="flex items-center">
        <button
          class="flex items-center justify-center w-11 h-11"
          @click="handleUpdateCollapsed"
        >
          <SvgIcon v-if="collapsed" class="text-2xl" icon="ri:align-justify" />
          <SvgIcon v-else class="text-2xl" icon="ri:align-right" />
        </button>
      </div>
      <h1
        class="flex-1 px-4 pr-6 overflow-hidden cursor-pointer select-none text-ellipsis whitespace-nowrap"
        @dblclick="onScrollToTop"
      >
        {{ title }}
      </h1>
      <div class="flex items-center space-x-2">
        <p v-if="!isManage && userInfo?.count !== undefined" class="mr-1 overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
          <span>剩余点数：{{ userInfo?.count }}</span>
        </p>
        <HoverButton v-if="!isManage && userStore.userInfo?.uuid" @click="onClickVip">
          <span class="text-xl text-[#4f555e] dark:text-white">
            <SvgIcon icon="ri:vip-crown-line" />
          </span>
        </HoverButton>
        <HoverButton v-if="!isManage" @click="toggleUsingContext">
          <span class="text-xl" :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }">
            <SvgIcon icon="ri:chat-history-line" />
          </span>
        </HoverButton>
        <HoverButton v-if="!isManage" @click="handleExport">
          <span class="text-xl text-[#4f555e] dark:text-white">
            <SvgIcon icon="ri:download-2-line" />
          </span>
        </HoverButton>
        <HoverButton v-if="!userStore.loading && userStore.userInfo?.role === UserRole.Admin" @click="onClickManage">
          <span class="text-xl text-[#4f555e] dark:text-white">
            <SvgIcon v-if="isAdmin" icon="ri-message-line" />
            <SvgIcon v-else icon="ri-dashboard-line" />
          </span>
        </HoverButton>
      </div>
    </div>
  </header>
</template>
