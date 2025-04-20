import { Koa, useContext } from '@wzyjs/midway/exports'

export const recordUserId = (userId: string, remember?: boolean) => {
  const ctx = useContext<Koa.Context>()
  if (!ctx?.session) {
    return
  }
  if (remember) {
    ctx.session.maxAge = 30 * 24 * 60 * 60 * 1000
  }
  ctx.session.userId = userId
}
