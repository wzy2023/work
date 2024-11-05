import Link from 'next/link'

export default function Bbb() {
  return (
    <div style={{ border: 'solid .5px red' }}>
      <h1>Bbb</h1>
      <Link href='/aaa'>Aaa</Link>
    </div>
  )
}
