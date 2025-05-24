import { StudyContentType, StudyViewType } from '@/api/types'

export const contentTypeOptions = [
  { label: '文本', value: StudyContentType.Text },
  { label: '链接', value: StudyContentType.Url },
  { label: 'HTML', value: StudyContentType.Html },
  { label: 'JSON', value: StudyContentType.Json },
]

export const viewTypeOptions = [
  { label: '文本', value: StudyViewType.Text },
  { label: 'Iframe', value: StudyViewType.Iframe },
  { label: 'HTML', value: StudyViewType.Html },
  { label: 'JSON渲染', value: StudyViewType.Render },
]
