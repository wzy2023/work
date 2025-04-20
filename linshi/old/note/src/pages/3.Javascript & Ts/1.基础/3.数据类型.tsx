import { AlertPro, TabsPro, AnchorCard, CodeView, ParamsTable, String, ImagePro } from '@/components'

export default () => [
  <TabsPro
    items={[
      {
        label: 'String',
        children: (
          <AnchorCard title='字符串类型'>
            <AlertPro message='字符串就是一段文本，有以下三种方式定义'>
              <CodeView language='javascript'>
                {`
          (1)
          var str1 = ""
          (2)
          var str2 = ''
          (3)
          var str3 = \`反引号内可以写多行字符串\`
          var str4 = \`反引号内可以解析变量，\${变量}\`
          var str5 = \`反引号内可以解析函数，\${函数()}\`
        `}
              </CodeView>
            </AlertPro>
            <AlertPro message='字符串中可以使用的转义字符'>
              <ParamsTable
                data={[
                  { label: '\\n', desc: '换行' },
                  { label: '\\r', desc: '回车' },
                  { label: '\\t', desc: '制表' },
                  { label: '\\b', desc: '空格' },
                  { label: '\\\'', desc: '\'' },
                  { label: '\\"', desc: '\"' },
                  { label: '\\\\', desc: '\\' },
                ]}
              />
            </AlertPro>
          </AnchorCard>
        ),
      },
      {
        label: 'Number',
        children: (
          <AnchorCard title='数值类型'>
            <AlertPro message='js中不区分整数和浮点数，以下都是合法的number类型，注意：不要判断浮点数是否相等'>
              <CodeView language='javascript'>
                {`
                  var num = 123 || -99          // 正负整数
                  var num = 0.456 || -0.789     // 正负浮点数
                  var num = 1.234e3             // 科学记数法
                  var num = 010 || 0x10 || 0b10 // 进制
                  var num = NaN                 // 不是一个数值
                  var num = Infinity            // 无穷大
                `}
              </CodeView>
            </AlertPro>
          </AnchorCard>
        ),
      },
      {
        label: 'Bool',
        children: (
          <AnchorCard title='布尔类型'>
            <AlertPro message='布尔类型只有两种值 true 和 false'>
              <CodeView language='javascript'>
                {`
                  var bool = true
                  var bool = false
                `}
              </CodeView>
            </AlertPro>
          </AnchorCard>
        ),
      },
      {
        label: 'Null',
        children: (
          <AnchorCard title='空类型'>
            <AlertPro message='null是手动把变量销毁后的值，获取一个销毁后的对象时结果是null' />
          </AnchorCard>
        ),
      },
      {
        label: 'Undefined',
        children: (
          <AnchorCard title='未定义类型'>
            <AlertPro message='undefined是声明但未赋值的变量的类型，获取一个对象不存在的属性时结果是undefined' />
          </AnchorCard>
        ),
      },
      {
        label: 'Object',
        children: (
          <AnchorCard title='对象类型'>
            <AlertPro message='详见 5.对象' />
          </AnchorCard>
        ),
      },
    ]}
  />,

  <AnchorCard title='类型转换'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '强制类型转换',
          children: [
            <AlertPro message='number -> String'>
              <CodeView language='javascript'>
                {`
                  (1) number + ''
                  (2) String(number) // 推荐
                  (3) number.toString(进制) // 可指定要转成的进制
                `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='String -> number'>
              <CodeView language='javascript'>
                {`
                  (1) Number(str)     // 纯数字正常转换、小数正常转换、包含非数字的字符串转为NaN
                  (2) parseInt(str)   // 纯数字正常转换、小数向下取整、可识别(数字/+/-)在前的字符串
                  (3) parseFloat(str)  // 纯数字正常转换、小数正常转换、可识别(数字/+/-)在前的字符串
                `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='其它类型 -> Boolean'>
              <CodeView language='javascript'>
                {`
                  (1) Boolean(a)  // 可以将任意类型转换成布尔值
                  (2) !!a         // 可以将任意类型转换成布尔值
                `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '自动类型转换',
          children: [
            <AlertPro message='自动类型转换发生在 (数据与即将进行的运算) 数据类型不匹配时'>
              <String>‘+’号两边只要有一个字符串就是连接，‘+’号两边都是数值才是数值相加</String>
              <String>{'‘- * / % 、-= *= /= %= 、++ -- 、> < >= <= != !==’ 之类的都会转换成数值'}</String>
            </AlertPro>,
          ],
        },
        {
          label: '类型转换结果',
          children: [
            <AlertPro message='布尔类型到字符串'>
              <CodeView language='javascript'>
                {`
              true => "true"
              false => "false"
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='布尔类型到数值'>
              <CodeView language='javascript'>
                {`
              true => 1
              false => 0
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='其它类型到布尔类型'>
              <CodeView language='javascript'>
                {`
              null || undefined || NaN || +0 || -0 || "" // 这6种是false
              // 其它都是true
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='判断变量是什么类型的方法'>
              <CodeView language='javascript'>
                {`
              // string、number、boolean、undefined、function
              typeof varName

              // null
              Object.prototype.toString.call(null) === '[object Null]'
              JSON.stringify(null) === 'null' // 不知道是否准确

              // obj
              Object.prototype.toString.call(obj) === '[object Object]'
              obj instanceof Object // 不准确，因为arr instanceof Object也是返回true的，还得再确定是arr还是obj
              obj.constructor === Object

              // arr
              Array.isArray(arr) // 推荐(IE8不支持)
              Object.prototype.toString.call(arr) === '[object Array]'
              arr instanceof Array // 不准确，因为obj instanceof Object也是返回true的，还得再确定是arr还是obj
              arr.constructor === Array
            `}
              </CodeView>
              <ImagePro src='/3.Javascript & Ts/checkType.png' />
            </AlertPro>,
          ],
        },
      ]}
    />
  </AnchorCard>,
]
