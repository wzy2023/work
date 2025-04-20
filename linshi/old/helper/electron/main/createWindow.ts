import { BrowserWindow, screen, session } from 'electron'
import { enable, initialize } from '@electron/remote/main'
import { join } from 'node:path'

import {
  getCurrentScreen,
  getMouseDirection,
  getWinDirection,
  getWinInitPosition,
  getWinPosition,
  hideWindow,
  loadExtensions,
  openWindow
} from '../utils'
import { writeConfig } from '../utils/configOper'

export const preload = join(__dirname, '../preload/index.js')

export const createWindow = async () => {
  const win = new BrowserWindow({
    maximizable: false,
    fullscreenable: false,
    show: false,
    webPreferences: { preload, nodeIntegration: true, contextIsolation: false }
  })
  win.setBounds(getWinInitPosition(), true)
  win.showInactive()

  // 这样渲染进程才能使用 remote
  initialize()
  enable(win.webContents)

  // await loadExtensions(session.defaultSession)

  // 加载页面
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(join(process.env.DIST, 'index.html'))
  }

  // win.webContents.openDevTools()
  win.setBackgroundColor('#f0f0f0')
  win.setPosition(win.getPosition()[0], -2000)

  // 设置主网页上的新窗口打开的选项
  win.webContents.setWindowOpenHandler(({ url }) => {
    openWindow(url)
    return { action: 'deny' }
  })

  // 窗口移动到边缘时，隐藏窗口
  win.on('move', () => {
    if (!win.isVisible()) {
      return
    }

    const direction = getWinDirection(win)
    if (!direction) {
      writeConfig({ displayName: screen.getDisplayNearestPoint(win.getBounds()).label })
      return
    }

    hideWindow(win, direction)
  })

  let isCancelShow = false

  // 监听鼠标移动事件
  let topTimer = 0
  setInterval(() => {
    const { x, y } = screen.getCursorScreenPoint()
    const { workArea } = getCurrentScreen(win)

    // 窗口的左边、右边、顶部、底部
    const { top, left, right, bottom } = getWinPosition(win)

    // 鼠标的方向
    const direction = getMouseDirection(win)

    // 窗口的方向
    const winDirection = getWinDirection(win)

    // 窗口居中时的位置
    const { x: centerLeft } = getWinInitPosition(win)

    // 鼠标移出窗口时隐藏窗口
    if (((winDirection !== 'left' && x <= left) || (winDirection !== 'right' && x >= right) || (winDirection !== 'top' && y <= top) || y >= bottom)) {
      hideWindow(win, winDirection)
    }

    // 鼠标移到顶部时立即显示窗口
    if (direction === 'top' && !isCancelShow) {
      topTimer++

      // 鼠标在顶部超过 1.5s 时，立即显示创窗口
      if (topTimer > 3) {
        win.setPosition(centerLeft, workArea.y)
        win.show()
      }

      // 鼠标在顶部超过 1.5s 时，立即隐藏窗口，并且 15s 内不再触发显示
      if (topTimer > 15) {
        topTimer = 0
        isCancelShow = true
        win.hide()
        setTimeout(() => isCancelShow = false, 15 * 1000)
      }
      return
    }

    topTimer = 0
  }, 100)

  return win
}
