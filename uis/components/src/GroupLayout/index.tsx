import type { CSSProperties, ReactNode } from 'react'

import GridLayout, { type Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'

export { type Layout as GridLayoutItem } from 'react-grid-layout'

interface GridLayoutProps<I> {
  layout: I[]
  style?: CSSProperties
  onChange?: (layout: I[]) => void
  renderItem?: (item: I) => ReactNode
}

export const GroupLayout = <I extends Layout>(props: GridLayoutProps<I>) => {
  const { style, layout, onChange, renderItem = item => item.i } = props

  const onLayoutChange = (items: Layout[]) => {
    onChange?.(items.map(item => ({
      ...layout.find(i => i.i === item.i),
      ...item,
    }) as I))
  }

  return (
    <GridLayout
      layout={layout}
      cols={24}
      rowHeight={50}
      width={1200}
      useCSSTransforms={false}
      containerPadding={[0, 0]}
      style={{ width: '100%', height: '100%', userSelect: 'none', ...style }}
      draggableHandle='.drag-handle'
      resizeHandles={['se']}
      onLayoutChange={onLayoutChange}
    >
      {layout.map(item => (
        <div key={item.i}>
          {renderItem(item)}
        </div>
      ))}
    </GridLayout>
  )
}
