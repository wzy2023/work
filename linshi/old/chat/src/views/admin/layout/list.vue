<script setup lang='ts'>
import { NScrollbar } from 'naive-ui'
import { SvgIcon } from '@/components'
import { useAdminStore, MenuItem } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()

const adminStore = useAdminStore()

async function handleSelect(item: MenuItem) {
  if (isActive(item)) {
    return
  }

  adminStore.changeMenu(item.menuId)

  if (isMobile.value) {
    adminStore.setSiderCollapsed(true)
  }
}

function isActive(item: MenuItem) {
  return adminStore.active === item.menuId
}
</script>

<template>
  <NScrollbar class="px-4">
    <div class="flex flex-col gap-2 text-sm">
      <div v-for="(item, index) of adminStore.menuData" :key="index">
        <a
          class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
          :class="isActive(item) && ['border-[#4b9e5f]', 'bg-neutral-100', 'text-[#4b9e5f]', 'dark:bg-[#24272e]', 'dark:border-[#4b9e5f]', 'pr-14']"
          @click="handleSelect(item)"
        >
            <span>
              <SvgIcon :icon="item.icon" />
            </span>
          <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
            <span>{{ item.title }}</span>
          </div>
        </a>
      </div>
    </div>
  </NScrollbar>
</template>
