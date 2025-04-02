import type { ReactNode } from 'react'
import { ReactFlowProvider } from '@xyflow/react'

import styles from './styles/index.module.scss'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ReactFlowProvider>
      <div className={styles.task}>
        {children}
      </div>
    </ReactFlowProvider>
  )
}
