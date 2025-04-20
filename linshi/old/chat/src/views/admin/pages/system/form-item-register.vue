<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { NCard, NForm, NFormItem, NInputNumber, NDatePicker } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const formValues = computed<{ count: number }>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <NCard title='注册' size='small' class='w-full'>
    <NForm label-placement="left">
      <NFormItem :span="2" label="初始点数">
        <NInputNumber v-model:value="formValues.count" />
      </NFormItem>
      <NFormItem :span="2" label="建站日期">
        <NDatePicker v-model:value="formValues.startDate" />
      </NFormItem>
    </NForm>
  </NCard>
</template>
