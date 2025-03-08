import { z } from 'zod'
import { type Prisma } from '@prisma/client'

import { publicProcedure } from '@/api/trpc/procedures'

export const item = {
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), habitGroupId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.habitItem.create({
        data: input,
      })
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.habitItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.custom<Prisma.HabitItemUpdateInput>() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.habitItem.update({
        where: { id: input.id },
        data: input.data,
      })
    }),
}
