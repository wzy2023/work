<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NTime, NTag, useMessage } from 'naive-ui'
import { fetchOrderList } from '@/api'
import { OrderStatus, orderStatusDescMap } from '@/typings/order'
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
    const { data } = await fetchOrderList({
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
    title: '订单号',
    key: 'orderId',
    align: 'center',
  },
  {
    title: '用户',
    key: 'user',
    align: 'center',
    render: (row: any) => {
      return h(Avatar, { userInfo: row?.user, showDetail: true })
    }
  },
  {
    title: '昵称',
    key: 'user.wx.nickname',
    align: 'center',
  },
  {
    title: '金额',
    key: 'sku.price',
    align: 'center',
  },
  {
    title: '点数',
    key: 'num',
    align: 'center',
    render: (row: any) => h(NTag, { size: 'small' }, row.status !== OrderStatus.SUCCESS ? 0 : `+${(row.sku.num || 0) + (row.sku.bonus || 0)}`)
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    render: (row: any) => {
      return h(NTag, { type: row.status === OrderStatus.SUCCESS ? 'success' : 'default' }, orderStatusDescMap[row.status])
    }
  },
  {
    title: '下单时间',
    key: 'createAt',
    align: 'center',
    render: (row: any) => {
      return h(NTime, { time: Number(row.createAt) })
    }
  },
  {
    title: '支付时间',
    key: 'payAt',
    align: 'center',
    render: (row: any) => {
      return row.payAt ? h(NTime, { time: Number(row.payAt) }) : '-'
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
    <NCard title="订单记录" size='small'>
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
