import type { ReactNode } from 'react'
import { ReactFlowProvider } from '@xyflow/react'

import styles from './index.module.scss'
import '@xyflow/react/dist/style.css'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ReactFlowProvider>
      <div className={styles.task}>
        {children}
      </div>
    </ReactFlowProvider>
  )
}
