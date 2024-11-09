'use client'

import { Modal } from 'antd'
import { photos } from '../../data'

export default ({ params: { id } }: any) => {
  const img = photos.find(item => item.id === id)
  return (
    <Modal
      open={true}
      onCancel={() => {
        history.back()
      }}
    >
      <img width='200' height='200' src={img?.src} className='m-1' />
    </Modal>
  )
}
