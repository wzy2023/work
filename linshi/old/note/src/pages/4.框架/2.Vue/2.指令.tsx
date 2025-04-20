import React from 'react'
import { AlertPro, AnchorCard, CodeView, ImagePro, TabsPro } from '@/components'

export default () => {
  return (
    <TabsPro
      items={[
        {
          label: '指令',
          children: [
            <ImagePro src='/4.框架/directives.png' />,
            <AlertPro message='指令的作用'>
              <div>指令是带有 v- 前缀的 attribute，可以为 DOM 元素执行特定的操作，例如控制元素的显示、隐藏、样式等</div>
            </AlertPro>,
            <AlertPro message='指令的参数'>
              <div>某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识</div>
              <div>例如 v-bind 指令，它的参数是要绑定的 attribute 名称</div>
              <CodeView language='html'>
                {`<a v-bind:href='url'> ... </a>`}
              </CodeView>
              <div>同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内</div>
              <div>动态参数中表达式的值应当是一个字符串，或者是 null，null 意为移除该绑定</div>
              <CodeView language='html'>
                {`<a v-bind:[attributeName]='url'> ... </a>`}
              </CodeView>
            </AlertPro>,
            <AlertPro message='指令的值'>
              <div>指令的值用 "" 包裹，通常是表达式，也可以是一个变量名</div>
              <div>除了 v-for、v-on、 v-slot</div>
            </AlertPro>,
            <AlertPro message='指令的修饰符'>
              <div>修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定</div>
              <div>例如 .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()</div>
              <CodeView language='html'>
                {`<form v-on:submit.prevent='onSubmit'> ... </form>`}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '内置指令',
          children: (
            <TabsPro
              items={[
                {
                  label: 'v-text',
                  children: (
                    <>
                      <AlertPro message='Mustache'>
                        <div>双大括号标签会被替换为相应组件实例中 msg 属性的值。同时每次 msg 属性更改时它也会同步更新</div>
                        <div>在所有的数据绑定中都支持完整的 JavaScript 表达式</div>
                        <CodeView language='html'>
                          {`
                      <span>{{ number + 1 }}</span>

                      <span>{{ ok ? 'YES' : 'NO' }}</span>

                      <span>{{ message.split('').reverse().join('') }}</span>

                      <span>Message: {{ msg }}</span>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-text'>
                        <div>更新元素的 innerText</div>
                        <CodeView language='html'>
                          {`
                      <span v-text='msg'></span>
                      <!-- 等同于 -->
                      <span>{{msg}}</span>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-html'>
                        <div>更新元素的 innerHTML</div>
                        <CodeView language='html'>
                          {`
                      <span v-html='msg'></span>
                    `}
                        </CodeView>
                      </AlertPro>
                    </>
                  ),
                },
                {
                  label: 'v-on',
                  children: (
                    <>
                      <AlertPro message='事件处理程序'>
                        <div>内联事件处理器：事件触发时，执行内联的 JavaScript 语句</div>
                        <div>方法事件处理器：一个指向组件上定义的方法的名称</div>
                      </AlertPro>
                      <AlertPro message='内联事件处理器'>
                        <div>内联事件处理器通常用于简单场景</div>
                        <CodeView language='html'>
                          {`
                      <!-- 可以用表达式 -->
                      <button @click='count++'>Add 1</button>
                      <button @click="greeting = 'hello'">Say hello</button>

                      <!-- 可以调用方法 -->
                      <button @click="say('hello')">Say hello</button>

                      <!-- 可以访问事件对象 -->
                      <!-- 使用 $event 变量 -->
                      <button @click="say('Hello', $event)">Submit</button>
                      <!-- 使用内联箭头函数 -->
                      <button @click="event => say('Bye', event)">Submit</button>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='方法事件处理器'>
                        <div>事件处理器的逻辑多时，内联代码不够灵活，因此也支持对某个方法的调用</div>
                        <CodeView language='html'>
                          {`
                      <!-- 'greet' 是组件上定义过的方法名，事件对象会作为参数传递过去 -->
                      <button @click='greet'>Greet</button>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='事件修饰符'>
                        <div>在处理事件时调用 event.preventDefault() 或 event.stopPropagation() 是很常见的</div>
                        <div>尽管可以直接在方法内调用，但如果方法能更专注于逻辑而不用去处理 DOM 事件的细节会更好</div>
                        <CodeView language='html'>
                          {`
                      <!-- 停止事件传播 -->
                      <a @click.stop='doThis'></a>

                      <!-- 阻止默认事件 -->
                      <form @submit.prevent='onSubmit'></form>

                      <!-- 仅当 event.target 是元素本身时才会触发 -->
                      <div @click.self='doThat'>...</div>

                      <!-- 使用 'capture' 捕获模式，在被内部元素处理前，先被外部处理 -->
                      <div @click.capture='doThis'>...</div>

                      <!-- 仅可触发一次 -->
                      <a @click.once='doThis'></a>

                      <!-- 滚动事件的默认行为 scrolling 将立即发生，而非等待 onScroll 完成后再发生 -->
                      <!-- 一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能 -->
                      <div @scroll.passive='onScroll'>...</div>

                      <!-- 可以使用链式书写 -->
                      <a @click.stop.prevent='doThat'></a>

                      <!-- 可以只有修饰符 -->
                      <form @submit.prevent></form>
                    `}
                        </CodeView>
                        <div>使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的</div>
                        <div>例如：</div>
                        <div>使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为</div>
                        <div>而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为</div>
                      </AlertPro>
                      <AlertPro message='按键事件修饰符'>
                        <div>允许在监听按键事件时添加按键修饰符</div>
                        <CodeView language='html'>
                          {`
                      <input @keyup.enter='submit' />
                      <input @keydown.alt.enter='clear' />
                      <div @click.ctrl='doSomething'>Do something</div>

                      <!-- 常用按键 -->
                      .enter
                      .tab
                      .delete (捕获“Delete”和“Backspace”两个按键)
                      .esc
                      .space
                      .up
                      .down
                      .left
                      .right

                      <!-- 系统按键 -->
                      .ctrl
                      .alt
                      .shift
                      .meta

                      <!-- 鼠标按键 -->
                      .left
                      .right
                      .middle

                      <!-- .exact 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符 -->
                      <!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
                      <button @click.ctrl='onClick'>A</button>
                      <!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
                      <button @click.ctrl.exact='onCtrlClick'>A</button>
                      <!-- 仅当没有按下任何系统按键时触发 -->
                      <button @click.exact='onClick'>A</button>
                    `}
                        </CodeView>
                        <div>使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的</div>
                        <div>因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为</div>
                        <div>而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为</div>
                      </AlertPro>
                    </>
                  ),
                },
                {
                  label: 'v-if',
                  children: (
                    <>
                      <AlertPro message='v-if'>
                        <div>控制元素是否渲染到 DOM 上，为 false 时，则不会 DOM 上渲染元素</div>
                        <CodeView language='html'>
                          {`<h1 v-if='awesome'>Vue is awesome!</h1>`}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-else'>
                        <div>紧跟着 v-if 使用</div>
                        <CodeView language='html'>
                          {`
                      <h1 v-if='awesome'>True</h1>
                      <h1 v-else>False</h1>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-else'>
                        <div>紧跟着 v-if 使用，可以连续多次重复使用</div>
                        <CodeView language='html'>
                          {`
                      <div v-if="type === 'A'">
                        A
                      </div>
                      <div v-else-if="type === 'B'">
                        B
                      </div>
                      <div v-else-if="type === 'C'">
                        C
                      </div>
                      <div v-else>
                        Not A/B/C
                      </div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='template 上的 v-if'>
                        <div>因为 v-if 是一个指令，他必须依附于某个元素，但如果我们想要切换不止一个元素呢？</div>
                        <div>在这种情况下我们可以在一个 template元素上使用 v-if</div>
                        <div>这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 template 元素</div>
                        <CodeView language='html'>
                          {`
                      <template v-if='ok'>
                        <h1>Title</h1>
                        <p>Paragraph 1</p>
                        <p>Paragraph 2</p>
                      </template>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-show'>
                        <div>控制元素是否显示，通过切换元素上名为 display 属性实现</div>
                        <div>v-show 不支持在 template 元素上使用，也不能和 v-else 搭配使用</div>
                        <CodeView language='html'>
                          {`<h1 v-if='awesome'>Vue is awesome!</h1>`}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-if VS v-show'>
                        <div>v-if 是真正的条件渲染，因为它会确保在切换过程中，条件块内的事件监听器和子组件适当的被销毁和重建</div>
                        <div>v-if 是惰性的，如果在初始渲染时条件为假，则什么也不做</div>
                        <div>相比之下，v-show 就简单得多，不管初始条件是什么，元素总是会被渲染，只是基于 display 的切换</div>
                        <div>一般来说，v-if 有更高的切换消耗，而 v-show 有更高的初始渲染消耗</div>
                        <div>因此，如果需要非常频繁地切换，则使用 v-show 较好，如果在运行时条件很少改变，则使用 v-if 较好</div>
                      </AlertPro>
                    </>
                  ),
                },
                {
                  label: 'v-for',
                  children: (
                    <>
                      <AlertPro message='遍历数组'>
                        <CodeView language='html'>
                          {`
                      <!-- 基于数据多次渲染元素或模板块 -->
                      <div v-for='item in items'>
                        {{ item.text }}
                      </div>

                      <!-- 使用 of 语法 -->
                      <div v-for='item of items'>
                        {{ item.text }}
                      </div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='遍历对象'>
                        <CodeView language='html'>
                          {`
                      <div v-for='(value, key) in object'></div>
                      <div v-for='(value, name, index) in object'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='遍历数字'>
                        <CodeView language='html'>
                          {`
                      <!-- 注意此处 n 的初值是从 1 开始，而非 0 -->
                      <div v-for='n in 10'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='遍历 template'>
                        <CodeView language='html'>
                          {`
                      <!-- 可以在 <template> 标签上使用 v-for 来渲染一个包含多个元素的块 -->
                      <ul>
                        <template v-for='item in items' :key='item.id'>
                          <li>{{ item.msg }}</li>
                          <li class='divider' role='presentation'></li>
                        </template>
                      </ul>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='遍历组件'>
                        <div>不会自动将 item 传到组件内部，需要通过 props 传递</div>
                        <div>不自动将 item 注入组件的原因是，这会使组件与 v-for 的工作方式紧密耦合</div>
                        <div>明确其数据的来源可以使组件在其他情况下重用</div>
                        <CodeView language='html'>
                          {`
                      <my-component
                        v-for='item in items'
                        :item='item'
                      />
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-for 和 v-if'>
                        <div>同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显</div>
                        <div>当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行</div>
                        <div>这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名</div>
                        <div>应该使用如下写法：</div>
                        <CodeView language='html'>
                          {`
                      <template v-for='todo in todos'>
                        <li v-if='!todo.isComplete'>
                          {{ todo.name }}
                        </li>
                      </template>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='v-for 与 key'>
                        <div>Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表</div>
                        <div>当数据项的顺序改变时，Vue 不会移动 DOM 元素的顺序，而是就地更新每个元素</div>
                        <br />
                        <div>这样的默认行为通常是高效的，但是如果列表渲染的数据项包含了组件，那么就会导致组件的状态被复用</div>
                        <div>为了 Vue 能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供一个 key attribute</div>
                        <br />
                        <div>key 主要用在虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes</div>
                        <div>它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素</div>
                        <br />
                        <div>key 绑定的值期望是一个基础类型的值，例如 string 或 number 类型</div>
                        <CodeView language='html'>
                          {`
                      <div v-for='item in items' :key='item.id'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='其它'>
                        <CodeView language='html'>
                          {`
                      <!-- index -->
                      <div v-for='(item, index) in items'></div>

                      <!-- key -->
                      <div v-for='item in items' :key='item.id'>
                        {{ item.text }}
                      </div>

                      <!-- 使用解构 -->
                      <li v-for='{ message } in items'>
                        {{ message }}
                      </li>
                    `}
                        </CodeView>
                      </AlertPro>
                    </>
                  ),
                },
                {
                  label: 'v-bind',
                  children: (
                    <>
                      <AlertPro message='绑定 attributes'>
                        <div>双大括号不能在 attributes 中使用，想要响应式地绑定一个 attribute，应该使用 v-bind 指令</div>
                        <CodeView language='html'>
                          {`
                      <div v-bind:id='dynamicId'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='简写'>
                        <div>v-bind 指令可以简写为 :</div>
                        <div>开头为 : 的 attribute 和一般的 HTML attribute 不太一样，但它的确是合法的 attribute 名称字符</div>
                        <div>所有支持 Vue 的浏览器都能正确解析它，不过他们不会出现在最终渲染的 DOM 中</div>
                        <CodeView language='html'>
                          {`
                      <div :id='dynamicId'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='布尔型 Attribute'>
                        <div>布尔型 attribute 依据 true / false 值来决定 attribute 是否应该存在于该元素上，例如：disabled</div>
                        <div>当 isButtonDisabled 为 true 或一个空字符串''时，元素会包含这个 disabled attribute</div>
                        <div>而当其为其他假值时 attribute 将被忽略</div>
                        <CodeView language='html'>
                          {`
                      <button :disabled='isButtonDisabled'>Button</button>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='动态绑定多个值'>
                        <div>通过不带参数的 v-bind，可以将一个对象的所有属性值绑定到单个元素上</div>
                        <CodeView language='javascript'>
                          {`
                      const objectOfAttrs = {
                        id: 'container',
                        class: 'wrapper'
                      }
                    `}
                        </CodeView>
                        <CodeView language='html'>
                          {`
                      <div v-bind='objectOfAttrs'></div>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='绑定 class'>
                        <CodeView language='html'>
                          {`
                      <!-- 对象的方式绑定 class -->
                      <div v-bind:class='{ active: isActive }'></div>

                      <!-- 可以和一般的 class attribute 共存 -->
                      <div
                        class='static'
                        :class="{ active: isActive, 'text-danger': hasError }"
                      />

                      <!-- 绑定数组 -->
                      <div :class='[activeClassName, errorClassName]'></div>

                      <!-- 嵌套对象 -->
                      <div :class='[{ active: isActive }, errorClassName]'></div>

                      <!-- TODO 在组件上使用，会被添加到该组件的根元素上，并与该元素上已有的 class 合并 -->
                      <MyComponent :class='[{ active: isActive }, errorClassName]'></MyComponent>

                      <!-- TODO 如果有多个根元素，可以在组件内，通过 $attrs 属性来指定 -->
                      <p :class='$attrs.class'>Hi!</p>
                      <span>This is a child component</span>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='绑定 style'>
                        <CodeView language='html'>
                          {`
                      <!-- 对象的方式绑定 style -->
                      <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

                      <!-- 直接绑定一个样式对象 -->
                      <div :style='styleObject'></div>

                      <!-- 绑定对象数组 -->
                      <div :style='[baseStyles, overridingStyles]'></div>

                      <!-- 样式多值，仅会渲染浏览器支持的最后一个值 -->
                      <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
                    `}
                        </CodeView>
                      </AlertPro>
                    </>
                  ),
                },
                {
                  label: 'v-model',
                  children: (
                    <>
                      <AlertPro message='自动绑定'>
                        <div>在处理表单时，常常需要将表单项的值同步给相应的变量，手动连接值绑定和更改事件监听器可能会比较麻烦</div>
                        <CodeView language='html'>
                          {`
                            <input v-model='text'>

                            <!-- 编译器会对 v-model 进行展开 -->
                            <input
                              :value='text'
                              @input='event => text = event.target.value'
                            >
                          `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='使用方法'>
                        <div>支持不同类型的元素输入</div>
                        <CodeView language='html'>
                          {`
                      <!-- input -->
                      <input v-model='text'>

                      <!-- textarea 中不支持 {{ text }} 的，请使用 v-model -->
                      <textarea v-model='text'></textarea>

                      <!-- radio -->
                      <input type='radio' id='one' value='One' v-model='picked' />

                      <!-- checkbox 开关 值为 boolean -->
                      <input type='checkbox' id='checkbox' v-model='checked' />

                      <!-- checkbox 多选 值为 [] -->
                      <input type='checkbox' value='Jack' v-model='checkedNames'>
                      <input type='checkbox' value='John' v-model='checkedNames'>

                      <!-- checkbox 将原本的 boolean 改为 yes | no -->
                      <input
                        type='checkbox'
                        v-model='toggle'
                        true-value='yes'
                        false-value='no'
                      />

                      <!-- select 单选 值为 string | number -->
                      <select v-model='selected'>
                        <option disabled value=''>Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>

                      <!-- select 多选 值为 [] -->
                      <select v-model='selected' multiple>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    `}
                        </CodeView>
                      </AlertPro>
                      <AlertPro message='修饰符'>
                        <CodeView language='html'>
                          {`
                      <!-- 在 change 事件后更新 msg，而不是 input -->
                      <input v-model.lazy='msg' />

                      <!-- 让用户输入自动转换为数字 -->
                      <input v-model.number='age' />

                      <!-- 自动去除用户输入内容中两端的空格 -->
                      <input v-model.trim='msg' />
                    `}
                        </CodeView>
                      </AlertPro>
                    </>
                  ),
                },
              ]}
            />
          ),
        },
        {
          label: '自定义指令',
          children: [
            <AlertPro message='作用'>
              <div>自定义指令是为了复用涉及普通元素的底层 DOM 访问逻辑</div>
              <div>自定义指令是一个对象，属性值是类似组件生命周期的函数</div>
              <br />
              <div>只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令</div>
              <div>其他情况下应该尽可能地使用 v-bind 这样的内置指令来声明式地使用模板</div>
              <div>这样更高效，也对服务端渲染更友好</div>
            </AlertPro>,
            <CodeView language='typescript'>
              {`
          type DirectiveFn = (
            el: HTMLElement, // 指令绑定到的元素，这可以用于直接操作 DOM
            binding: {
              value: any; // 传递给指令的值，例如在 v-my-directive="1 + 1" 中，值是 2
              oldValue: any; // 之前的值，仅在 beforeUpdate 和 updated 中可用，无论值是否更改，它都可用
              instance: string; // 使用该指令的组件实例
              arg: string; // 传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"
              modifiers: { [key: string]: boolean }; // 一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }
              dir: any // 指令的定义对象
            },
            vnode: VNode, // 代表绑定元素的底层 VNode
            prevNode: VNode // 之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用
          ) => void

          interface Directive {
            // 在绑定元素的 attribute 前，或事件监听器应用前调用
            created: DirectiveFn,
            // 在元素被插入到 DOM 前调用
            beforeMount: DirectiveFn,
            // 在绑定元素的父组件，及他自己的所有子节点都挂载完成后调用
            mounted: DirectiveFn,
            // 绑定元素的父组件更新前调用
            beforeUpdate: DirectiveFn,
            // 在绑定元素的父组件，及他自己的所有子节点都更新后调用
            updated: DirectiveFn,
            // 绑定元素的父组件卸载前调用
            beforeUnmount: DirectiveFn,
            // 绑定元素的父组件卸载后调用
            unmounted: DirectiveFn
          }

          // 简化写法
          // 一个常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子
          // 这种情况下我们可以直接用一个函数来定义指令
          // 这会在 mounted 和 updated 时都调用
          type Directive = DirectiveFn
        `}
            </CodeView>,
            <TabsPro
              items={[
                {
                  label: '局部注册 <script setup>',
                  children: (
                    <>
                      <AlertPro>
                        <div>{`\<script setup\> 中任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令`}</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                    <script setup language='ts'>
                      const vFocus = {
                        mounted: DirectiveFn
                      }
                    </script>

                    <template>
                      <input v-focus />
                    </template>
                  `}
                      </CodeView>
                    </>
                  ),
                },
                {
                  label: '局部注册 <script>',
                  children: (
                    <>
                      <AlertPro>
                        <div>需要通过 directives 选项注册</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                    <script language='ts'>
                      export default {
                        directives: {
                          focus: {
                            mounted: DirectiveFn
                          }
                        }
                      }
                    </script>

                    <template>
                      <input v-focus />
                    </template>
                  `}
                      </CodeView>
                    </>
                  ),
                },
                {
                  label: '全局注册',
                  children: (
                    <>
                      <AlertPro>
                        <div>全局注册的自定义指令会在任何组件中生效</div>
                        <div>在大多数情况下，更建议将自定义指令作为局部注册</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                    <script setup language='ts'>
                      import { createApp } from 'vue'
                      import App from './App.vue'

                      const app = createApp(App)
                      app.directive('focus', {
                        mounted: (el: DirectiveFn
                      })

                      app.mount('#app')
                    </script>
                  `}
                      </CodeView>
                    </>
                  ),
                },
              ]}
            />,
            <AlertPro message='在组件上使用'>
              <div>在组件上使用自定义指令时，它会被添加到组件的根元素上，不支持含有多个根节点的组件</div>
              <CodeView language='html'>
                {`
            <MyComponent v-demo='test' />

            <!-- MyComponent -->
            <!-- v-demo 指令会被应用在此处 -->
            <div>
              <span>My component content</span>
            </div>
          `}
              </CodeView>
            </AlertPro>,
          ],
        },
      ]}
    />
  )
}
