import { AnchorCard, PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader title='NRM' subTitle='是一个切换npm镜像源的工具' />,
  <AnchorCard title='命令'>
    <ParamsTable
      data={[
        { label: 'nrm ls', desc: '查看所有镜像源' },
        { label: 'nrm use [name]', desc: '使用指定的镜像源' },
        { label: 'nrm currnt', desc: '查看当前使用的镜像源' },
      ]}
    />
  </AnchorCard>,
]
