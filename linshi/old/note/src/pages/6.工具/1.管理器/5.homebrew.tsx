import { AnchorCard, PageHeader, ParamsTable, CodeView } from '@/components'

export default () => [
  <PageHeader title='HomeBrew' subTitle='是一个Mac使用的软件安装工具' />,
  <AnchorCard title='安装'>
    <CodeView language='bash'>
      {`
        # 安装
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        # 查看是否安装成功
        brew -v

        # 卸载
        cd \`brew --prefix\`
        rm -rf Cellar
        brew prune
        rm \`git ls-files\`
        rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
        rm -rf .git
        rm -rf ~/Library/Caches/Homebrew
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='命令'>
    <ParamsTable
      data={[
        { label: 'brew -v', desc: '查看homebrew的版本' },
        { label: 'brew update', desc: '更新自身' },
        {},
        { label: 'brew ls', desc: '查看本地所有软件' },
        {},
        { label: 'brew install $name', desc: '安装指定的软件' },
        { label: 'brew uninstall $name', desc: '卸载指定的软件' },
        {},
        { label: 'brew info $name', desc: '查看指定软件的信息' },
        { label: 'brew search $name', desc: '查询可安装的软件' },
        {},
        { label: 'brew outdated', desc: '查看可更新的软件' },
        { label: 'brew upgrade [$name]', desc: '更新所有或指定的软件' },
        {},
        { label: 'brew pin $name', desc: '锁定不想更新的软件' },
        { label: 'brew unpin $name', desc: '取消锁定不想更新的软件' },
        {},
        { label: 'brew cleanup [$name]', desc: '清理指定软件的旧版本' },
        { label: 'brew cleanup -n', desc: '查看可清理的旧软件' },
      ]}
    />
  </AnchorCard>,
]
