import { HydrateClient } from '@/server/trpc/server'

export default async () => {
  return (
    <HydrateClient>
      Hello
    </HydrateClient>
  )
}
