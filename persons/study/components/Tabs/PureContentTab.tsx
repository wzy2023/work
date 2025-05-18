import React from 'react'

interface PureContentTabProps {
  pureContent: string
}

export const PureContentTab = (props: PureContentTabProps) => {
  const { pureContent } = props

  return (
    <div style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
      <div
        className='pure-content'
        dangerouslySetInnerHTML={{ __html: pureContent }}
      />
    </div>
  )
}
