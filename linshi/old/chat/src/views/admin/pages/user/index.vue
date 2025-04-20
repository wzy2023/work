<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue'
import { NButton, NCard, NDataTable, NSpace, NTag, NTime, useMessage } from 'naive-ui'
import { fetchUserList, updateStatus } from '@/api'
import { Avatar } from '@/components'
import { userRoleMap, UserStatus, userStatusMap } from '@/store/modules/user'
import Edit from './edit.vue'

const message = useMessage()

const show = ref(false)
const loading = ref(false)
const sort = ref({ updateAt: 'descend' })
const currentItem = ref(null)

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
    const { data } = await fetchUserList({
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

const onSuccess = () => {
  setTimeout(() => {
    fetaDataSource()
  }, 300)
}

const setStatus = async (uuid: string, status: UserStatus) => {
  if (!uuid || !status) {
    return
  }
  try {
    await updateStatus({ uuid, status })
    message.success('编辑成功~')
    onSuccess()
  } catch (error) {
    message.error('编辑失败')
  }
}

const dataSource = ref([])

const columns = computed(() => {
  return [
    {
      title: 'uuid',
      key: 'uuid',
      align: 'center',
    },
    {
      title: '用户',
      key: 'wx',
      align: 'center',
      render: (row: any) => h(Avatar, { userInfo: row, showDetail: true })
    },
    {
      title: '手机号',
      key: 'mobile',
      align: 'center',
      width: 150
    },
    {
      title: '昵称',
      key: 'wx.nickname',
      align: 'center',
    },
    {
      title: '现有点数',
      key: 'count',
      align: 'center',
      sortOrder: sort.value.count,
      sorter: (row1: any, row2: any) => row1.count - row2.count,
      render: (row: any) => {
        return h(NTag, { type: 'default' }, () => row.count)
      }
    },
    {
      title: '使用点数',
      key: 'useCount',
      align: 'center',
      sortOrder: sort.value.useCount,
      sorter: (row1: any, row2: any) => row1.useCount - row2.useCount,
      render: (row: any) => {
        return h(NTag, { type: 'default' }, () => row.useCount)
      }
    },
    {
      title: '支付金额',
      key: 'payPrice',
      align: 'center',
      sortOrder: sort.value.payPrice,
      sorter: (row1: any, row2: any) => row1.payPrice - row2.payPrice,
      render: (row: any) => {
        return h(NTag, { type: 'default' }, () => row.payPrice)
      }
    },
    {
      title: '收益',
      key: 'income',
      align: 'center',
      sortOrder: sort.value.income,
      sorter: (row1: any, row2: any) => row1.income - row2.income,
      render: (row: any) => {
        return h(NTag, { type: 'default' }, () => row.income)
      }
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (row: { status: UserStatus }) => {
        return h(NTag, { type: userStatusMap[row.status].type as any }, () => userStatusMap[row.status].label)
      }
    },
    {
      title: '角色',
      key: 'role',
      align: 'center',
      render: (row: any) => {
        return h(NTag, { type: userRoleMap[row.role]?.type as any }, () => userRoleMap[row.role]?.label)
      }
    },
    {
      title: '注册时间',
      key: 'createAt',
      align: 'center',
      sortOrder: sort.value.createAt,
      sorter: (row1: any, row2: any) => row1.createAt - row2.createAt,
      render: (row: any) => {
        return h(NTime, { time: Number(row.createAt) })
      }
    },
    {
      title: '上次登陆时间',
      key: 'updateAt',
      align: 'center',
      sortOrder: sort.value.updateAt,
      sorter: (row1: any, row2: any) => row1.updateAt - row2.updateAt,
      render: (row: any) => {
        return h(NTime, { time: Number(row.updateAt) })
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 150,
      render: (row: any) => {
        return h(NSpace, {}, () => [
          h(NButton, {
            key: 'edit',
            type: 'primary',
            size: 'small',
            onClick: () => {
              currentItem.value = { ...row }
              show.value = true
            }
          }, '编辑'),
          h(NButton, {
            key: 'status',
            type: 'info',
            size: 'small',
            type: row.status === UserStatus.Normal ? 'error' : 'success',
            onClick: () => setStatus(row.uuid, row.status === UserStatus.Normal ? UserStatus.Disabled : UserStatus.Normal),
          }, row.status === UserStatus.Normal ? '禁用' : '启用'),
        ])
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
    <NCard title="用户管理" size='small'>
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
    <Edit
      :show='show'
      :currentItem='currentItem'
      @hide='v => show = v'
      @success='onSuccess'
    />
  </div>
</template>
