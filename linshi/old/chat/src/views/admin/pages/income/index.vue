<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NTag, NTime, useMessage } from 'naive-ui'
import { fetchIncomeList } from '@/api'
import { Avatar } from '@/components'

const message = useMessage()

const loading = ref(false)

const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.value.page = page
    fetaDataSource()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
    fetaDataSource()
  },
  prefix: (p) => `共 ${p.itemCount} 条`,
})

const fetaDataSource = async () => {
  try {
    loading.value = true
    const { data } = await fetchIncomeList({
      page: {
        current: pagination.value.page,
        pageSize: pagination.value.pageSize
      }
    })
    loading.value = false
    if (!data) {
      return
    }
    dataSource.value = data.list
    pagination.value.itemCount = data.total
  } catch (error) {
    message.error(error?.message)
  }
}

const columns = [
  {
    title: '充值人',
    key: 'invitee',
    align: 'center',
    render: (row: any) => {
      return h(Avatar, { userInfo: row?.invitee, showDetail: true })
    }
  },
  {
    title: '充值人昵称',
    key: 'invitee.wx.nickname',
    align: 'center',
  },
  {
    title: '邀请人',
    key: 'inviter',
    align: 'center',
    render: (row: any) => {
      return h(Avatar, { userInfo: row?.inviter, showDetail: true })
    }
  },
  {
    title: '邀请人昵称',
    key: 'inviter.wx.nickname',
    align: 'center',
  },
  {
    title: '金额',
    key: 'price',
    align: 'center',
    render: (row: any) => {
      return h(NTag, { type: 'default' }, `+ ${row.price || 0}`)
    }
  },
  {
    title: '分成',
    key: 'income',
    align: 'center',
    render: (row: any) => {
      return h(NTag, { type: 'default' }, `+ ${row.income || 0}`)
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
  <div>
    <NCard title="邀请记录" size='small'>
      <NDataTable
        remote
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :bordered="false"
        :pagination="pagination"
        scroll-x='1350'
      />
    </NCard>
  </div>
</template>
