import { AlertPro, AnchorCard, CodeView, ParamsTable, TabsPro } from '@/components'

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      由 JavaScript 引擎自动提供的对象，这些对象在任何 JavaScript 环境中都是可用的，无需用户显式创建或引入
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='Json 对象' subTitle='JSON 对象的所有属性和方法都是静态的，只能直接引用'>
    <ParamsTable
      data={[
        { label: 'JSON.parse(str)', desc: '将json格式的字符串转换为数组或对象' },
        { label: 'JSON.stringify(arr, null,  "   ")', desc: '将数组或对象转换为json格式的字符串' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Math 数值对象' subTitle='Math 对象的所有属性和方法都是静态的，只能直接引用'>
    <ParamsTable
      data={[
        { label: 'Math.PI', desc: 'PI' },
        { label: 'Math.max(a,b)', desc: '两数返回较大的' },
        { label: 'Math.min(a,b)', desc: '两数返回较小的' },
        { label: 'Math.random()', desc: '返回0-1之间的随机数' },
        {},
        { label: 'Math.ceil(a)', desc: '向上取整' },
        { label: 'Math.floor(a)', desc: '向下取整' },
        { label: 'Math.round(a)', desc: '四舍五入取整' },
        {},
        { label: 'Math.abs()', desc: '取绝对值' },
        { label: 'Math.pow(num,power)', desc: '返回num的power次幂' },
        { label: 'Math.sqrt(num)', desc: '返回num的开平方' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Symbol 对象' subTitle='Symbol 对象的所有属性和方法都是静态的，只能直接引用'>
    <ParamsTable
      data={[
        { label: 'Symbol.for(key)', desc: '根据给定的键返回一个共享的 Symbol，如果没有该 Symbol 会新建一个' },
        { label: 'Symbol.keyFor(sym)', desc: '返回一个已登记的 Symbol 的键' },
        { label: 'Symbol.hasInstance', desc: '判断一个对象是否是某个构造器的实例' },
        { label: 'Symbol.isConcatSpreadable', desc: '布尔值，表示对象是否可以展开' },
        { label: 'Symbol.iterator', desc: '返回对象的默认迭代器' },
        { label: 'Symbol.match', desc: '指示一个对象是否可以用作字符串的匹配函数' },
        { label: 'Symbol.replace', desc: '指示一个对象是否可以用作字符串的替换函数' },
        { label: 'Symbol.search', desc: '指示一个对象是否可以用作字符串的查找函数' },
        { label: 'Symbol.split', desc: '指示一个对象是否可以用作字符串的分割函数' },
        { label: 'Symbol.toPrimitive', desc: '指示一个对象转换为原始值时调用的函数' },
        { label: 'Symbol.toStringTag', desc: '用于给对象的默认字符串描述添加标签' },
        { label: 'Symbol.unscopables', desc: '对象自身拥有的属性名称，其属性名将不会出现在 `with` 语句中' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='RegExp 正则对象'>
    <AlertPro message='匹配模式常用的有两种形式'>
      <div>`g` - 代表全局匹配，匹配出所有满足条件的结果，否则只匹配一个</div>
      <div>`i` - 代表忽略大小写，匹配时，会自动忽略字符串的大小写</div>
    </AlertPro>
    <ParamsTable
      data={[
        { label: 'var reg = /正则表达式/匹配模式', desc: '字面量正则对象(常用)' },
        { label: 'var reg = new RegExp(/正则表达式/匹配模式)', desc: '内置构造函数定义正则对象' },
        { label: 'reg.test(str)', desc: '判断str中是否具有满足reg的子串' },
        { label: 'reg.exec(str)', desc: '获取str字符串中满足reg的子串，一次获取一个结果' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Date 时间对象'>
    <CodeView language='javascript'>
      {`
         // 创建当前时间对象
         var date = new Date()
         // 创建指定时间的对象
         var date = new Date("2016/09/06 00:00:00")
         var date = new Date(1498099000356)
         var date = new Date(2015, 8, 6) // 月份从0开始
      `}
    </CodeView>
    <ParamsTable
      data={[
        { label: 'Date.now()', desc: '取累计毫秒数(从1970/1/1 00:00:00开始)' },
        {},
        { label: 'date.getTime()', desc: '取累计毫秒数(从1970/1/1 00:00:00开始)' },
        { label: 'date.valueOf()', desc: '取累计毫秒数(从1970/1/1 00:00:00开始)' },
        {},
        { label: 'date.toString()', desc: '时间对象转换成字符串' },
        { label: 'date.getFullYear()', desc: '取年份' },
        { label: 'date.getMonth()', desc: '取月份(从0开始)' },
        { label: 'date.getDay()', desc: '取周几(0为周日)' },
        { label: 'date.getDate()', desc: '取几号' },
        { label: 'date.getHours()', desc: '取小时' },
        { label: 'date.getMinutes()', desc: '取分钟' },
        { label: 'date.getSeconds()', desc: '取秒' },
        { label: 'date.getMilliSeconds()', desc: '取毫秒' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Ajax 对象'>
    <AlertPro message='ajax = Asynchronous + Javascript + And + XML' />
    <ParamsTable
      data={[
        { label: 'var ajax = new XMLHttpRequest()', desc: '创建Ajax对象' },
        {},
        { label: 'ajax.open(method, url, [aycs])', desc: '初始化ajax对象' },
        { label: 'ajax.setRequestHeader(key, value)', desc: '设置请求头' },
        { label: 'ajax.onload', desc: '设置响应成功的事件tip-当readyState状态码为4且http响应状态码为200时触发此事件' },
        { label: 'ajax.send([content])', desc: '发送，(如果是post请求该参数写发送的数据)' },
        {},
        { label: 'ajax.status', desc: 'http响应状态码' },
        { label: 'ajax.statusText', desc: 'http响应状态文本' },
        { label: 'ajax.responseText', desc: '服务端返回的文本' },
        { label: 'ajax.responseXML', desc: '服务端返回的XML' },
        { label: 'ajax.getAllResponseHeaders()', desc: '获取全部响应头信息' },
        { label: 'ajax.getResponseHeader( "key ")', desc: '获取指定响应头信息' },
        { label: 'ajax.onreadyStatechange', desc: '当readyState状态码发生改变时触发此事件tip-在send()前调用' },
      ]}
    />
    <AlertPro message='Ajax发送post数据'>
      <div>需要设置如下协议头 (写在open()后面，send()前面)</div>
      <CodeView language='javascript'>
        {`ajax.setRequestHeader( "Content-type ",  "application/x-www-form-urlencoded ")`}
      </CodeView>
    </AlertPro>
    <AlertPro message='浏览器缓存'>
      <div>在ie浏览器，ajax向同一url发送多次get请求，就会产生缓存，获取不到新数据</div>
      <div>(1) 在url后面加一串时间戳或随机数，就能解决缓存问题</div>
      <div>(2) 或者服务端在响应时，设置不允许浏览器缓存的响应头 `header("Cache-Control: no-cache")`</div>
    </AlertPro>
    <AlertPro message='跨域的三种方式'>
      <div>
        Ajax请求的url地址，如果不是同源 (协议/域名/端口完全相同才算同源)，就会由于同源策略，禁止跨域请求数据，这时可以用以下三种方式跨域获取数据
      </div>
      <TabsPro
        items={[
          {
            label: '跨域资源共享机制 (CORS)',
            children: [
              <div>请求返回的响应中，添加该响应头，这样浏览器的ajax就能跨域得到数据</div>,
              <div>Access-Control-Allow-Origin: http://指定域名 // *为允许所有域名</div>,
            ],
          },
          {
            label: 'jsonp',
            children: [
              <div>主要利用了script标签的src属性可以跨域获取内容并执行js代码的特性，</div>,
              <div>优点是兼容性更好，但不安全，且只能get请求，实际和ajax无关</div>,
              <div>①
                js创建一个script标签，然后将要请求的地址写在src属性，将这个元素插入head后，浏览器就会向src的地址发起请求</div>,
              <div>② 后端根据请求内容生成数据，然后把数据用某个函数名包起来，响应到浏览器</div>,
              <div>③ 浏览器收到响应后，就会把收到的内容作为js代码执行，这样会调用那个函数名</div>,
              <div>④ 所以需要在js端提前写好一个函数，函数名就是将数据包起来的函数名</div>,
            ],
          },
          {
            label: '同域代理',
            children: [
              <div>js向同源后端发送要请求的地址，后端收到后向该地址发起请求，然后将获取的数据返回给js</div>,
            ],
          },
        ]}
      />
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='Array 数组对象'>
    <CodeView language='javascript'>
      {`
         // 数组对象的创建有两种方式
         (1)
         var arr = []                // 字面量方式
         (2)
         var arr = new Array(3)     // 构造函数方式，创建有3个成员的数组
         var arr = new Array(1, 2) // 构造函数方式，创建 [1,2] 的数组

         // 获取数组的成员数，也可以通过修改本属性来改变数组的成员数
         arr.length

         // 获取数组的成员值，如果下标不存在，获取的值是undefined
         arr[下标]

         // 修改数组的成员值
         arr[下标] = 值

         // 增加数组成员
         // 被修改的下标不存在，就会新增该下标并赋值，(该下标与之前最大下标之间的值会是empty)
         arr[新下标] = 值
      `}
    </CodeView>
    <ParamsTable
      data={[
        { label: 'Array.isArray(arr)', desc: '检测是否为数组，返回布尔值' },
        {
          label: 'Array.from(arrayLike, mapFn, thisArg)',
          desc: '从类数组或可迭代对象创建一个新的数组实例，可选映射函数和执行上下文',
        },
        { label: 'Array.of(...elements)', desc: '创建一个包含所有传入参数的新数组实例' },
        { label: 'Array.prototype', desc: '表示Array构造函数的原型，用于为所有Array实例添加方法和属性' },
        {},
        { label: 'arr.length', desc: '返回或设置数组的成员数量' },
        { label: 'arr.shift()', desc: '删除数组第一个成员，返回该成员，原数组改变' },
        { label: 'arr.unshift(...elements)', desc: '添加成员到最前，返回新数组长度，原数组改变' },
        { label: 'arr.push(...elements)', desc: '添加成员到最后，返回新数组长度，原数组改变' },
        { label: 'arr.pop()', desc: '删除数组最后的成员，返回该成员，原数组改变' },
        {},
        { label: 'arr.fill(value, start=0, end=this.length)', desc: '用指定值填充数组，从start到end，返回修改后的数组' },
        { label: 'arr.reverse()', desc: '翻转数组，返回被翻转的数组，原数组改变' },
        { label: 'arr.toString()', desc: '将数组转换为字符串，用,连接' },
        { label: 'arr.join("-")', desc: '将数组转换为字符串，用参数连接' },
        { label: 'arr.concat(...arrays)', desc: '合并多个数组，返回新数组，原数组不变' },
        {},
        {
          label: 'arr.splice(start, deleteCount, ...items)',
          desc: '删除或替换数组的成员，并插入新成员，返回被删除的成员，原数组改变',
        },
        { label: 'arr.slice(start, end)', desc: '返回一个新数组，包含从start到end（不包括end）的浅拷贝，原数组不变' },
        {},
        { label: 'arr.sort(compareFunction)', desc: '根据提供的比较函数排序数组，返回排序后的数组，原数组改变' },
        { label: 'arr.flat(depth=1)', desc: '按照指定深度递归展平数组，返回一个新数组' },
        { label: 'arr.flatMap(callback)', desc: '先对数组的每个成员执行一次映射函数，然后将结果展平，返回一个新数组' },
        { label: 'arr.at(index)', desc: '返回给定索引的成员，允许正负索引' },
        {
          label: 'arr.copyWithin(target, start=0, end=this.length)',
          desc: '浅复制数组的一部分到同一数组中的另一个位置，返回修改后的数组',
        },
        {},
        { label: 'arr.includes(value, fromIndex=0)', desc: '判断数组是否包含指定值，返回布尔值' },
        { label: 'arr.indexOf(value, fromIndex=0)', desc: '从前往后查找指定成员，返回索引，找不到返回-1' },
        { label: 'arr.lastIndexOf(value, fromIndex=arr.length-1)', desc: '从后往前查找指定成员，返回索引，找不到返回-1' },
        {},
        { label: 'arr.forEach(callback)', desc: '遍历数组，执行提供的函数，对每个元素执行一次，返回undefined' },
        { label: 'arr.map(callback)', desc: '遍历数组，执行提供的函数，返回每次函数调用的结果组成的新数组' },
        { label: 'arr.filter(callback)', desc: '遍历数组，返回执行函数返回true的成员组成的新数组' },
        { label: 'arr.find(callback)', desc: '遍历数组，返回第一个使函数返回true的成员，找不到返回undefined' },
        { label: 'arr.findIndex(callback)', desc: '遍历数组，返回第一个使函数返回true的成员的索引，找不到返回-1' },
        { label: 'arr.some(callback)', desc: '遍历数组，有成员使函数返回true时停止并返回true，否则返回false' },
        { label: 'arr.every(callback)', desc: '遍历数组，所有成员使函数返回true时才返回true，否则返回false' },
        {},
        { label: 'arr.reduce(callback, initialValue)', desc: '遍历数组(正序)，累积数组成员的值，返回一个最终的累积值' },
        {
          label: 'arr.reduceRight(callback, initialValue)',
          desc: '遍历数组(倒序)，累积数组成员的值，返回一个最终的累积值',
        },
        {},
        { label: 'arr.entries()', desc: '返回一个新的数组迭代器对象，该对象包含数组每个索引的键值对' },
        { label: 'arr.keys()', desc: '返回一个新的数组迭代器对象，该对象包含数组每个索引的键' },
        { label: 'arr.values()', desc: '返回一个新的数组迭代器对象，该对象包含数组每个索引的值' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Function 函数对象'>
    <AlertPro message='函数的定义及特点'>
      <div>(1) 函数就是可以重复执行的代码段，由(参数、代码、返回值)组成</div>
      <div>(2) 函数加载的时候只加载函数名，不加载函数体，也就是函数不调用不执行</div>
      <div>(3) js中函数也是一种值，值的内容是代码段，后面加括号就能执行</div>
      <div>(4) 可以将函数理解为一种特殊的对象，既可以作为可执行代码块，又可以像普通对象一样被操作</div>
    </AlertPro>
    <AlertPro message='函数的三种声明方式'>
      <CodeView language='javascript'>
        {`
           // (1) 关键字声明
           function fn() {
             ...
           }

           // (2) 表达式声明，给变量赋值匿名函数
           var fn = function() {
             ...
           }

           // (3) new一个函数对象
           var fn = new Function("")
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='函数的参数'>
      <div>(1) 形参：形式上参与运算的参数</div>
      <div>(2) 实参：实际上函数执行时代入的值</div>
      <div>(3) 实参 多于 形参时，多余的实参不使用</div>
      <div>(4) 实参 少于 形参时，看代码逻辑是否会报错</div>
      <div>(5) 形参个数，函数名.length</div>
      <div>(6) 所有实参对象，`arguments`，该对象只能在函数中使用</div>
      <CodeView language='javascript'>
        {`
          function fn() {
            console.log(arguments)
          }
          fn(1, 2, 3, 4, 5) // {0:1, 1:2, 2:3, 3:4, 4:5}
        `}
      </CodeView>
      <div>(7) 多余实参数组，实参多余形参时，可以用...语法获取形参外的实参</div>
      <CodeView language='javascript'>
        {`
          function fn(a, b, ...rest) {
            console.log(rest)
          }
          fn(1, 2, 3, 4, 5) // [3,4,5]
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='函数的返回值'>
      <div>(1) 函数可以定义也可以不定义返回值，具体看功能是否需要</div>
      <div>(2) 函数的返回值可以是任意数据类型</div>
    </AlertPro>
    <AlertPro message='函数名'>
      <CodeView language='javascript'>
        {`
            // 整段函数代码就是一个值，有名函数的话，函数名就是它的变量名
            function fn() {
              ...
            }

            // 如果没有函数名，它就是匿名函数，也是一个值
            function() {
              ...
            }

            // 因为函数是一个值，所以可以把它赋给另一个变量
            var fn = function() {
              ...
            }
            var fn = function a() { // 这里相当于没有a，过后打印a不存在
              ...
            }

            // 执行函数就是在函数值的后面加()
            // 1.有名函数可以用 函数名() 的方式
            fn()
            // 2.匿名函数可以用 把函数体用()括起来，后面再加() 的方式
            (function() {
            ...
            })()
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='回调函数'>
      <CodeView language='javascript'>
        {`
          // 因为函数是一个值，所以可以把它当作函数的参数使用
          function fn() {
            alert(1);
          }

          function ff(a) {
            a();
          }

          ff(fn);
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='函数闭包'>
      <div>因为函数是一个值，所以可以把它当作函数的返回值来使用</div>
      <br />
      <div>有时候，我们需要函数外部访问函数内部的变量，这时候就可以通过闭包来实现</div>
      <div>在函数内部再定义一个函数，执行后把它返回出来，外部用一个变量接收它，然后执行那个变量</div>
      <div>这样通过这个变量就能访问到函数内部的变量了，本质上，闭包就是将函数内部和外部连接起来的一座桥梁</div>
      <br />
      <div>闭包还有一个作用就是让外部函数不会销毁始终保存在内存中，因为内部函数依赖于外部函数，</div>
      <div>内部函数又被赋值给一个全局变量，这会使外部函数一直在内存中不会在调用结束后销毁，里面的变量也不会销毁</div>
      <br />
      <div>闭包的使用场景</div>
      <div>1.如果要外部访问一个函数里的变量，可以给这个函数里返回个内部函数</div>
      <div>2.如果要让一个函数里的变量不被销毁，可以给这个函数里返回个内部函数</div>
      <div>3.如果要让变量不被销毁，可以把它写到一个函数里，并给这个函数返回个内部函数</div>
      <br />
      <div>弊端</div>
      <div>外部函数每次运行都会产生一个闭包，而这个闭包又会使整个函数不会被销毁，内存消耗很大。</div>
    </AlertPro>
    <AlertPro message='递归函数'>
      <div>函数内部代码自己调用自己</div>
      <div>函数递归必须要有一个跳出条件，否则会陷入死循环</div>
    </AlertPro>
  </AnchorCard>,
]
