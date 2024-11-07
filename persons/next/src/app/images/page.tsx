import Link from 'next/link'
import { photos } from './data'

export default () => {
  return (
    <div>
      {photos.map(({ id, src }) => (
        <Link key={id} href={`/images/${id}`}>
          <img width='200' height='200' src={src} className='m-1' />
        </Link>
      ))}
    </div>
  )
}
