import React from 'react'
import utils from '@/utils'
import { Tag } from 'antd'

export const MasterProps = data => [
  'name',
  'poster',
  {
    type: 'auto-complete',
    label: 'short',
    name: 'short',
    options: (data?.dou?.commentList || []).map(item => ({
      ...item,
      label: (
        <div>
          <Tag>{item.label}</Tag>：
          <span>{item.value}</span>
        </div>
      ),
    })),
  },
  'fileSize',
]

export default (props) => {

  const { size = 250, name = '', poster = '', short = '', fileSize = '' } = props

  // 不同的文本长度，使用不同的字号
  const fontSize = {
    1: 36,
    2: 36,
    3: 36,
    4: 36,
    5: 36,
    6: 36,
    7: 32,
    8: 28,
    9: 24,
    10: 22,
    11: 20,
    12: 20,
  }

  // 以250为设计稿尺寸，动态计算要显示的尺寸
  const transform = (s, d = 'px') => {
    return size / (250 / s) + d
  }

  // 文本组件
  const Text = (props = {}) => {
    const {
      bgColor,
      color,
      children = '',
      weight = 600,
      size = transform(14),
      padding = transform(3),
      flex,
      borderRadius,
      fontFamily = '"Arial","Microsoft YaHei","黑体","宋体",sans-serif',
      flexDirection = 'row',
      letterSpacing = '1px',
      lineHeight = '1.2em',
    } = props
    return (
      <div
        style={{
          flex,
          color,
          lineHeight,
          background: bgColor,
          fontSize: size,
          fontWeight: weight,
          padding,
          borderRadius,
          fontFamily,
          display: 'flex',
          flexDirection,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          letterSpacing,
        }}>
        {children}
      </div>
    )
  }

  // 店铺名称
  const shopName = '好看工作室'
  // const shopName = '爱看影视图文'

  // 主题
  const theme = {
    '爱看影视图文': {
      // 边框颜色
      border: 'red',

      // 标题背景颜色
      titleBg: 'yellow',
      // 标题文字颜色
      title: 'black',
      // 标题着重颜色
      titleStress: 'red',

      // 属性背景颜色=[]
      attrBg: ['red', 'white'],
      // 属性文字颜色=[]
      attr: ['white', 'red'],
    },
    '好看工作室': {
      // 边框颜色
      border: '#027aff',

      // 标题背景颜色
      titleBg: 'white',
      // 标题文字颜色
      title: 'black',
      // 标题着重颜色
      titleStress: '#027aff',

      // 属性背景颜色=[]
      attrBg: ['#027aff', 'white'],
      // 属性文字颜色=[]
      attr: ['white', '#027aff'],
    },
    '其它': {
      // 边框颜色
      border: 'black',

      // 标题背景颜色
      titleBg: 'black',
      // 标题文字颜色
      title: 'white',
      // 标题着重颜色
      titleStress: 'yellow',

      // 属性背景颜色=[]
      attrBg: ['black', 'white'],
      // 属性文字颜色=[]
      attr: ['white', 'black'],
    },
  }
  const color = theme[shopName]

  // 一些样式
  const style = {
    box: {
      border: `solid ${transform(5)} ${color.border}`,
      width: size,
      height: size,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '"Arial","Microsoft YaHei","黑体","宋体",sans-serif',
      boxSizing: 'border-box',
      backgroundColor: color.border,
    },
    top: {
      height: transform(45),
      textAlign: 'center',
    },
    left: {
      flex: 1,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    img: {
      flex: 1,
      backgroundImage: `url(${utils.getProxyUrl(poster)})`,
      backgroundSize: 'cover',
    },
    right: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: color.border,
    },
  }

  return (
    <div style={style.box}>

      {/* 标题 */}
      <div style={style.top}>
        <Text fontFamily='方正汉真广标简体' size={transform(fontSize[(name.replace(' ', '').replace('(', '').replace(')', '')).length])} color={color.title} bgColor={color.titleBg}>
          <div dangerouslySetInnerHTML={{ __html: name.replace(/\(.*?\)/, a => `<span style='color: ${color.titleStress}'>${a.replace('(', '').replace(')', '')}</span>`) }} />
        </Text>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        <div style={style.left}>
          <div style={style.img} />
          {short && (
            <Text bgColor={color.titleBg} color={color.title} flex='0.1' size={transform(13)} padding={transform(3)}>
              <div dangerouslySetInnerHTML={{ __html: short.replace(/\(.*?\)/, a => `<span style='color: ${color.titleStress}'>${a.replace('(', '').replace(')', '')}</span>`) }} />
            </Text>
          )}
        </div>

        <div style={style.right}>
          <Text color={color.attr[0]} bgColor={color.attrBg[0]} flex='3' size={transform(19)} letterSpacing={2}>
            <span>网盘视频<br />自动发货</span>
          </Text>
          <Text color={color.attr[1]} bgColor={color.attrBg[1]} flex='5' flexDirection='column' letterSpacing={2}>
            <span style={{ fontSize: transform(16) }}>未删减</span>
            <span style={{ fontSize: transform(30), margin: `${transform(8)} 0`, fontWeight: 700 }}>{fileSize}</span>
            <span style={{ fontSize: transform(16) }}>超清1080P</span>
          </Text>
          <Text color={color.attr[0]} bgColor={color.attrBg[0]} flex='3' size={transform(16)} letterSpacing={2} lineHeight='1.3em' flexDirection='column'>
            <span>低价冲销量</span>
            <span>不好看退款</span>
          </Text>

          <Text color={color.title} bgColor={color.titleBg} flex='1' size={transform(14)}>
            <span style={{ fontSize: transform(10) }}>{shopName}</span>
          </Text>
        </div>
      </div>
    </div>
  )
}
