import { AlertPro, AnchorCard, CodeView, String } from '@/components'

export default () => [
  <AnchorCard title='变量命名规范'>
    <AlertPro>
      <String>js 的变量名严格区分大小写，可使用‘字母/_/$/数字’，变量名建议使用驼峰命名法</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='声明变量'>
    <CodeView language='javascript'>
      {`
        // 声明变量
        var a;

        // 声明多个变量
        var a , b , c;

        // 声明变量并赋值
        var a = 1;

        // 声明多个变量并赋值
        var a = 1 , b = 1 , c = 1;
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='变量的特性'>
    <AlertPro>
      <div>js可给同一变量赋值不同的数据类型，变量的类型由值的类型决定</div>
      <div>js中变量名和变量值存在内存中的两个区域，变量名中存储的是变量值的内存地址</div>
      <div>如果数据是基本数据类型，变量值中存储的是该数据</div>
      <div>如果数据是复杂数据类型，变量值中存储的是该数据的内存地址</div>
    </AlertPro>
  </AnchorCard>,
]
