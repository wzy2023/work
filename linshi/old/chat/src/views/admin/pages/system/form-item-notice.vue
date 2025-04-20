<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { NCard, NForm, NFormItem, NInput, NSwitch } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const formValues = computed<{ open: boolean, title: string, content: string }>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <NCard title='公告' size='small' class='w-full'>
    <NForm label-placement="left">
      <NFormItem :span="2" label="是否开启此功能">
        <NSwitch v-model:value="formValues.open" />
      </NFormItem>
      <NFormItem :span="2" label="公告标题">
        <NInput v-model:value="formValues.title" />
      </NFormItem>
      <NFormItem :span="2" label="公告内容">
        <NInput type='textarea' v-model:value="formValues.content" />
      </NFormItem>
    </NForm>
  </NCard>
</template>
