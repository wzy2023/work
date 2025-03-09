import { z } from 'zod'

import { publicProcedure } from '@/api/trpc/procedures'

import type { CreateParams, ListParams, RemoveParams, UpdateParams, UpdateSortParams } from './types'

export const item = {
  list: publicProcedure
  .input(z.custom<ListParams>())
  .query(async ({ ctx, input }) => {
    return ctx.db.habitItem.findMany({
      where: { groupId: input.groupId, isDeleted: false },
      orderBy: { sort: 'asc' },
    })
  }),

  create: publicProcedure
  .input(z.custom<CreateParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.create({
      data: input,
    })
  }),

  update: publicProcedure
  .input(z.custom<UpdateParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.update({
      where: { id: input.id },
      data: input.data,
    })
  }),

  remove: publicProcedure
  .input(z.custom<RemoveParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  updateSort: publicProcedure
  .input(z.custom<UpdateSortParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.$transaction(
      input.map(item =>
        ctx.db.habitItem.update({
          where: { id: item.id },
          data: { sort: item.sort },
        }),
      ),
    )
  }),
}
