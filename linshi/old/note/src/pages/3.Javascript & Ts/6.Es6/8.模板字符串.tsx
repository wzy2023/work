import { AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='模板字符串'>
    <CodeView language='javascript'>
      {`
        let obj = {
          name: \`张三\`
        }
        // 使用\`\`定义，能够识别换行、缩进、变量
        let str1 = \`我叫 \${name}\`
        // 使用\`\`定义，能够执行函数并获得返回值
        let str2 = \`我叫 \${name}\`
      `}
    </CodeView>
  </AnchorCard>,
]
