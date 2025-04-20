import { AnchorCard, PageHeader, ParamsTable, CodeView } from '@/components'

export default () => [
  <PageHeader title='EditorConfig' subTitle='能指定编辑器的一些设置，用于在多个开发者的不同编辑器之间使用相同设置，使其遵守相同的基本代码规范' />,
  <AnchorCard title='文件名匹配'>
    <ParamsTable
      data={[
        { label: '*', desc: '匹配任何字符串，路径分隔符除外(/)' },
        { label: '**', desc: '匹配任何字符串' },
        { label: '?', desc: '匹配任何单个字符' },
        { label: '[name]', desc: '匹配中的任何单个字符名称' },
        { label: '[!name]', desc: '匹配不在的任何单个字符名称' },
        { label: '{s1, s2, s3}', desc: '匹配给定的任何字符串' },
        { label: '{num1...num2}', desc: '介于num1到num2之间的' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='属性配置'>
    <ParamsTable
      data={[
        { label: 'root', value: 'true | false', desc: '告诉EditorConfig插件，这是根文件，不用继续往上查找' },
        { label: 'charset', value: 'utf-8', desc: '设置字符集' },
        { label: 'indent_style', value: 'space | tab', desc: '缩进风格' },
        { label: 'indent_size', value: '2 | 4', desc: '缩进尺寸' },
        { label: 'tab_width', value: '2 | 4', desc: 'tab的宽度 (缩进风格是tab时生效)' },
        { label: 'end_of_line', value: 'lf | cr', desc: '结尾换行符' },
        { label: 'insert_final_newline', value: 'true | false', desc: '是否在文件结尾插入新行' },
        { label: 'trim_trailing_whitespace', value: 'true | false', desc: '是否删除一行中的前后空格' },
        { label: 'max_line_length', value: '100', desc: '最大行宽' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='示例'>
    <CodeView language='editorconfig'>
      {`
        # .editorconfig

        root = true # 这是根文件，不用继续往上查找

        [*] # 匹配所有文件
        charset = utf-8

        [*.js] # 匹配所有.js文件
        indent_style = space
        indent_size = 2
        end_of_line = lf

        [*.{js,py}] # 匹配所有.js和.py文件
        insert_final_newline = true

        [lib/**.js] # 匹配lib下的所有.js文件
        trim_trailing_whitespace = true

        [{package.json,.travis.yml}] # 匹配package.json和.travis.yml文件
        trim_trailing_whitespace = true
      `}
    </CodeView>
  </AnchorCard>,
]
