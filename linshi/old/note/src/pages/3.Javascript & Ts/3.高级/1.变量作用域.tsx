import { AlertPro, CodeView, PageHeader, TabsPro, AnchorCard } from '@/components'

export default () => [
  <PageHeader
    title='变量的作用域'
    subTitle='根据变量起作用的范围可以分为全局变量和局部变量'
  />,
  <TabsPro
    items={[
      {
        label: '全局变量',
        children: [
          <AlertPro>
            <div>可以在js代码的任意位置使用，关闭网页时才会销毁</div>
            <div>(1) 函数外部定义的变量是全局变量</div>
            <div>(2) 函数内部没有用var定义的变量也是全局变量</div>
          </AlertPro>,
        ],
      },
      {
        label: '局部变量',
        children: [
          <AlertPro>
            <div>只能在该函数内使用，函数执行完销毁</div>
            <div>(1) 函数内部用var定义的变量是局部变量</div>
          </AlertPro>,
        ],
      },
    ]}
  />,
  <CodeView language='javascript' style={{ marginTop: 5 }}>
    {`
     // a是全局变量
      var a = 1;

      function fn () {
        // a是局部变量，b和c是全局变量
        var a = b = c = 1;

        // a是局部变量，b和c是全局变量
        var a = 1 ; b = 1 ; c = 1;

        // a和b和c都是局部变量
        var a = 1 , b = 1 , c = 1;
      }

      if (true) {
        var a = 1; // a是全局变量
        let b = 1; // b是局部变量
        const c = 1; // c是局部变量
      }
    `}
  </CodeView>,
]
