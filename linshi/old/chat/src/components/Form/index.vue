<script lang="ts" setup>
import { defineProps } from 'vue'
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui'
import { getOptions } from '@/utils/functions'

interface FormItem {
  label: string
  value: string
  tip: string
  span: number
  type: 'input' | 'select'
  subType: "textarea" | "text"
  require: boolean
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  fields: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <NForm label-placement="left">
    <template v-for='item in props.fields'>
      <NFormItem
        :span="item.span || 2"
        :label="item.label"
        label-placement="top"
        :show-require-mark='item.require'
      >
        <NInput
          v-if='!item.type || ["input", "textarea"].includes(item.type)'
          :type="item.type"
          v-model:value="modelValue[item.path]"
          :placeholder='item.placeholder'
          :default-value='item.defaultValue'
          :clearable='true'
        />
        <NSelect
          v-if='["select"].includes(item.type)'
          v-model:value="modelValue[item.path]"
          :placeholder='item.placeholder'
          :default-value='item.defaultValue'
          :options="getOptions(item.options)"
        />
      </NFormItem>
    </template>
  </NForm>
</template>
