import anime from 'animejs'
import { getElement } from './element'

// 颜色值转换
export const hexToRgba = (hexColor: string, a = 1) => {
  let red = parseInt(hexColor.substr(1, 2), 16)
  let green = parseInt(hexColor.substr(3, 2), 16)
  let blue = parseInt(hexColor.substr(5, 2), 16)
  return {
    nums: { red, green, blue },
    text: `rgba(${red}, ${green}, ${blue}, ${a})`,
  }
}

// 背景颜色闪动
export const flashBackground = (el: string | Element, color: string, a = 1) => {
  const { element, originalStyle } = getElement(el)
  if (!element) {
    return
  }

  anime({
    targets: element,
    backgroundColor: [hexToRgba(color, a).text, originalStyle.backgroundColor],
    duration: 1500,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: false,
  })
}

// 边框闪动
export const flashBorder = (el: string | Element, color: string, a = 1) => {
  const { element } = getElement(el)
  if (!element) {
    return
  }

  anime({
    targets: element,
    border: [`1px solid ${hexToRgba(color, a).text}`, 'none'],
    duration: 1500,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: false,
  })
}
