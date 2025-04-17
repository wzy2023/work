import type { KeyboardEvent } from 'react'
import { _ } from '@/utils'
import { createNodeEdge } from '../utils'
import type { Elements, ElementsFns, NodeType } from '../types'

type Option = Elements & ElementsFns

export const useEventKey = (option: Option) => {
  const { nodes = [], edges = [], setEdges, setNodes } = option

  const nds = _.cloneDeep(nodes)
  const eds = _.cloneDeep(edges)

  const onKeyDown = (ev: KeyboardEvent<HTMLElement>) => {
    const nodeId = ev.currentTarget.dataset.id
    const node = nodes.find(item => item.id === nodeId)

    const fatherId = edges.find(item => item.target === nodeId)?.source
    const father = nodes.find(item => item.id === fatherId)

    switch (ev.key) {
      case 'Enter':
        if (!father || !node?.type) {
          return
        }

        const { node: n, edge: e } = createNodeEdge(father, node.type as NodeType)

        const nd = nds.find(item => item.id === node.id)
        if (nd) {
          nd.selected = false
        }

        n.selected = true
        n.data.editing = true

        nds.push(n)
        setNodes(nds)

        eds.push(e)
        setEdges(eds)
        break
    }
  }

  return {
    onKeyDown,
  }
}
