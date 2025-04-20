import { AlertPro, AnchorCard, PageHeader, ParamsTable, CodeView, ReferenceLink } from '@/components'

export default () => [
  <PageHeader title='Cac' subTitle='是创建 cli命令行工具 的库'>
    <CodeView>
      {`
        // 示例用法
        const cac = require('cac')
        const cli = cac('vite')

        // 定义了 dev 命令
        cli
        .command('dev <port> [host]', '启动') // 两个命令参数
        .alias('development') // 别名
        .option('--foo', 'foo') // 选项
        .example('vite dev 3000') // 该命令的示例用法 将展示在 --help 里
        .action((port, host, options) => { // 该命令的执行函数
          console.log(port, host, options)
        })

        // 定义了 build 命令
        cli
        .command('build [outDir]', '打包')
        .action((outDir, options) => { // 该命令的执行函数
          console.log(port, host, options)
        })

        // 定义版本号
        cli.version('1.0.0')

        // 定义帮助
        cli.help()

        // 上面都是定义，下面这行是根据用户的输入，匹配执行命令
        cli.parse()
      `}
    </CodeView>
  </PageHeader>,
  <AnchorCard title='创建 CLI 实例' subTitle='cac(name?)'>
    <AlertPro>
      <div>name 参数可以指定用于在帮助和版本消息中显示的程序名</div>
      <CodeView language='javascript'>
        {`
          const cac = require('cac')
          const cli = cac('vite')
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='定义命令' subTitle='cli.command(name, description, config?)'>
    <AlertPro message='name'>
      <div>{'name 字符串里用 <> 和 [] 定义的是命令参数，会依次传给 action 函数'}</div>
      <div>支持在字符串里写 [...rest] 语法，会将用户后续的输入，组合为数组</div>
      <CodeView language='javascript'>
        {`
          cli.command('dev <port> [host]', "启动本地服务", { allowUnknownOptions: true, ignoreOptionDefaultValue: false })

          // 支持用户输入不定数量的参数，例如
          cli.command('dev [port] [...rest]')
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='description'>
      <div>命令的描述，将展示在 --help 文本里</div>
    </AlertPro>
    <AlertPro message='config'>
      <ParamsTable
        data={[
          {
            label: 'allowUnknownOptions: boolean',
            desc: '是否允许未定义的选项\n也可以使用 command.allowUnknownOptions()',
          },
          {
            label: 'ignoreOptionDefaultValue: boolean',
            desc: '忽略选项默认值，默认值将仅在帮助中显示\n也可以使用 command.ignoreOptionDefaultValue()',
          },
        ]}
      />
    </AlertPro>
    <AlertPro message='默认命令'>
      <div>没有命令被匹配到时执行</div>
      <CodeView>
        {`
          cli.command('', "cli 工具")
          cli.command('[root] [port]', "cli 工具")
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='给命令添加选项' subTitle='command.option(name, description, config?)'>
    <AlertPro message='name'>
      <div>{'name 字符串里用 <> 和 [] 定义的是参数，会合为一个对象后传给 action 函数'}</div>
      <CodeView language='javascript'>
        {`
          command.option('-p,--port <port>', "端口", { default: 3000 })

          command.option('-h,--host [port]', "host", { default: 'locahost' })

          // 注意：没有指定 command 时，选项将被添加在默认命令上
          cli.option('-h,--host [port]', "host", { default: 'locahost' })
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='description'>
      <div>选项的描述，将展示在 --help 文本里</div>
    </AlertPro>
    <AlertPro message='config'>
      <ParamsTable
        data={[
          { label: 'default: any', desc: '默认值' },
          { label: 'type: any', desc: '类型自动转换' },
        ]}
      />
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='给命令添加执行函数' subTitle='command.action(callback)'>
    <AlertPro>
      <div>会将命令参数及选项参数，传递给执行函数</div>
      <div>命令参数，依次传入执行函数</div>
      <div>选项参数，组合为对象，作为执行函数的最后一个参数传递</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        command.action((params1, params2, ..., options) => {
          console.log(params1, params2, options)
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='给命令添加别名' subTitle='command.alias(name)'>
    <AlertPro>
      <div>此处的 name 不能包含再参数</div>
      <div>如下，定义了默认命令，为其增加了别名 dev，则使用 vite 或 vite dev 都可以执行该命令</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        cli.command('[root]', "启动").alias("dev")
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='给命令添加示例用法' subTitle='command.example(example)'>
    <AlertPro>
      <div>添加一个将显示在帮助消息中的示例</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        command.example('npm run serve')
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='定义版本' subTitle="command.version(version, customFlags = '-v, --version')">
    <AlertPro>
      <div>定义版本号，当命令行输入 -v 或 --version 时，输出版本号</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        cli.version('1.0.0')
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='定义帮助' subTitle='command.help(callback)'>
    <AlertPro>
      <div>定义帮助信息，当命令行输入-h或--help时，输出帮助信息</div>
      <div>可使用函数对显示帮助文本进行处理后，再输出</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        cli.help(helpData => {
          // 对 helpData 进行处理
          // ...
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='解析' subTitle='cli.parse(process.argv?)'>
    <AlertPro>
      <div>将用户输入的命令，与定义的命令匹配，并执行相应函数</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='其他'>
    <AlertPro message='两个方法'>
      <CodeView language='javascript'>
        {`
          // 输出版本信息
          cli.outputVersion()

          // 输出帮助信息
          cli.outputHelp()
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='定义参数'>
      <div>在命令名称中使用方括号时，尖括号表示必需的命令参数，而方括号表示可选参数</div>
      <div>在选项名称中使用括号时，尖括号表示需要字符串/数字值，而方括号表示该值也可以是 true</div>
    </AlertPro>
  </AnchorCard>,
  <ReferenceLink href='https://github.com/cacjs/cac#install' />,
]
