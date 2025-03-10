import { z } from 'zod'

import { procedure } from '@/api/trpc/procedures'

export const habitItem = {
  updateSort: procedure
  .input(z.array(z.object({
    id: z.number(),
    sort: z.number(),
  })))
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
