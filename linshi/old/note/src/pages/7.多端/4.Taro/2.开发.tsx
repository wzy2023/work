import { AlertPro, AnchorCard, Button, CodeView, ParamsTable, ReferenceLink, SpacePro, TabsPro } from '@/components'

export default () => (
  <TabsPro
    destroyInactiveTabPane={false}
    items={[
      {
        label: '配置',
        children: (
          <TabsPro
            destroyInactiveTabPane={false}
            items={[
              {
                label: '编译配置',
                children: (
                  <div>
                    <AlertPro>
                      <div>编译配置存放于项目根目录下的 config 目录中，包含三个文件</div>
                      <div>index.js 是通用配置</div>
                      <div>dev.js 是项目预览时的配置</div>
                      <div>prod.js 是项目打包时的配置</div>
                    </AlertPro>
                    <TabsPro
                      destroyInactiveTabPane={false}
                      items={[
                        {
                          label: '配置列表',
                          children: (
                            <ParamsTable
                              data={[
                                {
                                  label: 'sourceRoot',
                                  value: 'String',
                                  desc: '源码根目录',
                                  default: 'src',
                                },
                                {
                                  label: 'outputRoot',
                                  value: 'String',
                                  desc: '输出文件根目录',
                                  default: 'dist',
                                },
                                {},
                                {
                                  label: 'designWidth',
                                  value: 'Number | function',
                                  desc: '设计稿宽度，当传入函数时，参数是当前样式文件的绝对路径，\n开发者可以根据不同的文件路径返回对应的 designWidth',
                                  default: '750',
                                },
                                {},
                                {
                                  label: 'env',
                                  value: 'Object',
                                  desc: '用于设置环境变量，如 process.env.NODE_ENV',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        // 这样就能在代码中通过 process.env.NODE_ENV === 'development' 来判断环境
                                         module.exports = {
                                            env: {
                                              NODE_ENV: '"development"' // JSON.stringify('development')
                                            }
                                          }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'defineConstants',
                                  value: 'Object',
                                  desc: '用于配置一些全局变量供代码中进行使用',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView>
                                      {`
                                        export default {
                                          defineConstants: {
                                            API_HOST: '"https://api.example.com"' // JSON.stringify('https://api.example.com')
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {},
                                {
                                  label: 'alias',
                                  value: 'Object',
                                  desc: '路径别名',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        // 这样配置
                                        module.exports = {
                                          alias: {
                                            '@/components': path.resolve(__dirname, '..', 'src/components'),
                                            '@/utils': path.resolve(__dirname, '..', 'src/utils'),
                                            '@/package': path.resolve(__dirname, '..', 'package.json'),
                                            '@/project': path.resolve(__dirname, '..', 'project.config.json'),
                                          }
                                        }

                                        // 在代码中就可以这样使用了
                                        import A from '@/components/A'
                                        import Utils from '@/utils'
                                        import packageJson from '@/package'
                                        import projectConfig from '@/project'

                                        // 为了让编辑器不报错，并继续使用自动路径补全的功能
                                        // 需要在项目根目录下的 jsconfig.json 或者 tsconfig.json 中配置 paths 让编辑器认得我们的别名
                                        {
                                          "compilerOptions": {
                                            "baseUrl": ".",
                                            "paths": {
                                              "@/components/*": ["./src/components/*"],
                                              "@/utils/*": ["./src/utils/*"],
                                              "@/package": ["./package.json"],
                                              "@/project": ["./project.config.json"],
                                            }
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'copy',
                                  value: 'Object',
                                  desc: '用于把文件从源码目录直接拷贝到编译后的生产目录',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          copy: {
                                            // 用于指定需要拷贝的文件或者目录，每一项都必须包含 from 、to 配置，分别代表来源和需要拷贝到的目录
                                            // 同时可以设置 ignore 配置来指定需要忽略的文件， ignore 是指定的 glob 类型字符串，或者 glob 字符串数组
                                            patterns: [
                                              { from: 'src/components', to: 'dist/components', ignore: ['*.js'] },
                                              { from: 'src/utils', to: 'dist/utils' },
                                            ],
                                            // 拷贝配置，可以指定全局的 ignore
                                            options: {
                                              ignore: ['*.js', '*.css'],
                                            },
                                          },
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'cache',
                                  value: 'object',
                                  desc: '是否开启缓存，Taro 遵循 Webpack “构建安全比构建速度重要”的理念，默认不开启持久化缓存功能。\n但当开发者能处理好缓存策略时，可以开启缓存，这能大大提高二次编译速度',
                                  default: 'true',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        webpackConfig = {
                                          cache: {
                                            enable: false, // 是否开启缓存
                                            name: string, // 缓存的目录
                                            buildDependencies: {
                                              config: [path.join(appPath, 'config/index.js')]
                                            }
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'logger',
                                  value: 'object',
                                  desc: '配置 webpack 的日志输出',
                                  default: 'true',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        webpackConfig = {
                                          logger: {
                                            quiet: true, // 是否简化输出日志
                                            stats: false // 是否输出 Webpack Stats 信息
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {},
                                {
                                  label: 'framework',
                                  value: 'react | preact | nerv | vue | vue3',
                                  desc: '指定框架类型',
                                  default: 'react',
                                },
                                {
                                  label: 'compiler',
                                  value: 'webpack4 | webpack5 | object',
                                  desc: '指定 JS 编译器',
                                  default: 'webpack4',
                                },
                                {
                                  label: 'plugins',
                                  value: 'Object',
                                  desc: '配置 Taro 插件',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          plugins: [
                                            // 从本地绝对路径引入插件
                                            '/absulute/path/plugin/filename',

                                            // 引入 npm 安装的插件
                                            '@tarojs/plugin-mock',
                                            ['@tarojs/plugin-mock'],
                                            ['@tarojs/plugin-mock', {}],

                                            // 引入 npm 安装的插件，并传入插件参数
                                            ['@tarojs/plugin-mock', {
                                              mocks: {
                                                '/api/user/1': {
                                                  name: 'judy',
                                                  desc: 'Mental guy'
                                                }
                                              }
                                            }]
                                          ]
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'presets',
                                  value: 'Object',
                                  desc: '一个 preset 是一系列 Taro 插件的集合，配置语法同 plugins。',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          presets: [
                                            // 引入 npm 安装的插件集
                                            '@tarojs/preset-sth',
                                            // 引入 npm 安装的插件集，并传入插件参数
                                            ['@tarojs/plugin-sth', {
                                              arg0: 'xxx'
                                            }],
                                            // 从本地绝对路径引入插件集，同样如果需要传入参数也是如上
                                            '/absulute/path/preset/filename',
                                          ]
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {},
                                {
                                  label: 'jsMinimizer',
                                  value: 'terser | esbuild',
                                  desc: '配置 JS 压缩工具',
                                  default: 'terser',
                                },
                                {
                                  label: 'terser',
                                  value: 'Object',
                                  desc: '当 jsMinimizer 为 terser 时适用\n' + '配置 Terser 压缩，terser 配置只在生产模式下生效\n' + '如果你正在使用 watch 模式，又希望启用 terser，那需要设置 process.env.NODE_ENV 为 production',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          terser: {
                                            enable: true, // 是否开启 JS 代码压缩
                                            config: {
                                              // 配置项同 https://github.com/terser/terser#minify-options
                                            }
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'esbuild',
                                  value: 'Object',
                                  desc: '当 jsMinimizer 为 esbuild 时适用\n' + '配置 esbuild 压缩，esbuild 配置只在生产模式下生效\n' + '如果你正在使用 watch 模式，又希望启用 esbuild，那需要设置 process.env.NODE_ENV 为 production',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          esbuild: {
                                            minify: {
                                              enable: true,
                                              config: {
                                                // 配置项同 https://github.com/privatenumber/esbuild-loader#minifyplugin
                                                target: 'es5' // target 默认值为 es5
                                              }
                                            }
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {},
                                {
                                  label: 'cssMinimizer',
                                  value: 'csso | esbuild | parcelCss',
                                  desc: '配置 CSS 压缩工具',
                                  default: 'csso',
                                },
                                {
                                  label: 'csso',
                                  value: 'Object',
                                  desc: '当 cssMinimizer 为 csso 时适用\n' + '配置 csso 压缩，csso 配置只在生产模式下生效\n' + '如果你正在使用 watch 模式，又希望启用 csso，那需要设置 process.env.NODE_ENV 为 production',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          csso: {
                                            enable: true, // 是否开启 CSS 代码压缩
                                            config: {
                                              // 配置项同 https://cssnano.co/docs/what-are-optimisations/
                                            }
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {
                                  label: 'sass',
                                  value: 'Object',
                                  desc: '用于控制对 scss 代码的编译行为，默认使用 dart-sass',
                                  default: '{}',
                                  expandedRowRender: (
                                    <CodeView language='javascript'>
                                      {`
                                        module.exports = {
                                          sass: {
                                            resource: ['path/to/file.scss'], // 需要全局注入的 scss 文件的绝对路径。如果要引入多个文件，支持以数组形式传入，当存在 projectDirectory 配置时，才支持传入相对路径
                                            projectDirectory: '../../', // 项目根目录的绝对地址(若为小程序云开发模板，则应该是client目录)
                                            data: '$nav-height: 48px;' // 全局 scss 变量，若 data 与 resource 中设置了同样的变量，则 data 的优先级高于 resource
                                          }
                                        }
                                      `}
                                    </CodeView>
                                  ),
                                },
                                {},
                                {
                                  label: 'mini',
                                  value: 'Object',
                                  default: '{}',
                                  desc: (
                                    <SpacePro>
                                      <span>小程序专用配置</span>
                                      <ReferenceLink size='small' href='https://taro-docs.jd.com/docs/config-detail#mini' />
                                    </SpacePro>
                                  ),
                                },
                                {
                                  label: 'h5',
                                  value: 'Object',
                                  default: '{}',
                                  desc: (
                                    <SpacePro>
                                      <span>H5 专用配置</span>
                                      <ReferenceLink size='small' href='https://taro-docs.jd.com/docs/config-detail#h5' />
                                    </SpacePro>
                                  ),
                                },
                                {
                                  label: 'rn',
                                  value: 'Object',
                                  default: '{}',
                                  desc: (
                                    <SpacePro>
                                      <span>React Native 专用配置</span>
                                      <ReferenceLink size='small' href='https://taro-docs.jd.com/docs/config-detail#rn' />
                                    </SpacePro>
                                  ),
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          label: '配置示例',
                          children: (
                            <CodeView language='javascript' style={{ marginTop: 8 }}>
                              {`
                                        const config = {
                                        // 项目名称
                                        projectName: 'Awesome Next',
                                        // 项目创建日期
                                        date: '2020-6-2',
                                        // 设计稿尺寸
                                        designWidth: 750,
                                        // 设计稿尺寸换算规则
                                        deviceRatio: {
                                        640: 2.34 / 2,
                                        750: 1,
                                        828: 1.81 / 2
                                      },
                                        // 项目源码目录
                                        sourceRoot: 'src',
                                        // 项目产出目录
                                        outputRoot: 'dist',
                                        // Taro 插件配置
                                        plugins: [],
                                        // 全局变量设置
                                        defineConstants: {},
                                        // 文件 copy 配置
                                        copy: {
                                        patterns: [
                                        ],
                                        options: {
                                      }
                                      },
                                        // 框架，react，nerv，vue, vue3 等
                                        framework: 'react',
                                        // 小程序端专用配置
                                        mini: {
                                        postcss: {
                                        autoprefixer: {
                                        enable: true
                                      },
                                        // 小程序端样式引用本地资源内联配置
                                        desc: {
                                        enable: true,
                                        config: {
                                        limit: 10240
                                      }
                                      },
                                        cssModules: {
                                        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                                        config: {
                                        namingPattern: 'module', // 转换模式，取值为 global/module
                                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                                      }
                                      }
                                      },
                                        // 自定义 Webpack 配置
                                        webpackChain (chain, webpack) {}
                                      },
                                        // H5 端专用配置
                                        h5: {
                                        publicPath: '/',
                                        staticDirectory: 'static',
                                        postcss: {
                                        autoprefixer: {
                                        enable: true
                                      },
                                        cssModules: {
                                        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                                        config: {
                                        namingPattern: 'module', // 转换模式，取值为 global/module
                                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                                      }
                                      }
                                      },
                                        // 自定义 Webpack 配置
                                        webpackChain (chain, webpack) {},
                                        devServer: {}
                                      }
                                      };

                                        module.exports = function(merge) {
                                        return merge({}, config, require(process.env.NODE_ENV === 'development' ? './dev' : './prod'))
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: '原文档',
                          children: (
                            <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/config-detail' />
                          ),
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                label: '项目配置',
                children: (
                  <ParamsTable
                    columns={[
                      {
                        title: '端',
                        dataIndex: 'label',
                      },
                      {
                        title: '原配置名',
                        dataIndex: 'attr',
                      },
                      {
                        title: '新配置名',
                        dataIndex: 'value',
                      },
                      {
                        title: '链接',
                        dataIndex: 'desc',
                      },
                    ]}
                    data={[
                      {
                        label: '微信小程序',
                        attr: 'project.config.json',
                        value: 'project.config.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE'>配置详情</Button>
                        ),
                      },
                      {
                        label: '百度小程序',
                        attr: 'project.swan.json',
                        value: 'project.swan.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://smartprogram.baidu.com/docs/develop/devtools/editor_set'>配置详情</Button>
                        ),
                      },
                      {
                        label: '字节跳动小程序',
                        attr: 'project.config.json',
                        value: 'project.tt.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/framework/basic-reference/catalog-structure/#projectconfigjson-%E9%85%8D%E7%BD%AE%E4%BB%8B%E7%BB%8D'>配置详情</Button>
                        ),
                      },
                      {
                        label: 'QQ 小程序',
                        attr: 'project.config.json',
                        value: 'project.qq.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://q.qq.com/wiki/develop/miniprogram/frame/project-config.html'>配置详情</Button>
                        ),
                      },
                      {
                        label: '支付宝小程序',
                        attr: 'mini.project.json',
                        value: 'project.alipay.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://opendocs.alipay.com/mini/03dbc3'>配置详情</Button>
                        ),
                      },
                      {
                        label: '飞书小程序',
                        attr: 'project.config.json',
                        value: 'project.lark.json || project.tt.json',
                        desc: (
                          <Button type='link' target='_blank' href='https://open.feishu.cn/document/uYjL24iN/uEzMzUjLxMzM14SMzMTN/gadget-project-configuration?from=taro'>配置详情</Button>
                        ),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        ),
      },
      {
        label: 'API',
        children: (
          <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/apis/about/desc' />
        ),
      },
      {
        label: '入口组件',
        children: (
          <TabsPro
            items={[
              {
                label: '生命周期',
                children: (
                  <SpacePro direction='vertical'>
                    <AlertPro>
                      <div>每一个 Taro 应用都需要一个入口组件（React 组件）用来注册应用</div>
                      <div>入口文件默认是 src 目录下的 app.js</div>
                    </AlertPro>
                    <CodeView language='jsx'>
                      {`
                                        import React, {useEffect} from 'react'
                                        import {useDidShow, useDidHide} from '@tarojs/taro'

                                        import {Provider} from 'mobx-react'
                                        import store from './store'

                                        import './app.css'

                                        export default (props) => {
                                        // 可以使用 React Hooks
                                        useEffect(() => {})

                                        // 对应 onShow
                                        useDidShow(() => {})

                                        // 对应 onHide
                                        useDidHide(() => {})

                                        // props.children 是将要被渲染的页面
                                        return (
                                        <Provider store={store}>
                                      {props.children}
                                        </Provider>
                                        )
                                      }
                                        `}
                    </CodeView>
                    <ParamsTable
                      data={[
                        {
                          label: 'onLaunch(options: Options) | useLaunch()',
                          desc: '当小程序初始化完成时，会触发 onLaunch（全局只触发一次）\n' + 'options 或 useRouter()，可以访问到程序初始化参数',
                          expandedRowRender: (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        // 启动小程序的路径
                                        path: string;
                                        // 启动小程序的场景值
                                        scene: number;
                                        // 启动小程序的 query 参数
                                        query: object;
                                        // shareTicket，详见获取更多转发信息
                                        shareTicket: string;
                                        // 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
                                        referrerInfo: {
                                        // 来源小程序，或者公众号（微信中）
                                        appId: string;
                                        // 来源小程序传过来的数据，微信和百度小程序在 scene=1037 或 1038 时支持
                                        extraData: object;
                                        // 来源插件，当处于插件运行模式时可见
                                        sourceServiceId: string;
                                      };
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {},
                        {
                          label: 'componentDidShow(options: Options) | useDidShow()',
                          desc: '当小程序启动，或从后台进入前台显示，会触发 componentDidShow\n' + 'options 或 useRouter()，可以访问到程序初始化参数',
                          expandedRowRender: (
                            <CodeView language='typescript'>
                              {`
                                        enum entryType {
                                        user = 'user', // 表示通过home前后，切换或解锁屏幕等方式调起
                                        schema = 'schema', // 表示通过协议调起
                                        sys = 'sys', //其它
                                      }

                                        interface Options {
                                        // 展现的来源标识
                                        entryType: entryType;
                                        // 展现时的调起协议，仅当entryType值为 schema 时存在
                                        appURL: string;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'componentDidHide() | useDidHide()',
                          desc: '当小程序从前台进入后台，会触发 componentDidHide',
                        },
                        {},
                        {
                          label: 'onError(error) | useError(error)',
                          desc: '当小程序发生脚本错误，或者 api 调用失败时触发',
                        },
                        {
                          label: 'onPageNotFound(options: Options) | usePageNotFound(options: Options)',
                          desc: '当小程序要打开的页面不存在时触发',
                          expandedRowRender: (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        // 打开不存在页面的路径
                                        path: string;
                                        // 打开不存在页面的 query 参数
                                        query: object;
                                        // 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面
                                        isEntryPage: boolean;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                      ]}
                    />
                  </SpacePro>
                ),
              },
              {
                label: '全局配置',
                children: (
                  <SpacePro direction='vertical'>
                    <AlertPro>
                      <div>根目录下的 app.config.js 文件用来对小程序进行全局配置，配置项遵循微信小程序规范，并且对所有平台进行统一</div>
                      <br />
                      <div>app.config.js 不支持多端文件的形式，如 app.weapp.js 这样是不起作用的</div>
                      <div>多端差异化逻辑可以使用 process.env.TARO_ENV 变量作条件判断来实现</div>
                    </AlertPro>
                    <AnchorCard title='defineAppConfig'>
                      <AlertPro>
                        <div>可以使用编译时宏函数 defineAppConfig 包裹配置对象，以获得类型提示和自动补全</div>
                      </AlertPro>
                      <CodeView language='javascript'>
                        {`
                                        // app.config.js
                                        export default defineAppConfig({
                                        pages: ['pages/index/index'],
                                        window: {
                                        backgroundTextStyle: 'light',
                                        navigationBarBackgroundColor: '#fff',
                                        navigationBarTitleText: 'WeChat',
                                        navigationBarTextStyle: 'black'
                                      }
                                      })
                                        `}
                      </CodeView>
                    </AnchorCard>
                    <AnchorCard title='配置项列表'>
                      <TabsPro
                        items={[
                          {
                            label: '通用',
                            children: (
                              <ParamsTable
                                data={[
                                  {
                                    attr: 'pages',
                                    value: 'string[]',
                                    default: '[]',
                                    required: '是',
                                    desc: '页面路径列表',
                                    expandedRowRender: (
                                      <AlertPro>
                                        <div>用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径 + 文件名 信息</div>
                                        <div>文件名不需要写文件后缀，框架会自动去寻找对应位置的文件进行处理</div>
                                        <div>数组的第一项代表小程序的初始页面（首页）</div>
                                        <div>小程序中新增/减少页面，都需要对 pages 数组进行修改</div>
                                      </AlertPro>
                                    ),
                                  },
                                  {
                                    attr: 'window',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '全局的默认窗口表现',
                                    expandedRowRender: (
                                      <ParamsTable
                                        data={[
                                          {
                                            attr: 'navigationBarBackgroundColor',
                                            value: 'hexColor',
                                            default: '#000000',
                                            required: '否',
                                            desc: '导航栏背景颜色',
                                          },
                                          {
                                            attr: 'navigationBarTextStyle',
                                            value: 'white | black',
                                            default: 'white',
                                            required: '否',
                                            desc: '导航栏标题颜色',
                                          },
                                          {
                                            attr: 'navigationBarTitleText',
                                            value: 'string',
                                            default: '',
                                            required: '否',
                                            desc: '导航栏标题文字内容',
                                          },
                                          {
                                            attr: 'navigationStyle',
                                            value: 'default | custom(只保留右上角胶囊按钮)',
                                            default: 'default',
                                            required: '否',
                                            desc: '导航栏样式',
                                          },
                                          {},
                                          {
                                            attr: 'backgroundColor',
                                            value: 'hexColor',
                                            default: '#ffffff',
                                            required: '否',
                                            desc: '窗口的背景色',
                                          },
                                          {
                                            attr: 'backgroundTextStyle',
                                            value: 'dark | light',
                                            default: 'dark',
                                            required: '否',
                                            desc: '下拉 loading 的样式',
                                          },
                                          {
                                            attr: 'backgroundColorTop',
                                            value: 'hexColor',
                                            default: '#ffffff',
                                            required: '否',
                                            desc: '顶部窗口的背景色，仅 iOS 支持',
                                          },
                                          {
                                            attr: 'backgroundColorBottom',
                                            value: 'hexColor',
                                            default: '#ffffff',
                                            required: '否',
                                            desc: '底部窗口的背景色，仅 iOS 支持',
                                          },
                                          {},
                                          {
                                            attr: 'enablePullDownRefresh',
                                            value: 'boolean',
                                            default: 'false',
                                            required: '否',
                                            desc: '开启当前页面的下拉刷新',
                                          },
                                          {
                                            attr: 'onReachBottomDistance',
                                            value: 'number',
                                            default: '50',
                                            required: '否',
                                            desc: '页面上拉触底事件触发时距页面底部距离，单位为px',
                                          },
                                          {},
                                          {
                                            attr: 'pageOrientation',
                                            value: 'auto | landscape | portrait',
                                            default: 'auto',
                                            required: '否',
                                            desc: '设置屏幕旋转',
                                          },
                                        ]}
                                      />
                                    ),
                                  },
                                  {
                                    attr: 'tabBar',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '底部 tab 栏的表现',
                                    expandedRowRender: (
                                      <ParamsTable
                                        data={[
                                          {
                                            attr: 'color',
                                            value: 'hexColor',
                                            default: '#000000',
                                            required: '否',
                                            desc: 'tab 上的文字默认颜色',
                                          },
                                          {
                                            attr: 'selectedColor',
                                            value: 'hexColor',
                                            default: '#000000',
                                            required: '否',
                                            desc: 'tab 上的文字选中时的颜色',
                                          },
                                          {
                                            attr: 'backgroundColor',
                                            value: 'hexColor',
                                            default: '#ffffff',
                                            required: '否',
                                            desc: 'tab 的背景色',
                                          },
                                          {
                                            attr: 'borderStyle',
                                            value: 'black | white',
                                            default: 'black',
                                            required: '否',
                                            desc: 'tabbar 边框的颜色',
                                          },
                                          {
                                            attr: 'list',
                                            value: 'array',
                                            default: '[]',
                                            required: '否',
                                            desc: 'tab 的列表，最少 2 个，最多 5 个 tab',
                                            expandedRowRender: (
                                              <ParamsTable
                                                data={[
                                                  {
                                                    attr: 'pagePath',
                                                    value: 'string',
                                                    default: '',
                                                    required: '是',
                                                    desc: '页面路径，必须在 pages 中先定义',
                                                  },
                                                  {
                                                    attr: 'text',
                                                    value: 'string',
                                                    default: '',
                                                    required: '是',
                                                    desc: 'tab 上按钮文字',
                                                  },
                                                  {
                                                    attr: 'iconPath',
                                                    value: 'string',
                                                    default: '',
                                                    required: '否',
                                                    desc: '图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片，当 position 为 top 时，不显示 icon',
                                                  },
                                                  {
                                                    attr: 'selectedIconPath',
                                                    value: 'string',
                                                    default: '',
                                                    required: '否',
                                                    desc: '选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片，当 position 为 top 时，不显示 icon',
                                                  },
                                                ]}
                                              />
                                            ),
                                          },
                                          {
                                            attr: 'position',
                                            value: 'bottom | top',
                                            default: 'bottom',
                                            required: '否',
                                            desc: 'tabbar 的位置',
                                          },
                                          {
                                            attr: 'custom',
                                            value: 'boolean',
                                            default: 'false',
                                            required: '否',
                                            desc: '自定义 tabBar',
                                          },
                                        ]}
                                      />
                                    ),
                                  },
                                  {
                                    attr: 'subPackages',
                                    value: 'object[]',
                                    default: '[]',
                                    required: '否',
                                    desc: '分包配置，仅小程序时生效，H5 和 RN 会把 subPackages 合入 pages',
                                    expandedRowRender: (
                                      <SpacePro direction='vertical'>
                                        <CodeView language='json'>
                                          {`
                                            {
                                              'pages':[
                                                'pages/index',
                                                'pages/logs'
                                                ],
                                              'subpackages': [
                                                {
                                                  'root': 'packageA',
                                                  'pages': [
                                                    'pages/cat',
                                                    'pages/dog'
                                                  ]
                                                },
                                                {
                                                  'root': 'packageB',
                                                  'name': 'pack2',
                                                  'pages': [
                                                    'pages/apple',
                                                    'pages/banana'
                                                  ]
                                                }
                                              ]
                                            }
                                          `}
                                        </CodeView>
                                        <ParamsTable
                                          data={[
                                            {
                                              attr: 'root',
                                              value: 'string',
                                              default: '',
                                              required: '是',
                                              desc: '分包的根路径',
                                            },
                                            {
                                              attr: 'pages',
                                              value: 'string[]',
                                              default: '[]',
                                              required: '是',
                                              desc: '分包页面路径列表',
                                            },
                                            {
                                              attr: 'name',
                                              value: 'string',
                                              default: '',
                                              required: '否',
                                              desc: '分包名字，用于分包预下载，不填则默认为 root 的值',
                                            },
                                            {
                                              attr: 'independent',
                                              value: 'boolean',
                                              default: 'false',
                                              required: '否',
                                              desc: '是否为独立分包',
                                            },
                                          ]}
                                        />
                                      </SpacePro>
                                    ),
                                  },
                                ]}
                              />
                            ),
                          },
                          {
                            label: '小程序特有',
                            children: (
                              <ParamsTable
                                data={[
                                  {
                                    attr: 'networkTimeout',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '网络超时配置',
                                    expandedRowRender: (
                                      <ParamsTable
                                        data={[
                                          {
                                            attr: 'request',
                                            value: 'number',
                                            default: '60000',
                                            required: '否',
                                            desc: 'Taro.request 的超时时间，单位毫秒',
                                          },
                                          {
                                            attr: 'connectSocket',
                                            value: 'number',
                                            default: '60000',
                                            required: '否',
                                            desc: 'Taro.connectSocket 的超时时间，单位毫秒',
                                          },
                                          {
                                            attr: 'uploadFile',
                                            value: 'number',
                                            default: '60000',
                                            required: '否',
                                            desc: 'Taro.uploadFile 的超时时间，单位毫秒',
                                          },
                                          {
                                            attr: 'downloadFile',
                                            value: 'number',
                                            default: '60000',
                                            required: '否',
                                            desc: 'Taro.downloadFile 的超时时间，单位毫秒',
                                          },
                                        ]}
                                      />
                                    ),
                                  },
                                  {
                                    attr: 'debug',
                                    value: 'boolean',
                                    default: 'false',
                                    required: '否',
                                    desc: '是否开启 debug 模式',
                                  },
                                  {
                                    attr: 'permission',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '权限配置',
                                    expandedRowRender: (
                                      <CodeView>
                                        {`
                                      {
                                        'scope.userLocation': {
                                        'desc': '你的位置信息将用于小程序位置接口的效果展示'
                                      }
                                      }
                                        `}
                                      </CodeView>
                                    ),
                                  },
                                  {
                                    attr: 'preloadRule',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '分包预加载规则',
                                  },
                                  {
                                    attr: 'requiredBackgroundModes',
                                    value: 'string[]',
                                    default: '[]',
                                    required: '否',
                                    desc: '小程序需要设置的运行环境',
                                  },
                                  {
                                    attr: 'entryPagePath',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '小程序入口页面路径',
                                  },
                                  {
                                    attr: 'workers',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '设置 Worker 代码放置的目录',
                                  },
                                  {
                                    attr: 'navigateToMiniProgramAppIdList',
                                    value: 'string[]',
                                    default: '[]',
                                    required: '否',
                                    desc: '声明需要跳转的小程序 appId 列表',
                                  },
                                ]}
                              />
                            ),
                          },
                          {
                            label: '微信小程序特有',
                            children: (
                              <ParamsTable
                                data={[
                                  {
                                    attr: 'functionalPages',
                                    value: 'boolean',
                                    default: 'false',
                                    required: '否',
                                    desc: '是否开启插件功能页',
                                  },
                                  {
                                    attr: 'resizable',
                                    value: 'boolean',
                                    default: 'false',
                                    required: '否',
                                    desc: '是否开启可拖拽调整窗口大小',
                                  },
                                  {
                                    attr: 'sitemapLocation',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '指定 sitemap.json 的位置',
                                  },
                                  {
                                    attr: 'style',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '设置默认的页面表现',
                                  },
                                  {
                                    attr: 'darkmode',
                                    value: 'boolean',
                                    default: 'false',
                                    required: '否',
                                    desc: '是否开启暗黑模式',
                                  },
                                  {
                                    attr: 'themeLocation',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '指定 theme.json 的位置',
                                  },
                                  {
                                    attr: 'lazyCodeLoading',
                                    value: 'boolean',
                                    default: 'false',
                                    required: '否',
                                    desc: '是否开启懒加载代码',
                                  },
                                  {
                                    attr: 'plugins',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '插件配置',
                                    expandedRowRender: (
                                      <CodeView>
                                        {`
                                      {
                                        'plugins': {
                                        'myPlugin': {
                                        'version': '1.0.0',
                                        'provider': 'wx2b03c6e691cd7370'
                                      }
                                      }
                                      }
                                        `}
                                      </CodeView>
                                    ),
                                  },
                                  {
                                    attr: 'usingComponents',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '自定义组件配置',
                                    expandedRowRender: (
                                      <CodeView>
                                        {
                                          `{
                                        'usingComponents': {
                                        'component-tag-name': 'path/to/the/custom/component'
                                      }
                                      }`
                                        }
                                      </CodeView>
                                    ),
                                  },
                                  {
                                    attr: 'useExtendedLib',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '使用扩展库',
                                    expandedRowRender: (
                                      <CodeView>
                                        {
                                          `{
                                        'useExtendedLib': {
                                        'weui': true
                                      }
                                      }`
                                        }
                                      </CodeView>
                                    ),
                                  },
                                  {
                                    attr: 'entranceDeclare',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '微信消息用小程序打开',
                                    expandedRowRender: (
                                      <CodeView>
                                        {`
                                      {
                                        'entranceDeclare': {
                                        'pages': [
                                        'pages/index/index',
                                        'pages/logs/logs'
                                        ]
                                      }
                                      }
                                        `}
                                      </CodeView>
                                    ),
                                  },
                                  {
                                    attr: 'singlePage',
                                    value: 'object',
                                    default: '{}',
                                    required: '否',
                                    desc: '单页面配置',
                                    expandedRowRender: (
                                      <CodeView>
                                        {`
                                      {
                                        'singlePage': {
                                        'root': 'pages/index/index',
                                        'usingComponents': {
                                        'component-tag-name': 'path/to/the/custom/component'
                                      }
                                      }
                                      }
                                        `}
                                      </CodeView>
                                    ),
                                  },
                                ]}
                              />
                            ),
                          },
                          {
                            label: 'h5 特有',
                            children: (
                              <ParamsTable
                                data={[
                                  {
                                    attr: 'entryPagePath',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '入口页面路径',
                                  },
                                  {
                                    attr: 'appId',
                                    value: 'string',
                                    default: '',
                                    required: '否',
                                    desc: '渲染页面的容器 id',
                                  },
                                  {
                                    attr: 'animation',
                                    value: 'false | object',
                                    default: '{ "duration": 300, "delay": 50 }',
                                    required: '否',
                                    desc: '页面切换动画',
                                  },
                                ]}
                              />
                            ),
                          },
                        ]}
                      />
                    </AnchorCard>
                  </SpacePro>
                ),
              },
            ]}
          />
        ),
      },
      {
        label: '页面组件',
        children: (
          <TabsPro
            items={[
              {
                label: '生命周期',
                children: (
                  <SpacePro direction='vertical'>
                    <AlertPro>
                      <div>每一个 Taro 应用都应该至少包括一个页面组件</div>
                      <div>页面组件可以通过 Taro 路由进行跳转，也可以访问小程序页面的生命周期</div>
                    </AlertPro>
                    <CodeView language='jsx'>
                      {`
                                        import React, {useEffect} from 'react'
                                        import {View} from '@tarojs/components'
                                        import {useReady, useDidShow, useDidHide, usePullDownRefresh} from '@tarojs/taro'

                                        export default  () => {
                                        // 可以使用 React Hooks
                                        useEffect(() => {})

                                        // 对应 onReady
                                        useReady(() => {})

                                        // 对应 onShow
                                        useDidShow(() => {})

                                        // 对应 onHide
                                        useDidHide(() => {})

                                        // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
                                        usePullDownRefresh(() => {})

                                        return (
                                        <View className='index' />
                                        )
                                      }
                                        `}
                    </CodeView>
                    <ParamsTable
                      data={[
                        {
                          label: 'onLoad (options) | useLoad()',
                          desc: '页面加载时触发，一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数\n' + 'options 或 useRouter()，可以访问到程序初始化参数',
                        },
                        {
                          label: 'onUnload() | useUnload()',
                          desc: '页面卸载时触发，如 redirectTo 或 navigateBack 到其他页面时\n' + '一般情况下建议使用 React 的 componentWillUnmount 生命周期处理页面卸载时的逻辑\n' + '当某些特殊情况需要在页面的 onUnload 的同一个事件循环中实现逻辑时才使用它（如对小程序的生命周期执行顺序有强依赖关系时）',
                        },
                        {
                          label: 'onReady() | useReady()',
                          desc: '页面初次渲染完成时触发，一个页面只会调用一次，对应小程序的 onReady\n' + '从此生命周期开始可以使用 createCanvasContext 或 createSelectorQuery 等 API 访问小程序渲染层的 DOM 节点\n' + '只在页面组件才会触发 onReady 生命周期。子组件可以使用 Taro 内置的消息机制监听页面组件的 onReady() 生命周期',
                        },
                        {
                          label: 'componentDidShow() | useDidShow()',
                          desc: '页面显示/切入前台时触发，对应小程序的 onShow\n' + '只在页面组件才会触发 onShow 生命周期。子组件可以使用 Taro 内置的消息机制监听页面组件的 onShow() 生命周期',
                        },
                        {
                          label: 'componentDidHide() | useDidHide()',
                          desc: '页面隐藏/切入后台时触发，对应小程序的 onHide\n' + '只在页面组件才会触发 onHide 生命周期。子组件可以使用 Taro 内置的消息机制监听页面组件的 onHide() 生命周期',
                        },
                        {
                          label: 'onPullDownRefresh() | usePullDownRefresh()',
                          desc: '监听用户下拉页面的处理函数，需要在全局配置的 window 选项中或页面配置中设置 enablePullDownRefresh: true\n' + '可以通过 Taro.startPullDownRefresh 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致\n' + '当处理完数据刷新后，Taro.stopPullDownRefresh 可以停止当前页面的下拉刷新',
                        },
                        {
                          label: 'onReachBottom() | useReachBottom()',
                          desc: '页面上拉触底事件的处理函数，可以在全局配置的 window 选项中或页面配置中设置 onReachBottomDistance\n' + '在触发距离底部 onReachBottomDistance 距离时触发，单位为 px\n' + '在触发距离内滑动期间，本事件只会被触发一次\n' + '需要 enablePullDownRefresh: true 才能生效',
                        },
                        {
                          label: 'onPageScroll(options: Options)\nusePageScroll(options: Options)',
                          desc: '页面滚动事件的处理函数，scrollTop 为页面在垂直方向已滚动的距离（单位px）',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        scrollTop: number
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onAddToFavorites(options: Options): Return\nuseAddToFavorites(options: Options): Return',
                          desc: '用户点击右上角收藏时触发\n' + 'webviewUrl 为页面中包含web-view组件时，返回当前web-view的url\n' + '可以通过 return 设置自定义转发内容',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        webviewUrl: string;
                                      }

                                        interface Return {
                                        title?: string;
                                        imageUrl?: string;
                                        query?: string;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onShareAppMessage(option: Option): Return\nuseShareAppMessage(option: Option): Return',
                          desc: '用户点击右上角转发时触发\n' + 'from 值为 menu 时，是页面内转发按钮的转发\n' + 'from 值为 button 时，是页面内转发按钮的转发\n' + 'target 是触发这次转发事件的 button\n\n' + '只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮\n' + '需要在页面配置中开启 enableShareAppMessage: true\n\n' + '可以通过 return 设置自定义转发内容',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        from: 'menu' | 'button';
                                        target: any;
                                        webViewUrl: string;
                                      }

                                        interface Return {
                                        title?: string;
                                        imageUrl?: string;
                                        path?: string;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onShareTimeline(): Return\nuseShareTimeline(): Return',
                          desc: '用户点击右上角转发到朋友圈时触发\n' + '只有定义了此事件处理函数，同时监听了 onShareAppMessage，右上角菜单才会显示“转发到朋友圈”按钮\n' + '需要在页面配置中开启 enableShareTimeline: true\n\n' + '可以通过 return 设置自定义转发内容',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Return {
                                        title?: string;
                                        imageUrl?: string;
                                        query?: string;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onTabItemTap(options: Options)\nuseTabItemTap(options: Options)',
                          desc: '当前是 tab 页时，点击 tab 时触发',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        index: number;
                                        pagePath: string;
                                        text: string;
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onResize(options: Options)\nuseResize(options: Options)',
                          desc: '屏幕旋转时触发',
                          expandedRowRender: () => (
                            <CodeView language='typescript'>
                              {`
                                        interface Options {
                                        size: {
                                        windowWidth: number;
                                        windowHeight: number;
                                      }
                                      }
                                        `}
                            </CodeView>
                          ),
                        },
                        {
                          label: 'onSaveExitState() | useSaveExitState()',
                          desc: '每当小程序可能被销毁之前，页面回调函数 onSaveExitState 会被调用，可以进行退出状态的保存\n' + '只有微信小程序支持，基础库 2.7.4 开始支持',
                        },
                      ]}
                    />
                  </SpacePro>
                ),
              },
              {
                label: '页面配置',
                children: (
                  <SpacePro direction='vertical'>
                    <AlertPro>
                      <div>{`每一个小程序页面都可以使用 {pageName}.config.js 文件来对本页面的窗口表现进行配置`}</div>
                      <div>页面中配置项在当前页面会覆盖全局配置 app.config.json 的 window 中相同的配置项</div>
                      <br />
                      <div>该文件需要 export 一个默认对象，配置项遵循微信小程序规范，并且对所有平台进行统一</div>
                      <br />
                      <div>page.config.js 不支持多端文件的形式，如 index.weapp.js 这样是不起作用的</div>
                      <div>多端差异化逻辑可以使用 process.env.TARO_ENV 变量作条件判断来实现</div>
                    </AlertPro>
                    <AnchorCard title='definePageConfig'>
                      <AlertPro>
                        <div>Taro v3.4 支持在页面中使用 definePageConfig 定义页面配置，代替 page.config.js 文件， 还能获得类型提示和自动补全</div>
                        <div>只是需要注意，使用 definePageConfig 定义的页面配置对象不能使用变量</div>
                      </AlertPro>
                      <CodeView>
                        {`
                                        // 在配置文件中使用
                                        export default definePageConfig({
                                        navigationBarTitleText: '首页'
                                      })

                                        // 在页面文件中使用
                                        definePageConfig({
                                        navigationBarTitleText: '首页'
                                      })
                                        `}
                      </CodeView>
                    </AnchorCard>
                    <AnchorCard title='配置项列表'>
                      <ParamsTable
                        data={[
                          {
                            attr: 'navigationBarBackgroundColor',
                            value: 'hexColor',
                            default: '#000000',
                            desc: '导航栏背景颜色',
                          },
                          {
                            attr: 'navigationBarTextStyle',
                            value: 'black | white',
                            default: 'white',
                            desc: '导航栏标题颜色',
                          },
                          {
                            attr: 'navigationBarTitleText',
                            value: 'string',
                            default: '',
                            desc: '导航栏标题文字内容',
                          },
                          {
                            attr: 'navigationStyle',
                            value: 'default | custom(只保留右上角胶囊按钮)',
                            default: 'default',
                            desc: '导航栏样式',
                          },
                          {
                            attr: 'transparentTitle',
                            value: 'auto | always | none',
                            default: 'none',
                            desc: '导航栏自动透明',
                          },
                          {},
                          {
                            attr: 'backgroundColor',
                            value: 'hexColor',
                            default: '#ffffff',
                            desc: '窗口的背景色',
                          },
                          {
                            attr: 'backgroundTextStyle',
                            value: 'dark | light',
                            default: 'dark',
                            desc: '下拉 loading 的样式',
                          },
                          {
                            attr: 'backgroundColorTop',
                            value: 'hexColor',
                            default: '#ffffff',
                            desc: '顶部窗口的背景色，仅 iOS 支持',
                          },
                          {
                            attr: 'backgroundColorBottom',
                            value: 'hexColor',
                            default: '#ffffff',
                            desc: '底部窗口的背景色，仅 iOS 支持',
                          },
                          {},
                          {
                            attr: 'enablePullDownRefresh',
                            value: 'boolean',
                            default: 'false',
                            desc: '开启当前页面的下拉刷新',
                          },
                          {
                            attr: 'onReachBottomDistance',
                            value: 'number',
                            default: '50',
                            desc: '页面上拉触底事件触发时距页面底部距离，单位为 px',
                          },
                          {},
                          {
                            attr: 'disableScroll',
                            value: 'boolean',
                            default: 'false',
                            desc: '设置为 true 则页面整体不能上下滚动，只在页面配置中有效，无法在 app.json 中设置',
                          },
                          {
                            attr: 'disableSwipeBack',
                            value: 'boolean',
                            default: 'false',
                            desc: '禁用当前页面的右滑返回功能',
                          },
                          {
                            attr: 'pageOrientation',
                            value: 'auto | portrait | landscape',
                            default: 'portrait',
                            desc: '设置屏幕旋转方向',
                          },
                          {},
                          {
                            attr: 'usingComponents',
                            value: 'Object',
                            default: '',
                            desc: '自定义组件， 一般不需要配置，只有在需要与引用原生小程序组件的时候才需要配置',
                          },
                        ]}
                      />
                    </AnchorCard>
                  </SpacePro>
                ),
              },
            ]}
          />
        ),
      },
      {
        label: '路由',
        /**
         *
         */
        children: (
          <SpacePro direction='vertical'>
            <AnchorCard title='路由配置'>
              <AlertPro>
                <div>Taro 遵循微信小程序的路由规范。只需要修改全局配置的 pages 属性，配置为 Taro 应用中每个页面的路径即可</div>
              </AlertPro>
            </AnchorCard>
            <AnchorCard title='路由跳转'>
              <AlertPro>
                <div>可以通过 Taro 提供的 API 来跳转到目的页面，路由 API 的详细用法请查看 API 文档的 导航 章节</div>
              </AlertPro>
              <CodeView>
                {`
                                        // 跳转到目的页面，打开新页面
                                        Taro.navigateTo({
                                        url: '/pages/page/path/name'
                                      })

                                        // 跳转到目的页面，在当前页面打开
                                        Taro.redirectTo({
                                        url: '/pages/page/path/name'
                                      })
                                        `}
              </CodeView>
              <AlertPro message='路由传参'>
                <CodeView>
                  {`
                                        // 传入参数 id=2&type=test
                                        Taro.navigateTo({
                                        url: '/pages/page/path/name?id=2&type=test'
                                      })
                                        `}
                </CodeView>
              </AlertPro>
              <AlertPro message='获取路由参数'>
                <CodeView>
                  {`
                                        const {router: {params}} = Taro.getCurrentInstance()
                                        `}
                </CodeView>
              </AlertPro>
            </AnchorCard>
            <AnchorCard title='使用路由库'>
              <AlertPro>
                <div>如果你觉得 Taro 3.6 的路由 API 不够用，可以使用第三方路由库</div>
              </AlertPro>
              <CodeView language='jsx'>
                {`
                                        import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

                                        export default class Index extends Component {
                                        render() {
                                        return (
                                        <BrowserRouter>
                                        <View className="drawer-box">
                                        <View className="box-item">
                                        <Link to="/pages/router/index/view1?a=1&b=2">view1</Link>
                                        </View>
                                        <View className="box-item">
                                        <Link to="/pages/router/index/view2#a=3&b=4">view2</Link>
                                        </View>
                                        <View className="box-item">
                                        <Link to="/pages/router/index/2?a=1&b=2#a=3&b=4">view3</Link>
                                        </View>
                                        </View>

                                        <Routes>
                                        <Route path="/pages/browser-router/index" element={<Home />}></Route>
                                        <Route path="/pages/router/index/view1" element={<View1 />}></Route>
                                        <Route path="/pages/router/index/view2" element={<View2 />}></Route>
                                        <Route path="/pages/router/index/:id" element={<View3 />}></Route>
                                        </Routes>
                                        </BrowserRouter>
                                        );
                                      }
                                      }
                                        `}
              </CodeView>
              <AlertPro>
                <div>{`注意：由于 <Link> 组件编译时会生成 <a> 标签，因此需要引入 @tarojs/plugin-html 插件以支持在 Taro 中使用 html 标签开发组件`}</div>
                <CodeView language='javascript'>
                  {`
                                      {
                                        'plugins': ['@tarojs/plugin-html']
                                      }
                                        `}
                </CodeView>
                <div>并且，当 Taro DOM 序列化数据的 nn 字段为 HTML 标签时，会映射为对应的小程序组件名称。由于无法提前预知动态标签</div>
                <div>因此需要应用显式告知可能会使用到的动态标签。例如在应用中塞入一个无样式的标签名即可</div>
                <CodeView language='jsx'>
                  {`
                                        <View>
                                        <a></a>
                                        </View>
                                        `}
                </CodeView>
              </AlertPro>
            </AnchorCard>
          </SpacePro>
        ),
      },
    ]}
  />
)
