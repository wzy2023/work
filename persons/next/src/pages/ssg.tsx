export default function Ssg({ data }: any) {
  console.log(666, 'Ssg')
  return (
    <div style={{ border: 'solid .5px red' }}>
      <h1>Ssg</h1>
      {data.slice(0, 5).map((item: any) => (
        <div key={item.id}>{item.id} - {item.title}</div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  // const data = await res.json()

  return { props: { data: [] } }
}
