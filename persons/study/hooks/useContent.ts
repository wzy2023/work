import { useState, useEffect } from 'react'

interface UseContentProps {
  pageContent: string
}

export const useContent = (props: UseContentProps) => {
  const { pageContent } = props

  const [extractedContent, setExtractedContent] = useState<string>('')

  // 提取页面主要内容
  const extractMainContent = (html: string): string => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    const scriptsAndStyles = tempDiv.querySelectorAll('script, style, link, meta, iframe, header, footer, nav')
    scriptsAndStyles.forEach(el => el.remove())

    let mainContent = ''
    const contentSelectors = [
      'article', '.article', '.post', '.content', 'main',
      '#content', '#main', '.main-content', '[role="main"]',
    ]

    for (const selector of contentSelectors) {
      const potentialContent = tempDiv.querySelector(selector)
      if (potentialContent && potentialContent.textContent && potentialContent.textContent.length > 100) {
        mainContent = potentialContent.innerHTML
        break
      }
    }

    if (!mainContent) {
      mainContent = tempDiv.innerHTML
    }
    return mainContent
  }

  // 提取内容
  useEffect(() => {
    if (pageContent) {
      try {
        const mainContent = extractMainContent(pageContent)
        setExtractedContent(mainContent)
      } catch (error) {
        console.error('内容提取失败:', error)
        setExtractedContent(pageContent)
      }
    }
  }, [pageContent])

  return { extractedContent }
}
