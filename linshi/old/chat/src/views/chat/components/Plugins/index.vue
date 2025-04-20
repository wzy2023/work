<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
import Plugin from './Plugin.vue'
import { NTabs, NTabPane } from 'naive-ui'
import { useSystemStore } from '@/store'
import { groupBy } from 'lodash'

const emits = defineEmits(['onSubmit'])

const systemStore = useSystemStore()

const appData = computed(() => {
  return systemStore?.systemSetting?.chat?.aiApp || []
})

const aiGroup = computed(() => {
  return groupBy(appData.value, 'group') || {}
})

const onSubmit = (text: string) => {
  emits("onSubmit", text)
}
</script>

<template>
  <div style='width: 80%; margin: 50px auto'>
    <span style='color: rgb(212, 212, 212); font-size: 14px'>Ai 应用: {{ appData?.length }} 个</span>

    <NTabs type="segment" default-value="通用">
      <template v-for='(value, key) in aiGroup'>
        <NTabPane :name="key" :tab="key">
          <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); grid-auto-rows: max-content;'>
            <template v-for='item_ in value' :key='item_.title'>
              <Plugin :app='item_' @onSubmit="onSubmit" />
            </template>
          </div>
        </NTabPane>
      </template>
    </NTabs>
  </div>
</template>
