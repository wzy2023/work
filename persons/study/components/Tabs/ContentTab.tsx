import React from 'react'

interface ContentTabProps {
  extractedContent: string
}

export const ContentTab = (props: ContentTabProps) => {
  const { extractedContent } = props

  return (
    <div style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: extractedContent }}
      />
    </div>
  )
}
