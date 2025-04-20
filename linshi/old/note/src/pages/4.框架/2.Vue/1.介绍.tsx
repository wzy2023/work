import React from 'react'
import { AlertPro, AnchorCard, Button, CodeView, ParamsTable, ReferenceLink, SpacePro, TabsPro } from '@/components'

export default () => {
  return [
    <AnchorCard title='介绍'>
      <AlertPro>
        <div>Vue 是一套用于构建用户界面的 JavaScript 框架</div>
        <div>它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型</div>
      </AlertPro>
      <CodeView language='javascript'>
        {`
          import { createApp } from 'vue'

          createApp({
            data() {
              return {
                count: 0
              }
            }
          }).mount('#app')
        `}
      </CodeView>
      <CodeView language='html'>
        {`
          <div id='app'>
            <button @click='count++'>
              Count is: {{ count }}
            </button>
          </div>
        `}
      </CodeView>
      <AnchorCard title='核心功能'>
        <AlertPro message='声明式渲染'>
          <div>Vue 基于标准 HTML 拓展了一套模板语法</div>
          <div>使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系</div>
        </AlertPro>
        <AlertPro message='响应性'>
          <div>Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM</div>
        </AlertPro>
      </AnchorCard>
      <AnchorCard title='渐进式框架'>
        <AlertPro>
          <div>Vue 是一个框架，也是一个生态。</div>
          <div>其功能覆盖了大部分前端开发常见的需求。</div>
          <div>但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。</div>
          <div>考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。</div>
          <div>根据你的需求场景，你可以用不同的方式使用 Vue</div>
          <br />
          <div>1. 无需构建步骤，渐进式增强静态的 HTML</div>
          <div>2. 在任何页面中作为 Web Components 嵌入</div>
          <div>3. 单页应用 (SPA)</div>
          <div>4. 全栈 / 服务端渲染 (SSR)</div>
          <div>5. Jamstack / 静态站点生成 (SSG)</div>
          <div>6. 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</div>
        </AlertPro>
      </AnchorCard>
      <AnchorCard title='模板语法'>
        <AlertPro>
          <div>Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上</div>
          <div>所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析</div>
          <br />
          <div>在底层的实现上，Vue 会将模板编译渲染虚拟 DOM 函数的 JavaScript 代码</div>
          <div>结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少</div>
          <br />
          <div>你也可以结合 JSX 直接手写渲染函数而不采用模板</div>
          <div>但请注意，这将不会享受到和模板同等级别的编译时优化</div>
          <br />
          <div>模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date</div>
          <div>没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性</div>
          <div>然而，你也可以自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用</div>
        </AlertPro>
      </AnchorCard>
    </AnchorCard>,
    <AnchorCard title='安装'>
      <AnchorCard title='NPM 方式'>
        <CodeView language='bash'>
          {`
          npm init vue@latest
          cd ./your-project-name
          npm install
          npm run dev
          npm run build
        `}
        </CodeView>
      </AnchorCard>
      <AnchorCard title='CDN 方式'>
        <TabsPro
          onChange={null}
          items={[
            {
              label: '全局构建版本',
              children: (
                <CodeView language='html'>
                  {`
                    <script src='https://unpkg.com/vue@3/dist/vue.global.js'></script>

                    <div id='app'>{{ message }}</div>

                    <script>
                      const { createApp } = Vue

                      createApp({
                        data() {
                          return {
                            message: 'Hello Vue!'
                          }
                        }
                      }).mount('#app')
                    </script>
                  `}
                </CodeView>
              ),
            },
            {
              label: 'ESM 模块构建版本',
              children: (
                <CodeView language='html'>
                  {`
                    <div id='app'>{{ message }}</div>

                    <script type='module'>
                      import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

                      createApp({
                        data() {
                          return {
                            message: 'Hello Vue!'
                          }
                        }
                      }).mount('#app')
                    </script>
                  `}
                </CodeView>
              ),
            },
          ]}
        />
      </AnchorCard>
    </AnchorCard>,
  ]
}
