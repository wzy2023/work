import { HydrateClient } from '@/trpc/server'

export default async () => {
  return (
    <HydrateClient>
      Hello
    </HydrateClient>
  )
}
