import type { HabitGroup, HabitItem, HabitRecord } from '@prisma/client'
import { type calcStatus } from '../utils'

export enum HabitProgressStatus {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Pending = 'pending',
  Doing = 'doing',
  Done = 'done',
  Faild = 'faild',
}

export const habitProgressStatusText = {
  [HabitProgressStatus.Disabled]: '已禁用',
  [HabitProgressStatus.Enabled]: '已启用',
  [HabitProgressStatus.Pending]: '待开始',
  [HabitProgressStatus.Doing]: '进行中',
  [HabitProgressStatus.Done]: '已完成',
  [HabitProgressStatus.Faild]: '已失败',
}

export enum HabitStatusMode {
  Habit = 'habit',
  Record = 'record'
}

export enum HabitFrequencyType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export const HabitFrequencyTypeText = {
  [HabitFrequencyType.DAILY]: '每日',
  [HabitFrequencyType.WEEKLY]: '每周',
  [HabitFrequencyType.MONTHLY]: '每月',
}

export namespace Habit {
  export type Group = HabitGroup

  export type Item = HabitItem

  export type Record = HabitRecord

  export interface Frequency {
    type: HabitFrequencyType
    weekDays?: number[]
    dayOfMonth?: number[]
  }

  export interface Count {
    total: number,
    single: number,
    times: number,
  }

  export interface Exec {
    time: string
    count: number
    feeling?: string
  }

  export type ItemRecord = HabitItem & {
    count: Count
    frequency: Frequency
    group: HabitGroup
    status: ReturnType<typeof calcStatus>
    record: HabitRecord & {
      progress?: number
      execList?: Exec[],
    }
  }
}
