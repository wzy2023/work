import {AlertPro, AnchorCard, CodeView} from '@/components'

export default () => [
  <AnchorCard title='reducer'>
    <AlertPro>
      <div>是一个函数，函数的第一个参数是值，第二个参数是修改类型(action.type)</div>
      <div>函数体根据修改类型来返回不同的值</div>
      <div>需要注意的是：不管是一个还是多个reducer，里面的修改类型不可以有重复</div>
      <div>(每个reducer都代表了一个store里的数据)</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='combineReduceers'>
    <AlertPro>
      <div>可以用combineReduceers()来把多个reducer合并为一个</div>
      <CodeView language='javascript'>
        {`
          let reducers = combineReduceers({
            reducer1,
            reducer2
          })
        `}
      </CodeView>
      <div>合并后的reducer被传入creatStore()的第一个参数中</div>
      <CodeView language='javascript'>
        {`
          let store = creatStore(reducer, initState, enhancer)
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='返回的store对象可以'>
    <AlertPro>
      <div>1. 通过store.getState()获取所有reducer的值</div>
      <div>2. 通过store.dispatch()来修改值</div>
      <div>3. 通过store.subscribe()来监听值的修改</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='常见的三个坑'>
    <AlertPro>
      <div>1. store只能创建一个</div>
      <div>2. reducer只能返回值，不能改变值</div>
      <div style={{marginLeft: 20}}>传进来的state不能直接改变，需要复制一份新值再改变，最终返回复制后被改变的新值</div>
      <div>3. reducer必须是一个纯函数</div>
    </AlertPro>
  </AnchorCard>
]
