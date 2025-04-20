import React from 'react'
import { AnchorCard, ParamsTable } from '@/components'

export default (): React.ReactNode => {
  return [
    <AnchorCard title='产品设计：简单'>
      <AnchorCard title='花费数年雕琢一个产品，让它成为同类中最简单易用的'>
        <ParamsTable
          data={[
            { desc: `好的产品应该，让任何人第一次拿起，就知道该如何使用它，因为简单` },
            { desc: `当你能凭借直觉就上手一个产品，这个产品才是有亲和力的，触手可及的` },
            { desc: `简单不是一种纯粹的视觉效果，你需要理解事物最根本的本质，才能将与之相关的一切简化` },
            { desc: `只有产品是简单的，才没有科技带来的距离感` },
          ]}
        />
      </AnchorCard>
      <AnchorCard title='iphone，让智能手机从键盘中解放，激发出无数的想象和创意'>
        <ParamsTable
          data={[
            { desc: `把功能合为一体，用屏幕触发模拟了键盘，同时不影响屏幕的功能` },
            { desc: `让屏幕的功能兼具两者，既可以看，也可以触摸` },
            { desc: `屏幕替代了键盘，赋予了更多操作，不只是键盘的那些按键` },
            { desc: `屏幕与键盘改为屏幕的优缺点是什么？` },
            { desc: `a. 在保证功能的同时减少了手机大小` },
            { desc: `b. 让触摸有了更大的想象空间` },
          ]}
        />
      </AnchorCard>
    </AnchorCard>,
    <AnchorCard title='产品功能：三种'>
      <ParamsTable
        data={[
          { desc: `主要功能: 吸引目标用户` },
          { desc: `次要功能: 提升用户粘性` },
          { desc: `用户体验功能: 界面美观，按钮动效` },
        ]}
      />
    </AnchorCard>,
    <AnchorCard title='开放题'>
      <ParamsTable
        data={[{ desc: `牺牲功能，体现简单和纯粹，真的好吗？` }]}
      />
    </AnchorCard>,
  ]
}
