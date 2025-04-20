<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NTime, useMessage } from 'naive-ui'
import { fetchPointList } from '@/api'
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
    const { data } = await fetchPointList({
      page: {
        current: pagination.value.page,
        pageSize: pagination.value.pageSize
      },
      sort: sort.value
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

const sort = ref({ createAt: 'descend' })

const columns = [
  {
    title: '埋点Id',
    key: 'pointId',
    align: 'center',
  },
  {
    title: '用户',
    key: 'user',
    align: 'center',
    render: (row: any) => {
      if (!row?.user) {
        return null
      }
      return h(Avatar, { userInfo: row?.user, showDetail: true })
    }
  },
  {
    title: '昵称',
    key: 'user.wx.nickname',
    align: 'center',
  },
  {
    title: '类型',
    key: 'pointType',
    align: 'center',
  },
  {
    title: '名称',
    key: 'pointName',
    align: 'center',
  },
  {
    title: '页面',
    key: 'pageUrl',
    align: 'center',
  },
  {
    title: '用户',
    key: 'userAgent',
    align: 'center',
    width: 200,
    render: (row: any) => {
      return `${row?.userAgent?.os?.name} - ${row?.userAgent?.device?.model} - ${row?.userAgent?.browser?.name}`
    }
  },
  // {
  //   title: '附加数据',
  //   key: 'extraData',
  //   align: 'center',
  //   width: 200,
  //   render: (row: any) => row?.extraData && JSON.stringify(row?.extraData)
  // },
  {
    title: '触发时间',
    key: 'createAt',
    align: 'center',
    sortOrder: sort.value.createAt,
    sorter: (row1: any, row2: any) => row1.createAt - row2.createAt,
    render: (row: any) => {
      return h(NTime, { time: Number(row.createAt) })
    }
  },
]

const dataSource = ref([])

onMounted(() => {
  fetaDataSource()
})

const onSorterChange = (sorter: any) => {
  if (!sorter.order) {
    sort.value = {}
    return
  }
  sort.value = {
    [sorter.columnKey]: sorter.order
  }
  fetaDataSource()
}
</script>

<template>
  <div>
    <NCard title="埋点记录" size='small'>
      <NDataTable
        remote
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :bordered="false"
        :pagination="pagination"
        @update:sorter="onSorterChange"
        scroll-x='1350'
      />
    </NCard>
  </div>
</template>
