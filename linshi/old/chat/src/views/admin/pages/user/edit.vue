<script lang='ts' setup>
import { defineEmits, defineProps, ref, watchEffect } from 'vue'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInputNumber,
  NModal,
  NSpace,
  NRadio,
  NRadioGroup,
  useMessage
} from 'naive-ui'
import { HoverButton, SvgIcon } from '@/components'
import { updateInfo } from '@/api'

const props = defineProps<{ currentItem: { count: number, uuid: string }, show: boolean }>()

const emit = defineEmits((['hide', 'success']))

const count = ref(0)
const role = ref('')
const income = ref(0)

const roleData = [
  {
    label: '普通用户',
    value: 1
  },
  {
    label: '分成者',
    value: 2
  }
]

const message = useMessage()

const onCancle = () => {
  emit('hide', false)
}

watchEffect(() => {
  count.value = props?.currentItem?.count
  role.value = props?.currentItem?.role
  count.income = props?.currentItem?.income
})

const onClickSubmit = async () => {
  try {
    await updateInfo({
      uuid: props?.currentItem?.uuid, userInfo: {
        count: count.value,
        role: role.value,
        income: income.value
      }
    })
    message.success('编辑成功~')
    emit('success')
    onCancle()
  } catch (error) {
    message.error('编辑失败')
  }
}
</script>

<template>
  <NModal :show="show" v-if='props.show'>
    <NCard
      style="width: 600px"
      title="编辑"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <HoverButton @click="onCancle">
          <SvgIcon icon="ri-close-fill" />
        </HoverButton>
      </template>

      <NForm label-placement="left">
        <NFormItem :span="2" label="点数">
          <NInputNumber v-model:value="count" />
        </NFormItem>
        <NFormItem :span="2" label="角色">
          <NRadioGroup v-model:value="role" name="radiogroup">
            <NSpace>
              <NRadio v-for="item in roleData" :key="item.value" :value="item.value">
                {{ item.label }}
              </NRadio>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem :span="2" label="收益">
          <NInputNumber v-model:value="income" />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class='flex flex-row justify-end'>
          <NSpace size='small'>
            <NButton @click="onCancle">取消</NButton>
            <NButton type="primary" @click="onClickSubmit">确定</NButton>
          </NSpace>
        </div>
      </template>
    </NCard>
  </NModal>
</template>
