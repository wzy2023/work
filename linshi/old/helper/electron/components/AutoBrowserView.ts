import { BrowserView, ipcMain, screen } from '@electron/remote'
import { setWindowOpenHandler, transformBounds, updateBounds } from './utils'

export * from './utils'

export default class AutoBrowserView extends BrowserView {
  win: any
  keys: string[]
  show: any
  hide: any
  data: any

  constructor(keys, win, options) {
    super(options)
    this.win = win
    this.keys = keys

    ipcMain.on(`drag-${this.keys[1]}`, () => {
      // 获取鼠标的位置
      const { x, y } = screen.getCursorScreenPoint()

      // 获取窗口的位置
      const { x: winX, y: winY } = this.win.getBounds()
      const { width, height } = this.getBounds()

      // 计算view应该移动的位置
      const moveX = Math.max(0, x - winX - 10)
      const moveY = Math.max(0, y - winY - 10)

      // 移动view
      this.setBounds({ x: moveX, y: moveY, width, height })
      updateBounds(this.keys, this)
    })

    ipcMain.on(`drag-left-${this.keys[1]}`, () => {
      const { x } = screen.getCursorScreenPoint()
      const [winX] = this.win.getPosition()
      const { x: viewX, y: viewY, width, height } = this.getBounds()
      const moveX = Math.max(0, x - winX - 10)
      this.setBounds({ x: moveX, y: viewY, width: viewX + width - moveX, height })
      updateBounds(this.keys, this)
    })

    ipcMain.on(`drag-bottom-${this.keys[1]}`, () => {
      const { y } = screen.getCursorScreenPoint()
      const [, winY] = this.win.getPosition()
      const { x: viewX, y: viewY, width } = this.getBounds()
      const moveY = Math.max(0, y - winY + 10)
      this.setBounds({ x: viewX, y: viewY, width, height: moveY - viewY })
      updateBounds(this.keys, this)
    })

    ipcMain.on(`drag-right-${this.keys[1]}`, () => {
      const { x } = screen.getCursorScreenPoint()
      const [winX] = this.win.getPosition()
      const { x: viewX, y: viewY, width, height } = this.getBounds()
      const moveX = Math.max(0, x - winX + 10)
      this.setBounds({ x: viewX, y: viewY, width: moveX - viewX, height })
      updateBounds(this.keys, this)
    })

    ipcMain.on(`drag-top-${this.keys[1]}`, () => {
      const { y } = screen.getCursorScreenPoint()
      const [, winY] = this.win.getPosition()
      const { x: viewX, y: viewY, width, height } = this.getBounds()
      const moveY = Math.max(0, y - winY - 10)
      this.setBounds({ x: viewX, y: moveY, width, height: viewY + height - moveY })
      updateBounds(this.keys, this)
    })

    this.webContents.on('did-finish-load', () => {
      this.webContents.executeJavaScript(`
       const setDivBackground = (div) => {
          div.addEventListener('mouseenter', () => {
             div.style.backgroundColor = 'rgba(0,0,0,0.03)'
          })
           div.addEventListener('mouseleave', () => {
             div.style.backgroundColor = ''
          })
       }

        // 创建一个元素
        const div = document.createElement('div')
        div.draggable="true"
        // 设置元素的样式
        div.className = 'mydrag'
        div.style.cssText = 'z-index:99999; cursor: all-scroll; position: fixed; top: 0;  width: 20px; height: 20px;'
        div.addEventListener('drag', () => {
          ipcRenderer.send('drag-${this.keys[1]}')
        })
        div.addEventListener('dblclick', () => {
          location.reload()
        })
        setDivBackground(div)
        document.body.appendChild(div)

        // 创建一条左边
        const div1 = document.createElement('div')
        div1.draggable="true"
        div1.className = 'drag-left'
        div1.style.cssText = 'z-index:999; cursor: col-resize; position: fixed; top: 0; left: 0; width: 10px; height: 100%; '
        div1.addEventListener('drag', () => {
          ipcRenderer.send('drag-left-${this.keys[1]}')
        })
        setDivBackground(div1)
        document.body.appendChild(div1)

        // 创建一条底边
        const div2 = document.createElement('div')
        div2.draggable="true"
        div2.className = 'drag-bottom'
        div2.style.cssText = 'z-index:999; cursor: row-resize; position: fixed; bottom: 0; left: 0; width: 100%; height: 10px;'
        div2.addEventListener('drag', () => {
          ipcRenderer.send('drag-bottom-${this.keys[1]}')
        })
        setDivBackground(div2)
        document.body.appendChild(div2)

        // 创建一条右边
        const div3 = document.createElement('div')
        div3.draggable="true"
        div3.className = 'drag-right'
        div3.style.cssText = 'z-index:999; cursor: col-resize; position: fixed; top: 0; right: 0; width: 10px; height: 100%;'
        div3.addEventListener('drag', () => {
          ipcRenderer.send('drag-right-${this.keys[1]}')
        })
        setDivBackground(div3)
        document.body.appendChild(div3)

        // 创建一个顶边
        const div4 = document.createElement('div')
        div4.draggable="true"
        div4.className = 'drag-top'
        div4.style.cssText = 'z-index:999; cursor: row-resize; position: fixed; top: 0; left: 0; width: 100%; height: 10px;'
        div4.addEventListener('drag', () => {
          ipcRenderer.send('drag-top-${this.keys[1]}')
        })
        setDivBackground(div4)
        document.body.appendChild(div4)
    `)
    })

    // 设置子网页上的新窗口打开的选项
    setWindowOpenHandler(this)

    this.show = () => {
      win.addBrowserView(this)
      this.setBounds(transformBounds(win, this.data.bounds, false))
    }

    this.hide = () => {
      win.removeBrowserView(this)
    }
  }
}
