import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function Layout({ children }: any) {
  return (
    <html>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
