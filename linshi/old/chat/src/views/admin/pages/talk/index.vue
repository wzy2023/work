<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NTime, NTag, NButton, NDrawer, NDrawerContent, useMessage } from 'naive-ui'
import { fetchTalkList } from '@/api'
import MessageList from './Talks.vue'
import { Avatar } from '@/components'

const message = useMessage()

const loading = ref(false)
const show = ref(false)
const currentLogItem = ref()
const sort = ref({ updateAt: 'descend' })

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
  prefix: (p: any) => `共 ${p.itemCount} 条`,
})

const fetaDataSource = async () => {
  try {
    loading.value = true
    const { data } = await fetchTalkList({
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

const dataSource = ref([])

const columns = computed(() => {
  return [
    {
      title: 'chatId',
      key: 'chatId',
      align: 'center',
    },
    {
      title: '用户',
      key: 'wx',
      align: 'center',
      render: (row: any) => h(Avatar, { userInfo: row.user, showDetail: true })
    },
    {
      title: '昵称',
      key: 'user.wx.nickname',
      align: 'center',
    },
    {
      title: '对话条数',
      key: 'talks',
      align: 'center',
      render: (row: any) => {
        return h(NTag, { type: 'default' }, row.talks.length)
      }
    },
    {
      title: '现有点数',
      key: 'count',
      align: 'center',
      render: (row: any) => {
        return h(NTag, { type: 'default' }, () => row.user?.count)
      }
    },
    {
      title: '开始时间',
      key: 'createAt',
      align: 'center',
      sortOrder: sort.value.createAt || false,
      sorter: (row1: any, row2: any) => row1.createAt - row2.createAt,
      render: (row: any) => {
        return h(NTime, { time: Number(row.createAt) })
      }
    },
    {
      title: '结束时间',
      key: 'updateAt',
      align: 'center',
      sortOrder: sort.value.updateAt || false,
      sorter: (row1: any, row2: any) => row1.updateAt - row2.updateAt,
      render: (row: any) => {
        return h(NTime, { time: Number(row.updateAt) })
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (row: any) => {
        return h('div', {
          onClick: () => {
            show.value = true
            currentLogItem.value = row
          }
        }, h(NButton, { type: 'primary', size: 'small' }, '查看'))
      }
    }
  ]
})

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
    <NCard title="对话日志" size='small'>
      <NDataTable
        remote
        :row-key="(row) => row.chatId"
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :bordered="false"
        :pagination="pagination"
        @update:sorter="onSorterChange"
        scroll-x='1350'
      />
    </NCard>
    <NDrawer v-model:show="show" width="60%" placement="right">
      <NDrawerContent title="日志">
        <MessageList :currentItem='currentLogItem' />
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
