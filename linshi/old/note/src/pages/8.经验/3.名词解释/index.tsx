import { AlertPro, AnchorCard } from '@/components'

export default () => [
  <AnchorCard title='混合开发和前后端分离'>
    <AlertPro>
      <div>混合开发 - 服务器端渲染</div>
      <div>前后端分离 - 后端提供接口，前端开发界面效果</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='库和框架'>
    <AlertPro>
      <div>库 - 提供大量API，需要自己调用这些API简化开发</div>
      <div>框架 - 提供了一些基础服务，一般不需要自己调用，会自动完成一些基本功能</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='XSS 攻击'>
    <AlertPro>
      <div>比如页面上有发表评论的功能，用户输入的评论内容会被保存到数据库，别的用户打开页面会显示评论列表</div>
      <div>如果黑客输入一段js代码，代码功能是：获取cookie，向指定ip发送</div>
      <div>这段js作为评论内容提交到了数据库，当别人请求这个页面时，会被下载到浏览器</div>
      <div>浏览器下载后就会执行到这段js，cookies会被盗走</div>
      <div>(简单来说就是：想办法让访问别人家网站的人执行我们盗取cookie的js代码)</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='CSRF 攻击'>
    <AlertPro>
      <div>第三方网页，js代码向指定服务器发起请求，例如转账请求</div>
      <div>如果正好有用户刚访问过银行，银行网站的cookie还有效时，这次请求就会成功</div>
      <div>(简单来说就是：访问我们网站的人都会发起转账请求)</div>
    </AlertPro>
  </AnchorCard>,
]
