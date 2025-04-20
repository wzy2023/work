import { AlertPro, AnchorCard, CodeView, ParamsTable, TabsPro } from '@/components'

export default () => [
  <AnchorCard title='input 标签'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '单行文本框',
          children: [
            <CodeView language='html'>
              {`<input type='text' />`}
            </CodeView>,
          ],
        },
        {
          label: '密码输入框',
          children: [
            <CodeView language='html'>
              {`<input type='password' />`}
            </CodeView>,
          ],
        },
        {
          label: '单选框',
          children: [
            <CodeView language='html'>
              {`
                <!--注意：单选框的 name 属性值一样才能实现单选效果-->
                <input type='radio' name='sex' value='boy' [checked] />
                <input type='radio' name='sex' value='girl' />
              `}
            </CodeView>,
          ],
        },
        {
          label: '复选框',
          children: [
            <CodeView language='html'>
              {`
                <!--注意：复选框的 name 属性值需要是‘aihao[]’的形式才能提交多个 value 到服务器-->
                <input type='checkbox' name='aihao[]' value='yinyue' [checked] />
                <input type='checkbox' name='aihao[]' value='meishu' />
              `}
            </CodeView>,
          ],
        },
        {
          label: '文件域',
          children: [
            <CodeView language='html'>
              {`<input type='file' [multiple] [accept='image/gif,image/jpeg'] />`}
            </CodeView>,
          ],
        },
        {
          label: '按钮',
          children: [
            <CodeView language='html'>
              {`
                <!-- 普通按钮 -->
                <input type='button' />
                <!-- 重置按钮 -->
                <input type='reset' />
                <!-- 提交按钮 -->
                <input type='submit' />
                <!-- 图形按钮 -->
                <input type='image' src='图片路径' alt='[图片显示失败的提示文本]' />
              `}
            </CodeView>,
          ],
        },
        {
          label: '其它',
          children: [
            <ParamsTable
              data={[
                {
                  desc: `搜索`,
                  example: `<input type='search' />`,
                },
                {
                  desc: `邮箱`,
                  example: `<input type='email' />`,
                },
                {
                  desc: `网址`,
                  example: `<input type='url' />`,
                },
                {
                  desc: `数字`,
                  example: `<input type='number' />`,
                },
                {
                  desc: `日期`,
                  example: `<input type='date' />`,
                },
                {
                  desc: `电话`,
                  example: `<input type='tel' />`,
                },
                {
                  desc: `颜色`,
                  example: `<input type='color' />`,
                },
                {
                  desc: `隐藏文本框`,
                  example: `<input type='hidden' />`,
                },
              ]}
            />,
          ],
        },
      ]}
    />
    <ParamsTable
      data={[
        {
          attr: `name`,
          desc: `表单元素名称`,
          example: `name='user'`,
        },
        {
          attr: `value`,
          desc: `默认值`,
          example: `value='默认值'`,
        },
        {
          attr: `size`,
          desc: `宽度(字符数)`,
          example: `size='10'`,
        },
        {
          attr: `maxlength`,
          desc: `允许输入的最多字符数`,
          example: `maxlength='6'`,
        },
        {
          attr: `placeholder`,
          desc: `提示文本`,
          example: `placeholder='提示文本'`,
        },
        {
          attr: `readonly`,
          desc: `只读`,
          example: `readonly`,
        },
        {
          attr: `disabled`,
          desc: `禁止且内容不会随表单提交`,
          example: `disabled'`,
        },
        {
          attr: `autofocus`,
          desc: `自动获取焦点`,
          example: `autofocus`,
        },
        {
          attr: `required`,
          desc: `内容不可为空`,
          example: `required`,
        },
        {
          attr: `list`,
          desc: `可显示自动输入列表`,
          example: `详见4.5章`,
        },
        {
          attr: `autocomplete`,
          desc: `在编辑框双击时弹出输入历史`,
          example: `autocomplete='off/on'`,
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='label 标签'>
    <CodeView language='html'>
      {`
        <!--点击手机号码，光标进入输入框，有两种方法-->
        (1) <label>手机号码：<input type='text'/></label>
        (2) <label for='num'>手机号码：</label><input type='text' id='num'/>
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='textarea 文本域'>
    <CodeView language='html'>
      {`<textarea cols='[每行的字符数]' rows='[行数]'>这里写内容</textarea>`}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='select 下拉列表'>
    <CodeView language='html'>
      {`
        <select name='city' [multiple] [size]>
          <optgroup label='分组名'>
            <option value='1' [selected]>北京</option>
            <option value='2'>上海</option>
            <option value='3'>深圳</option>
          </optgroup>
        </select>
      `}
    </CodeView>
    <ParamsTable
      data={[
        {
          attr: `multiple`,
          desc: `多选`,
          example: `multiple`,
        },
        {
          attr: `size`,
          desc: `显示的表项数`,
          example: `size='3'`,
        },
        {
          attr: `selected`,
          desc: `默认选中`,
          example: `selected`,
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='datalist 数据列表'>
    <CodeView language='html'>
      {`
        <input type='text' list='list_id' />
        <!--该input可显示自动输入列表-->
        <datalist id='list_id'>
          <option value='java'>java</option>
          <option value='javascript'>javascript</option>
          <option value='php'>php</option>
        </datalist>
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='form 表单域'>
    <CodeView language='html'>
      {`
        <form action='提交路径' method='get'>
          帐号：<input type='text' name='user' /> 密码：<input type='password' name='pwd' />
        </form>
      `}
    </CodeView>
    <ParamsTable
      data={[
        {
          attr: `action`,
          desc: `提交地址`,
          example: `action='./one.php'`,
        },
        {
          attr: `method`,
          desc: `提交方式`,
          example: `method='get/post'`,
        },
        {
          attr: `enctype`,
          desc: `编码方式 (上传文件时必须)`,
          example: `enctype='multipart/form-data'`,
        },
        {
          attr: `autocomplete`,
          desc: `双击弹出历史<br>自动完成是在编辑框双击时弹出输入历史`,
          example: `autocomplete='off/on'`,
        },
        {
          attr: `novalidate`,
          desc: `不对用户输入的内容进行验证<br>例如不验证 email 类型的 input 框<br>用户输入的内容是否为邮箱地址`,
          example: `novalidate`,
        },
      ]}
    />
  </AnchorCard>,
]
