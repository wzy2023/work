import ComA from './ComA'
import ComB from './ComB'
import ComC from './ComC'
import styles from './style.module.scss'

import { Suspense } from 'react'

// import dynamic from 'next/dynamic'
//
// const ComB = dynamic(
//   () => import('./ComB'),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// )

export default function Ssr() {
  return (
    <div style={{ border: 'solid .5px yellow' }}>
      <h1 className={styles.abc}>
        <span>Page</span>
        <div>{Math.random()}</div>
      </h1>
      <ComA />
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <ComB />
      </Suspense>
      <ComC init={666} />
    </div>
  )
}
