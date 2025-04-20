import React from 'react'
import { AlertPro, AnchorCard, Button, CodeView, ImagePro, ParamsTable, ReferenceLink, SpacePro, TabsPro } from '@/components'

export default () => {
  return [
    <TabsPro
      clearMenuOnChange={true}
      items={[
        {
          label: 'reactive()',
          children: [
            <AnchorCard title='响应式对象'>
              <AlertPro>
                <div>可以用 reactive() 创建一个响应式对象或数组</div>
                <div>响应式对象其实是 JavaScript Proxy，其行为表现与一般对象相似</div>
                <div>不同之处在于 Vue 能够跟踪对响应式对象属性的访问与更改操作</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='响应式对象 vs 原始对象'>
              <AlertPro message='不相等'>
                <div>reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的</div>
                <div>并且，只有代理对象是响应式的，修改原始对象不会触发更新</div>
                <CodeView language='javascript'>
                  {`
                    const raw = {}
                    const proxy = reactive(raw)

                    console.log(proxy === raw) // false
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='一致性'>
                <div>为保证访问代理的一致性</div>
                <div>对一个原始对象调用 reactive() 总是返回同样的代理对象</div>
                <div>对一个代理对象调用 reactive() 会返回其本身</div>
                <CodeView language='javascript'>
                  {`
                    // 在同一个对象上调用 reactive() 会返回相同的代理
                    console.log(reactive(raw) === proxy) // true

                    // 在一个代理上调用 reactive() 会返回它自己
                    console.log(reactive(proxy) === proxy) // true
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='响应性'>
              <AnchorCard title='深层响应性'>
                <AlertPro>
                  <div>响应性默认都是深层的，在更改对象或数组的深层次属性时，改动也能被跟踪到</div>
                </AlertPro>
              </AnchorCard>
              <AnchorCard title='浅层响应性'>
                <AlertPro>
                  <div>可以通过 shallowReactive() 创建一个浅层响应式对象</div>
                  <div>它们仅在对象的顶层属性具有响应性，一般仅在某些特殊场景中需要</div>
                </AlertPro>
              </AnchorCard>
            </AnchorCard>,
            <AnchorCard title='局限性'>
              <AnchorCard title='原始类型不可使用'>
                <AlertPro>
                  <div>响应性对 string、number 和 boolean 这样的 原始类型 无效</div>
                  <div>仅对对象类型有效 (对象、数组和 Map、Set 这样的集合类型)</div>
                </AlertPro>
              </AnchorCard>
              <AnchorCard title='需要保持对响应式对象的相同引用'>
                <AlertPro>
                  <div>因为 Vue 的响应式系统是通过属性访问进行追踪的，因此必须始终保持对该响应式对象的相同引用</div>
                  <div>这意味着不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失</div>
                  <div>通用，当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们也会失去响应性</div>
                  <CodeView language='javascript'>
                    {`
                      let state = reactive({ count: 0 })

                      // 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
                      state = reactive({ count: 1 })

                      // n 是一个局部变量，同 state.count
                      // 失去响应性连接
                      let n = state.count
                      // 不影响原始的 state
                      n++

                      // count 也和 state.count 失去了响应性连接
                      let { count } = state
                      // 不会影响原始的 state
                      count++

                      // 该函数接收一个普通数字，并且
                      // 将无法跟踪 state.count 的变化
                      callSomeFunction(state.count)
                    `}
                  </CodeView>
                </AlertPro>
              </AnchorCard>
            </AnchorCard>,
          ],
        },
        {
          label: 'ref()',
          children: [
            <AnchorCard title='ref()'>
              <AlertPro>
                <div>reactive() 的种种限制是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制</div>
                <div>Vue 提供了一个 ref() 方法来创建可以使用任何值类型的响应式对象</div>
                <div>ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象</div>
              </AlertPro>
              <CodeView language='javascript'>
                {`
                  import { ref } from 'vue'

                  const count = ref(0)
                  const count = ref(0)

                  console.log(count) // { value: 0 }
                  console.log(count.value) // 0

                  count.value++
                  console.log(count.value) // 1
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='优点'>
              <AlertPro message='可以响应式地替换整个对象'>
                <CodeView language='javascript'>
                  {`
                    const objectRef = ref({ count: 0 })

                    // 这是响应式的替换
                    objectRef.value = { count: 1 }
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='被传递给函数或是被解构时，不会丢失响应性'>
                <CodeView language='javascript'>
                  {`
                    const obj = {
                      foo: ref(1),
                      bar: ref(2)
                    }

                    // 该函数接收一个 ref
                    // 需要通过 .value 取值
                    // 但它会保持响应性
                    callSomeFunction(obj.foo)

                    // 仍然是响应式的
                    const { foo, bar } = obj
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='解包'>
              <AlertPro message='在模板中解包'>
                <div>在模板中自动解包的 2 个条件</div>
                <div>1. 是顶层属性</div>
                <div>{`2. 是深层属性，在 {{}} 中使用，且没有发生计算`}</div>
                <CodeView language='html'>
                  {`
                    <!-- 当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包” -->
                    const count = ref(1)
                    <button v-on:click='increment'>
                      // {{ count }}
                    </button>

                    <!-- 不是顶层属性时，需要使用 .value -->
                    const object = { foo: ref(1) }
                    {{ object.foo.value }}

                    <!-- 或者在 {{}} 中使用，也会被自动“解包” -->
                    {{ object.foo }}

                    <!-- 除非发生计算，需要使用 .value -->
                    {{ object.foo.value + 1 }}
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='在响应式对象中解包'>
                <div>当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包</div>
                <CodeView language='html'>
                  {`
                    const count = ref(0)
                    const state = reactive({ count })

                    console.log(state.count) // 0

                    state.count = 1
                    console.log(count.value) // 1
                  `}
                </CodeView>
                <div>但是，当 ref 被嵌套在响应式数组或像 Map 这种原生集合类型的元素被访问时，它不会自动解包</div>
                <CodeView language='html'>
                  {`
                    const books = reactive([ref('Vue 3 Guide')])
                    // 需要 .value
                    console.log(books[0].value)

                    const map = reactive(new Map([['count', ref(0)]]))
                    // 需要 .value
                    console.log(map.get('count').value)
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='语法糖'>
                <div>用 $ref() 方法，通过编译时转换，可以让编译器帮我们省去使用 .value 的麻烦</div>
                <div>这是一个编译时的宏命令：它不是一个真实的、在运行时会调用的方法</div>
                <div>而是用作 Vue 编译器的标记，编译器会将使用该命令的的变量处理为 .vlaue 的形式</div>
              </AlertPro>
            </AnchorCard>,
          ],
        },
        {
          label: '计算属性',
          children: [
            <AnchorCard title='computed'>
              <AlertPro>
                <div>计算属性可以用来描述依赖响应式状态的复杂逻辑，它能够自动追踪响应式依赖</div>
                <div>期望接收一个 getter 函数，返回值为一个计算属性 ref，需要通过 .value 取值</div>
              </AlertPro>
              <CodeView>
                {`
                  const publishedBooksMessage = computed(() => {
                    return author.books.length > 0 ? 'Yes' : 'No'
                  })
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='计算属性 vs 方法返回值'>
              <AlertPro message='缓存'>
                <div>若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，</div>
                <div>然而，不同之处在于计算属性值会基于其响应式依赖被缓存，一个计算属性仅会在其响应式依赖更新时才重新计算。</div>
                <div>这意味着只要 author.books 不改变，无论多少次访问 publishedBooksMessage 都会立即返回先前的计算结果，</div>
                <div>而不用重复执行 getter 函数</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='可写计算属性'>
              <AlertPro>
                <div>计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告</div>
                <div>只在某些特殊场景中才可能需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { ref, computed } from 'vue'

                    const firstName = ref('John')
                    const lastName = ref('Doe')

                    const fullName = computed({
                      // getter
                      get() {
                        return firstName.value + ' ' + lastName.value
                      },
                      // setter
                      set(newValue) {
                        [firstName.value, lastName.value] = newValue.split(' ')
                      }
                    })
                  </script>
                `}
              </CodeView>
            </AnchorCard>,
          ],
        },
        {
          label: '侦听器',
          children: [
            <AnchorCard title='watch'>
              <AlertPro>
                <div>侦听器是一种响应式机制，可以在状态变化时执行一些“副作用”</div>
                <div>watch() 是懒执行的：仅当数据源变化时，才会执行回调</div>
                <CodeView language='javascript'>
                  {`
                    const x = ref(0)
                    const y = ref(0)

                    // 单个 ref
                    watch(x, (newX) => {
                      console.log(\`x is \${newX}\`)
                    })
                `}
                </CodeView>
              </AlertPro>
              <AlertPro message='侦听数据源类型'>
                <CodeView language='javascript'>
                  {`
                    const x = ref(0)
                    const y = ref(0)

                    // 单个 ref
                    watch(x, (newX) => {
                      console.log(\`x is \${newX}\`)
                    })

                    // getter 函数
                    watch(
                      () => x.value + y.value,
                      (sum) => {
                        console.log(\`sum of x + y is: \${sum}\`)
                      }
                    )

                    // 多个来源组成的数组
                    watch([x, () => y.value], ([newX, newY]) => {
                      console.log(\`x is \${newX} and y is \${newY}\`)
                    })
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='不能直接侦听响应式对象的属性值'>
                <CodeView language='javascript'>
                  {`
                    const obj = reactive({ count: 0 })

                    // 错误，因为 watch() 得到的参数是一个 number
                    watch(obj.count, (count) => {
                      console.log(\`count is: \${count}\`)
                    })

                    // 需要用一个返回该属性的 getter 函数
                    watch(
                      () => obj.count,
                      (count) => {
                        console.log(\`count is: \${count}\`)
                      }
                    )
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='深层侦听器'>
                <div>直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发</div>
                <CodeView language='javascript'>
                  {`
                    const obj = reactive({ count: 0 })

                    watch(obj, (newValue, oldValue) => {
                      // 在嵌套的属性变更时触发
                      // 注意：\`newValue\` 此处和 \`oldValue\` 是相等的
                      // 因为它们是同一个对象！
                    })

                    obj.count++

                    // 一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调
                    watch(
                      () => state.someObject,
                      () => {
                        // 仅当 state.someObject 被替换时触发
                      }
                    )

                    // 也可以给上面这个例子显式地加上 deep 选项，强制转成深层侦听器
                    watch(
                      () => state.someObject,
                      (newValue, oldValue) => {
                        // 注意：\`newValue\` 此处和 \`oldValue\` 是相等的
                        // *除非* state.someObject 被整个替换了
                      },
                      { deep: true }
                    )
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='watchEffect'>
              <AlertPro>
                <div>watchEffect 在创建侦听器时，会立即执行一遍回调</div>
                <CodeView language='javascript'>
                  {`
                   // 在这个例子中，回调会立即执行
                   // 执行期间，会自动追踪 url.value 作为依赖（和计算属性的行为类似）
                   // 每当 url.value 变化时，回调会再次执行
                    watchEffect(async () => {
                      const response = await fetch(url.value)
                      data.value = await response.json()
                    })
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='watchPostEffect'>
              <AlertPro>
                <div>默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用</div>
                <div>这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态</div>
                <div>如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，需要指明 flush: 'post' 选项</div>
                <CodeView language='javascript'>
                  {`
                    watch(source, callback, {
                      flush: 'post'
                    })

                    watchEffect(callback, {
                      flush: 'post'
                    })

                    // 或直接使用
                    watchPostEffect(() => {
                      /* 在 Vue 更新后执行 */
                    })
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='watch vs watchEffect'>
              <AlertPro>
                <div>watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式</div>
                <br />
                <div>watch</div>
                <div>只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调</div>
                <div>watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机</div>
                <br />
                <div>watchEffect</div>
                <div>则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性</div>
                <div>这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='停止侦听器'>
              <AlertPro>
                <div>{`在 setup() 或 <script setup> 中用同步语句创建的侦听器 会自动绑定到宿主组件实例上 并且会在宿主组件卸载时自动停止`}</div>
                <div>因此，在大多数情况下，你无需关心怎么停止一个侦听器</div>
                <br />
                <div>侦听器必须用同步语句创建</div>
                <div>如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏</div>
              </AlertPro>
              <CodeView language='html'>
                {`
                  <script setup>
                    import { watchEffect } from 'vue'

                    // 它会自动停止
                    watchEffect(() => {})

                    // ...这个则不会！
                    setTimeout(() => {
                      watchEffect(() => {})
                    }, 100)

                    // 手动停止
                    const unwatch = watchEffect(() => {})
                    unwatch()
                  </script>
                `}
              </CodeView>
            </AnchorCard>,
          ],
        },
        {
          label: '组合式函数',
          children: [
            <AnchorCard title='命名'>
              <AlertPro>
                <div>组合式函数约定用驼峰命名法命名，并以“use”作为开头</div>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='输入参数'>
              <AlertPro>
                <div>如果编写的组合式函数会被其他开发者使用，建议在输入参数兼容 ref 而不只是原始的值，unref() 工具函数会对此非常有帮助</div>
                <br />
                <div>如果组合式函数在接收 ref 为参数时会产生响应式 effect，请使用 watch() 显式地监听此 ref</div>
                <div>或者在 watchEffect() 中调用 unref() 来进行正确的追踪</div>
              </AlertPro>
              <CodeView>
                {`
                  import { unref } from 'vue'

                  function useFeature(maybeRef) {
                    // 若 maybeRef 确实是一个 ref，它的 .value 会被返回，否则，maybeRef 会被原样返回
                    const value = unref(maybeRef)
                  }
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='返回值'>
              <AlertPro>
                <div>建议组合式函数，始终返回一个包含多个 ref 的普通的非响应式对象</div>
                <div>这样该对象在组件中使用时被解构为 ref 后仍保持响应性</div>
                <div>使用时，可以将返回的对象用 reactive() 包装一次，这样其中的 ref 会被自动解包</div>
              </AlertPro>
              <CodeView>
                {`
                  const mouse = reactive(useMouse())
                  console.log(mouse.x)
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='两个示例'>
              <CodeView language='javascript'>
                {`
                  import { ref, onMounted, onUnmounted } from 'vue'

                  export function useEventListener(target, event, callback) {
                    onMounted(() => target.addEventListener(event, callback))
                    onUnmounted(() => target.removeEventListener(event, callback))
                  }

                  // 按照惯例，组合式函数名以“use”开头
                  export function useMouse() {
                    // 被组合式函数封装和管理的状态
                    const x = ref(0)
                    const y = ref(0)

                    // 一个组合式函数也可以挂靠在所属组件的生命周期上
                    useEventListener(window, 'mousemove', (event) => {
                      x.value = event.pageX
                      y.value = event.pageY
                    })

                    // 通过返回值暴露所管理的状态
                    return { x, y }
                  }
              `}
              </CodeView>
              <br />
              <CodeView language='javascript'>
                {`
                import { ref, isRef, unref, watchEffect } from 'vue'

                export function useFetch(url) {
                  const data = ref(null)
                  const error = ref(null)

                  function doFetch() {
                    // 在请求之前重设状态...
                    data.value = null
                    error.value = null
                    // unref() 解包可能为 ref 的值
                    fetch(unref(url))
                      .then((res) => res.json())
                      .then((json) => (data.value = json))
                      .catch((err) => (error.value = err))
                  }

                  if (isRef(url)) {
                    // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
                    watchEffect(doFetch)
                  } else {
                    // 否则只请求一次，避免监听器的额外开销
                    doFetch()
                  }

                  return { data, error }
                }
              `}
              </CodeView>
            </AnchorCard>,
          ],
        },
      ]}
    />,
  ]
}
