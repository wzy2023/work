<script setup lang='ts'>
import { computed } from 'vue'
import { NAlert, NLayout, NLayoutContent } from 'naive-ui'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore, useSystemStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
const systemStore = useSystemStore()

const { isMobile } = useBasicLayout()
const collapsed = computed(() => appStore.siderCollapsed)

const getMobileClass = computed(() => {
  if (isMobile.value) { return ['rounded-none', 'shadow-none'] }
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all flex flex-col" :class="[isMobile ? 'p-0' : 'p-2']">
    <NAlert v-if="systemStore?.systemSetting?.notice?.open && !isMobile" :title="systemStore?.systemSetting?.notice?.title" type="info" class='mb-2' closable>
      {{ systemStore?.systemSetting?.notice?.content }}
    </NAlert>
    <div class="overflow-hidden flex-1" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <Permission />
  </div>
</template>
