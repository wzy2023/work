import Link from 'next/link'

export default ({ Component, pageProps }: any) => {
  return (
    <div className='flex gap-4 border-2'>
      <div>
        <Link href='/csr/1/page'>CSR</Link>
      </div>
      <div>
        <Link href='/ssr'>SSR</Link>
      </div>
      <div>
        <Link href='/ssg'>SSG</Link>
      </div>

      <div className='flex-1'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
