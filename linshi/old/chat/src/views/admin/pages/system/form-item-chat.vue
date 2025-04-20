<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'
import { NCard, NForm, NFormItem, NInput, NDynamicInput, NSwitch, NSelect } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const { isMobile } = useBasicLayout()

const emit = defineEmits(['update:modelValue'])

const formValues = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const onCreate = () => {
  return {
    label: '',
    value: '',
    tip: '',
  }
}

const onCreateApp = () => {
  return {
    group: '',
    title: '',
    description: '',
    prompt: '',
    btnText: '',
  }
}

const onCreateField = () => {
  return {
    label: '',
    path: '',
    defaultValue: '',
  }
}

const options = [
  {
    label: 'input',
    value: 'input',
  },
  {
    label: 'textarea',
    value: 'textarea',
  },
  {
    label: 'select',
    value: 'select',
  }
]

</script>

<template>
  <NCard size='small' class='w-full'>
    <NForm label-placement="left">
      <NFormItem :span="2" label="开启 GPT 4">
        <NSwitch v-model:value="formValues.openGPT4" />
      </NFormItem>
      <NFormItem :span="2" label="全局附加">
        <NInput type="textarea" v-model:value="formValues.globalPrompt" />
      </NFormItem>
      <NFormItem :span="2" label="敏感词汇">
        <NInput type="textarea" v-model:value="formValues.sensitiveWord" />
      </NFormItem>
      <NFormItem :span="2" label="快捷按钮">
        <NDynamicInput
          v-model:value="formValues.btns"
          preset="pair"
          :show-sort-button="!isMobile"
          key-placeholder="名称"
          value-placeholder="价格"
          :onCreate="onCreate"
        >
          <template #default="{ value }">
            <div
              style="align-items: center; width: 100%"
              :style="{display: isMobile ? 'block' : 'flex', marginBottom: isMobile ? '20px' : '0'}"
            >
              <NFormItem label='名称' class='flex-1'>
                <NInput v-model:value="value.label" style='margin-right: 20px' />
              </NFormItem>
              <NFormItem label='内容' class='flex-1'>
                <NInput v-model:value="value.value" style='margin-right: 20px' />
              </NFormItem>
              <NFormItem label='提示' class='flex-1'>
                <NInput v-model:value="value.tip" />
              </NFormItem>
            </div>
          </template>
        </NDynamicInput>
      </NFormItem>

      <NFormItem :span="2" label="快捷应用">
        <NDynamicInput
          v-model:value="formValues.aiApp"
          :show-sort-button="!isMobile"
          key-placeholder="名称"
          value-placeholder="价格"
          :onCreate="onCreateApp"
        >
          <template #default="{ value }">
            <div :style="{border: 'solid .5px #ddd', padding: '10px' }">
              <div
                style="align-items: center; width: 100%"
                :style="{display: isMobile ? 'block' : 'flex', marginBottom: isMobile ? '20px' : '0'}"
              >
                <NFormItem label="分组" class="flex-1">
                  <NInput v-model:value="value.group" style="margin-right: 20px" />
                </NFormItem>
                <NFormItem label="标题" class="flex-1">
                  <NInput v-model:value="value.title" style="margin-right: 20px" />
                </NFormItem>
                <NFormItem label="描述" class="flex-1">
                  <NInput type='textarea' v-model:value="value.description" style="margin-right: 20px" />
                </NFormItem>
                <NFormItem label="prompt" class="flex-1">
                  <NInput type='textarea' v-model:value="value.prompt" style="margin-right: 20px" />
                </NFormItem>
                <NFormItem label="按钮" class="flex-1">
                  <NInput v-model:value="value.btnText" />
                </NFormItem>
              </div>
              <div>
                <NFormItem label="字段" class="flex-1">
                  <NDynamicInput
                    v-model:value="value.fields"
                    preset="pair"
                    :show-sort-button="!isMobile"
                    key-placeholder="标签"
                    value-placeholder="路径"
                    :onCreate="onCreateField"
                  >
                    <template #default="{ value }">
                      <div
                        style="align-items: center; width: 100%"
                        :style="{display: isMobile ? 'block' : 'flex', marginBottom: isMobile ? '20px' : '0'}"
                      >
                        <NFormItem label="标签" class="flex-1">
                          <NInput v-model:value="value.label" style="margin-right: 20px" />
                        </NFormItem>
                        <NFormItem label="路径" class="flex-1">
                          <NInput v-model:value="value.path" style="margin-right: 20px" />
                        </NFormItem>
                        <NFormItem label="类型" class="flex-1">
                          <NSelect v-model:value="value.type" :options="options" style="margin-right: 20px" />
                        </NFormItem>
                        <NFormItem label="必填" class="flex-1">
                          <NSwitch v-model:value="value.require" />
                        </NFormItem>
                        <NFormItem label="默认值" class="flex-1">
                          <NInput v-model:value="value.defaultValue" />
                        </NFormItem>
                        <NFormItem label="选项" class="flex-1">
                          <NSelect
                            tag
                            filterable
                            multiple
                            v-model:value="value.options"
                          />
                        </NFormItem>
                      </div>
                    </template>
                  </NDynamicInput>
                </NFormItem>
              </div>
            </div>
          </template>
        </NDynamicInput>
      </NFormItem>

    </NForm>
  </NCard>
</template>

<style lang='less' scoped>
::v-deep {
  .n-dynamic-input-item {
    display: block;

    .n-dynamic-input-item {
      display: flex;
    }
  }
}
</style>
