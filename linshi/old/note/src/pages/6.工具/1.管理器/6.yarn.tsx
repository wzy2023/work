import { AnchorCard, CodeView, PageHeader, ParamsTable } from '@/components';

export default () => [
  <PageHeader title='NRM' subTitle='是一个切换npm镜像源的工具' />,
  <AnchorCard title='命令'>
    <ParamsTable
      data={[
        { label: 'yarn --version', desc: '查看版本' },
        {},
        { label: 'yarn | yarn install', desc: '安装所有依赖' },
        { label: 'yarn [--production]', desc: '只安装生产环境的依赖' },
        {},
        { label: 'yarn add $packageName $packageName [--dev]', desc: '安装包 (默认安装到 dependencies)' },
        { label: 'yarn global add $packageName', desc: '全局安装包' },
        { label: 'yarn upgrade $packageName', desc: '升级包' },
        { label: 'yarn remove $packageName', desc: '移除包' },
        {},
        { label: 'yarn publish', desc: '发布' },
        { label: 'yarn run $scriptName', desc: '执行在 package.json 中 scripts 属性下定义的脚本' },
        { label: 'yarn info $packageName', desc: '查看包的最新信息' },
      ]}
    />
  </AnchorCard>,
]
