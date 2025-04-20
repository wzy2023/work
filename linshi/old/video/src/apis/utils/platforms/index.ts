import { AccountPlatform } from '@/apis/entities/Account'
import { ShiPinHao } from './ShiPinHao'
import { DouYin } from './DouYin'
import { XiaoHongShu } from './XiaoHongShu'
import { KuaiShou } from './KuaiShou'
import { TikTok } from './TikTok'

export const platformMap: any = {
  [AccountPlatform.ShiPinHao]: {
    name: '微信视频号',
    class: ShiPinHao,
    submitConfig: [
      {
        title: '标题',
        dataIndex: 'title',
        validator: ['require'],
      },
      {
        title: '描述',
        dataIndex: 'desc',
        valueType: 'textarea',
        validator: ['require'],
      },
      {
        title: '标签',
        dataIndex: 'tags',
        valueType: 'select',
        validator: ['require'],
        fieldProps: {
          mode: 'tags',
        },
      },
      {
        title: '原创',
        valueType: 'switch',
        initialValue: true,
      },
    ],
  },
  [AccountPlatform.DouYin]: {
    name: '抖音',
    class: DouYin,
    submitConfig: [
      {
        title: '标题',
        dataIndex: 'title',
        validator: ['require'],
      },
      {
        title: '描述',
        dataIndex: 'desc',
        valueType: 'textarea',
        validator: ['require'],
      },
      {
        title: '标签',
        dataIndex: 'tags',
        valueType: 'select',
        validator: ['require'],
        fieldProps: {
          mode: 'tags',
        },
      },
    ],
  },
  [AccountPlatform.XiaoHongShu]: {
    name: '小红书',
    class: XiaoHongShu,
    submitConfig: [
      {
        title: '标题',
        dataIndex: 'title',
        validator: ['require'],
      },
      {
        title: '描述',
        dataIndex: 'desc',
        valueType: 'textarea',
        validator: ['require'],
      },
      {
        title: '标签',
        dataIndex: 'tags',
        valueType: 'select',
        validator: ['require'],
        fieldProps: {
          mode: 'tags',
        },
      },
    ],
  },
  [AccountPlatform.KuaiShou]: {
    name: '快手',
    class: KuaiShou,
    submitConfig: [
      {
        title: '标题',
        dataIndex: 'title',
        validator: ['require'],
      },
      {
        title: '描述',
        dataIndex: 'desc',
        valueType: 'textarea',
        validator: ['require'],
      },
      {
        title: '标签',
        dataIndex: 'tags',
        valueType: 'select',
        validator: ['require'],
        fieldProps: {
          mode: 'tags',
        },
      },
    ],
  },
  [AccountPlatform.TikTok]: {
    name: 'TikTok',
    class: TikTok,
    submitConfig: [
      {
        title: '标题',
        dataIndex: 'title',
        validator: ['require'],
      },
      {
        title: '描述',
        dataIndex: 'desc',
        valueType: 'textarea',
        validator: ['require'],
      },
      {
        title: '标签',
        dataIndex: 'tags',
        valueType: 'select',
        validator: ['require'],
        fieldProps: {
          mode: 'tags',
        },
      },
    ],
  },
}
