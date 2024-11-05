export default function SsrC({ data }: any) {
  return (
    <div style={{ border: 'solid .5px yellow' }}>
      <h1>SsrC</h1>
      {data?.map((item: any, index: number) => (
        <span style={{ display: 'none' }} key={index}>{index}</span>
      ))}
    </div>
  )
}
