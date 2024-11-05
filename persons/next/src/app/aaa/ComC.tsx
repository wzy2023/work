'use client'

import { useEffect, useState } from 'react'

export default function ComC({ init }: any) {
  const [data, setData] = useState<number>(init)

  useEffect(() => {
    console.log(666, data)
    setData(data + 1)
  }, [])

  return (
    <h1 onClick={() => setData(data + 1)}>
      <span>ComC {Math.random()}</span>
      <div>{data}</div>
    </h1>
  )
}
