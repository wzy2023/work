import { Suspense } from 'react'
import SsrC from './SsrC'

// import dynamic from 'next/dynamic'
//
// const SsrC = dynamic(
//   () => import('./SsrC'),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// )

export default function Ssr({ data }: any) {
  return (
    <div style={{ border: 'solid .5px yellow' }}>
      <h1>Ssr</h1>

      {data?.slice(0, 5).map((item: any) => (
        <div key={item.id}>{item.id} - {item.title}</div>
      ))}

      <Suspense fallback={<p>Loading SsrC</p>}>
        <SsrC data={data} />
      </Suspense>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    cache: 'no-cache',
  })
  const data = await res.json()
  return { props: { data: data.slice(0, 2) } }
}
