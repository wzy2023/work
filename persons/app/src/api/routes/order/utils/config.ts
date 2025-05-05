import { type Info, NeedJobSource, NeedJobType } from './types'
import { cxykz, xmf, yg, yjs, sx } from '@/api/routes/order/utils/rules'

export const setting = {
  black: [],
  white: [],
  toEmail: {
    list: ['657189555@qq.com'],
    ignore: ['18583952605@163.com'],
  },
}

export const nameMap: any = {
  title: '名称',
  desc: '详情',
  type: '类型',
  source: '来源',
  price: '价格',
  url: '地址',
  createTime: '创建时间',
  person: '创建人',
  applyNum: '申请人数量',
}

export const needJobTypeMap: any = {
  [NeedJobType.Need]: '需求',
  [NeedJobType.Job]: '岗位',
}

export const list: Info[] = [
  { type: NeedJobType.Need, name: NeedJobSource.Cxykz, fn: cxykz },
  { type: NeedJobType.Need, fn: yjs, name: NeedJobSource.Yjs },
  { type: NeedJobType.Job, fn: sx, name: NeedJobSource.Sx },
  { type: NeedJobType.Job, fn: xmf, name: NeedJobSource.Xmf },
  { type: NeedJobType.Job, fn: yg, name: NeedJobSource.Yg },
]
