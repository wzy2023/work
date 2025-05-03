import { z } from 'zod'
import { procedure } from '@/api/trpc/procedures'

import { dayjs, _ } from '@wzyjs/utils'
import { calcStatus, calcProgress, checkMap, dayRangeMap } from '../../utils'

export const habitItem = {
  updateSort: procedure
  .input(z.array(z.object({
    id: z.string(),
    groupId: z.string(),
    sort: z.number(),
  })))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.$transaction(
      input.map(item =>
        ctx.db.habitItem.update({
          where: { id: item.id },
          data: { sort: item.sort, groupId: item.groupId },
        }),
      ),
    )
  }),

  list: procedure
  .input(z.object({
    date: z.number(),
  }))
  .query(async ({ ctx, input }) => {
    const today = dayjs(input.date)

    const items = await ctx.prisma.habitItem.findMany({
      where: { enabled: true },
      include: { group: true },
    })

    return (await Promise.all(Object.entries<Habit.RunTime.ItemRecord[]>(_.groupBy(items, 'frequency.type') as any)
    .map(async ([key, list]) => {
      const type = key as Habit.FrequencyType

      return (await Promise.all(list.map(async item => {
        const isIncludes = checkMap[type](today, item.frequency!)

        if (!isIncludes) {
          return null
        }

        const { start, end } = dayRangeMap[type](dayjs(input.date))

        item.record = await ctx.prisma.habitRecord.findFirst({
          where: {
            habitId: item.id,
            date: {
              gte: start.toDate(),
              lte: end.toDate(),
            },
          },
        })

        if (item.record) {
          item.record.progress = calcProgress(item)
        }

        item.status = calcStatus(item, today)

        return item
      })))
      .filter(item => item != null)
    })))
    .flat()
  })
}
