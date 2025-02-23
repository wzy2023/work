import { LatestPost } from '@/_components/post'
import { api, HydrateClient } from '@/trpc/server'

export default async () => {
  const hello = await api.post.hello({ text: 'from tRPC' })

  void api.post.getLatest.prefetch()

  return (
    <HydrateClient>
      <div className='border-amber-300 border-2'>
        <p className='text-2xl'>
          {hello ? hello.greeting : 'Loading tRPC query...'}
        </p>
      </div>

      <div className='border-amber-300 border-2'>
        <LatestPost />
      </div>
    </HydrateClient>
  )
}
