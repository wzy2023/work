import { z } from 'zod'

import { publicProcedure } from '@/api/trpc/procedures'

import type { CreateParams, RemoveParams, UpdateParams, UpdateSortParams } from './types'

export const group = {
  list: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.db.habitGroup.findMany({
      orderBy: { sort: 'asc' },
      where: { isDeleted: false },
    })
  }),

  create: publicProcedure
  .input(z.custom<CreateParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.create({
      data: input,
    })
  }),

  update: publicProcedure
  .input(z.custom<UpdateParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.update({
      where: { id: input.id },
      data: input.data,
    })
  }),

  remove: publicProcedure
  .input(z.custom<RemoveParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  updateSort: publicProcedure
  .input(z.custom<UpdateSortParams>())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.$transaction(
      input.map(item =>
        ctx.db.habitGroup.update({
          where: { id: item.id },
          data: { sort: item.sort },
        }),
      ),
    )
  }),
}
