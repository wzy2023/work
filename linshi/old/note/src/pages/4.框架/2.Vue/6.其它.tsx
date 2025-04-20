import React from 'react'
import { AlertPro, AnchorCard, CodeView, TabsPro } from '@/components'

export default () => (
  <TabsPro
    clearMenuOnChange
    items={[
      {
        label: '特殊元素',
        children: (
          [
            <AnchorCard title='component'>
              <AlertPro>
                <div>一个用于渲染动态组件或元素的“元组件”，要渲染的实际组件由 is prop 决定</div>
                <div>is 可以是字符串，它既可以是 HTML 标签名也可以是组件的注册名</div>
                <div>is 也可以直接绑定到组件的定义</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import Foo from './Foo.vue'
                    import Bar from './Bar.vue'

                    export default {
                      components: { Foo, Bar },
                      data() {
                        return {
                          view: 'Foo'
                        }
                      }
                    }
                  </script>

                  <template>
                    <component :is="href ? 'a' : 'span'" />
                    <component :is='view' />
                    <component :is='Foo' />
                  </template>
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='slot'>
              <AlertPro>
                <div>表示模板中的插槽内容出口，元素本身将被其所匹配的插槽内容替换</div>
                <div>可以使用 name attribute 来指定使用的插槽</div>
                <div>当没有指定 name 时，将使用默认插槽</div>
                <div>{'传递给 <slot /> 的附加 attributes 将作为插槽 props，传递给父级中定义的作用域插槽'}</div>
              </AlertPro>
            </AnchorCard>,
          ]
        ),
      },
      {
        label: '特殊 attribute',
        children: (
          <TabsPro
            items={[
              {
                label: 'ref',
                children: (
                  [
                    <AnchorCard title='介绍'>
                      <AlertPro>
                        <div>ref 是一个特殊的 attribute，它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                  <script setup>
                    import { ref, onMounted } from 'vue'

                    // 声明一个 ref 来存放该元素的引用
                    // 必须和模板里的 ref 同名
                    const input = ref(null)

                    onMounted(() => {
                      input.value.focus()
                    })
                  </script>

                  <template>
                    <input ref='input' />
                  </template>
                `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='v-for 中使用'>
                      <AlertPro>
                        <div>当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                  <script setup>
                    import { ref, onMounted } from 'vue'

                    const list = ref([
                      /* ... */
                    ])

                    const itemRefs = ref([])

                    onMounted(() => console.log(itemRefs.value))
                  </script>

                  <template>
                    <ul>
                      <li v-for='item in list' ref='itemRefs'>
                        {{ item }}
                      </li>
                    </ul>
                  </template>
                `}
                      </CodeView>
                      <AlertPro type='warning'>
                        <div>应该注意的是，ref 数组并不保证与源数组相同的顺序</div>
                      </AlertPro>
                    </AnchorCard>,
                    <AnchorCard title='函数模板引用'>
                      <AlertPro>
                        <div>除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用</div>
                        <div>当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null</div>
                        <div>该函数会收到元素引用作为其第一个参数</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                  <input :ref='(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }'>
                `}
                      </CodeView>
                    </AnchorCard>,
                    <AnchorCard title='组件上的 ref'>
                      <AlertPro>
                        <div>模板引用也可以被用在一个子组件上</div>
                      </AlertPro>
                      <CodeView language='html'>
                        {`
                  <script setup>
                    import { ref, onMounted } from 'vue'
                    import Child from './Child.vue'

                    const child = ref(null)

                    onMounted(() => {
                      // child.value 是 <Child /> 组件的实例
                    })
                  </script>

                  <template>
                    <Child ref='child' />
                  </template>
                `}
                      </CodeView>
                      <AlertPro>
                        <div>{`如果一个子组件使用的是选项式 API 或没有使用 <script setup>`}</div>
                        <div>被引用的组件实例和该子组件的 this 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权</div>
                        <div>这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易</div>
                        <div>当然也因此，应该只在绝对需要时才使用组件引用</div>
                        <div>大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互</div>
                        <br />
                        <div>{`使用了 <script setup> 的组件是默认私有的`}</div>
                        <div>{`一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西`}</div>
                        <div>除非子组件在其中通过 defineExpose 宏显式暴露</div>
                        <CodeView language='html'>
                          {`
                    <script setup>
                      import { ref } from 'vue'

                      const a = 1
                      const b = ref(2)

                      defineExpose({
                        a,
                        b
                      })
                    </script>
                  `}
                        </CodeView>
                      </AlertPro>
                    </AnchorCard>,
                  ]
                ),
              },
            ]}
          />
        ),
      },
      {
        label: '插件',
        children: (
          [
            <AnchorCard title='介绍'>
              <AlertPro>
                <div>插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码，它可以：</div>
                <div>1. 通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令</div>
                <div>2. 通过 app.provide() 使一个资源注入进整个应用</div>
                <div>3. 向 app.config.globalProperties 中添加一些全局实例属性或方法</div>
              </AlertPro>
              <CodeView>
                {`
                  import { createApp } from 'vue'

                  const app = createApp({})

                  app.use(myPlugin, {
                    /* 传递给插件的选项 */
                  })
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='编写插件'>
              <AlertPro>
                <div>一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身</div>
                <div>install() 会收到安装它的应用实例和传递给 app.use() 的插件选项作为参数</div>
                <div>以下是一个 i18n 翻译插件的简单示例</div>
              </AlertPro>
              <CodeView>
                {`
                  // plugins/i18n.js
                  export default {
                    install: (app, options) => {
                      app.config.globalProperties.$translate = (key) => {
                        return key.split('.').reduce((o, i) => {
                          if (o) return o[i]
                        }, options)
                      }

                      app.provide('i18n', options)
                    }
                  }
                `}
              </CodeView>
              <CodeView>
                {`
                  // 注册插件
                  import i18nPlugin from './plugins/i18n'

                  app.use(i18nPlugin, {
                    greetings: {
                      hello: 'Bonjour!' // 这里应该根据当前语言返回不同的字符串
                    }
                  })
                `}
              </CodeView>
              <CodeView language='html'>
                {`
                  <!-- 使用插件 -->
                  <script setup>
                    import { inject } from 'vue'

                    const i18n = inject('i18n')

                    console.log(i18n.greetings.hello)
                  </script>

                  <h1>{{ $translate('greetings.hello') }}</h1>
                `}
              </CodeView>
            </AnchorCard>,
          ]
        ),
      },
      {
        label: '其它',
        children: (
          [
            <AnchorCard title='DOM 更新时机'>
              <AlertPro>
                <div>当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的</div>
                <div>相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次</div>
                <div>若要等待一个状态改变后的 DOM 更新完成，你可以使用 nextTick() 这个全局 API</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='错误处理'>
              <AlertPro>
                <div>默认情况下，所有的错误都会被发送到应用级的 app.config.errorHandler (前提是这个函数已经定义)</div>
                <div>这样这些错误都能在一个统一的地方报告给分析服务</div>
                <br />
                <div>如果组件的继承链或组件链上存在多个 onErrorCaptured 钩子，对于同一个错误，这些钩子会被按从底至上的顺序一一调用</div>
                <div> 这个过程被称为“向上传递”，类似于原生DOM 事件的冒泡机制</div>
                <br />
                <div>如果 errorCaptured 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 app.config.errorHandler</div>
                <br />
                <div>errorCaptured 钩子可以通过返回 false 来阻止错误继续向上传递，即表示“这个错误已经被处理了，应当被忽略”</div>
                <div>它将阻止其他的 errorCaptured钩子或 app.config.errorHandler 因这个错误而被调用</div>
              </AlertPro>
            </AnchorCard>,
          ]
        ),
      },
    ]}
  />
)
