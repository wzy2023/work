import { AnchorCard, ParamsTable, CodeView, AlertPro } from '@/components'

export default () => [
  <AnchorCard title='常用插件'>
    <ParamsTable
      data={[
        { label: 'rollup-plugin-typescript2', desc: '处理typescript' },
        { label: '@rollup/plugin-node-resolve', desc: '将第三方包也打包进产物' },
        { label: '@rollup/plugin-commonjs', desc: '将 commonjs 模块转为 es6' },
        { label: '@rollup/plugin-json', desc: '处理 json 文件' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='常用配置' subTitle='项目根目录创建 rollup.config.js 文件'>
    <CodeView language='javascript'>
      {`
        import typescript from 'rollup-plugin-typescript2'
        import resolve from '@rollup/plugin-node-resolve'
        import commonjs from '@rollup/plugin-commonjs'
        import json from '@rollup/plugin-json'

        export default [
          {
            input: './src/index.ts',
            output: {
              dir: 'dist',
              format: 'cjs',
              entryFileNames: '[name].cjs.js',
            },
            plugins: [resolve(), json(), commonjs(), typescript()],
          },
          {
            input: './src/index.ts',
            output: {
              dir: 'dist',
              format: 'esm',
              entryFileNames: '[name].esm.js',
            },
            plugins: [resolve(), json(), commonjs(), typescript()],
          },
        ]
     `}
    </CodeView>
  </AnchorCard>,
]
