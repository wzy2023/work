<script setup lang='ts'>
import { computed } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAdminStore } from '@/store'
import Sider from './sider.vue'
import HeaderComponent from '../../chat/components/Header/index.vue'

const router = useRouter()
const adminStore = useAdminStore()

const { isMobile } = useBasicLayout()

const collapsed = computed(() => adminStore.collapsed)

const getMobileClass = computed(() => {
  if (isMobile.value) {
    return ['rounded-none', 'shadow-none']
  }
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
  <div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-2']">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <HeaderComponent v-if="isMobile" isManage />
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <div style='padding: 10px'>
              <component :is="Component" :key="route.fullPath" />
            </div>
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
  </div>
</template>
