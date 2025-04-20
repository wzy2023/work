import { AlertPro, AnchorCard, CodeView, ImagePro } from '@/components'

export default () => [
  <AnchorCard title='FackBook开发的构建用户界面的框架'>
    <AlertPro>
      <div>1. 声明式</div>
      <div>2. 高效，用虚拟DOM来实现DOM的渲染</div>
      <div>3. 灵活，跟其它库搭配使用</div>
      <div>4. JSX，js里面写html</div>
      <div>5. 组件化+模块化，代码易复用</div>
      <div>{'6. 单向的数据流，数据->视图->事件->数据'}</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='传统的DOM操作与React相比'>
    <AlertPro>
      <div>1. 传统的dom操作关注了太多的细节，复杂的界面操作需要熟悉太多的dom操作api</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. react提出了一个思想，它始终整体刷新页面，无需关注细节，解决了ui细节问题</div>
      </div>

      <div>2. 应用状态分散在各处，难以追踪和维护</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. flux架构，用户操作产生一个action，这个action被dispatch出去，到了store，由reducer处理</div>
        <div>2. 基于这个架构开发的状态管理库有redux和mobx</div>
      </div>

      <div>3. 数据状态管理</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. dry原则，能通过计算得到的状态，就不要把它保存下来</div>
        <div>2. 组件尽量无状态，所需数据通过props传进来，让组件尽量是纯组件，有更好的性能，并且更容易被重用</div>
      </div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='JSX'>
    <AlertPro>
      <div>1. jsx就是让你能在js代码中直接写html标记</div>
      <div>2. 它不是模板语言，是一种语法糖</div>
      <div>3. 它的本质就是将我们写的html代码转换为了js代码</div>
      <div>4. 它的本质还是js代码，所以可以用js所有的语法，容易上手，不需要学习新的模板语法</div>
      <div>5. React认为，小写开头的标记是原生标签，大写开头和menu.Item的这种标记是组件</div>
      <div>6. jsx的优点</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 声明式创建界面直观</div>
        <div>2. 代码动态创建界面的灵活</div>
        <div>2. 无需学习新的模板语言</div>
      </div>
    </AlertPro>
    <CodeView language='jsx'>
      {`
        // JSX语法
        let el = <div className='clName'>Hello，{name}</div>

        // 会自动转换为下面
        let el = React.creatElement(
          'div', // 标记
          { className:'clName' }, // 属性
          'Hello', // children
          name, // children
        )
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='组件化'>
    <AlertPro>
      <div>1. 组件化思想</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 组件就是由属性和状态最终得到一个 View</div>
        <div>2. 它就像一个纯函数一样，接收的参数固定，那产生的View就也是固定的</div>
      </div>

      <div>2. 无状态组件</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 没有功能只有props传的数据的组件就叫无状态组件</div>
      </div>

      <div>3. 受控组件</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 状态由使用者维护，状态改变时触发外部事件，由外部修改状态后，传递给组件内部</div>
        <div>2. 它的状态由使用者维护</div>
      </div>

      <div>4. 非受控组件</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 状态由组件内部维护，内部可暴露获取状态的接口，让外部也能获取到状态</div>
      </div>

      <div>5. 创建组件需要考虑的问题</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 它的静态ui长什么样子</div>
        <div>2. 它的状态组成，状态来自外部，还是内部</div>
        <div>3. 它的交互方式，内部用户的操作，如何暴露出去给外面的人使用</div>
      </div>

      <div>6. 何时创建组件</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 单一职责原则</div>
        <div style={{ marginLeft: 20 }}>组件是构建ui的最小元素，每个组件都应该尽量小，只做一件事情，使复杂度能分散出去，如果组件变得复杂，就应该拆分成小组件</div>
        <div>2. 拆分小组件有两个好处</div>
        <div style={{ marginLeft: 20 }}>1. 把复杂度拆分出去，便于维护</div>
        <div style={{ marginLeft: 20 }}>2.
          组件过大时任何变化都会重新render，拆分成小组件后，它的数据没有变化就不会刷新，提高性能
        </div>
      </div>

      <div>7. 使用方法</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 自定义组件和html原生标记一样使用</div>
        <div>2. React认为小写字母开头的是原生节点</div>
        <div>{'3. 大写字母开头 || 属性语法的是组件，如: <Table></Table> <menu.Item></menu.Item>'}</div>
      </div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='生命周期'>
    <ImagePro src='/2.Css/life-cycle.png' />
  </AnchorCard>,

  <AnchorCard title='Virtual DOM'>
    <AlertPro>
      <div>1. 两颗tree的区别，正常算法是O(n)3次方，react工程师优化到了O(n)，很大的提升</div>

      <div>2. 广度优先，分层比较，从根节点开始比较</div>
      <div style={{ margin: '0 0 10px 20px' }}>
        <div>1. 发现：顺序发生变化，交换两者位置 (类型相同的兄弟节点，需要唯一的标识key)</div>
        <div>2. 发现：类型变化(D节点下D1节点变为D2节点)，删除后，重新创建</div>
        <div>2. 发现：节点跨层移动(从D节点下移动到了C节点下)，在D节点下删除该节点，C节点下创建该节点</div>
      </div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='组件设计模式'>
    <AlertPro>
      <div>1. 高阶组件</div>
      <div>2. 函数作为子组件</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='ReactDOM.render'>
    <CodeView language='javascript'>
      {`
         // 将组件渲染到指定dom元素上
         ReactDOM.render(<App />, document.getElementById('#root'))
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='其它'>
    <AlertPro>
      <div>1. react组件内样式会影响到全局</div>
      <div>2. js文件能解析jsx语法是因为引入了React库</div>
      <div>2. flux架构，单向数据流，以flux架构的项目：redux、mobX</div>
    </AlertPro>
  </AnchorCard>,
]
