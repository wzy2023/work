import { AnchorCard, ParamsTable, CodeView } from '@/components'

export default () => [
  <AnchorCard title='功能'>
    <ParamsTable
      data={[
        { desc: '分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等）' },
        { desc: '将其转换和打包为合适的格式供浏览器使用' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='使用方式'>
    <CodeView language='bash'>
      {`
       // ① 全局安装
        npm i webpack -g
        npm i webpack-cli -g
        webpack -v

        // ② 全局卸载
        npm uni webpack webpack-cli -g

        // ③ 基础打包
        cmd - webpack 入口文件
     `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='config'>
    <CodeView language='javascript'>
      {`
        module.exports = {
          entry: './src/main.js',
          output: {
            path: path.resolve(__dirname, 'dist'), //当前打包目录的dist目录下
            filename: 'bundle.js'
          }
        }
     `}
    </CodeView>
  </AnchorCard>,
]
