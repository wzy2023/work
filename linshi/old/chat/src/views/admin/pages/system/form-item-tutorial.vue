<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { NCard, NForm, NFormItem, NDynamicInput } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const { isMobile } = useBasicLayout()

const emit = defineEmits(['update:modelValue'])

const formValues = computed<[]>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <NCard size='small' class='w-full'>
    <NForm :label-placement="isMobile ? 'top' : 'left'">
      <NFormItem :span="2" label="示例对话">
        <NDynamicInput
          v-model:value="formValues.demoTalks"
          preset="pair"
          :show-sort-button='!isMobile'
          key-placeholder="问题内容"
          value-placeholder="回答内容"
        />
      </NFormItem>
      <NFormItem :span="2" label="示例问题">
        <NDynamicInput
          v-model:value="formValues.demoQuestions"
          key-placeholder="问题内容"
          :show-sort-button='!isMobile'
        />
      </NFormItem>
      <NFormItem :span="2" label="小提示">
        <NDynamicInput
          v-model:value="formValues.tips"
          key-placeholder="提示内容"
          :show-sort-button='!isMobile'
        />
      </NFormItem>
    </NForm>
  </NCard>
</template>
