import * as mammoth from 'mammoth'

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: any) => resolve(e.target.result)
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

export const processFile = async (file: any) => {
  if (file.name.endsWith('.txt')) {
    return await readFileAsText(file.originFileObj)
  }
  if (file.name.endsWith('.docx')) {
    const arrayBuffer = await readFileAsArrayBuffer(file.originFileObj)
    try {
      const result = await mammoth.extractRawText({ arrayBuffer })
      return result.value
    } catch (error) {
      console.error('Error converting docx to HTML:', error)
    }
  }
}

export const processText = (text: string): string[] => {
  // 按换行符分割文本
  const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '')

  // 去除每段开头的序号和末尾的句号
  return paragraphs.map(paragraph => {
    const cleaned = paragraph.replace(/^\d+\.\s*/g, '').trim()
    return cleaned.replace(/。$/g, '')
  })
}
