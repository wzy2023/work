import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import type { Prisma } from '@prisma/client'

export default createTRPCRouter({
  create: publicProcedure
  .input(z.object({ name: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.create({
      data: {
        name: input.name,
      },
    })
  }),

  list: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.db.habitGroup.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }),

  delete: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.habitGroup.delete({
      where: { id: input.id },
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
})
