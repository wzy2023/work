import { Readability } from '@mozilla/readability'
import { useState, useEffect } from 'react'

interface UseContentProps {
  pageContent: string
}

export const usePureContent = (props: UseContentProps) => {
  const { pageContent } = props

  const [pureContent, setPureContent] = useState<string>('')

  const extractPureContentWithReadability = (html: string): string => {
    try {
      // 创建一个新的 DOM 解析器
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // 使用 Readability 提取内容
      const reader = new Readability(doc)
      const article = reader.parse()

      if (!article) {
        return '<div class="error">无法解析内容</div>'
      }

      // 构建最终 HTML
      let resultHtml = '<div class="pure-content">'

      // 添加标题
      if (article.title) {
        resultHtml += `<h1 class="pure-title">${article.title}</h1>`
      }

      // 添加摘要（如果有）
      if (article.excerpt) {
        resultHtml += `<div class="pure-excerpt">${article.excerpt}</div>`
      }

      // 创建一个临时 div 来解析 article.content 并提取图片
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = article.content || ''

      // 获取所有图片
      const images = Array.from(tempDiv.querySelectorAll('img'))
      const validImages = images.filter(img => {
        const src = img.getAttribute('src')
        return src && !src.includes('data:image') && !src.includes('blank.gif') && src.trim() !== ''
      })

      // 添加文本内容
      resultHtml += '<div class="pure-text">'
      if (article.textContent) {
        resultHtml += article.textContent
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => `<p>${line}</p>`)
        .join('')
      }
      resultHtml += '</div>'

      // 添加图片
      if (validImages.length > 0) {
        resultHtml += '<div class="pure-images">'
        resultHtml += '<h2>图片链接</h2>'
        validImages.forEach(img => {
          const src = img.getAttribute('src')
          const alt = img.getAttribute('alt') || ''
          if (src && src.length > 0) {
            resultHtml += `<div class="image-container">
              <img src="${src}" alt="${alt}" />
              <div class="image-url"><a href="${src}" target="_blank">${src}</a></div>
            </div>`
          }
        })
        resultHtml += '</div>'
      }

      resultHtml += '</div>'

      return resultHtml
    } catch (error: any) {
      console.error('使用 Readability 提取内容失败:', error)
      return `<div class="error">提取内容失败: ${error?.message || '未知错误'}</div>`
    }
  }

  useEffect(() => {
    if (pageContent) {
      setTimeout(() => {
        try {
          setPureContent(extractPureContentWithReadability(pageContent))

        } catch (error: any) {
          setPureContent(`<div class="error">内容提取失败: ${error?.message || '未知错误'}</div>`)
        }
      }, 0)
    }
  }, [pageContent])

  return {
    pureContent,
  }
}
