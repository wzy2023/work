import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      <div>Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 /
        RN 等应用
      </div>
      <div>当前 Taro 已进入 3.x 时代，相较于 Taro 1/2 编译时架构，Taro 3 采用了重运行时的架构，让开发者可以获得完整的 React / Vue 等框架的开发体验</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='安装'>
    <AlertPro>
      <div>{`Taro 项目基于 node，请确保已具备较新的 node 环境(>=12.0.0)`}</div>
    </AlertPro>
    <CodeView language='bash'>
      {`
        # 使用 yarn 安装 CLI
        yarn global add @tarojs/cli

        # 创建
        taro init myApp

        # 也可以直接 npx 执行
        npx @tarojs/cli init myApp
      `}
    </CodeView>
    <AlertPro>
      <div>值得一提的是，如果安装过程出现sass相关的安装错误，请在安装 `mirror-config-china` 后重试</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='运行'>
    <AlertPro>
      <div>使用 Taro 的 build 命令可以把代码编译成不同端的代码，然后在对应的开发工具中查看效果</div>
      <div>编译分为 dev 和 build 模式</div>
      <div>dev 模式（增加 --watch 参数）将会监听文件修改</div>
      <div>build 模式（去掉 --watch 参数）将不会监听文件修改，并会对代码进行压缩打包</div>
      <div>dev 模式生成的文件较大，设置环境变量 NODE_ENV 为 production 可以开启压缩，方便预览，但编译速度会下降</div>
    </AlertPro>
    <CodeView language='bash'>
      {`
        # 启动微信小程序
        yarn dev:weapp
        yarn build:weapp

        # 启动百度小程序
        yarn dev:swan
        yarn build:swan

        # 启动并开启压缩
        NODE_ENV=production taro build --type weapp --watch # Bash
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='目录'>
    <CodeView language='bash'>
      {`
        ├── dist                        编译结果目录
        |
        ├── config                      编译配置目录
        |   ├── index.js                默认配置
        |   ├── dev.js                  开发环境配置
        |   └── prod.js                 生产环境配置
        |
        ├── src                         源码目录
        |   ├── pages                   页面文件目录
        |   |   └── index               index 页面目录
        |   |       ├── index.js        index 页面逻辑
        |   |       ├── index.css       index 页面样式
        |   |       └── index.config.js index 页面配置
        |   |
        |   ├── app.js                  项目入口文件
        |   ├── app.css                 项目总通用样式
        |   └── app.config.js           项目入口配置
        |
        ├── project.config.json         微信小程序项目配置 project.config.json
        ├── project.tt.json             字节跳动小程序项目配置 project.tt.json
        ├── project.swan.json           百度小程序项目配置 project.swan.json
        ├── project.qq.json             QQ 小程序项目配置 project.qq.json
        |
        ├── babel.config.js             Babel 配置
        ├── tsconfig.json               TypeScript 配置
        ├── .eslintrc                   ESLint 配置
        |
        └── package.json
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='命令'>
    <CodeView language='bash'>
      {`
        # 帮助
        taro --help

        # 环境及依赖检测
        taro info

        # Doctor
        taro doctor

        # 创建新页面
        taro generate page <pageName>

        # 配置
        taro config set <key> <value>

        # 初始化项目
        taro init <project-name>

        # 编译
        taro build --type <weapp | swan | alipay | tt | h5 | rn | qq> [--watch]

        # 编译并上传并预览
        taro build --type <weapp | swan | alipay | tt | h5 | rn | qq> --upload --preview [--watch] [--esnext] [--ui]
      `}
    </CodeView>
  </AnchorCard>,
]
