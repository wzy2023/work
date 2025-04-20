import { AlertPro, AnchorCard, ImagePro, ParamsTable } from '@/components'

export default () => [
  <AnchorCard title='子表达式'>
    <AlertPro>
      <div>正则表达式中，括号括起来的内容，称为子表达式</div>
      <div>例如：`\d(.*?)\d`</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='捕获'>
    <AlertPro>
      <div>正则表达式中，子表达式匹配到内容时，会将匹配到的内容放入缓存区中，我们把这个过程就称为**捕获**</div>
      <ImagePro src='/9.其它/reg.png' />
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='反向引用'>
    <AlertPro>
      <div>我们可以用`\数字`来获取已经用子表达式匹配到的内容，这个过程称为 反向引用</div>
      <div>例如字符串`1122`，用`(\d)\1(\d)\2`，可以匹配到`1122`</div>
      <div>`\1`就代表第一个子表达式的内容， `\2`就代表第二个子表达式的内容</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='匹配模式'>
    <AlertPro>
      <div>{'贪婪匹配：正则表达式中，使用限定符时 ，例如`\\d{5，10}`匹配5位到10位的数字，会能多匹配就不少匹配'}</div>
      <div>{'惰性匹配：可以在限定符的后面加一个问号，`\\d{5，10}?`，就会尽量少匹配'}</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='转义字符'>
    <AlertPro>
      <div>正则表达式中，需要匹配特殊字符时，需要对这些特殊字符进行转义</div>
      <div>例如：用`\/`代表`/`</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='匹配符'>
    <ParamsTable
      data={[
        { label: '字符组', attach: '含义' },
        { label: '[a-z]', attach: '匹配a - z之间的任一字符' },
        { label: '[A-Z]', attach: '匹配A - Z之间的任一字符' },
        { label: '[0-9]', attach: '匹配0 - 9之间的任一数字' },
        { label: '[0-9a-z]', attach: '匹配0 - 9 / a - z之间的任一字符' },
        { label: '[0-9a-zA-Z]', attach: '匹配0 - 9 / a - z / A - Z之间的任一字符' },
        { label: '[abcd]', attach: '匹配a / b / c / d' },
        { label: '[1234]', attach: '匹配1 / 2 / 3 / 4' },
        { label: '[^a-z]', attach: '匹配除a - z以外的任一字符' },
        { label: '[^0-9]', attach: '匹配除0 - 9以外的任一字符' },
        { label: '[^abcd]', attach: '匹配除a / b / c / d以外的任一字符' },
      ]}
    />
    <ParamsTable
      data={[
        { label: '元字符', attach: '含义' },
        { label: '\\d', attach: '匹配一个数字，与 [0-9] 等价' },
        { label: '\\D', attach: '匹配一个非数字，与 \[^0-9] 等价' },
        { label: '\\w', attach: '匹配包括下划线的任何字母数字下划线字符，与 \[0-9a-zA-Z_] 等价' },
        { label: '\\W', attach: '匹配任何非字母数字下划线字符，与 \[^\w] 等价' },
        { label: '\\s', attach: '匹配任何空白字符' },
        { label: '\\S', attach: '匹配任何非空白字符，与 \[^\s] 等价' },
        { label: '\\b', attach: '边界符' },
        { label: '\\B', attach: '非边界符' },
        { label: '^', attach: '匹配字符串的开始位置' },
        { label: '$', attach: '匹配字符串的结束位置' },
        { label: '.', attach: '匹配除换行符的任何字符' },
        { label: '[u4e00-u9fa5]', attach: '匹配中文字符' },
        { label: '[.\\s\\S]*?', attach: '所有字符' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='限定符'>
    <ParamsTable
      data={[
        { label: '限定符', attach: '含义' },
        { label: '*', attach: '前面的元素出现0次或n次' },
        { label: '?', attach: '前面的元素出现0次或1次' },
        { label: '+', attach: '前面的元素出现1次或n次' },
        { label: '{2}', attach: '前面的元素出现2次' },
        { label: '{2,}', attach: '前面的元素出现2次或n次' },
        { label: '{2,5}', attach: '前面的元素出现2次到5次之间' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='其他'>
    <ParamsTable
      data={[
        { label: '符号', attach: '含义' },
        { label: '[]', attach: '分组符(字符组)' },
        { label: '-', attach: '连字符(只用在字符组中，例如[a-z])' },
        { label: '^', attach: '开头符' },
        { label: '$', attach: '结尾符' },
        { label: '\\', attach: '转义字符' },
        { label: '\|', attach: '选择符(a\\|b\\|c\\|d)，与()配合，表示a或者b或者c或者d' },
        { label: '(?:)', attach: '括号里最前面加上?: 不会被子匹配' },
      ]}
    />
  </AnchorCard>,
]
