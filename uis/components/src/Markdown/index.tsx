'use client'

import { MarkdownHooks } from 'react-markdown'

import remarkGfm from 'remark-gfm'
import rehypeStarryNight from 'rehype-starry-night'

import 'github-markdown-css/github-markdown-light.css'

interface MarkdownProps {
  content: string
}

export const Markdown = (props: MarkdownProps) => {
  const { content } = props
  return (
    <div className='markdown-body' style={{ backgroundColor: 'transparent' }}>
      <MarkdownHooks rehypePlugins={[rehypeStarryNight, remarkGfm]}>
        {content}
      </MarkdownHooks>
    </div>
  )
}
