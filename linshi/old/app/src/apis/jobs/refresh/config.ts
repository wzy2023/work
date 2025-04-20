import { NeedJobSource, NeedJobType } from '@/apis/entities'
import { cxykz, ms, sx, xmf, yg, yjs } from './rules'
import { Info } from './types'

export const setting = {
  black: [],
  white: [],
}

export const toEmail = {
  list: ['657189555@qq.com'],
  list_ignore: ['18583952605@163.com'],
  other: ['1980833327@qq.com'],
}

export const list: Info[] = [
  { type: NeedJobType.Need, fn: cxykz, name: NeedJobSource.Cxykz },
  { type: NeedJobType.Need, fn: yjs, name: NeedJobSource.Yjs },
  { type: NeedJobType.Job, fn: sx, name: NeedJobSource.Sx },
  { type: NeedJobType.Job, fn: xmf, name: NeedJobSource.Xmf },
  // { type: NeedJobType.Job, fn: yg, name: NeedJobSource.Yg },
  // { type: NeedJobType.Need, fn: ms, name: NeedJobSource.Ms },
]

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
