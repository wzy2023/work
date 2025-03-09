import type { HabitItem } from '@prisma/client'

export type ListParams = Pick<HabitItem, 'groupId'>

export enum FrequencyType {
  DAILY = 1, // 每天
  WEEKLY = 2, // 每周
  MONTHLY = 3, // 每月
}

export type CreateParams = Pick<HabitItem, 'name' | 'groupId'> & {
  frequency: {
    type: FrequencyType,
    weekDays?: number[],
    dayOfMonth?: number[],
  }
  count?: {
    total: number,
    times?: number,
    single?: number,
  },
}

export type UpdateParams = {
  id: HabitItem['id'],
  data: Partial<CreateParams>,
}

export type RemoveParams = Pick<HabitItem, 'id'>

export type UpdateSortParams = Pick<HabitItem, 'id' | 'sort'>[]
