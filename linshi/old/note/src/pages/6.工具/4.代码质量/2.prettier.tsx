import { PageHeader, AlertPro, CodeView, ParamsTable, AnchorCard, TabsPro } from '@/components'

export default () => [
  <PageHeader title='Prettier' subTitle='是一个代码格式化工具，支持多种语言' />,
  <AnchorCard title='配置'>

  </AnchorCard>,
  <AnchorCard title='忽略文件'>
    <TabsPro
      items={[
        {
          label: '文件级别',
          children: [
            <span> 在项目根目录下添加 .prettierignore 文件</span>,
          ],
        },
        {
          label: '代码级别',
          children: [
            <CodeView language='html'>
              {`
            <div>
              <!-- prettier-ignore -->
              <span ugly  format='' />
            </div>
          `}
            </CodeView>,
          ],
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='使用方法'>
    <TabsPro
      items={[
        {
          label: '与IDE配合使用', children: [
            <ParamsTable
              data={[
                { desc: 'npm i -g prettier' },
                { desc: 'WebStorm 插件-安装 Prettier' },
                { desc: 'WebStorm 设置-语言和框架-Javascript-Prettier，进行相应设置 (可设置为[触发格式化]或[保存时]自动进行prettier格式化)' },
              ]}
            />,
          ],
        },
        {
          label: '与NPM配合使用', children: [
            <ParamsTable
              data={[
                { desc: 'npm i -g prettier' },
                { desc: 'npx prettier --write src/index.js' },
              ]}
            />,
          ],
        },
        {
          label: '与EsLint配合使用', children: [
            <TabsPro
              items={[
                {
                  label: '安装',
                  children: [
                    <span>npm i -D prettier eslint-plugin-prettier eslint-config-prettier</span>,
                  ],
                },
                {
                  label: '配置',
                  children: [
                    <CodeView language='json'>
                      {`
                {
                  "extends": ["prettier"], // 禁用重复和有冲突的规则
                  "plugins": ["prettier"],
                  "rules": {
                    "prettier/prettier": "error" // 添加prettier作为ESLint的规则配置
                  }
                }
             `}
                    </CodeView>,
                  ],
                },
              ]}
            />,
          ],
        },
        {
          label: '与Git配合使用', children: [
            <AlertPro>
              在 Git commit 前自动进行 prettier 格式化，有四种方法，这里只介绍 lint-staged
            </AlertPro>,
            <TabsPro
              items={[
                {
                  label: '安装',
                  children: [
                    <span>npm i -D husky lint-staged</span>,
                  ],
                },
                {
                  label: '配置',
                  children: [
                    <AlertPro>
                      package.json里添加
                    </AlertPro>,
                    <CodeView language='json'>
                      {`
                 {
                  "husky": {
                     "hooks": {
                       "pre-commit": "lint-staged"
                     }
                   },
                  "lint-staged": {
                    "*.{js,css,json,md}": [
                      "prettier --write",
                      "git add"
                    ]
                  }
                 }
             `}
                    </CodeView>,
                  ],
                },
              ]}
            />,
          ],
        },
      ]}
    />
  </AnchorCard>,
]
