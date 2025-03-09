import type { HabitGroup } from '@prisma/client'

export type CreateParams = Pick<HabitGroup, 'name' | 'color' | 'sort'>

export type UpdateParams = {
  id: HabitGroup['id'],
  data: Partial<CreateParams>,
}

export type RemoveParams = Pick<HabitGroup, 'id'>

export type UpdateSortParams = Pick<HabitGroup, 'id' | 'sort'>[]
