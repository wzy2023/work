<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NTag, NTime, useMessage } from 'naive-ui'
import { useUserStore } from '@/store'
import { fetchUserIncomeList } from '@/api'
import copy from 'copy-to-clipboard'
import { Avatar } from '@/components'

const { userInfo } = useUserStore()
const message = useMessage()

const loading = ref(false)

const shareUrl = computed(() => {
  return `${window.location.origin}/#/chat?share=${userInfo?.uuid}`
})

const onClickCopy = () => {
  copy(shareUrl.value)
  message.success('复制成功')
}

const fetaDataSource = async () => {
  try {
    loading.value = true
    const { data } = await fetchUserIncomeList()
    loading.value = false
    if (!data) {
      return
    }
    dataSource.value = data.list
  } catch (error) {
    message.error(error?.message)
  }
}

const columns = [
  {
    title: '头像',
    key: 'invitee',
    align: 'center',
    render: (row: any) => {
      return h(Avatar, { userInfo: row?.invitee })
    }
  },
  {
    title: '昵称',
    align: 'center',
    key: 'invitee.wx.nickname',
  },
  {
    title: '充值',
    key: 'price',
    align: 'center',
    render: (row: any) => {
      return h(NTag, { size: 'small' }, `+${row.price}`)
    }
  },
  {
    title: '收益',
    key: 'income',
    align: 'center',
    render: (row: any) => {
      return h(NTag, { size: 'small' }, `+${row.income}`)
    }
  },
  {
    title: '充值时间',
    key: 'createAt',
    align: 'center',
    render: (row: any) => {
      return h(NTime, { time: Number(row.createAt) })
    }
  },
]

const dataSource = ref([])

// @ts-ignore
onMounted(() => {
  fetaDataSource()
})
</script>

<template>
  <div class="min-h-[200px] overflow-hidden">
    <NCard :title="`分享下面的链接，别人注册并充值后，您将获得充值金额的一半收益，您的当前收益为: ${userInfo.income} 元`" size='small'>
      <span class='mr-5'>{{ shareUrl }}</span>
      <span class="text-blue-500 cursor-pointer" @click="onClickCopy">点击复制</span>
    </NCard>

    <NCard title="分成记录" size='small' class="mt-2">
      <NDataTable
        size="small"
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :bordered="false"
        :pagination="false"
        :max-height="330"
        scroll-x='800'
      />
    </NCard>
  </div>
</template>

<style lang='less' scoped>
::v-deep {
  .n-alert-body {
    padding-left: 20px !important;
  }
}
</style>
