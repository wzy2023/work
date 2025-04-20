<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NPopconfirm, useMessage } from 'naive-ui'
import type { Theme } from '@/store/modules/app/helper'
import { PromptStore, SvgIcon } from '@/components'
import { useAppStore } from '@/store'
import { trackEvent } from '@/utils/functions'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const appStore = useAppStore()
const ms = useMessage()
const { isMobile } = useBasicLayout()

const theme = computed(() => appStore.theme)

const show = ref(false)

const themeOptions: { label: string; key: Theme; icon: string }[] = [
  {
    label: 'Auto',
    key: 'auto',
    icon: 'ri:contrast-line',
  },
  {
    label: 'Light',
    key: 'light',
    icon: 'ri:sun-foggy-line',
  },
  {
    label: 'Dark',
    key: 'dark',
    icon: 'ri:moon-foggy-line',
  },
]

function clearData(): void {
  localStorage.removeItem('chatStorage')
  location.reload()
}

function handleLogout() {
  trackEvent('click', 'logout')
  localStorage.removeItem('token')
  location.reload()
}
</script>

<template>
  <div class="p-2 pt-0 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">
          当前版本
        </span>
        <span class="flex-1">
          1.5.0
        </span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.theme') }}</span>
        <div class="flex flex-wrap items-center gap-4">
          <template v-for="item of themeOptions" :key="item.key">
            <NButton
              size="small"
              :type="item.key === theme ? 'primary' : undefined"
              @click="appStore.setTheme(item.key)"
            >
              <template #icon>
                <SvgIcon :icon="item.icon" />
              </template>
            </NButton>
          </template>
        </div>
      </div>
      <div
        class="flex items-center space-x-4"
        :class="isMobile && 'items-start'"
      >
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.chatHistory') }}</span>

        <div class="flex flex-wrap items-center gap-4">
          <NPopconfirm placement="bottom" @positive-click="clearData">
            <template #trigger>
              <NButton size="small">
                <template #icon>
                  <SvgIcon icon="ri:close-circle-line" />
                </template>
                {{ $t('common.clear') }}
              </NButton>
            </template>
            {{ $t('chat.clearHistoryConfirm') }}
          </NPopconfirm>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">
          {{ $t('store.siderButton') }}
        </span>
        <NButton size="small" @click="show = true">
          <template #icon>
            <SvgIcon icon="ri:settings-3-line" />
          </template>
          {{ $t('setting.config') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">
          {{ $t('setting.account') }}
        </span>
        <NButton size="small" @click="handleLogout">
          <template #icon>
            <SvgIcon icon="ri:logout-box-line" />
          </template>
          {{ $t('setting.logout') }}
        </NButton>
      </div>
    </div>
    <PromptStore v-model:visible="show" />
  </div>
</template>
