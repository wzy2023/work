import { LatestPost } from '@/_components/post'
import { HydrateClient } from '@/trpc/server'

export default async () => {
  return (
    <HydrateClient>
      <LatestPost />
    </HydrateClient>
  )
}
