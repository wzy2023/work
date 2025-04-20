import { AnchorCard, PageHeader, ParamsTable, AlertPro, Space, TabsPro, CodeView } from '@/components'

export default () => [
  <PageHeader title='NPM' subTitle='是包管理工具，用来安装包和管理包之间的依赖' />,
  <AlertPro>
    <Space direction='vertical'>
      <b>npm 由三个不同的部分组成</b>
      <div>
        <b>网站</b>
        <div>使用 www.npmjs.com 网站发现包、设置配置文件以及管理 npm 的其他方面。</div>
      </div>
      <div>
        <b>命令行界面 （CLI）</b>
        <div>CLI 从终端运行，是大多数开发人员与 npm 交互的方式</div>
      </div>
      <div>
        <b>注册表</b>
        <div>注册表是一个大型的JavaScript软件和围绕它的元信息的公共数据库</div>
      </div>
    </Space>
  </AlertPro>,
  <AnchorCard title='介绍'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '包和模块',
          children: [
            <AlertPro message='包'>
              <div>包是由 package.json 描述的压缩文件或目录</div>
            </AlertPro>,
            <AlertPro message='模块'>
              <div>模块是可以由 Node.js require() 函数加载的文件或目录</div>
            </AlertPro>,
          ],
        },
        {
          label: '全局/本地',
          children: [
            <AlertPro>
              <div>npm 将各种包放在您的电脑上。有两个存放位置。</div>
              <div>本地安装: 将包放入当前项目的 node_modules 目录下，一般是在项目代码里通过 require 使用</div>
              <div>全局安装: 将包放入当前全局的 node_modules 目录下，一般是在命令行使用</div>
              <div>应该是全局的 node_modules/.bin 目录被加入了 环境变量中，所以全局包可以直接在命令行执行</div>
            </AlertPro>,
          ],
        },
        {
          label: '包的两种维度',
          children: [
            <AlertPro message='公共 | 私有'>
              <div>私有包只有被授予对包的读取访问权限的人员可以下载和安装</div>
            </AlertPro>,
            <AlertPro message='有作用域 | 无作用域'>
              <div>为了避免包名相同的情况，可以给报=包加入作用域，即 @name_space/package\_name</div>
            </AlertPro>,
            <AlertPro message='无作用域包始终是公开的'>
              <div>私有包始终具有作用域，并且默认情况下，作用域包是私有包</div>
            </AlertPro>,
          ],
        },
        {
          label: '集成',
          children: [
            <AlertPro message='npm 可以与外部工具集成使用'>
              <div>访问令牌: 是可用于进行身份验证的十六进制字符串，它授予外部工具安装和/或发布私有模块的权限</div>
              <div>详见: https://docs.npmjs.com/about-access-tokens</div>
            </AlertPro>,
          ],
        },
        {
          label: '可执行文件',
          children: [
            <AlertPro>
              <div>
                在全局模式下，可执行文件在 Unix 上链接到 $prefix/bin，或直接链接到 Windows 上的 $prefix，确保路径位于终端的
                PATH 环境中以运行它们
              </div>
              <div>在本地模式下，可执行文件将链接到 ./node_modules/.binnpm 中，以便它们可用于通过 npm 运行的脚本</div>
            </AlertPro>,
          ],
        },
        {
          label: 'workspace',
          children: [
            <AlertPro message='工作区'>
              <div>工作区，指的是 npm cli 中的一组功能，这些功能支持从单个顶级根包中管理本地文件系统中的多个包</div>
              <div>这组功能弥补了从本地文件系统处理链接包的更加简化的工作流程，</div>
              <div>将链接过程自动化作为一部分 npm install，</div>
              <div>并省下手动使用 npm link 添加当前包到全局 node_modules 的软链接引用</div>
            </AlertPro>,
            <CodeView language='json'>
              {`
            {
              "name": "aaa",
              "workspaces": [
                "packages/bbb",
                "packages/ccc",
              ]
            }
          `}
            </CodeView>,
            <AlertPro message='创建子包'>
              <div>执行 npm init -w ./packages/bbb 可自动创建 ./packages/bbb，并将其写入 package.json.workspace 中</div>
            </AlertPro>,
            <AlertPro message='安装指定依赖到指定子包'>
              <div>npm install lodash -w a</div>
            </AlertPro>,
            <AlertPro message=''>
              <div>运行命令 (将在子包 a 和 b 中运行 start 脚本)</div>
              <div>npm run start --workspace=a --workspace=b</div>
              <div>运行该命令，npm 将忽略缺少目标脚本的工作区</div>
              <div>npm run test --workspaces --if-present</div>
            </AlertPro>,
          ],
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='命令'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '账号',
          children: [
            <ParamsTable
              data={[
                {
                  label: 'npm login\nnpm adduser',
                  desc: '命令行的方式注册账号，并登录，登录后可访问私有包，以及发布包到npm注册表',
                },
                { label: 'npm whoami', desc: '显示当前登录的 npm 用户名，常用于检查是否已登录' },
                { label: 'npm logout', desc: '退出命令行的登录' },
              ]}
            />,
          ],
        },
        {
          label: '脚本',
          children: [
            <ParamsTable
              data={[
                { label: 'npm bin', desc: '打印 .bin 目录的路径' },
              ]}
            />,
          ],
        },
        {
          label: '配置',
          children: [
            <ParamsTable
              data={[
                { label: 'npm profile get', desc: '查看用户帐户配置文件设置' },
                { label: 'npm profile set $prop $value', desc: '更新用户帐户配置文件设置' },
                { label: 'npm profile set password', desc: '从命令行设置密码' },
                {},
                { label: 'npm config set $key=$value $key=$value', desc: '修改指定配置项' },
                { label: 'npm config get $key $key', desc: '查看指定配置项' },
                { label: 'npm config delete $key $key', desc: '删除指定配置项' },
                { label: 'npm config ls [--json]', desc: '查看所有配置项' },
                { label: 'npm config edit', desc: 'vim 的方式编辑 config' },
              ]}
            />,
          ],
        },
        {
          label: '包管理',
          children: [
            <ParamsTable
              data={[
                { label: 'npm install $packageName [-S | -D]', desc: '安装包' },
                { label: 'npm uninstall $package_name [-S | -D]', desc: '卸载包' },
                { label: 'npm update', desc: '更新所在目录的包' },
                { label: 'npm outdated [--depth=0]', desc: '查看哪些包需要更新' },
                {
                  label: 'npm dedupe',
                  desc: '重复数据删除，减少包树中的重复(搜索本地包树，并尝试通过将依赖关系进一步向上提升来简化整体结构)',
                },
                { label: 'npm audit [--force]', desc: '检测项目依赖中的漏洞，并自动安装需要更新的有漏洞的依赖' },
                {},
                { label: 'npm link', desc: '将当前包 通过软连接的方式 安装到全局包目录' },
                { label: 'npm link [$packageName]', desc: '将指定包 通过软连接的方式 安装当前包' },
                { label: 'npm unlink [$packageName]', desc: '解除包的软链接' },
              ]}
            />,
            <AlertPro>
              <Space direction='vertical'>
                <b>安装逻辑</b>

                <div>
                  <div>如果本地目录中有 package.json 文件，则按其指定的版本安装指定包，</div>
                  <div>如果没有该文件，则下载安装最新版本</div>
                  <div>先将包下载到缓存中，再解压到指定的 node_modules 下</div>
                  <div>解压前如果不存在 node_modules 目录，则先创建</div>
                  <div>安装后创建 package.json 文件并写入版本号到该文件</div>
                </div>

                <div>
                  <div>非全局模式安装 npm 包时，先在当前位置查找 node_modules 目录，如果找不到，则向上继续查找</div>
                  <div>如果找到，则该目录会被视为包根目录，会在该目录中安装包，这样即使您碰巧进入了其它文件夹，它也会安装包到合理的目录中</div>
                  <div>如果始终未找到，则视当前目录为包根目录</div>
                  <div>在安装包时，会先在祖先级 node_modules 中查找，如果找到相同版本的包，则不再安装到当前目录</div>
                  <div>这样能避免依赖循环和简约文件夹</div>
                </div>

                <div>
                  <b>安装全局包</b>
                  <div>npm install -g $packageName</div>
                  <div>通过全局安装包，可以将包中的代码当做本地计算机上的一组工具使用</div>
                </div>

                <div>
                  <div>如果包要在项目里引用，请用本地安装的方式安装它</div>
                  <div>如果要作为命令行使用，请用全局安装的方式安装它</div>
                  <div>如果两者都需要，请将其安装在两个位置，或使用 npm link</div>
                </div>

                <div>
                  <div>在本地安装时，包将下载到项目下的 node_modules 目录里</div>
                  <div>您可以加载其主模块，也可以加载其他模块</div>
                  <div>require("packagename/lib/path/to/sub/module")</div>
                  <div>作用域内包的安装方式相同，只是它们被分组在@开头的文件夹的子文件夹中</div>
                </div>
              </Space>
            </AlertPro>,
          ],
        },
        {
          label: '包管理(注册表)',
          children: [
            <ParamsTable
              data={[
                { label: 'npm access', desc: '设置已发布到注册表的包的访问级别' },
                {
                  label: 'npm deprecate $package_name $msg',
                  desc: '弃用指定版本的包，别人再安装此包的时候，将提示这条弃用警告',
                },
                {},
                { label: 'npm dist-tag', desc: '管理包的标签' },
                {
                  label: 'npm dist-tag add < package-spec ( with version ) > $tag ',
                  desc: '给指定版本的包添加标签',
                },
                { label: 'npm dist-tag rm < package-spec ( with version ) > $tag ', desc: '给指定版本的包删除标签' },
                { label: 'npm dist-tag ls < package-spec ( with version ) >', desc: '查看指定版本的包有什么标签' },
              ]}
            />,
          ],
        },
        {
          label: '全局参数',
          children: [
            <ParamsTable
              data={[
                {
                  label: 'npm install --timing\nnpm public --timing',
                  desc: '在npm安装或发布时，可以加此参数，生成 npm-debug.log 文件，用于 debug',
                },
                { label: 'npm audit fix ---package-lock-only', desc: '只更新 package-lock 文件' },
                { label: 'npm audit fix --only=prod', desc: '只更新dependencies中安装的包，跳过devDependencies中的包' },
                { label: 'npm audit fix --dry-run', desc: '试运行' },
                { label: 'npm audit --json', desc: 'json格式的详细信息' },
                { label: 'npm install --global', desc: '全局模式' },
                { label: 'npm install --tag $标签', desc: '安装依赖时，指定首选标记版本' },
              ]}
            />,
          ],
        },
        {
          label: '其它',
          children: [
            <ParamsTable
              data={[
                { label: 'npm bugs $package_name', desc: '打开包的提交bug的页面，一般是 GitHub 上的 issues 页面' },
                { label: 'npm docs $packageName', desc: '打开包的文档' },
                { label: 'npm repo $packageName', desc: '打开包的代码仓库' },
                { label: 'npm edit $packageName', desc: '命令行的方式，查看编辑 node_modules 里包的文件及代码' },
                { label: 'npm cache ls | add  $packageName | clean $key', desc: '用于添加、列出、清理 npm 的缓存文件夹' },
                {},
                { label: 'npm ping', desc: '查看与注册表网站的网络连接' },
                { label: 'npm diff --diff=$specA --diff=$specB', desc: '对比指定两个包的差异' },
                {
                  label: 'npm doctor',
                  desc: '运行一组检查，包括：\nnpm ping\nnpm -v\nnode -v\nnpm config get registry\nwhich git\nnpm 读写权限检查',
                },
                {
                  label: 'npm completion', desc: '用于在命令行输入命令时的自动补全命令功能\n' +
                    'npm completion >> ~/.bashrc\n' +
                    'npm completion >> ~/.zshrc\n' +
                    'source ~/.bashrc // 重新加载shell配置文件\n' +
                    '现在，在终端注入 npm ins ，然后按下 tab 键就会出现 install 了，不会再浪费时间去全部输入了',
                },
                {
                  label: 'npm ci', desc: '常用于自动化环境中\n' +
                    '作用类似于 npm install，区别是：\n' +
                    '1. 必须具有现有的package-lock.json或 npm-shrinkwrap.json\n' +
                    '2. 一次只能安装整个项目，无法使用此命令添加单个依赖项\n' +
                    '3. 如果包锁中的依赖项与 中的依赖项不匹配package.json， npm ci将退出并出现错误，而不是更新包锁\n' +
                    '4. 如果 anode_modules已经存在，它将在npm ci开始安装之前自动删除\n' +
                    '5. 它永远不会写入package.json或任何包锁',
                },
              ]}
            />,
          ],
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='其它'>
    <AlertPro message='npx'>
      <div>npm 在5.2之上的版本，推荐使用 npx 来直接使用全局包</div>
    </AlertPro>
    <AlertPro message='npm 更新自身'>
      <CodeView language='bash'>{`npm install npm@latest -g`}</CodeView>
    </AlertPro>
    <AlertPro message='发布/更新包'>
      <div>npm publish --access public</div>
      <div>https://docs.npmjs.com/creating-a-package-json-file</div>
    </AlertPro>
    <AlertPro message='场景错误'>
      <div>https://docs.npmjs.com/common-errors</div>
    </AlertPro>
    <AlertPro message='解决全局安装包时的 EACCES 权限错误'>
      <div>https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally</div>
    </AlertPro>
    <AlertPro message='如何防止我的软件包在官方注册表中发布'>
      <CodeView language='json'>
        {`
          {
            // 设置为私有
            "private": true,
            // 或者发布到私有 NPM 注册表
            "publishConfig": {
              "registry": "http://my-internal-registry.local"
             }
          }
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='文件'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: 'package.json',
          children: [
            <ParamsTable
              data={[
                { label: 'name', desc: '包名，如果打算发布包，则 name 是必填的' },
                { label: 'version', desc: '版本，如果打算发布包，则 version 是必填的' },
                { label: 'description', desc: '描述，用于 npm search 时帮助人们发现该包' },
                { label: 'keywords', desc: '关键词，用于 npm search 时帮助人们发现该包' },
                {
                  label: '"homepage": "https://github.com/owner/project#readme"',
                  desc: '官网，用于 npm docs $pkgName 时帮助人们打开该包的官网',
                },
                {
                  label: 'bugs: {\n  "url" : "https://github.com/owner/project/issues",\n  "email" : "project@hostname.com"\n}',
                  desc: '报告bug的途径，如果提供了 url，则可以在 npm bugs $pkgName 时打开该页面',
                },
                { label: '"license" : "BSD-3-Clause"', desc: '许可证，指定人们可以如何使用该包' },
                {
                  label: '{\n' +
                    '  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"\n' +
                    '}\n' +
                    '{\n' +
                    '  "author": {\n' +
                    '\t  "name" : "Barney Rubble",\n' +
                    '\t  "email" : "b@rubble.com",\n' +
                    '\t  "url" : "http://barnyrubble.tumblr.com/"\n' +
                    '  }\n' +
                    '}',
                  desc: '作者，是一个带有“name”字段的对象，可以选择“url”和“email”',
                },
                { label: 'contributors', desc: '贡献者，格式类似 author，不过是个数组' },
                {
                  label: '"funding": {\n' +
                    '   "type" : "individual",\n' +
                    '   "url" : "http://example.com/donate"\n' +
                    ' }',
                  desc: '资助包开发者的方式的页面',
                },
                {
                  label: 'files',
                  desc: '用于指定在将包作为依赖项安装时要包含的条目，默认值为 ["*"]\n' +
                    '注意：无论如何设置，有些文件将始终被忽略，有些文件将始终被包含\n' +
                    '详见：https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files',
                },
                { label: 'browser', desc: '如果包在浏览器而不是 Node 里使用，则应该指定 browser 字段，而不是 main 字段' },
                {
                  label: '“directories”: {\n' +
                    '  "bin":  "一个充满可执行文件的目录",\n' +
                    '  "man":  "一个充满手册的目录"\n' +
                    '}',
                  desc: '目录',
                },
                {
                  label: '"bin": "./cli/lint-staged.js"\n' +
                    '"bin": {\n' +
                    '   "lint-staged": "./cli/lint-staged.js"\n' +
                    '}',
                  desc: '将把 ./cli/lint-staged.js 文件，软连接到 node_modules/.bin 目录下\n' +
                    '许多包都有一个或多个要安装到 PATH 中的可执行文件，可以用此字段来指定\n' +
                    '注意：该文件需要以 #!/usr/bin/env node 开头，否则脚本在没有节点可执行文件的情况下启动',
                },
                {
                  label: ' "man": "./man/doc.1"\n' +
                    ' "man" : [ "./man/foo.1", "./man/bar.1" ]',
                  desc: '指定一些文件来让linux下的man命令查找文档地址',
                },
                {
                  label: '  "repository": {\n' +
                    '    "type": "git",\n' +
                    '    "url": "https://github.com/npm/cli.git",\n' +
                    '    "directory": "packages/react-dom" // 包不在仓库的根目录中，可以用此字段指定\n' +
                    '  }\n' +
                    '  "repository": "npm/npm",\n' +
                    '  "repository": "github:user/repo",\n' +
                    '  "repository": "gitlab:user/repo"',
                  desc: '存储库',
                },
                {
                  label: '"config" : { "port" : "8080" }',
                  desc: '用于添加环境变量，可以在两个位置使用\n' +
                    '1. 在 scripts 中使用，例如："start": "umi start PORT $npmPackageConfigPort",\n' +
                    '2. 在 js 代码里通过 process.env.npmPackageConfigPort 使用',
                },
                {
                  label: 'types',
                  desc: '指定包的类型定义文件，如果未设置，则默认为根目录的 index.d.ts 文件',
                },
                {
                  label: 'type',
                  desc: '指定包的类型，如果未设置，则默认为 commonjs\n' +
                    '如果设置为 module，则表示包是 ES 模块，如果设置为 commonjs，则表示包是 CommonJS 模块',
                },
                {
                  label: 'main',
                  desc: '指定包作为 CommonJS 模块，被引入时的入口点，如果未设置，默认为根目录的 index.js 文件',
                },
                {
                  label: 'module',
                  desc: '指定包作为 ES 模块，被引入时的入口点，如果未设置，默认为根目录的 index.js 文件',
                },
              ]}
            />,
            <AlertPro message='dependencies'>
              <div>包与版本的映射，版本是一个字符串，可以有如下取值</div>
              <div>version必须完全匹配version</div>
              <div>{'>version必须大于version'}</div>
              <div>{'>=version等'}</div>
              <div>{'<version'}</div>
              <div>{'<=version    '}</div>
              <div>~version“大致相当于版本”见semver</div>
              <div>^version“与版本兼容”参见 semver</div>
              <div>1.2.x1.2.0、1.2.1 等，但不是 1.3.0</div>
              <div>http://...请参阅下面的“作为依赖项的 URL”</div>
              <div>*匹配任何版本</div>
              <div>""（只是一个空字符串）与 相同*</div>
              <div>{'version1 - version2与 相同。>=version1 <=version2'}</div>
              <div>range1 || range2如果满足范围 1 或范围 2，则通过。</div>
              <div>git...请参阅下面的“Git URL 作为依赖项”</div>
              <div>user/repo请参阅下面的“GitHub URL”</div>
              <div>tag标记并发布为“请参阅 npm dist-tag”的特定版本tag</div>
              <div>path/path/path请参阅下面的本地路径</div>
              <div>详见：https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies</div>
              <div>例如：</div>
              <CodeView language='json'>
                {`
              {
                "dependencies": {
                  "foo": "1.0.0 - 2.9999.9999",
                  "bar": ">=1.0.2 <2.1.2",
                  "baz": ">1.0.2 <=2.3.4",
                  "boo": "2.0.1",
                  "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
                  "asd": "http://asdf.com/asdf.tar.gz",
                  "til": "~1.2",
                  "elf": "~1.2.3",
                  "two": "2.x",
                  "thr": "3.3.x",
                  "lat": "latest",
                  "dyl": "file:../dyl"
                }
              }
          `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='devDependencies'>
              <div>开发阶段的依赖，包括一些：测试工具、编译工具、或其它开发阶段使用的工具，都可以放在这里</div>
              <div>npm install -D $pkgName</div>
            </AlertPro>,
            <AlertPro message='peerDependencies'>
              <div>同行依赖 (又称对等依赖)</div>
              <div>指定包的运行前提是在项目根目录安装了此 peerDependencies 中的依赖们</div>
              <div>或者说将此 peerDependencies 中的依赖们安装至项目根目录，而不是本包的 node_modules 下</div>
              <div>这一特性，还可以用来防止多次引入相同的库</div>
            </AlertPro>,
            <AlertPro message='scripts'>
              <div>一个对象，其中包含在包生命周期的不同时间运行的脚本命令。关键是生命周期事件，值是要在该点运行的命令</div>
              <div>是 package.json 里的属性，支持许多内置脚本及其预设的生命周期事件以及任意脚本</div>
              <div>可以通过 npm run-script $stage 或 npm run $stage 简称执行</div>
              <b>前后脚本</b>
              <div>任何脚本都可以在 package.json 中创建它的 “pre” 或 “post” 脚本，表示在该脚本之前和之后执行的脚本</div>
              <div>例如，在执行 npm run compress 时，将按照描述依次执行这些脚本</div>
              <b>生命周期脚本</b>
              <div>一些命令的执行，会触发一些特殊的脚本，称为生命周期脚本</div>
              <div>例如：prepare、prepublish、prepublishOnly、prepack、postpack、dependencies</div>
              <div>命令与其会触发的脚本，详见：https://docs.npmjs.com/cli/v8/using-npm/scripts</div>
            </AlertPro>,
            <CodeView language='json'>
              {`
             {
               "scripts": {
                 "precompress": "{{ 在 'compress' 脚本之前执行 }}",
                 "compress": "{{ 'compress' }}",
                 "postcompress": "{{ 在 'compress' 脚本之后执行 }}"
               }
            }
          `}
            </CodeView>,
          ],
        },
        {
          label: '.npmrc',
          children: [
            <AlertPro>
              <Space direction='vertical'>
                <div>
                  <div>npm 从命令行、环境变量、.npmrc 文件获取其配置设置</div>
                  <div>npm config 命令可用于编辑: 用户和全局 npmrc 文件的内容</div>
                </div>

                <div>
                  <div>npm的配置文件，此文件共有四类</div>
                  <div>1. npm 内置配置文件 （/path/to/npm/npmrc）</div>
                  <div>2. 全局配置文件 （$PREFIX/etc/npmrc）</div>
                  <div>3. 用户配置文件 （~/.npmrc）</div>
                  <div>4. 每个项目的配置文件 （/path/to/my/project/.npmrc）</div>
                  <div>在项目中本地工作时，项目根目录中的文件（即 和 的同级文件）将设置特定于此项目的配置值</div>
                  <div>在全局模式下不会读取此文件，例如在运行 npm install -g 时</div>
                  <div>在发布模块时，它不起作用</div>
                </div>

                <div>
                  <div>语法</div>
                  <CodeView language='bash'>
                    {`
                    # 键值对的形式
                    key = value

                    # 可使用环境变量，例如：
                    prefix = $HOME/.npm-packages

                    # 可使用数组，例如：
                    key[] = "first value"
                    key[] = "second value"

                    # 可使用注释，例如：
                    # 开头的注释
                    ; 开头的注释
                 `}
                  </CodeView>
                </div>
              </Space>
            </AlertPro>,
          ],
        },
        {
          label: '.npmignore',
          children: [
            <AlertPro message='忽略文件'>
              <div>使用.npmignore文件可以指定排除在包内的文件</div>
              <div>如果没有 .npmignore 文件，但有 gitignore 文件，则 npm 将会使用 .gitignore 文件</div>
              <div>会在包的所有子目录中查找 .npmignore和 .gitignore文件，而不仅仅是根目录</div>
            </AlertPro>,
            <AlertPro message='默认忽略的文件'>
              <CodeView language='ignore'>
                {`
          .*.swp
          ._*
          .DS_Store
          .git
          .gitignore
          .hg
          .npmignore
          .npmrc
          .lock-wscript
          .svn
          .wafpickle-*
          config.gypi
          CVS
          npm-debug.log
        `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: 'package-lock.json',
          children: [
            <AlertPro message='锁文件'>
              <div>包版本的锁文件，描述了生成的确切树，以便后续安装能够生成相同包版本的树，而不管依赖项如何更新</div>
            </AlertPro>,
            <AlertPro message='npm-shrinkwrap.json'>
              <div>该文件是通过运行 npm shrinkwrap 命令产生的，作用与 package-lock.json 相同</div>
              <div>如果两者都存在，npm-shrinkwrap.json 优先级更高</div>
              <div>详见: https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json</div>
            </AlertPro>,
            <AlertPro message='为什么需要锁文件'>
              <div>主要是用来精准控制安装指定版本的npm包</div>
              <div>在开发一个项目的时候，特别是多人协作时，可能会遇到这样的问题:</div>
              <div>A同事通过 npm install 安装了一些npm包</div>
              <div>过了一段日子，其中某个 npm 包更新了(可能是会破坏了原本一些功能的更新)</div>
              <div>B同事加入了项目，他也需要在自己的电脑上安装包，结果是，在A同事这边功能正常的，但到B同事这边却异常了</div>
              <div>导致这种情况发生的根本原因是在于: 同事间安装的 npm 包的版本不一致，功能也就不一致。</div>
              <div>可能会有人疑问，那我在 package.json 中精确写死某个版本的npm包不就行了吗？</div>
              <div>不！如果你要安装的这个 npm 包依赖了其他包，这些其他包的版本你也要控制好才能100%确定一致</div>
            </AlertPro>,
            <AlertPro message='两者区别'>
              <b>从npm处理机制来看</b>
              <div>在一个项目里，如果本身不存在这两个文件，那么在运行npm install时，会自动生成一个package-lock.json，或者在初始化一个项目npm
                init时，也会生成package-lock.json，安装信息会依据该文件进行，而不是单纯按照package.json，这两个文件的优先级都比package.json高
              </div>
              <div>如果项目两个文件都存在，那么安装的依赖是依据npm-shrinkwrap.json来的，而忽略package-lock.json</div>
              <div>运行命令npm
                shrinkwrap后，如果项目里不存在package-lock.json，那么会新建一个npm-shrinkwrap.json文件，如果存在package-lock.json，那么会把package-lock.json重命名为npm-shrinkwrap.json
              </div>

              <b>从文件更新来看</b>
              <div>npm-shrinkwrap.json 只会在运行 npm shrinkwrap 才会创建/更新</div>
              <div>package-lock.json 会在修改 pacakge.json 或者 node_modules 时就会自动产生或更新了。</div>

              <b>从发布包来看</b>
              <div>package-lock.json 不会在发布包中出现，就算出现了，也会遭到 npm 的无视。</div>
              <div>npm-shrinkwrap.json 可以在发布包中出现</div>
            </AlertPro>,
            <AlertPro message='大致结构'>
              <CodeView language='json'>
                {`
              {
                "name": "aaa",
                "requires": true,
                "lockfileVersion": 1,
                "dependencies": {
                  "moment": {
                    "version": "2.29.1",
                    "resolved": "http://npmjs.org/lodash-2.1.2.tgz",
                    "integrity": "sha512-hoyBycexxxxx"
                    "dev": true,
                    "requires": {
                      "lodash": "^0.3.0"
                    }
                  }
                }
              }
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
      ]}
    />
  </AnchorCard>,
]
