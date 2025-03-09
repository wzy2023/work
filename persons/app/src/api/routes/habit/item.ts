import { z } from 'zod'

import { type Prisma } from '@prisma/client'

import { publicProcedure } from '@/api/trpc/procedures'

export const item = {
  list: publicProcedure
  .input(z.object({ groupId: z.number() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.habitItem.findMany({
      where: { groupId: input.groupId, isDeleted: false },
      orderBy: { sort: 'asc' },
    })
  }),

  create: publicProcedure
  .input(z.object({
    groupId: z.number(),
    data: z.object({
      name: z.string().min(1),
      count: z.object({
        total: z.number(),
        times: z.number().optional(),
        single: z.number().optional(),
      }),
      frequency: z.object({
        type: z.number(),
        weekDays: z.array(z.number()).optional(),
        dayOfMonth: z.array(z.number()).optional(),
      }),
    }),
  }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.create({
      data: {
        groupId: input.groupId,
        ...input.data,
      },
    })
  }),

  update: publicProcedure
  .input(z.object({
    id: z.number(),
    data: z.custom<Prisma.HabitItemUpdateInput>(),
  }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.update({
      where: { id: input.id },
      data: input.data,
    })
  }),

  remove: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitItem.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  updateSort: publicProcedure
  .input(z.array(z.object({ id: z.number(), sort: z.number() })))
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
