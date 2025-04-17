import { z } from 'zod'

import { procedure } from '@/api/trpc/procedures'

import { dayjs, _ } from '@wzyjs/utils'
import { calcStatus, calcProgress, checkMap, dayRangeMap } from '../../utils'
import { type Habit, type HabitFrequencyType } from '../../types'

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

    return (await Promise.all(Object.entries(_.groupBy(items, 'frequency.type'))
    .map(async ([key, list]) => {
      const type = key as HabitFrequencyType

      return (await Promise.all(list.map(async item => {
        const frequency = item.frequency as unknown as Habit.Frequency

        const isIncludes = checkMap[type](today, frequency)

        if (!isIncludes) {
          return null
        }

        const item_ = item as Habit.ItemRecord
        const { start, end } = dayRangeMap[type](dayjs(input.date))

        // @ts-ignore
        item_.record = await ctx.prisma.habitRecord.findFirst({
          where: {
            habitId: item.id,
            date: {
              gte: start.toDate(),
              lte: end.toDate(),
            },
          },
        })

        if (item_.record) {
          item_.record.progress = calcProgress(item_, item_.record?.execList)
        }

        item_.status = calcStatus(item_, today)

        return item_ as Habit.ItemRecord
      })))
      .filter(item => item != null)
    })))
    .flat()
  })
}
