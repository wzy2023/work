<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { NCard, NForm, NFormItem, NDynamicInput, NInput, NInputNumber } from 'naive-ui'
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

const onCreate = () => {
  return {
    skuId: Date.now() + parseInt(Math.random().toString().slice(2, 5)),
    name: '',
    num: '',
    price: '',
    bonus: ''
  }
}
</script>

<template>
  <NCard size='small' class='w-full'>
    <NForm label-placement="left">
      <NFormItem :span="2">
        <NDynamicInput
          v-model:value="formValues"
          preset="pair"
          :show-sort-button="!isMobile"
          key-placeholder="名称"
          value-placeholder="价格"
          :onCreate="onCreate"
        >
          <template #default="{ value }">
            <div
              style="align-items: center; width: 100%"
              :style="{display: isMobile ? 'block' : 'flex', marginBottom: isMobile ? '30px' : '0'}"
            >
              <NFormItem label='名称' class='flex-2'>
                <NInput v-model:value="value.name" type="text" :style='{marginRight: isMobile ? 0 : "20px"}' />
              </NFormItem>
              <NFormItem label='点数' class='flex-1'>
                <NInputNumber v-model:value="value.num" clearable :style='{marginRight: isMobile ? 0 : "20px"}' />
              </NFormItem>
              <NFormItem label='价格' class='flex-1'>
                <NInputNumber v-model:value="value.price" clearable :style='{marginRight: isMobile ? 0 : "20px"}' />
              </NFormItem>
              <NFormItem label='赠送' class='flex-1'>
                <NInputNumber v-model:value="value.bonus" clearable :style='{marginRight: isMobile ? 0 : "20px"}' />
              </NFormItem>
            </div>
          </template>
        </NDynamicInput>
      </NFormItem>
    </NForm>
  </NCard>
</template>
