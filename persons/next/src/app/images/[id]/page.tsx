import { photos } from '../data'

export default ({ params: { id } }) => {
  const img = photos.find(item => item.id === id)
  return (
    <div>
      <img width='200' height='200' src={img.src} className='m-1' />
    </div>
  )
}
