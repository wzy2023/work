import { useState } from 'react'
import { Button, HeartFilled, HeartOutlined } from '@/components'
import { material } from '@/apis'
import { useRequestPro } from '@/hooks'

export const useToggleFavorite = (data: material.Material) => {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite)

  const materialToggleFavoriteState = useRequestPro(material.toggleFavorite, {
    manual: true,
  })

  const handleFavoriteClick = async (ev: any) => {
    ev.stopPropagation()
    await materialToggleFavoriteState.runAsync(data.id)
    setIsFavorite(!isFavorite)
  }

  const renderFavoriteBtn = () => {
    return (
      <Button
        type='text'
        size='small'
        onClick={handleFavoriteClick}
        icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
      />
    )
  }

  return {
    isFavorite: false,
    renderFavoriteBtn,
  }
}
