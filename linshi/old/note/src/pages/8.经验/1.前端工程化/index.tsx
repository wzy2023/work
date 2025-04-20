import { AlertPro, SpacePro } from '@/components'

export default () => {
  return (
    <SpacePro direction='vertical'>
      <AlertPro message='前端本地跨域的几种方式'>
        <div>浏览器插件代理与webpack配置代理服务，各前端框架一般也可以通过配置的方式进行跨域，略</div>
      </AlertPro>
      <AlertPro message='版本号 (v1.1.1)'>
        <div>第1位: 架构升级或架构重大调整</div>
        <div>第2位: 新功能上线或者模块大的调整</div>
        <div>第3位: bug修复上线</div>
      </AlertPro>
      <AlertPro message='Travis CI'>
        <div>持续集成服务，它监控 Github 上面的项目，只要有新的代码，就会自动抓取。</div>
        <div>然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器</div>
        <div>持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更</div>
        <div>而不是在开发周期结束时，一下子合并一大块代码</div>
      </AlertPro>
      <AlertPro message='代码的层级'>
        <div>可以在最基础的组件上，根据自己的业务来封装一层常用的功能</div>
        <div>比如 antd 的 input 组件，可以在它的基础上封装默认的 place，默认的最大输入长度等</div>
      </AlertPro>
      <AlertPro message='组件和工具方法的收敛'>
        <div>components、utils、hooks 之类的目录，在目录下应该有个 index 文件</div>
        <div>除了导出当前目录下的所有文件，也可以代理导出别的模块</div>
        <div>例如：在 components/index.tsx 中，增加 export * from 'antd'</div>
        <div>{`这样页面上使用组件时，可以统一从 import { Button } from '@/components' 里取`}</div>
      </AlertPro>
      <AlertPro message='尽量导出具名的'>
        <div>导出具名的比较好，尽量少导出 default，这样外部可以 export * from 'xxx'</div>
      </AlertPro>
      <AlertPro message='前端和后端打包方式的区别'>
        <div>前端项目会将第三方包也编译并打进产物</div>
        <div>nodeJs 项目则不会，需要安装后以 require 的方式引入第三方包</div>
      </AlertPro>
      <AlertPro message='dev 和 build 的区别'>
        <div>dev 时使用本地子包，可以是引入源码的方式，而 build 不能使用这种方式引入</div>
        <div>因为 build 时不会对第三方包做编译处理，需要使用第三方包打包后的代码</div>
      </AlertPro>
      <AlertPro message='支持多种引入方式'>
        <div>一个模块在开发时被import引入，但打包后可能被require引入</div>
        <div>所以自己写的模块最好能同时支持两种模块化的引入方式</div>
      </AlertPro>
      <AlertPro message='第三方模块需要打包吗'>
        <div>自己写的模块，一般只打包自身代码就可以了，第三方模块的代码一般不需要打包进来</div>
      </AlertPro>
    </SpacePro>
  )
}
