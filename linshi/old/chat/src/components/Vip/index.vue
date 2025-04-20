<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NModal, NTabs, NTabPane } from 'naive-ui'
import Share from './Share.vue'
import Pay from './Pay.vue'
import Income from './Income.vue'
import { UserRole, useSystemStore, useUserStore } from '@/store'

interface Props {
  visible: boolean,
  defaultActiveName?: string
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const systemStore = useSystemStore()
const userStore = useUserStore()

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

const activeName = ref(props.defaultActiveName || 'pay')
</script>

<template>
  <NModal :mask-closable="false" v-model:show="show" title="获取使用次数" :auto-focus="false" preset="card" style="width: 95%; height:650px; max-width: 900px">
    <NTabs style='margin-top: -5px' :default-value='activeName'>
      <NTabPane v-if='systemStore.systemSetting?.sku?.length' name="pay" tab="充值获得">
        <Pay />
      </NTabPane>
      <NTabPane v-if='systemStore.systemSetting?.invite?.open' name="share" tab="邀请获得">
        <Share />
      </NTabPane>
      <NTabPane v-if='[UserRole.Promoter, UserRole.Admin].includes(userStore.userInfo?.role)' name="income" tab="分成计划">
        <Income />
      </NTabPane>
    </NTabs>
  </NModal>
</template>
