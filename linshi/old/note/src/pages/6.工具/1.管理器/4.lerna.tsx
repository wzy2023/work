import { AlertPro, AnchorCard, PageHeader, ParamsTable, ReferenceLink } from '@/components'

export default () => [
  <PageHeader title='Lerna' subTitle='是[多package项目]的包管理工具' />,
  <AnchorCard title='简介'>
    <AlertPro>
      <div style={{ marginBottom: 10 }}>它是基于 git + npm 的，可以简化多 package 时的人工重复操作</div>
      <div>主要提供以下几个功能</div>
      <div>1. 本地 package 之间的互相 link</div>
      <div>2. 给多个 package 安装依赖</div>
      <div>3. 给多个 package 执行 bash 命令或 package.json 里的 scripts 脚本</div>
      <div>4. 升级 package 的版本号</div>
      <div>5. 发布 package 到 Npm</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='创建 lerna 项目'>
    <ParamsTable
      data={[
        { label: 'npm i lerna -g', desc: '全局安装 lerna' },
        { label: 'lerna -v', desc: '查看是否安装成功' },
        { label: 'lerna init [--independent]', desc: '初始化 lerna 项目' },
        { desc: '--independent 独立模式，允许每个[pkgName]使用不同的版本号' },
      ]}
    />
    <AlertPro message='lerna 初始化做了四件事'>
      <div>1. 初始化 git 仓库</div>
      <div>2. 创建 packages 目录</div>
      <div>3. 创建 lerna.json</div>
      <div>4. 创建 package.json</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='仓库管理'>
    <ParamsTable
      data={[
        { label: 'lerna ls', desc: '列出本仓库中的所有公共包' },
        { label: 'lerna create $pkgName [outDir]', desc: '创建子包，outDir 默认为 lerna.json.packages[0]' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='包管理'>
    <ParamsTable
      data={[
        { label: 'lerna bootstrap [--hoist]', desc: '安装所有包下的所有依赖项，并 link 本地依赖' },
        { label: '', desc: '--hoist 依赖提升 将多个包共同使用的依赖提升到顶层，会产生模块解析和幽灵依赖的问题' },
        {},
        { label: 'lerna link', desc: 'link 本地包' },
        { label: 'lerna clean', desc: '清空所有包的 node_modules 目录' },
        {},
        { label: 'lerna add $moduleName [filterOption] [--dev | --peer]', desc: '添加本地包 || 安装npm包' },
        {
          label: 'lerna add module-1 packages/prefix-*',
          desc: '将 module-1 的包添加到以“prefix-”为前缀文件夹中的包中',
        },
        { label: 'lerna add module-1 --scope=module-2', desc: '将 module-1 安装到 module-2' },
        { label: 'lerna add module-1 --scope=module-2 --dev', desc: '将 module-1 安装到 module-2 的 devDependencies' },
        {
          label: 'lerna add module-1 --scope=module-2 --peer',
          desc: '将 module-1 安装到 module-2 的 peerDependencies',
        },
        { label: 'lerna add module-1', desc: '将 module-1 安装到除了 module-1 的所有模块' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='发布管理'>
    <ParamsTable
      data={[
        { label: 'lerna version', desc: '增加版本号' },
        { label: 'lerna changed', desc: '检查上次发布以来，有哪些package做了变更' },
        {},
        { label: 'lerna diff $pkgName', desc: '查看当前和上次commit之间的变更 (列出包自上次发布以来的修改情况)' },
        { label: 'lerna publish', desc: '发布到git和npm' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='执行命令'>
    <ParamsTable
      data={[
        { label: 'lerna exec --scope=module-1 yarn remove react', desc: '删除指定包' },
        { label: 'lerna exec -- rm -rf node_modules', desc: '执行bash命令' },
        { label: 'lerna exec --scope $name -- rm -rf node_modules', desc: '执行bash命令' },
        { label: 'lerna run build', desc: '执行scripts命令' },
        { label: 'lerna run build --scope $name', desc: '执行scripts命令' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='过滤选项'>
    <ParamsTable
      data={[
        { label: '--scope $glob', desc: '只包含名称与通配符匹配的包' },
        { label: '--ignore $glob', desc: '排除名称与通配符匹配的包' },
        { label: '--no-private', desc: '排除私有包' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='注意'>
    <AlertPro>
      <div>1. package.json 里的 name，是以后发到 Npm 上时的包名，要和 Npm 上的其它包名不重复才能发布成功</div>
      <div>2. 包名建议使用 group 形式，例如 @my-group-wzy/core，其中 @my-group-wzy 这个 group 名称需要去 Npm 上创建</div>
      <div>3. publish 前，需要 git push 到远程仓库，并且 npm login</div>
      <div>4. 将 lerna.json 中的 version 设置为 independent 可以运行独立模式</div>
      <div>5. 对于添加到 Lerna 存储库中的任何依赖，您应该运行 lerna bootstrap 安装，而不是运行 npm 安装，因为这将考虑到包文件夹中的现有项目以及外部依赖关系</div>
      <div>6. 如果 publish 失败了，可能是您的网络出现了波动，也可能是没有登录到 npm 等等。如果 lerna.json 并没有更新，重试一下 lerna publish，如果已经更新，您可以强制重新发布。lerna publish --force-publish $(ls packages/)。</div>
    </AlertPro>
  </AnchorCard>,
  <ReferenceLink href='https://lerna.js.org/docs/introduction' />,
]
