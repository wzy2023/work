import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import SSR from '../../ssr'

export default function Csr() {
  const { query } = useRouter()

  const [data, setData] = useState([
    {
      id: 0,
      title: query.id,
      completed: false,
    },
  ])

  console.log(666, 'Csr')

  useEffect(() => {
    console.log(666, 'eff');
    (async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
      const data = await res.json()
      setData(data)
    })()
  }, [])

  return (
    <div style={{ border: 'solid .5px blue' }}>
      <h1>Csr</h1>
      {data.slice(0, 5).map((item: any) => (
        <div key={item.id}>{item.id} - {item.title}</div>
      ))}
    </div>
  )
}
