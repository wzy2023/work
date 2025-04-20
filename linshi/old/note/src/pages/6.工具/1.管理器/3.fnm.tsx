import { AnchorCard, PageHeader, ParamsTable, CodeView, AlertPro } from '@/components'

export default () => [
  <PageHeader title='FNM' subTitle='是一个切换Node版本的工具' />,
  <AnchorCard title='安装'>
    <CodeView language='bash'>
      {`
        # 安装
        curl -fsSL https://fnm.vercel.app/install | bash

        # 升级
        brew upgrade fnm

        # 安装完会输出一段指令，有时候需要复制并执行

        # 查看是否安装成功
        fnm -V
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='命令'>
    <ParamsTable
      data={[
        { label: 'fnm -V', desc: '查看fnm的版本' },
        {},
        { label: 'fnm ls', desc: '查看本地所有Node版本' },
        { label: 'fnm ls-remote', desc: '查看远程所有Node版本' },
        {},
        { label: 'fnm install $version', desc: '安装指定的Node版本' },
        { label: 'fnm uninstall $version', desc: '卸载指定的Node版本' },
        {},
        { label: 'fnm alias $version $name', desc: '给指定的Node版本设置别名' },
        { label: 'fnm unalias $name', desc: '删除别名' },
        {},
        { label: 'fnm default $version', desc: '设置指定的Node版本为默认Node' },
        { label: 'fnm currnt', desc: '查看当前使用的Node版本' },
        { label: 'fnm use $node_version', desc: '切换到指定的Node版本' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='问题'>
    <AlertPro message='设置alias有什么用'>
      <div>alias 是具体版本号的别名，设置后可以用别名代替版本号使用</div>
    </AlertPro>
  </AnchorCard>,
]
