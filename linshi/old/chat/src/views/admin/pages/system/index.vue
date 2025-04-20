<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useMessage, NCard, NForm, NFormItem, NButton, NSpace, NSpin, NTabs, NTabPane } from 'naive-ui'
import FormItemRegister from './form-item-register.vue'
import FormItemInvite from './form-item-invite.vue'
import FormItemNotice from './form-item-notice.vue'
import FormItemTutorial from './form-item-tutorial.vue'
import FormItemChat from './form-item-chat.vue'
import FormItemPrice from './form-item-price.vue'
import { fetchSetting, updateSetting } from '@/api'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const message = useMessage()
const setting = ref({})
const loading = ref(false)
const { isMobile } = useBasicLayout()

onMounted(async () => {
  loading.value = true
  const { data: { value } } = await fetchSetting<{ value: any }>()
  loading.value = false
  setting.value = value
})

const onSubmit = async () => {
  const { data } = await updateSetting(setting.value)
  if (data) {
    message.success('保存成功')
  }
}
</script>

<template>
  <NSpin :show='loading'>
    <NCard title='设置' size='small' class='w-full'>
      <template #header-extra>
        <NButton type='primary' @click='onSubmit'>保存</NButton>
      </template>

      <template #default>
        <NForm label-placement="left">
          <NTabs>
            <NTabPane tab="基础" name='base'>
              <NSpace :vertical="isMobile">
                <NFormItem>
                  <FormItemRegister v-model="setting.register" />
                </NFormItem>
                <NFormItem>
                  <FormItemInvite v-model="setting.invite" />
                </NFormItem>
              </NSpace>
              <NFormItem>
                <FormItemNotice v-model="setting.notice" />
              </NFormItem>
            </NTabPane>
            <NTabPane tab="聊天" name='chat'>
              <NFormItem>
                <FormItemChat v-model="setting.chat" />
              </NFormItem>
            </NTabPane>
            <NTabPane tab="价格" name='sku'>
              <NFormItem>
                <FormItemPrice v-model="setting.sku" />
              </NFormItem>
            </NTabPane>
            <NTabPane tab="教程" name='tutorial'>
              <NFormItem>
                <FormItemTutorial v-model="setting.tutorial" />
              </NFormItem>
            </NTabPane>
          </NTabs>
        </NForm>
      </template>
    </NCard>
  </NSpin>
</template>

<style lang="less" scoped>
::v-deep {
  .n-space > div {
    flex: 1;
  }

  .n-card {
    min-height: 230px;
  }
}
</style>
