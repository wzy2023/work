<script setup lang='ts'>
import { computed } from 'vue'
import { UserRole, useUserStore } from '@/store'
import { Avatar } from '@/components'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const NODE_ENV = process.env.NODE_ENV
</script>

<template>
  <div class="flex items-center overflow-hidden">
      <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
        <Avatar size='large' :userInfo='userInfo' />
      </div>
    <div class="flex-1 min-w-0 ml-2 flex flex-col justify-center">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        {{ userInfo?.wx?.nickname }}
      </h2>
      <p v-if="userInfo?.role === UserRole.Admin" class="mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <span>{{ NODE_ENV === 'development' ? '本地环境' : '管理员' }}</span>
      </p>
      <p v-else-if="userInfo?.count !== undefined" class="mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <span>剩余点数：{{ userInfo?.count }}</span>
      </p>
    </div>
  </div>
</template>

<style lang='less' scoped>
::v-deep {
  .n-spin-content {
    display: flex;
  }
}
</style>
