<script setup>
import Message from '../../../chat/components/Message/index.vue'
import {computed} from 'vue'
import dayjs from 'dayjs'

const { currentItem } = defineProps({
  currentItem: {
    type: Object,
    default: () => ({})
  }
})

const dataSource = computed(() => {
  return (currentItem?.talks || []).reduce((t, i) => {
    t.push({
      dateTime: (i.createAt || i.time) ? dayjs(i.createAt || i.time).format('YYYY/MM/DD HH:mm:ss') : '',
      text: i?.prompt?.trim() || '',
      inversion: true,
      isSuccess: i.isSuccess,
      count: i.count,
    })
    t.push({
      dateTime: (i.updateAt || i.time) ? dayjs(i.updateAt || i.time).format('YYYY/MM/DD HH:mm:ss') : '',
      text: i?.text?.trim() || '',
      inversion: false,
      isSuccess: i.isSuccess,
      count: i.count,
    })
    return t
  }, [])
})

</script>

<template>
  <Message
    v-for="(item, index) of dataSource"
    :key="index"
    :date-time="item.dateTime"
    :text="item.text"
    :inversion="item.inversion"
    :error="item.error"
    :loading="item.loading"
    :isSuccess='item.isSuccess'
    :count='item.count'
    :avatar="currentItem?.user?.wx?.headimgurl"
    isView
  />
</template>
