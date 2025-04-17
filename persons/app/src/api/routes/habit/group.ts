import { z } from 'zod'

import { procedure } from '@/api/trpc/procedures'

export const habitGroup = {
  updateSort: procedure
  .input(z.array(z.object({
    id: z.string(),
    sort: z.number(),
  })))
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
