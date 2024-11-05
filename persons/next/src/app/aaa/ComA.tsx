export default async function ComA() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  const data = await res.json()

  return (
    <h1>
      <span>ComA {Math.random()}</span>
      {data?.slice(0, 5).map((item: any) => (
        <div key={item.id}>{item.id} - {item.title}</div>
      ))}
    </h1>
  )
}
