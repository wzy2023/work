import { z } from 'zod'
import { type Prisma } from '@prisma/client'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export default createTRPCRouter({
  create: publicProcedure
  .input(z.object({ name: z.string().min(1), habitGroupId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habit.create({
      data: input,
    })
  }),

  list: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.db.habit.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }),

  delete: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habit.update({
      where: { id: input.id },
      data: { isDeleted: true },
    })
  }),

  update: publicProcedure
  .input(z.object({ id: z.number(), data: z.custom<Prisma.HabitUpdateInput>() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habit.update({
      where: { id: input.id },
      data: input.data,
    })
  }),
})
