import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { publicProcedure } from '@/api/trpc/procedures'

export const group = {
  list: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.db.habitGroup.findMany({
      orderBy: { sort: 'asc' },
      where: { isDeleted: false },
    })
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), color: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.habitGroup.create({
        data: input,
      })
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.custom<Prisma.HabitGroupUpdateInput>() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.habitGroup.update({
        where: { id: input.id },
        data: input.data,
      })
    }),

  remove: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  updateSort: publicProcedure
    .input(z.array(z.object({ id: z.number(), sort: z.number() })))
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
