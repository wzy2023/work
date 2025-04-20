<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
import { NCard, NDataTable, NModal, NButton, NSpin, NPopconfirm, NTag, NTime, NAlert, useMessage } from 'naive-ui'
import { useSystemStore, useUserStore } from '@/store'
import { fetchUserOrderList, addOrder, fetchOrderInfo } from '@/api'
import VueQrious from 'vue-qrious'
import { OrderStatus, orderStatusDescMap } from '@/typings/order'
import dayjs from 'dayjs'

const { userInfo, fetchUserInfo } = useUserStore()
const { systemSetting } = useSystemStore()

const message = useMessage()

const loading = ref(false)
const loadingPay = ref(false)
const loadingQuery = ref(false)

const fetaDataSource = async () => {
  try {
    loading.value = true
    const { data } = await fetchUserOrderList()
    loading.value = false
    if (!data) {
      return
    }
    dataSource.value = data.list
  } catch (error) {
  }
}

const columns = [
  {
    title: '订单号',
    key: 'orderId',
    width: 180,
    align: 'center',
  },
  {
    title: '商品',
    key: 'sku.name',
    align: 'center',
  },
  {
    title: '金额',
    key: 'sku',
    align: 'center',
    render: (row: any) => row.sku.price + ' 元'
  },
  {
    title: '点数',
    key: 'num',
    align: 'center',
    render: (row: any) => h(NTag, { size: 'small' }, row.status !== OrderStatus.SUCCESS ? 0 : `+${(row.sku.num || 0) + (row.sku.bonus || 0)}`)
  },
  {
    title: '状态',
    align: 'center',
    key: 'status',
    render: (row: any) => {
      return h(NTag, {
        type: row.status === OrderStatus.SUCCESS ? 'success' : 'default',
        size: 'small'
      }, orderStatusDescMap[row.status])
    }
  },
  {
    title: '支付时间',
    key: 'payAt',
    align: 'center',
    width: 200,
    render: (row: any) => {
      if (row.payAt) {
        return h(NTime, { time: Number(row.payAt) })
      }
      // 如果还未过去 2 小时
      if (row.wxPayUrl && Date.now() - Number(row.createAt) < 2 * 60 * 60 * 1000) {
        return h(NButton, { type: 'primary', size: 'tiny', onClick: () => onClickPay({ ...row }) }, '去支付')
      }
    }
  },
]

const dataSource = ref([])
const currentPrice = ref(systemSetting.sku[0])
const order = ref({ wxPayUrl: '' })

onMounted(() => {
  fetaDataSource()
})

const onClickPay = async (orderInfo?: any) => {
  if (orderInfo) {
    order.value = orderInfo
    return
  }

  if (!currentPrice.value) {
    message.error('请选择充值金额')
    return
  }

  try {
    loadingPay.value = true
    const { data } = await addOrder({ skuInfo: currentPrice.value })
    if (!data) {
      return
    }

    order.value = data

  } finally {
    loadingPay.value = false
  }
}

const queryPayResult = async () => {
  if (!order.value.orderId) {
    message.error('暂未支付')
    return
  }

  try {
    loadingQuery.value = true
    const { data: { status } } = await fetchOrderInfo({ orderId: order.value.orderId })

    if (status !== 'SUCCESS') {
      message.error(orderStatusDescMap[status])
      return
    }

    message.success(orderStatusDescMap[status])
    fetchUserInfo()

    onClose()

  } finally {
    loadingQuery.value = false
  }
}

const onClose = () => {
  order.value = {}
  fetaDataSource()
}

const { startDate } = systemSetting?.register
const dateText = dayjs(startDate).format('YYYY-MM-DD')
const day = dayjs().diff(dayjs(startDate), 'day')

</script>

<template>
  <div id="pay" class="min-h-[200px] overflow-hidden">
    <NAlert v-if='startDate' type='info' class='mb-2'>
      <span class='ml-5'>
        本站建设于 {{ dateText }}，至今已稳定运行 {{ day }} 天，值得您的信任！
      </span>
      <span class='ml-1'>
        (充值的点数可永久使用，无有效期限制)
      </span>
      <div class='ml-5'>
        如果您觉得 Ai 为您带来了更大的价值，节省了您的时间，还望支持一下，谢谢~
      </div>
    </NAlert>

    <NCard title='支付金额' size='small' content-style='display: flex; overflow: auto'>
      <div class='radio-group'>
        <NPopconfirm
          @positive-click="() => onClickPay()"
          v-for="item in systemSetting.sku"
        >
          <template #trigger>
            <div
              :class="['radio-button', { 'active': currentPrice === item }]"
              :key="item.skuId"
              :value="item"
              @click="currentPrice = item"
            >
              <div>{{ item.name }} ({{ item.price }} 元)</div>
              <div v-if=" item.bonus" :class="['radio-tip', { 'active': currentPrice === item }]">
                赠送 {{ item.bonus }} 点
              </div>
            </div>
          </template>
          <div>确认支付吗?</div>
        </NPopconfirm>
      </div>
    </NCard>

    <NModal
      :show="loadingPay || !!order?.wxPayUrl"
      preset="dialog"
      title='使用微信扫码支付'
      :positive-text="order?.wxPayUrl ? '查询支付结果' : ''"
      :positive-button-props="{ type: 'default', disabled: loadingQuery, loading: loadingQuery }"
      @positive-click="queryPayResult"
      @close="onClose"
      to='#pay'
    >
      <NSpin v-if='!order?.wxPayUrl' />
      <VueQrious v-else :value="order?.wxPayUrl" :size="200" />
    </NModal>

    <NCard title="订单记录" size='small' class="mt-2">
      <NDataTable
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :bordered="false"
        :pagination="false"
        :max-height="230"
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

  .n-modal {
    width: 350px !important;
    text-align: -webkit-center !important;
  }

  .n-dialog__content {
    margin-top: 15px !important;
  }
}

.radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-button {
  width: 150px;
  height: 60px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  margin-right: 10px;
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .radio-tip {
    font-size: 12px;
    color: #999;

    &.active {
      color: #fff;
    }
  }

  &.active {
    border-color: #18a058;
    background: #18a058;
    color: #fff;
    font-size: 16px;
  }
}
</style>
