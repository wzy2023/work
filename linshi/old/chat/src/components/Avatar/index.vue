<script lang='ts' setup>
import { NAvatar, NPopover } from 'naive-ui'
import defaultAvatar from '@/assets/avatar.jpg'

const props = defineProps<{
  size: 'large' | 'small'
  userInfo: any
  showDetail: boolean
}>()

</script>

<template>
  <div>
    <div v-if='!showDetail'>
      <NAvatar :size='props.size' v-if='props?.userInfo?.wx?.headimgurl' :src="props?.userInfo?.wx?.headimgurl" round />
      <NAvatar :size='props.size' v-else :src="defaultAvatar" round />
    </div>

    <NPopover v-else trigger="hover">
      <template #trigger>
        <NAvatar :size='props.size' v-if='props?.userInfo?.wx?.headimgurl' :src="props?.userInfo?.wx?.headimgurl" round />
        <NAvatar :size='props.size' v-else :src="defaultAvatar" round />
      </template>
      <div>
        <span>{{ props?.userInfo?.wx?.nickname }}</span>
      </div>
    </NPopover>
  </div>
</template>
