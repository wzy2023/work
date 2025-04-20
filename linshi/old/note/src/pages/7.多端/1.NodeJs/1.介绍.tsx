import {AlertPro, AnchorCard, CodeView, ImagePro} from "@/components";

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      <div>node.js是基于v8引擎的js运行环境</div>
      <br/>
      <div>普通js (浏览器语言):</div>
      <div>ECMAScript (基础语法)</div>
      <div>dom (使用js来操作dom元素)</div>
      <div>bom (浏览器的内置对象)</div>
      <br/>
      <div>node.js (服务器语言):</div>
      <div>ECMAScript (基础语法)</div>
      <div>node.js的作者在原有js的基础上扩展了一些服务器相关的功能</div>
      <br/>
      <div>运行js文件 - cmd - `node 文件名.js`</div>
      <div>注意：每次修改后都要重新运行这个文件才能生效</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='模块化'>
    <AlertPro message='模块的定义'>
      <div>就是将一个大的结构，由多个小的部分来组成，每个部分叫做一个模块</div>
      <div>可以把单独的功能写成一个模块，也就是一个单独的js文件</div>
    </AlertPro>
    <AlertPro message='模块的导出'>
      <div>每个模块中都有一个`module.exports`对象，可以将属性/方法定义到这个对象上，</div>
      <div>这样该模块被别的模块加载后，别的模块就能使用这些属性/方法，</div>
      <div>可以理解为模块代码最后自动`return module.exports`</div>
    </AlertPro>
    <AlertPro message='模块的导入'>
      <div>`var obj = require('模块名')`可以将别的模块导入，并将返回的`module.exports`接收</div>
      <div>导入核心或第三方模块仅需要写模块名</div>
    </AlertPro>
    <AlertPro message='导入核心模块的规则'>
      <div>直接去node.exe文件中找到对应的核心模块并加载</div>
    </AlertPro>
    <AlertPro message='导入第三方模块的规则'>
      <ImagePro src='/7.多端/require.png' />
    </AlertPro>
    <AlertPro message='导入自定义模块的规则'>
      <div>导入自定义模块需要写成`./模块名.js` 或 `../模块名.js`的形式</div>
      <div>或者`./目录名`，这样会引入该目录下的`index.js`</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='核心模块'>
    <AnchorCard title='fs' subTitle='处理文件目录'>
      <CodeView language='javascript'>
        {`
          let fs = require('fs')

          // 2.读入文件，方法不返回读到的字节集，只能在回调函数内使用
          fs.readFile('文件路径', (err, data) => {
          err.message // 错误信息
          data // 文件数据(16进制)，可用data.toString()转为字符串
          })

          // 3.写入文件，写入方式是将内容直接覆盖原文件
          fs.writeFile('文件路径', data, (err) => {
          // err为true则写入失败
          })

          // 4.读入目录下的所有文件路径
          fs.readdir('目录路径', (err, files) => {
          files // 路径数组
          })

          // 5.获取指定文件详情
          fs.stat('文件路径', (err, stats) => {
          stats.isFile()      // 是否为文件
          stats.isDirectory() // 是否为目录
          stats.size          // 文件大小
          stats.birthtime     // 创建时间
          stats.mtime         // 修改时间
          })
        `}
      </CodeView>
    </AnchorCard>
    <AnchorCard title='http' subTitle='启动HTTP服务'>
      <CodeView language='javascript'>
        {`
          // 1.引入http模块
          let http = require('http')

          // 2.创建http服务
          let server = http.createServer()

          // 3.设置http连接事件
          server.on('request', (req, res) => {
          req.url // 请求地址
          req.method // 请求方式

          // 获取post数据
          let str = ''
          req.on('data', (chunck) => { // 接收到post数据
          str += chunck
          })
          req.on('end', () => { // 接收post数据完毕
          console.log(str)
          })

          // 设置响应头的两种方式
          // (1) 单条多次设置
          res.setHeader('content-type', 'text/htmlcharset=utf-8')
          res.setHeader('set-cookie', ['mycookie1=value1', 'mycookie2=value2'])
          // (2) 多条同时设置(该方法一次请求只能调用一次)
          res.whireHead(状态码, {
          'set-cookie': ['mycookie1=value1', 'mycookie2=value2']
          })
          // 获取响应头
          req.headers

          // 写入响应区
          res.write(str)
          // 返回响应
          res.end([str])
          })

          // 4.启动http服务
          server.listen([port], [ip], [() => {
          console.log('启动成功') // 启动成功的回调函数，启动失败报错
          }])

          // 1.2.3.4简略写法
          let server = require('http').createServer((req, res) => {
          console.log('有请求连接') // 设置http连接事件
          }).listen([port], [ip], [() => {
              console.log('启动成功') // 启动成功的回调函数，启动失败报错
          }])
        `}
      </CodeView>
    </AnchorCard>
    <AnchorCard title='url' subTitle='请求地址转为对象'>
      <CodeView language='javascript'>
        {`
          // 1.引入url模块
          let url = require('url')

          // 2.将请求地址转为对象形式
          let obj = url.parse('请求地址', true)
        `}
      </CodeView>
    </AnchorCard>
  </AnchorCard>,

  <AnchorCard title='第三方模块'>
    <AnchorCard title='json-server' subTitle='搭建服务器,json作为数据源'>
      <AlertPro message='使用方法'>
        <div>安装</div>
        <div>cmd - npm install json-server -g</div>
        <br/>
        <div>准备</div>
        <div>创建一个数据文件：db.json</div>
        <br/>
        <div>开启服务器</div>
        <div>cmd - json-server --watch db.json [--port 3000]</div>
        <br/>
        <div>查所有：get - http://localhost:3000/属性名</div>
        <div>查指定id：get - http://localhost:3000/属性名/id</div>
        <div>模糊查找：get - http://localhost:3000/属性名?字段名_like=关键字</div>
        <div>{'增：post - http://localhost:3000/属性名 -> 数据'}</div>
        <div>删：delete - http://localhost:3000/属性名/id</div>
        <div>{'改：patch - http://localhost:3000/属性名/id -> 数据'}</div>
      </AlertPro>
    </AnchorCard>
  </AnchorCard>
]
