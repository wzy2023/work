import { AlertPro, AnchorCard, CodeView, ParamsTable, TabsPro } from '@/components'

export default () => [
  <AnchorCard title='注释'>
    <AlertPro>
      <div>/**/ 这样的注释会显示在编译后的 css 中</div>
      <div>// 这样的注释不会显示在编译后的 css 中</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='变量'>
    <CodeView language='less'>
      {`
       // 定义变量
        @color: #d8505c;
        @width: 100px;
        @com: jd;

        // 定义数组
        @arr: 100px,200px,300px,400px;

        // 选择器名使用变量
        .@{com}_header {
          width: @width; // 属性值使用变量
          height: extract(@arr, 3); // 属性值使用数组
        }

        div {
          width: 100% * @width; // 变量可以进行运算
          color: red + green;
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='mixin'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '样式混入',
          children: [
            <CodeView language='less'>
              {`
            // 会编译到css
            .w {
              width: 100px;
            }
            .c {
              color: red;
            }
            .wc {
              .w();
              .c();
            }
        `}
            </CodeView>,
          ],
        },
        {
          label: '函数混入',
          children: [
            <CodeView language='less'>
              {`
            // 不会编译到css
            .w() {
              width: 100px;
            }
            .c(@color:red, @font-size:14px) { // 函数混入可以传参，参数可以有默认值
              color: @color;
              font-size: @font-size;
            }
            .wc {
              .w();
              .c(); // 有默认值的函数调用可以不传参数
              .c(blue, 16px); // 也可以传参数
            }
        `}
            </CodeView>,
          ],
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='嵌套'>
    <CodeView language='less'>
      {`
        .header {
          width: 100px;

          .nav {
            color: red;

            &:hover { // &用于与上级元素连接
              background: blue;
            }
          }
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='内置函数'>
    <ParamsTable
      data={[
        { label: 'length(@arr)', desc: '数组_取成员数' },
        { label: 'extract(@arr, 3)', desc: '数组_取指定成员' },
        { label: 'ceil(@num)', desc: '数值_向上取整' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='导入'>
    <AlertPro>
      用于拆分模块(变量、mixin、头部、主体、...)
    </AlertPro>
    <CodeView language='less'>
      {`
        @import "./var";
        @import "./mixin";
        @import "./header";
        @import "./banner";
        @import "./nav";
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='浏览器直接使用less'>
    <AlertPro>
      <div>注意：不能直接打开该html，必须以http服务打开，因为less.js获取less代码是以请求的方式</div>
      <div>使用less.js的时候，这句代码可以监控当less文件发生改变时，自动在网页上载入新样式</div>
    </AlertPro>
    <CodeView language='html'>
      {`
          <link rel='stylesheet' type='text/less' href='index.less'>
          <script src='less.js'></script>
          <script> less.watch() </script>
        `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='示例：递归遍历数组'>
    <CodeView language='less'>
      {`
        @widths: 100px, 200px, 300px;

        .fn (@index) when (@index <= length(@widths)) {

          @media (min-width: extract(@widths, @index)) {
            html {
              font-size: extract(@widths, @index);
            }
          }

          .fn(@index+1);
        }

        .fn(1);
      `}
    </CodeView>
  </AnchorCard>,
]
