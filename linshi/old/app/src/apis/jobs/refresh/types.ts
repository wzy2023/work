import { NeedJob, NeedJobSource, NeedJobType } from '@/apis/entities'

export enum RetType {
  SuccessExec = 'SuccessExec',
  SuccessGet = 'SuccessGet',
  Fail = 'Fail',
}

export interface Res {
  name: NeedJobSource,
  type: NeedJobType,
  msg: string,
  retType: RetType,
  data?: NeedJob
}

export interface Info {
  name: NeedJobSource,
  type: NeedJobType,
  fn: any
}
