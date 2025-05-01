import { z } from 'zod'

import { procedure } from '@/api/trpc/procedures'

export const buttonsItem = {
  updateSort: procedure
  .input(z.array(z.object({
    id: z.string(),
    sort: z.number(),
  })))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.$transaction(
      input.map(item =>
        ctx.db.buttonItem.update({
          where: { id: item.id },
          data: { sort: item.sort },
        }),
      ),
    )
  }),
}
