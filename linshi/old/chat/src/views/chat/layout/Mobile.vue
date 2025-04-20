<script setup lang='ts'>
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { sendSMSCode, loginByMobile } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore, useSystemStore } from '@/store'

const props = defineProps<{ weChatRes: any }>()
const emit = defineEmits(['success'])

const isSended = ref(false)
const codeRef = ref()
const loading = ref(false)
const formValue = ref({ mobile: '', code: '' })

const ms = useMessage()
const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const systemStore = useSystemStore()

const sendSMS = async () => {
  try {
    const mobile = formValue.value.mobile?.trim()
    if (!mobile || !/^1[3456789]\d{9}$/.test(mobile)) {
      ms.error('请输入正确的手机号码')
      return
    }

    loading.value = true
    await sendSMSCode(mobile)

    isSended.value = true
    ms.success('短信验证码发送成功，请注意查收')

    setTimeout(() => {
      codeRef.value.focus()
    }, 300)

  } finally {
    loading.value = false
  }
}

const onClick = async () => {
  if (!isSended.value) {
    await sendSMS()
    return
  }

  try {
    loading.value = true
    const { data: { token } } = await loginByMobile<{ token: string }>({
      mobile: formValue.value.mobile.trim(),
      code: formValue.value.code.trim(),
      share: route.query.share as string,
      weChatRes: props.weChatRes
    })

    if (!token) {
      ms.error('登录失败，请刷新页面后重新扫码登录~')
      return
    }
    emit('success', token)

  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class='mb-6'>
      <div style='font-size: 22px'>绑定手机号</div>
      <div style='font-size: 16px; color: #bbb'>
        <span>绑定手机号后才能使用哦，绑定成功赠送</span>
        <span> {{ systemStore?.systemSetting?.register?.count }} </span>
        <span>点</span>
      </div>
    </div>
    <NForm
      ref="formRef"
      :model="formValue"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <NFormItem path="mobile">
        <NInput size='large' v-model:value="formValue.mobile" placeholder="手机号码" />
      </NFormItem>
      <NFormItem v-if='isSended' path="code">
        <NInput ref='codeRef' size='large' v-model:value="formValue.code" placeholder="验证码" />
      </NFormItem>
      <NButton type='primary' size='large' :disabled='loading' :on-click='onClick' style='margin-top: 10px; width: 100%'>
        {{ isSended ? '登录' : '发送验证码' }}
      </NButton>
    </NForm>
  </div>
</template>
