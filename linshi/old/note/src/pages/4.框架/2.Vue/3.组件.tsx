import React from 'react'
import { AlertPro, AnchorCard, CodeView, TabsPro, ParamsTable } from '@/components'

export default () => {
  return [
    <TabsPro
      clearMenuOnChange
      items={[
        {
          label: '定义',
          children: [
            <AlertPro>
              <div>组件允许我们将 UI 划分为独立的、可重用的部分，并且可以对每个部分进行单独的思考</div>
            </AlertPro>,
            <AnchorCard title='定义组件的几种形式'>
              <TabsPro
                type='card'
                items={[
                  {
                    label: '单文件 SFC',
                    children: (
                      <AlertPro>
                        <div>在 Vue 项目中，可以把一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里</div>
                        <div>它被称为单文件组件，缩写为 SFC，它是 Vue 的标志性功能</div>
                        <CodeView language='html'>
                          {`
                            <script>
                              export default {
                                data() {
                                  return {
                                    count: 0
                                  }
                                }
                              }
                            </script>

                            <template>
                              <button @click='count++'>Count is: {{ count }}</button>
                            </template>

                            <style scoped>
                              button {
                                font-weight: bold;
                              }
                            </style>
                          `}
                        </CodeView>
                      </AlertPro>
                    ),
                  },
                  {
                    label: '模板字符串定义',
                    children: (
                      <AlertPro>
                        <div>不使用构建步骤时，组件以一个包含特定选项的 JavaScript 对象来定义</div>
                        <div>这里的模板是一个内联的 JavaScript 字符串，Vue 将会在运行时编译它</div>
                        <CodeView language='javascript'>
                          {`
                            export default {
                              data() {
                                return {
                                  message: 'Hello Vue!'
                                }
                              },
                              template: '<div>count is {{ count }}</div>'
                            }
                          `}
                        </CodeView>
                      </AlertPro>
                    ),
                  },
                  {
                    label: 'dom 定义',
                    children: (
                      <AlertPro>
                        <div>{`也可以使用 ID 选择器来指向一个元素 (通常是原生的 <template> 元素)，Vue 将会使用其内容作为模板来源`}</div>
                        <CodeView language='javascript'>
                          {`
                            export default {
                              data() {
                                return {
                                  message: 'Hello Vue!'
                                }
                              },
                              template: '#app'
                            }
                          `}
                        </CodeView>
                        <div>由于浏览器的原生 HTML 解析行为限制，有一些需要注意的事项</div>
                        <AlertPro message='大小写区分' type='warning'>
                          <div>HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写</div>
                          <div>这意味着当你使用 DOM 内的模板时，无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称还是 v-on 的事件名称</div>
                          <div>都需要转换为相应等价的 kebab-case (短横线连字符) 形式</div>
                        </AlertPro>
                        <AlertPro message='闭合标签' type='warning'>
                          <div>{`HTML 只允许一小部分特殊的元素省略其关闭标签，最常见的就是 <input> 和 <img>`}</div>
                          <div>对于其他的元素来说，如果你省略了关闭标签，原生的 HTML 解析器会认为开启的标签永远没有结束</div>
                        </AlertPro>
                        <AlertPro message='元素书写位置限制' type='warning'>
                          <div>某些 HTML 元素对于放在其中的元素类型有限制</div>
                          <div>{`某些元素仅在放置于特定元素中时才会显示，例如 <li>，<tr> 和 <option>`}</div>
                          <CodeView language='html'>
                            {`
                              <!-- 这样写不行 -->
                              <table>
                                <blog-post-row></blog-post-row>
                              </table>

                              <!-- 需要改成下面这样 -->
                              <table>
                                <tr is='vue:blog-post-row'></tr>
                              </table>
                            `}
                          </CodeView>
                        </AlertPro>
                      </AlertPro>
                    ),
                  },
                ]}
              />
            </AnchorCard>,
            <AnchorCard title='API风格'>
              <TabsPro
                type='card'
                items={[
                  {
                    label: '组合式 (Composition API)',
                    children: (
                      <>
                        <AlertPro>
                          <div>通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑</div>
                          <div>这些函数可以访问到组件的响应式状态，但是不会暴露在 this 上</div>
                        </AlertPro>
                        <TabsPro
                          type='card'
                          items={[
                            {
                              label: 'setup()',
                              children: (
                                <CodeView language='html'>
                                  {`
                                    <script >
                                      import { ref } from 'vue'

                                      export default {
                                        mounted() {
                                          // 生命周期钩子
                                        },
                                        setup() {
                                          // 响应式状态
                                          const count = ref(0)

                                          // 用来修改状态、触发更新的函数
                                          function increment() {
                                            count.value++
                                          }

                                          return {
                                            count,
                                            increment,
                                            }
                                          }
                                        }
                                      }
                                    </script>

                                    <template>
                                      <button @click='increment'>Count is: {{ count }}</button>
                                    </template>
                                  `}
                                </CodeView>
                              ),
                            },
                            {
                              label: 'script setup',
                              children: (
                                <CodeView language='html'>
                                  {`
                    <!-- 简写方式，经过构建后，会编译为上面那种形式 -->
                    <!-- <script setup> 中导入的模块和顶层的变量声明，可在同一组件的模板中直接使用 -->
                    <script setup>
                      import { ref, onMounted } from 'vue'

                      // 响应式状态
                      const count = ref(0)

                      // 用来修改状态、触发更新的函数
                      function increment() {
                        count.value++
                      }

                      // 生命周期钩子
                      onMounted(() => {
                        console.log(\`The initial count is $\{count.value\}.\`)
                      })
                    </script>

                    <template>
                      <button @click='increment'>Count is: {{ count }}</button>
                    </template>
                  `}
                                </CodeView>
                              ),
                            },
                          ]}
                        />
                      </>
                    ),
                  },
                  {
                    label: '选项式 (Options API)',
                    children: (
                      <>
                        <AlertPro>
                          <div>使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted</div>
                          <div>选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例</div>
                        </AlertPro>
                        <CodeView language='html'>
                          {`
                            <script>
                              export default {
                                // data() 返回的属性将会成为响应式的状态，并且暴露在 \`this\` 上
                                data() {
                                  return {
                                    count: 0
                                  }
                                },

                                // methods 是一些用来更改状态与触发更新的函数，它们可以在模板中作为事件监听器绑定
                                methods: {
                                  increment() {
                                    this.count++
                                  }
                                },

                                // 生命周期钩子会在组件生命周期的各个不同阶段被调用，例如这个函数就会在组件挂载完成后被调用
                                mounted() {
                                  console.log(\`The initial count is $\{this.count\}.\`)
                                }
                              }
                            </script>

                            <template>
                              <button @click='increment'>Count is: {{ count }}</button>
                            </template>
                          `}
                        </CodeView>
                      </>
                    ),
                  },
                ]}
              />
            </AnchorCard>,
          ],
        },
        {
          label: '使用',
          children: [
            <AlertPro>
              <div>组件在使用前需要先被“注册”，这样 Vue 才能在渲染模板时找到其对应的实现</div>
            </AlertPro>,
            <AnchorCard title='注册'>
              <AnchorCard title='全局注册'>
                <CodeView language='javascript'>
                  {`
                  import { createApp } from 'vue'
                  import MyComponent from './App.vue'

                  const app = createApp({})

                  // 全局注册方式一
                  app.component('MyComponent', MyComponent)

                  // 全局注册方式二
                  app.component(
                    'MyComponent',
                    {
                      /* 组件的实现 */
                    }
                  )
                `}
                </CodeView>
              </AnchorCard>,
              <AnchorCard title='局部注册'>
                <AlertPro>
                  <div>{`使用 \<script setup\> 的单文件组件中 导入的组件可以直接在模板中使用 无需注册`}</div>
                  <CodeView language='html'>
                    {`
                    <script setup>
                     import ComponentA from './ComponentA.vue'
                    </script>

                    <template>
                      <ComponentA />
                    </template>
                  `}
                  </CodeView>
                </AlertPro>
                <AlertPro>
                  <div>{`如果没有使用 \<script setup\> 则需要使用 components 选项来显式注册`}</div>
                  <CodeView language='javascript'>
                    {`
                    import ComponentA from './ComponentA.js'

                    export default {
                      components: {
                        ComponentA
                      },
                      setup() {
                        // ...
                      }
                    }
                  `}
                  </CodeView>
                </AlertPro>
              </AnchorCard>,
              <AnchorCard title='全局注册和局部注册的区别'>
                <AlertPro>
                  <div>全局注册虽然很方便，但有以下几个问题</div>
                  <div>1. 没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)</div>
                  <div>如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中</div>
                  <div>2. 在大型项目中使项目的依赖关系变得不那么明确</div>
                  <div>在父组件中使用子组件时，不太容易定位子组件的实现，和使用过多的全局变量一样，这可能会影响应用长期的可维护性</div>
                  <br />
                  <div>相比之下</div>
                  <div>局部注册的组件需要在使用它的父组件中显式导入，并且只能在该父组件中使用</div>
                  <div>它的优点是使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好</div>
                </AlertPro>
              </AnchorCard>,
            </AnchorCard>,
            <AnchorCard title='组件名格式'>
              <AlertPro>
                <div>在单文件组件和内联字符串模板中，推荐使用 PascalCase 作为组件名的注册格式，这是因为</div>
                <div>1. PascalCase 是合法的 JavaScript 标识符，这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全</div>
                <div>{`2. <PascalCase /> 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素，同时也能够将 Vue 组件和自定义元素 (web components) 区分开来`} </div>
                <br />
                <div>PascalCase 的标签名在 DOM 模板中是不可用的</div>
                <div>{`支持以 MyComponent 为名注册的组件，在模板中可以通过 <MyComponent> 或 <my-component> 引用`}</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='作为异步组件使用'>
              <AlertPro>
                <div>在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件</div>
                <div>defineAsyncComponent 方法接收一个返回 Promise 的加载函数</div>
                <div>这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用，你也可以调用 reject(reason) 表明加载失败</div>
                <br />
                <div>ES 模块动态导入也会返回一个 Promise，所以多数情况下我们会将它和 defineAsyncComponent 搭配使用</div>
                <div>Vite 和 Webpack 构建工具也支持此语法，并且会将它们作为打包时的代码分割点</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { defineAsyncComponent } from 'vue'

                    // 简单使用
                    const AdminPage = defineAsyncComponent(() => (
                      import('./AdminPage.vue')
                    ))

                    // 异步加载组件的高级选项
                    const AsyncComp = defineAsyncComponent({
                      // 加载函数
                      loader: () => import('./Comp.vue'),

                      // 加载异步组件时使用的组件
                      loadingComponent: LoadingComponent,
                      // 展示加载组件前的延迟时间，默认为 200ms
                      delay: 200,

                      // 加载失败后展示的组件
                      errorComponent: ErrorComponent,
                      // 如果提供了一个 timeout 时间限制，并超时了
                      // 也会显示这里配置的报错组件，默认值是：Infinity
                      timeout: 3000
                    })
                  </script>

                  <template>
                    <AdminPage />
                  </template>
                `}
              </CodeView>
            </AnchorCard>,
          ],
        },
        {
          label: 'Props',
          children: [
            <AnchorCard title='定义'>
              <AlertPro>
                <div>一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute</div>
              </AlertPro>
              <AlertPro>
                <div>如果一个 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符</div>
                <div>可以在向子组件传递 props 时使用 camelCase 形式</div>
                <div>不过为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式</div>
              </AlertPro>
              <AlertPro>
                <div>{`在使用 <script setup> 的单文件组件中 props 可以使用 defineProps() 宏来声明`}</div>
                <CodeView language='html'>
                  {`
                  <script setup>
                    const props = defineProps(['foo'])

                    console.log(props.foo)
                  </script>
                `}
                </CodeView>
              </AlertPro>
              <AlertPro>
                <div>{`在没有使用 <script setup> 的组件中 prop 可以使用 props 选项来声明`}</div>
                <CodeView language='javascript'>
                  {`
                  export default {
                    props: ['foo'],
                    setup(props) {
                      console.log(props.foo)
                    }
                  }
                `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='校验'>
              <AlertPro>
                <div>组件可以更细致地声明对传入的 props 的校验要求</div>
                <div>如果传入的值不满足类型要求，Vue 会在浏览器控制台中抛出警告来提醒使用者</div>
                <div>这在开发给其他开发者使用的组件时非常有用</div>
              </AlertPro>
              <CodeView language='javascript'>
                {`
                  defineProps({
                    // 基础类型检查
                    // （给出 'null' 和 'undefined' 值则会跳过任何类型检查）
                    propA: Number,
                    // 多种可能的类型
                    propB: [String, Number],
                    // 必传，且为 String 类型
                    propC: {
                      type: String,
                      // prpps 默认是可选的，除非声明了 required: true
                      required: true
                    },
                    // Number 类型的默认值
                    propD: {
                      type: Number,
                      default: 100
                    },
                    // 对象类型的默认值
                    propE: {
                      type: Object,
                      // 对象或数组的默认值
                      // 必须从一个工厂函数返回。
                      // 该函数接收组件所接收到的原始 prop 作为参数。
                      default(rawProps) {
                        return { message: 'hello' }
                      }
                    },
                    // 自定义类型校验函数
                    propF: {
                      validator(value) {
                        // The value must match one of these strings
                        return ['success', 'warning', 'danger'].includes(value)
                      }
                    },
                    // 函数类型的默认值
                    propG: {
                      type: Function,
                      // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
                      default() {
                        return 'Default function'
                      }
                    }
                  })
                `}
              </CodeView>
              <AlertPro type='warning' message='注意'>
                <div>{`defineProps() 宏中的参数不可以访问 <script setup> 中定义的其他变量 因为在编译时整个表达式都会被移到外部的函数中`}</div>
                <br />
                <div>所有 prop 默认都是可选的，除非声明了 required: true</div>
                <br />
                <div>未传递的可选 prop，会有一个默认值 undefined</div>
                <div>Boolean 的未传递 prop 将被转换为 false，这可以通过为它设置 default 来更改</div>
                <div>例如：设置为 default: undefined 将与非布尔类型的 prop 的行为保持一致</div>
                <br />
                <div>如果声明了 default 值，那么在 prop 的值被解析为 undefined 时</div>
                <div>无论 prop 是未被传递还是显式指明的 undefined，都会改为 default 值</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='透传 Attributes'>
              <AlertPro message='定义'>
                <div>指的是传给一个组件，却没有被该组件声明为 props 或 emits 的 attribute</div>
                <div>最常见的例子就是 class、style 和 id</div>
                <br />
                <div>{`例如：<MyButton> 并没有将 class 声明为一个它所接受的 props，所以 class 被视作透传 attribute，自动透传到了 <MyButton> 的根元素上`}</div>
                <CodeView language='html'>
                  {`
                    <!-- 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上 -->
                    <MyButton class='large' />

                    <!-- 渲染后 -->
                    <button class='large'>click me</button>
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='合并'>
                <div>如果一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并</div>
                <CodeView language='html'>
                  {`
                    <!-- <MyButton> 的模板 -->
                    <button class='btn'>click me</button>

                    <!-- 渲染后 -->
                    <button class='btn large'>click me</button>
                  `}
                </CodeView>
                <div>{`@click 监听器会被添加到 <MyButton> 的根元素，即那个原生的 <button> 元素之上`}</div>
                <div>{`当原生的 <button> 被点击，会触发父组件的 onClick 方法`}</div>
                <div>如果原生 button 元素自身也通过 v-on 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发</div>
                <CodeView language='html'>
                  {`
                    <MyButton @click='onClick' />

                    <button @click='onClick'>click me</button>
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='继续透传'>
                <div>有些情况下，一个组件会在根节点上渲染另一个组件</div>
                <div>透传 attribute 会直接继续传给 另一个组件</div>
                <AlertPro type='warning'>
                  <div>注意</div>
                  <div>{`1. 透传的 attribute 不会包含 <MyButton> 上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 <MyButton>“消费”了`}</div>
                  <div>{`2. 透传的 attribute 若符合声明，也可以作为 props 传入 <BaseButton>`}</div>
                </AlertPro>
              </AlertPro>
              <AlertPro message='禁用 Attributes 继承'>
                <div>如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false</div>
                <CodeView language='html'>
                  {`
                    <script>
                      // 使用普通的 <script> 来声明选项
                      export default {
                        inheritAttrs: false
                      }
                    </script>

                    <script setup>
                      // ...setup 部分逻辑
                    </script>

                    <!-- 透传进来的 attribute 可以用 $attrs 访问 -->
                    <span>Fallthrough attribute: {{ $attrs }}</span>
                  `}
                </CodeView>
                <AlertPro type='warning'>
                  <div>和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写</div>
                  <div>所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问</div>
                  <div>像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick</div>
                </AlertPro>
              </AlertPro>
              <AlertPro message='多根节点的 Attributes 继承'>
                <div>和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为</div>
                <div>需要通过 $attrs 显式的去绑定，如果没有被显式的绑定，将会抛出一个运行时警告</div>
                <CodeView language='html'>
                  {`
                    <header>...</header>
                    <main v-bind='$attrs'>...</main>
                    <footer>...</footer>
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='script 中访问透传 Attributes'>
                <div>和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为</div>
                <CodeView language='html'>
                  {`
                    <script setup>
                      import { useAttrs } from 'vue'
                      const attrs = useAttrs()
                    </script>
                  `}
                </CodeView>
                <CodeView language='javascript'>
                  {`
                   export default {
                      setup(props, ctx) {
                        console.log(ctx.attrs)
                      }
                    }
                  `}
                </CodeView>
                <AlertPro type='warning'>
                  <div>需要通过 $attrs 显式的去绑定，如果没有被显式的绑定，将会抛出一个运行时警告</div>
                  <div>需要注意的是，虽然这里的 attrs 对象总是反映为最新的透传 attribute，但它并不是响应式的</div>
                </AlertPro>
              </AlertPro>
            </AnchorCard>,
          ],
        },
        {
          label: '事件',
          children: [
            <AnchorCard title='监听事件'>
              <AlertPro>
                <div>像监听 dom 事件一样监听自定义事件</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <MyComponent @some-event='callback' />
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='声明事件'>
              <AlertPro>
                <div>事件声明是可选的，组件要触发的事件可以显式地通过 defineEmits() 宏来声明</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    // 简单写法
                    defineEmits(['inFocus', 'submit'])

                    // 支持对触发事件的参数进行验证
                    defineEmits({
                      // 没有校验
                      click: null,

                      // 返回值表示参数验证是否通过
                      submit: ({ email, password }) => {
                        if (email && password) {
                          return true
                        } else {
                          console.warn('Invalid submit event payload!')
                          return false
                        }
                      }
                    })
                  </script>
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='触发事件'>
              <TabsPro
                items={[
                  {
                    label: 'template 中触发',
                    children: (
                      <CodeView language='html'>
                        {`
                          <button @click='$emit('my-event')'>Emit Event</button>
                        `}
                      </CodeView>
                    ),
                  },
                  {
                    label: 'script 里触发',
                    children: (
                      <CodeView language='html'>
                        {`
                          <script setup>
                            const emit = defineEmits(['inFocus', 'submit'])

                            function buttonClick() {
                              emit('submit')
                            }
                          </script>
                        `}
                      </CodeView>
                    ),
                  },
                ]}
              />
            </AnchorCard>,
            <AnchorCard title='事件参数'>
              <CodeView language='html'>
                {`
                  <!-- 组件里 带参数触发事件 -->
                  <button @click="$emit('increaseBy', 1)">
                    Increase by 1
                  </button>

                  <!-- 父组件-->
                  <MyButton @increase-by='(n) => count += n' />
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='配合 v-model 使用'>
              <AlertPro>
                <div>支持 v-model 的自定义组件</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                    <CustomInput v-model='searchText'/>

                    <!-- 会被编译为 -->
                    <CustomInput
                      :modelValue='searchText'
                      @update:modelValue='newValue => searchText = newValue'
                    />

                    <!-- 需要在组件内 -->
                    <script setup>
                      defineProps(['modelValue'])
                      defineEmits(['update:modelValue'])
                    </script>

                    <template>
                      <input
                        type='text'
                        :value='modelValue'
                        @input="$emit('update:modelValue', $event.target.value)"
                      />
                    </template>
                  `}
              </CodeView>
              <AlertPro>
                <div>多个 v-model 绑定</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                    <UserName
                      v-model:first-name.trim='first'
                      v-model:last-name='last'
                    />

                    <script setup>
                      const props = defineProps({
                        firstName: String,
                        lastName: String,
                        firstNameModifiers: { default: () => ({}) } // 用于接收修饰符
                      })
                      defineEmits(['update:firstName', 'update:lastName'])

                      console.log(props.firstNameModifiers) // { trim: true }
                    </script>

                    <template>
                      <input
                        type='text'
                        :value='firstName'
                        @input="$emit('update:firstName', $event.target.value)"
                      />
                      <input
                        type='text'
                        :value='lastName'
                        @input="$emit('update:lastName', $event.target.value)"
                      />
                    </template>
                  `}
              </CodeView>
            </AnchorCard>,
          ],
        },
        {
          label: '插槽',
          children: [
            <AnchorCard title='定义'>
              <AlertPro>
                <div>插槽是父组件提供给子组件的，作为子组件的一部分使用</div>
                <CodeView language='html'>
                  {`
                    <FancyButton>
                      Click me! <!-- 插槽内容 -->
                    </FancyButton>

                    <button class='fancy-btn'>
                      <slot></slot> <!-- 插槽出口 -->
                    </button>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='默认内容'>
              <AlertPro>
                <div>在外部没有提供任何内容的情况下，可以为插槽指定默认内容</div>
                <CodeView language='html'>
                  {`
                    <button type='submit'>
                      <slot>
                        Submit <!-- 默认内容 -->
                      </slot>
                    </button>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='具名插槽'>
              <AlertPro>
                <div>在一个组件中包含多个插槽出口</div>
                <CodeView language='html'>
                  {`
                    <!-- 子组件 -->
                    <div class='container'>
                      <header>
                        <slot name='header'></slot>
                      </header>
                      <main>
                        <slot></slot>
                      </main>
                      <footer>
                        <slot name='footer'></slot>
                      </footer>
                    </div>
                  `}
                </CodeView>
                <CodeView language='html'>
                  {`
                    <!-- 父组件 -->
                    <BaseLayout>
                      <template #header>
                        <h1>Here might be a page title</h1>
                      </template>

                      <template #default>
                        <p>A paragraph for the main content.</p>
                        <p>And another one.</p>
                      </template>

                        <!-- 隐式的默认插槽 与上面的 #default 二选一即可 -->
                        <p>A paragraph for the main content.</p>
                        <p>And another one.</p>

                      <template #footer>
                        <p>Here's some contact info</p>
                      </template>
                    </BaseLayout>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='动态插槽'>
              <CodeView language='html'>
                {`
                  <!-- 父组件 -->
                  <base-layout>
                    <template v-slot:[dynamicSlotName]>
                      ...
                    </template>

                    <!-- 缩写为 -->
                    <template #[dynamicSlotName]>
                      ...
                    </template>
                  </base-layout>
                  `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='渲染作用域'>
              <AlertPro>
                <div>插槽可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的</div>
                <CodeView language='html'>
                  {`
                    <span>{{ message }}</span>
                    <FancyButton>{{ message }}</FancyButton>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='作用域插槽'>
              <AlertPro>
                <div>在某些场景下，插槽可能想要使用子组件内的数据</div>
                <div>作用域插槽可以让子组件在渲染时将一部分数据提供给插槽</div>
                <CodeView language='html'>
                  {`
                    <!-- 子组件 -->
                    <div>
                      <slot :text='message' :count='1'></slot>
                    </div>
                  `}
                </CodeView>
                <CodeView language='html'>
                  {`
                    <!-- 父组件 -->
                    <!-- 默认插槽时，可以在组件上直接定义 v-slot -->
                    <MyComponent v-slot='slotProps'>
                      {{ slotProps.text }} {{ slotProps.count }}
                    </MyComponent>

                    <!-- 具名插槽时，在 template 定义 v-slot -->
                    <MyComponent>
                      <template v-slot='headerProps'>
                        {{ headerProps }}
                      </template>

                      <template v-slot='defaultProps'>
                        {{ defaultProps }}
                      </template>

                      <!-- 也可以使用简写 -->
                      <template #footer='footerProps'>
                        {{ footerProps }}
                      </template>
                    </MyComponent>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='无渲染组件'>
              <AlertPro>
                <div>一些组件只包含了逻辑，而没有自己渲染的内容，视图输出通过作用域插槽全权交给了消费者组件，这就是无渲染组件</div>
                <div>不过，大部分能用无渲染组件实现的功能，都可以通过组合式函数实现，并且还不会带来额外组件嵌套的开销</div>
                <CodeView language='html'>
                  {`
                    <MouseTracker v-slot='{ x, y }'>
                      Mouse is at: {{ x }}, {{ y }}
                    </MouseTracker>
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
          ],
        },
        {
          label: '生命周期',
          children: [
            <AlertPro>
              <div>生命周期钩子函数会在特定的阶段被调用，从而让我们有机会在 Vue 实例的生命周期中执行代码</div>
            </AlertPro>,
            <AnchorCard title='onBeforeMount'>
              <AlertPro>
                <div>注册一个钩子，在组件被挂载之前被调用</div>
                <br />
                <div>当这个钩子被调用时，组件已经完成了其响应式状态的设置</div>
                <div>但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='onMounted'>
              <AlertPro>
                <div>注册一个回调函数，在组件挂载完成后执行</div>
                <br />
                <div>组件在以下情况下被视为已挂载</div>
                <div>{`1. 其所有同步子组件都已经被挂载 (不包含异步组件或 <Suspense> 树内的组件)`}</div>
                <div>2. 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中</div>
                <br />
                <div>这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { ref, onMounted } from 'vue'

                    const el = ref()

                    onMounted(() => {
                      el.value // <div>
                    })
                  </script>

                  <template>
                    <div ref='el'></div>
                  </template>
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='onBeforeUpdate'>
              <AlertPro>
                <div>注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用</div>
                <br />
                <div>这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态</div>
                <div>在这个钩子中更改状态也是安全的</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='onUpdated'>
              <AlertPro>
                <div>注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树后执行</div>
                <br />
                <div>父组件的更新钩子将在其子组件的更新钩子之后调用</div>
                <div>这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的</div>
                <div>如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代</div>
                <br />
                <div>这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { ref, onUpdated } from 'vue'

                    const count = ref(0)

                    onUpdated(() => {
                      // 文本内容应该与当前的 count.value 一致
                      console.log(document.getElementById('count').textContent)
                    })
                  </script>

                  <template>
                    <button id='count' @click='count++'>{{ count }}</button>
                  </template>
                `}
              </CodeView>
              <AlertPro type='warning'>不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环！</AlertPro>
            </AnchorCard>,
            <AnchorCard title='onBeforeUnmount'>
              <AlertPro>
                <div>注册一个钩子，在组件实例被卸载之前调用</div>
                <div>当这个钩子被调用时，组件实例依然还保有全部的功能</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='onUnmounted'>
              <AlertPro>
                <div>注册一个回调函数，在组件实例被卸载之后调用</div>
                <br />
                <div>一个组件在以下情况下被视为已卸载</div>
                <div>1. 其所有子组件都已经被卸载</div>
                <div>2. 所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止</div>
                <br />
                <div>可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { onMounted, onUnmounted } from 'vue'

                    let intervalId
                    onMounted(() => {
                      intervalId = setInterval(() => {
                        // ...
                      })
                    })

                    onUnmounted(() => clearInterval(intervalId))
                  </script>
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='onActivated'>
              <AlertPro>
                <div>{`注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用`}</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='onDeactivated'>
              <AlertPro>
                <div>{`注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用`}</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='onServerPrefetch'>
              <AlertPro>
                <div>注册一个异步函数，在组件实例在服务器上被渲染之前调用</div>
                <br />
                <div>如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成</div>
                <div>这个钩子仅会在服务端渲染中执行，可以用于执行一些仅存在于服务端的数据抓取过程</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { ref, onServerPrefetch, onMounted } from 'vue'

                    const data = ref(null)

                    onServerPrefetch(async () => {
                      // 组件作为初始请求的一部分被渲染
                      // 在服务器上预抓取数据，因为它比在客户端上更快。
                      data.value = await fetchOnServer(/* ... */)
                    })

                    onMounted(async () => {
                      if (!data.value) {
                        // 如果数据在挂载时为空值，这意味着该组件
                        // 是在客户端动态渲染的。将转而执行
                        // 另一个客户端侧的抓取请求
                        data.value = await fetchOnClient(/* ... */)
                      }
                    })
                  </script>
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='onErrorCaptured'>
              <AlertPro>
                <div>注册一个钩子，在捕获了后代组件传递的错误时调用</div>
                <br />
                <div>可以在 errorCaptured() 中更改组件状态来为用户显示一个错误状态</div>
                <div>注意不要让错误状态再次渲染导致本次错误的内容，否则组件会陷入无限循环</div>
              </AlertPro>
              <AlertPro>
                <div>这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串</div>
                <div>可以通过返回 false 来阻止错误继续向上传递</div>
                <div>可以捕获以下几个来源中的错误:</div>
                <div>1. 组件渲染</div>
                <div>2. 事件处理器</div>
                <div>3. 生命周期钩子</div>
                <div>4. setup() 函数</div>
                <div>5. 侦听器</div>
                <div>6. 自定义指令钩子</div>
                <div>7. 过渡钩子</div>
              </AlertPro>
              <CodeView language='typescript'>
                {`
                    function onErrorCaptured(callback: ErrorCapturedHook): void;

                    type ErrorCapturedHook = (
                      err: unknown,
                      instance: ComponentPublicInstance | null,
                      info: string
                    ) => boolean | void
                  `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='onRenderTracked'>
              <AlertPro>
                <div>注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用</div>
                <div>这个钩子仅在开发模式下可用</div>
              </AlertPro>
              <CodeView language='typescript'>
                {`
                    function onRenderTracked(callback: DebuggerHook): void

                    type DebuggerHook = (e: DebuggerEvent) => void

                    type DebuggerEvent = {
                      effect: ReactiveEffect
                      target: object
                      type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
                      key: any
                    }
                  `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='onRenderTriggered'>
              <AlertPro>
                <div>注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用</div>
                <div>这个钩子仅在开发模式下可用</div>
              </AlertPro>
              <CodeView language='typescript'>
                {`
                  function onRenderTriggered(callback: DebuggerHook): void;

                  type DebuggerHook = (e: DebuggerEvent) => void;

                  type DebuggerEvent = {
                    effect: ReactiveEffect,
                    target: object,
                    type: TriggerOpTypes, /* 'set' | 'add' | 'delete' | 'clear' */
                    key: any,
                    newValue?: any,
                    oldValue?: any,
                    oldTarget?: Map<any, any> | Set<any>,
                  }
                `}
              </CodeView>
            </AnchorCard>,
          ],
        },
        {
          label: '内置组件',
          children: (
            <TabsPro
              items={[
                {
                  label: 'Transition',
                  children: [
                    <AnchorCard title='用法'>
                      <AlertPro>
                        <div>是一个内置组件，它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上，由以下条件触发：</div>
                        <div>1. 由 v-if 所触发的切换</div>
                        <div>2. 由 v-show 所触发的切换</div>
                        <div>{`3. 由特殊元素 <component> 切换的动态组件`}</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                    <button @click='show = !show'>Toggle</button>
                    <Transition>
                      <p v-if='show'>hello</p>
                    </Transition>
                  `}
                      </CodeView>
                      <CodeView language='css'>
                        {`
                    .v-enter-active,
                    .v-leave-active {
                      transition: opacity 0.5s ease;
                    }

                    .v-enter-from,
                    .v-leave-to {
                      opacity: 0;
                    }
                  `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='参数'>
                      <ParamsTable
                        data={[
                          { label: 'v-enter-from', desc: '进入动画的起始状态', effect: '在元素插入之前添加', attach: '元素插入完成后的下一帧移除' },
                          {
                            label: 'v-enter-active',
                            desc: '进入动画的生效状态，应用于整个进入动画阶段',
                            effect: '在元素被插入之前添加',
                            attach: '在过渡或动画完成之后移除',
                          },
                          {
                            label: 'v-enter-to',
                            desc: '进入动画的结束状态',
                            effect: '在元素插入完成后的下一帧被添加 (也就是 v-enter-from 被移除的同时)',
                            attach: '在过渡或动画完成之后移除',
                          },
                          { label: 'v-leave-from', desc: '离开动画的起始状态', effect: '在离开过渡效果被触发时立即添加', attach: '在一帧后被移除' },
                          {
                            label: 'v-leave-active',
                            desc: '离开动画的生效状态。应用于整个离开动画阶段',
                            effect: '在离开过渡效果被触发时立即添加',
                            attach: '在过渡或动画完成之后移除',
                          },
                          {
                            label: 'v-leave-to',
                            desc: '离开动画的结束状态',
                            effect: '在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时)',
                            attach: '在过渡或动画完成之后移除',
                          },
                        ]}
                      />
                    </AnchorCard>,
                    <AnchorCard title='为过渡效果命名'>
                      <AlertPro>
                        <div>{`可以给 <Transition> 组件传一个 name prop 来声明一个过渡效果名`}</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                    <Transition name='fade'>
                      ...
                    </Transition>
                  `}
                      </CodeView>
                      <CodeView language='css'>
                        {`
                    /* 进入和离开动画可以使用不同的持续时间和速度曲线 */
                    .fade-enter-active {
                      transition: all 0.3s ease-out;
                    }

                    .fade-leave-active {
                      transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
                    }

                    .fade-enter-from,
                    .fade-leave-to {
                      opacity: 0;
                    }
                  `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='CSS 的 animation'>
                      <CodeView language='html'>
                        {`
                    <Transition name='bounce'>
                      <p v-if='show' style='text-align: center;'>
                        Hello here is some bouncy text!
                      </p>
                    </Transition>
                  `}
                      </CodeView>
                      <CodeView language='css'>
                        {`
                    .bounce-enter-active {
                      animation: bounce-in 0.5s;
                    }
                    .bounce-leave-active {
                      animation: bounce-in 0.5s reverse;
                    }
                    @keyframes bounce-in {
                      0% {
                        transform: scale(0);
                      }
                      50% {
                        transform: scale(1.25);
                      }
                      100% {
                        transform: scale(1);
                      }
                    }
                  `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='自定义过渡 class'>
                      <AlertPro>在 Vue 的动画机制下集成其他的第三方 CSS 动画库</AlertPro>
                      <CodeView language='html'>
                        {`
                    <!-- 假设你已经在页面中引入了 Animate.css -->
                    <Transition
                      name='custom-classes'
                      enter-active-class='animate__animated animate__tada'
                      leave-active-class='animate__animated animate__bounceOutRight'
                    >
                      <p v-if='show'>hello</p>
                    </Transition>
                  `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='JavaScript 钩子'>
                      <AlertPro>{`你可以通过监听 <Transition> 组件事件的方式在过渡过程中挂上钩子函数`}</AlertPro>
                      <CodeView language='html'>
                        {`
                          <Transition
                            :css='false'
                            @before-enter='onBeforeEnter'
                            @enter='onEnter'
                            @after-enter='onAfterEnter'
                            @enter-cancelled='onEnterCancelled'
                            @before-leave='onBeforeLeave'
                            @leave='onLeave'
                            @after-leave='onAfterLeave'
                            @leave-cancelled='onLeaveCancelled'
                          >
                            <!-- ... -->
                          </Transition>
                        `}
                      </CodeView>
                      <CodeView language='javascript'>
                        {`
                          // 在元素被插入到 DOM 之前被调用
                          // 用这个来设置元素的 "enter-from" 状态
                          function onBeforeEnter(el) {}

                          // 在元素被插入到 DOM 之后的下一帧被调用
                          // 用这个来开始进入动画
                          function onEnter(el, done) {
                            // 调用回调函数 done 表示过渡结束
                            // 如果与 CSS 结合使用，则这个回调是可选参数
                            done()
                          }

                          // 当进入过渡完成时调用。
                          function onAfterEnter(el) {}
                          function onEnterCancelled(el) {}

                          // 在 leave 钩子之前调用
                          // 大多数时候，你应该只会用到 leave 钩子
                          function onBeforeLeave(el) {}

                          // 在离开过渡开始时调用
                          // 用这个来开始离开动画
                          function onLeave(el, done) {
                            // 调用回调函数 done 表示过渡结束
                            // 如果与 CSS 结合使用，则这个回调是可选参数
                            done()
                          }

                          // 在离开过渡完成、
                          // 且元素已从 DOM 中移除时调用
                          function onAfterLeave(el) {}

                          // 仅在 v-show 过渡中可用
                          function onLeaveCancelled(el) {}
                        `}
                      </CodeView>
                    </AnchorCard>,
                  ],
                },
                {
                  label: 'TransitionGroup',
                  children: [
                    <AnchorCard title='用法'>
                      <AlertPro>
                        <div>{`<TransitionGroup> 是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果`}</div>
                        <div>{`和 <Transition> 的区别`}</div>
                        <div>1. 默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop 来指定一个元素作为容器元素来渲染</div>
                        <div>2. 过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换</div>
                        <div>3. 列表中的每个元素都必须有一个独一无二的 key attribute</div>
                        <div>4. CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <TransitionGroup name='list' tag='ul'>
                            <li v-for='item in items' :key='item'>
                              {{ item }}
                            </li>
                          </TransitionGroup>
                        `}
                      </CodeView>
                      <CodeView language='css'>
                        {`
                          .list-move, /* 对移动中的元素应用的过渡 */
                          .list-enter-active,
                          .list-leave-active {
                            transition: all 0.5s ease;
                          }

                          .list-enter-from,
                          .list-leave-to {
                            opacity: 0;
                            transform: translateX(30px);
                          }

                          /* 确保将离开的元素从布局流中删除
                            以便能够正确地计算移动的动画。 */
                          .list-leave-active {
                            position: absolute;
                          }
                        `}
                      </CodeView>
                    </AnchorCard>,
                  ],
                },
                {
                  label: 'KeepAlive',
                  children: [
                    <AnchorCard title='用法'>
                      <AlertPro>
                        <div>{`<KeepAlive> 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例`}</div>
                      </AlertPro>
                      <AlertPro>
                        <div>默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态</div>
                        <div>当这个组件再一次被显示时，会创建一个只带有初始状态的新实例</div>
                        <br />
                        <div>在切换时创建新的组件实例通常是有意义的，想要组件能在被“切走”的时候保留它们的状态</div>
                        <div>{`要解决这个问题，我们可以用 <KeepAlive> 内置组件将这些动态组件包装起来`}</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <!-- 非活跃的组件将会被缓存！ -->
                          <KeepAlive>
                            <component :is='activeComponent' />
                          </KeepAlive>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='包含/排除'>
                      <AlertPro>
                        <div>可以通过 include 和 exclude prop 来控制 KeepAlive 的缓存行为</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <!-- 以英文逗号分隔的字符串 -->
                          <KeepAlive include='a,b'>
                            <component :is='view' />
                          </KeepAlive>

                          <!-- 正则表达式 (需使用 'v-bind') -->
                          <KeepAlive :include='/a|b/'>
                            <component :is='view' />
                          </KeepAlive>

                          <!-- 数组 (需使用 'v-bind') -->
                          <KeepAlive :include="['a', 'b']">
                            <component :is='view' />
                          </KeepAlive>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='最大缓存实例数'>
                      <AlertPro>
                        <div>可以通过 max 来限制可被缓存的最大组件实例数</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <KeepAlive :max='10'>
                            <component :is='activeComponent' />
                          </KeepAlive>
                        `}
                      </CodeView>
                    </AnchorCard>,
                  ],
                },
                {
                  label: 'Teleport',
                  children: [
                    <AnchorCard title='用法'>
                      <AlertPro>
                        <div>{`<Teleport> 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去`}</div>
                      </AlertPro>
                      <AlertPro>
                        <div>有时我们可能会遇到这样的场景：一个组件模板的一部分在逻辑上从属于该组件</div>
                        <div>但从整个应用视图的角度来看，它在 DOM 中应该被渲染在整个 Vue 应用外部的其他地方</div>
                        <br />
                        <div>常见的例子就是全屏的模态框</div>
                        <div>我们希望触发模态框的按钮和模态框本身是在同一个组件中，因为它们都与组件的开关状态有关</div>
                        <div>但这意味着该模态框将与按钮一起渲染在应用 DOM 结构里很深的地方</div>
                        <div>这会导致该模态框的 CSS 布局代码很难写</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <button @click='open = true'>Open Modal</button>

                          <!-- 这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下” -->
                          <Teleport to='body'>
                            <div v-if='open' class='modal'>
                              <p>Hello from the modal!</p>
                              <button @click='open = false'>Close</button>
                            </div>
                          </Teleport>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='禁用 Teleport'>
                      <AlertPro>
                        <div>{`在某些场景下可能需要视情况禁用 <Teleport>`}</div>
                        <div>举例来说，我们想要在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <Teleport :disabled='isMobile'>
                            ...
                          </Teleport>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='最大缓存实例数'>
                      <AlertPro>
                        <div>可以通过 max 来限制可被缓存的最大组件实例数</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <KeepAlive :max='10'>
                            <component :is='activeComponent' />
                          </KeepAlive>
                        `}
                      </CodeView>
                    </AnchorCard>,
                  ],
                },
                {
                  label: 'Suspense',
                  children: [
                    <AnchorCard title='用法'>
                      <AlertPro>
                        <div>{`<Suspense> 是一个内置组件，用来在组件树中协调对异步依赖的处理`}</div>
                        <div>它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态</div>
                      </AlertPro>
                      <AlertPro>
                        <div>在这个组件树中有多个嵌套组件，这其中可能包含多个异步组件</div>
                        <div>{'如果没有 <Suspense>，则它们每个都需要处理自己的加载、报错和完成状态'}</div>
                        <div>在最坏的情况下，我们可能会在页面上看到多个旋转的加载态，在不同的时间显示出内容</div>
                        <br />
                        <div>{'有了 <Suspense> 组件后，就可以在等待整个多层级组件树中的各个异步依赖获取结果时，在顶层展示出加载中或加载失败的状态'}</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <Suspense>
                            <!-- 具有异步依赖的深层组件 -->
                            <Dashboard />

                            <!-- 在 #fallback 插槽中显示 “正在加载中” -->
                            <template #fallback>
                              Loading...
                            </template>
                          </Suspense>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='和其他组件结合'>
                      <AlertPro>
                        <div>保证这些组件都能正常工作，嵌套的顺序非常重要</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <RouterView v-slot='{ Component }'>
                            <template v-if='Component'>
                              <Transition mode='out-in'>
                                <KeepAlive>
                                  <Suspense>
                                    <!-- 主要内容 -->
                                    <component :is='Component'></component>

                                    <!-- 加载中状态 -->
                                    <template #fallback>
                                      正在加载...
                                    </template>
                                  </Suspense>
                                </KeepAlive>
                              </Transition>
                            </template>
                          </RouterView>
                        `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='最大缓存实例数'>
                      <AlertPro>
                        <div>可以通过 max 来限制可被缓存的最大组件实例数</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                          <KeepAlive :max='10'>
                            <component :is='activeComponent' />
                          </KeepAlive>
                        `}
                      </CodeView>
                    </AnchorCard>,
                  ],
                },
              ]}
            />
          ),
        },
      ]}
    />,
  ]
}
