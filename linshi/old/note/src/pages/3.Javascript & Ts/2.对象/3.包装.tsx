import { AlertPro, AnchorCard, CodeView, ParamsTable } from '@/components'

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      <div>js中三种基本类型的值——字符串、数值、布尔值，</div>
      <div>在一定条件下，会自动转为String、Number、Boolean对象，这就是“包装对象”。</div>
      <div>例如：var str ="111"</div>
      <div>str是一个string类型的变量，但它可以使用str.length的属性</div>
      <div>这是因为在调用这个属性时，js引擎自动将它转换成了String对象，</div>
      <div>在这个对象上调用length属性，调用完后，这个临时对象就被销毁了</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='String'>
    <CodeView language='javascript'>
      {`
         // 字符串的两种定义方式
         // (1) 这种是简单数据类型中的String类型，本身是没有属性和方法的
         // 不过也可以调用，因为JS引擎会自动转换为下面那种类型
         var str ="aaa"

         // (2) 这种是Object类型，可调用属性和方法。
         var str = new String("bbb")
      `}
    </CodeView>
    <ParamsTable
      data={[
        { label: 'str.length', desc: '获取字符串长度' },
        { label: 'str[0]', desc: '获取指定位置的字符' },
        {},
        { label: 'str.charAt(位置)', desc: '获取指定位置的字符' },
        { label: 'str.charCodeAt(位置)', desc: '获取指定位置字符的Unicode编码' },
        { label: 'str.indexOf(字符)', desc: '获取指定字符的位置(从前往后)' },
        { label: 'str.lastIndexOf(字符)', desc: '获取指定字符的位置(从后往前)' },
        {},
        { label: 'str.slice(2)', desc: '从指定位置截取到最后' },
        { label: 'str.slice(2,8)', desc: '从指定位置截取6位(8-2)' },
        { label: 'str.slice(-2)', desc: '从最后截取2位' },
        { label: 'str.substr(2)', desc: '从指定位置截取到最后' },
        { label: 'str.substr(2,6)', desc: '从指定位置截取6位' },
        { label: 'str.substr(-2)', desc: '从最后截取2位' },
        {},
        { label: 'str.split(""逐字分割', desc: '"-"指定分隔符)`' },
        { label: 'str.repeat()', desc: '重复字符串(es6)' },
        { label: 'str.concat(str,...)', desc: '字符串拼接' },
        {},
        { label: 'str.toLowerCase()', desc: '字符串全部转换为小写' },
        { label: 'str.toUpperCase()', desc: '字符串全部转换为大写' },
        { label: 'str.trim()', desc: '去除字符串前后的空格' },
        {},
        { label: 'str.match(reg)', desc: '正则方式匹配字符串(/g模式下返回数组)' },
        { label: 'str.search(reg)', desc: '正则方式匹配字符串并返回第一个匹配位置' },
        { label: 'str.replace(reg,"th")', desc: '正则方式替换子字符串' },
        {},
        { label: 'str.startsWith("s")', desc: '是否以指定字符串开头(es6)' },
        { label: 'str.endsWith("s")', desc: '是否以指定字符串结尾(es6)' },
        { label: 'str.includes("s")', desc: '是否存在指定字符串' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Number'>
    <ParamsTable
      data={[
        { label: 'num.toExponential(fractionDigits)', desc: '以指数表示法返回数值的字符串形式' },
        { label: 'num.toFixed(digits)', desc: '返回指定小数位数的字符串形式' },
        { label: 'num.toPrecision(precision)', desc: '返回指定精度的字符串形式' },
        { label: 'num.toString([radix])', desc: '返回指定基数（进制）的字符串形式' },
        { label: 'num.valueOf()', desc: '返回 Number 对象的原始数值' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Boolean'>
    <ParamsTable
      data={[
        { label: 'bool.toString()', desc: '返回布尔值的字符串形式' },
        { label: 'bool.valueOf()', desc: '返回 Boolean 对象的原始布尔值' },
      ]}
    />
  </AnchorCard>,
]
