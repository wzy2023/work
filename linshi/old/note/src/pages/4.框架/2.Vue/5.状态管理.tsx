import React from 'react'
import { AlertPro, AnchorCard, CodeView, TabsPro, ParamsTable } from '@/components'

export default () => {
  return [
    <TabsPro
      clearMenuOnChange
      items={[
        {
          label: '简单状态管理',
          children: [
            <AlertPro>
              <div>可以用响应式 API 做简单状态管理，例如：ref() 或是 computed()</div>
            </AlertPro>,
            <CodeView language='javascript'>
              {`
                // store.js
                import { reactive } from 'vue'

                export const store = reactive({
                  count: 0,
                  increment() {
                    this.count++
                  }
                })
              `}
            </CodeView>,
            <CodeView language='html'>
              {`
                <!-- ComponentA.vue -->
                <script setup>
                import { store } from './store.js'
                </script>
                <template>From A: {{ store.count }}</template>

                <!-- ComponentB.vue -->
                <script setup>
                import { store } from './store.js'
                </script>
                <template>
                  <button @click='store.increment()'>
                    From B: {{ store.count }}
                  </button>
                </template>
              `}
            </CodeView>,
          ],
        },
        {
          label: '依赖注入',
          children: [
            <AlertPro>
              <div>provide() 和 inject() 可以解决：深层组件访问祖先组件数据的需求</div>

              <CodeView language='html'>
                {`
                <!-- 祖先组件里提供数据 -->
                <script setup>
                  import { ref, provide, readonly } from 'vue'

                  const value = ref('value')
                  const setValue = (val) => {
                    value.value = val
                  }

                  // readonly() 使提供的数据只读，防止被修改
                  provide('key', readonly({
                    value,
                    setValue
                  }))
                </script>

                <!-- 子组件里注入数据 -->
                <script setup>
                  import { inject } from 'vue'
                  const { value, setValue } = inject('key', () => '第二个参数可以写个默认值')
                </script>
              `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='应用层也可以提供数据'>
              <CodeView language='javascript'>
                {`
                // 这样在该应用内的所有组件中，都可以使用该数据
                app.provide('message', 'hello!')
              `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='使用 Symbol 作注入名'>
              <div>建议最好使用 Symbol 来作为注入名以避免潜在的冲突</div>
              <CodeView language='javascript'>
                {`
                  // keys.js
                  export const myInjectionKey = Symbol()
                `}
              </CodeView>
              <CodeView language='javascript'>
                {`
                  // 在供给方组件中
                  import { provide } from 'vue'
                  import { myInjectionKey } from './keys.js'

                  provide(myInjectionKey, {
                    // 要提供的数据
                  });
                `}
              </CodeView>
              <CodeView language='javascript'>
                {`
                  // 注入方组件
                  import { inject } from 'vue'
                  import { myInjectionKey } from './keys.js'

                  const injected = inject(myInjectionKey)
                `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: 'Pinia',
          children: [
            <AlertPro>
              <div>Pinia 是 Vue 的专属状态管理库，它允许跨组件或页面共享状态</div>
            </AlertPro>,
            <AnchorCard title='安装'>
              <CodeView language='bash'>
                {`yarn add pinia`}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='引入插件'>
              <CodeView language='bash'>
                {`
                  import { createApp } from 'vue'
                  import { createPinia } from 'pinia'
                  import App from './App.vue'

                  const pinia = createPinia()
                  const app = createApp(App)

                  app.use(pinia).mount('#app')
                `}
              </CodeView>
            </AnchorCard>,
            <AnchorCard title='定义'>
              <AlertPro message='选项式'>
                <CodeView language='bash'>
                  {`
                    import { defineStore } from 'pinia'

                    // 你可以对 defineStore() 的返回值进行任意命名，建议以 use 开头 以 Store 结尾
                    // 第一个参数是你的应用中 Store 的唯一 ID
                    export const useCountStore = defineStore('main', {
                      // 状态
                      state: () => ({ count: 0 }),
                      // 计算属性
                      getters: {
                        double: (state) => state.count * 2,
                      },
                      // 修改数据的方法
                      actions: {
                        increment() {
                          this.count++
                        },
                      },
                    })
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='setup 式'>
                <CodeView language='bash'>
                  {`
                    import { defineStore } from 'pinia'

                    export const useCounterStore = defineStore('counter', () => {
                      const count = ref(0)
                      function increment() {
                        count.value++
                      }
                      return { count, increment }
                    })
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='State'>
              <AlertPro message='获取数据'>
                <CodeView language='javascript'>
                  {`
                    import { useCountStore } from './store/useCountStore'

                    // 这样能取到值，但它内部是 reactive() 构造的，没有响应性
                    const { count } = useCountStore()
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='响应式获取数据'>
                <CodeView language='javascript'>
                  {`
                    import { useCountStore } from './store/useCountStore'
                    const store = useCountStore()

                    // 可以使用 storeToRefs 来转换为响应式的
                    const { count } = storeToRefs(store)
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='修改数据'>
                <CodeView language='javascript'>
                  {`
                    import { useCountStore } from './store/useCountStore'
                    const store = useCountStore()

                    // 直接修改数据
                    store.count++

                    // 使用 $patch 来修改数据
                    store.$patch({
                      count: store.count + 1,
                      age: 120,
                      name: 'DIO',
                    })

                    // 这种方式更好 会自动合并数据
                    store.$patch((state) => {
                      state.items.push({ name: 'shoes', quantity: 1 })
                      state.hasChanged = true
                    })
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='订阅变更'>
                <CodeView language='javascript'>
                  {`
                    import { MutationType } from 'pinia'

                    // MutationType = 'direct' | 'patch object' | 'patch function'

                    stire.$subscribe((mutation, state) => {
                      mutation.type
                      mutation.storeId // 'cart'
                      // 只有 mutation.type === 'patch object'的情况下才可用
                      mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

                      // 每当状态发生变化时，将整个 state 持久化到本地存储。
                      localStorage.setItem('cpunt', JSON.stringify(state))
                    })
                  `}
                </CodeView>
                <CodeView language='javascript'>
                  {`
                    // 也可以在 pinia 实例上侦听整个 state
                    watch(
                      pinia.state,
                      (state) => {
                        // 每当状态发生变化时，将整个 state 持久化到本地存储。
                        localStorage.setItem('piniaState', JSON.stringify(state))
                      },
                      { deep: true }
                    )
                  `}
                </CodeView>
                <AlertPro type='warning'>
                  <div>默认情况下，state 订阅器会被绑定到添加它们的组件上(如果 store 在组件的 setup() 里面)</div>
                  <div>意味着，当该组件被卸载时，它们将被自动删除</div>
                  <div>{`如果你想在组件卸载后依旧保留它们，请将 { detached: true } 作为第二个参数传给订阅器`}</div>
                  <div>以便将其从当前组件中分离</div>
                </AlertPro>
              </AlertPro>
              <AlertPro message='重置数据'>
                <CodeView language='javascript'>
                  {`
                    import { useCountStore } from './store/useCountStore'
                    const store = useCountStore()

                    store.$reset()
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='Getter'>
              <AlertPro message='访问其他 getter'>
                <CodeView language='javascript'>
                  {`
                    export const useStore = defineStore('main', {
                      state: () => ({
                        count: 0,
                      }),
                      getters: {
                        doubleCount: (state) => state.count * 2,
                        // 通过 this 访问其他 getter
                        doubleCountPlusOne() {
                          return this.doubleCount + 1
                        },
                      },
                    })
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='向 getter 传递参数'>
                <CodeView language='javascript'>
                  {`
                    export const useStore = defineStore('main', {
                      getters: {
                        getActiveUserById(state) {
                          const activeUsers = state.users.filter((user) => user.active)
                          return (userId) => activeUsers.find((user) => user.id === userId)
                        },
                      },
                    })
                  `}
                </CodeView>
                <CodeView language='html'>
                  {`
                    <script setup>
                      const { getUserById } = useStore()
                    </script>

                    <template>
                      <p>User 2: {{ getUserById(2) }}</p>
                    </template>
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='访问其他 store 的 getter'>
                <CodeView language='javascript'>
                  {`
                    import { useOtherStore } from './other-store'

                    export const useStore = defineStore('main', {
                      getters: {
                        otherGetter(state) {
                          const otherStore = useOtherStore()
                          return state.localData + otherStore.data
                        },
                      },
                    })
                  `}
                </CodeView>
              </AlertPro>
            </AnchorCard>,
            <AnchorCard title='Action'>
              <AlertPro message='访问其他 store 的 action'>
                <CodeView language='javascript'>
                  {`
                    import { useAuthStore } from './auth-store'

                    export const useSettingsStore = defineStore('settings', {
                      state: () => ({
                        preferences: null,
                        // ...
                      }),
                      actions: {
                        async fetchUserPreferences() {
                          const auth = useAuthStore()
                          if (auth.isAuthenticated) {
                            this.preferences = await fetchPreferences()
                          } else {
                            throw new Error('User must be authenticated')
                          }
                        },
                      },
                    })
                  `}
                </CodeView>
              </AlertPro>
              <AlertPro message='订阅 action'>
                <CodeView language='javascript'>
                  {`
                    const unsubscribe = someStore.$onAction(
                      ({
                        name, // action 名称
                        store, // store 实例，类似 countStore
                        args, // 传递给 action 的参数数组
                        after, // 在 action 返回或解决后的钩子
                        onError, // action 抛出或拒绝的钩子
                      }) => {
                        // 为这个特定的 action 调用提供一个共享变量
                        const startTime = Date.now()
                        // 这将在执行 "store "的 action 之前触发。

                        // 这将在 action 成功并完全运行后触发。
                        // 它等待着任何返回的 promise
                        after((result) => {
                          console.log(result)
                        })

                        // 如果 action 抛出或返回一个拒绝的 promise，这将触发
                        onError((error) => {
                          console.warn(error)
                        })
                      }
                    )

                    // 手动删除监听器
                    unsubscribe()
                  `}
                </CodeView>
                <AlertPro type='warning'>
                  <div>默认情况下，action 订阅器会被绑定到添加它们的组件上(如果 store 在组件的 setup() 内)</div>
                  <div>意味着，当该组件被卸载时，它们将被自动删除</div>
                  <div>如果你想在组件卸载后依旧保留它们，请将 true 作为第二个参数传递给 action 订阅器</div>
                  <div>以便将其从当前组件中分离</div>
                </AlertPro>
              </AlertPro>
            </AnchorCard>,
          ],
        },
      ]}
    />,
  ]
}
