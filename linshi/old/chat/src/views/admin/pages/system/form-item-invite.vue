<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { NCard, NForm, NFormItem, NInputNumber, NSwitch } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const formValues = computed<{ count: number, open: boolean }>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <NCard title='邀请' size='small' class='w-full'>
    <NForm label-placement="left">
      <NFormItem :span="2" label="是否开启此功能">
        <NSwitch v-model:value="formValues.open" />
      </NFormItem>
      <NFormItem :span="2" label="每邀请一人赠送点数">
        <NInputNumber v-model:value="formValues.count" />
      </NFormItem>
    </NForm>
  </NCard>
</template>
