'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { photos } from './data'

export default () => {
  const router = useRouter()

  return (
    <div>
      {photos.map(({ id, src }) => (
        <Link key={id} href={`/images/${id}`}>
          <img width='200' height='200' src={src} className='m-1' />
        </Link>
      ))}

      <button onClick={() => {
        router.push('/images?a=1')
      }}>gaibian
      </button>
    </div>
  )
}
