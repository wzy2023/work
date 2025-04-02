import React from 'react'

interface EditProps {
  onClick: () => void
}

export const Edit = (props: EditProps) => {
  const { onClick } = props

  return (
    <div className='flex justify-end mb-1 absolute right-[-50px]'>
      <button
        onClick={onClick}
        className='text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200'
      >
        完成
      </button>
    </div>
  )
}
