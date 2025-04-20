import { AnchorCard, CodeView, PageHeader } from '@/components'

export default () => [
  <PageHeader title='oh-my-zsh' />,
  <AnchorCard title='安装'>
    <CodeView language='bash'>
      {`
        # 安装
        sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
      `}
    </CodeView>
  </AnchorCard>,
]
