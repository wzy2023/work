<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { NCard, NModal, NButton } from 'naive-ui'
import { Form } from '@/components'

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['onSubmit'])

const showModal = ref(false)

const formValue = ref(props.app.fields.reduce((acc, cur) => {
  acc[cur.path] = cur.defaultValue || ''
  return acc
}, {}) as Record<string, string>)

const onClickSubmit = () => {
  const text = props.app.prompt.replace(/{(\w+)}/g, (match, key) => {
    return formValue.value[key]
  })
  emits("onSubmit", text)
}

</script>

<template>
  <div>
    <NCard class='cursor-pointer' style='height: 100%' :title="props.app?.title" hoverable @click='showModal = true'>
      <template v-for='item in props.app.description.split("\n")'>
        <div style='color: #555'>{{ item }}</div>
      </template>
    </NCard>

    <NModal v-model:show="showModal">
      <NCard
        style="width: 600px"
        :title="props.app.title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <Form v-model='formValue' :fields='props.app.fields' />
        <div class='flex justify-end'>
          <NButton type='primary' @click='onClickSubmit'>{{ props.app.btnText }}</NButton>
        </div>
      </NCard>
    </NModal>
  </div>
</template>
