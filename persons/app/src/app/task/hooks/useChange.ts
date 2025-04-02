import { Modal } from '@/components'

interface Option {
  isPreview: boolean
  onNodesChange: any,
  onEdgesChange: any
}

export const useChange = (option: Option) => {
  const { isPreview, onNodesChange, onEdgesChange } = option

  const onNodesChange_ = (changes: any[]) => {
    if (isPreview) {
      return
    }

    if (changes.filter(change => change.type === 'remove').length > 0) {
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除选中的节点吗？',
        onOk: () => {
          onNodesChange(changes)
        },
      })
    } else {
      onNodesChange(changes.filter(change => !['position'].includes(change.type)))
    }
  }

  const onEdgesChange_ = (changes: any[]) => {
    if (isPreview) {
      return
    }

    const filteredChanges = changes.filter(change => !['remove'].includes(change.type))
    if (filteredChanges.length > 0) {
      onEdgesChange(filteredChanges)
    }
  }

  return {
    onNodesChange_,
    onEdgesChange_,
  }
}
