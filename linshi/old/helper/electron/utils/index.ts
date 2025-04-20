import { BrowserWindow, screen } from 'electron'
import { readConfig } from './configOper'
import fs from 'fs'

let isHiding = false
const distance = 5 // 误差距离

// 获取窗口的左边、右边、顶部、底部
export const getWinPosition = (win: BrowserWindow): { left: number, right: number, top: number, bottom: number } => {
  const { width, height, x: winX, y: winY } = win.getBounds()
  return {
    left: winX,
    right: winX + width,
    top: winY,
    bottom: winY + height
  }
}

// 获取鼠标靠近屏幕的哪边
export const getMouseDirection = (win: BrowserWindow): 'left' | 'right' | 'top' | undefined => {
  const { x, y } = screen.getCursorScreenPoint()
  const { workArea: { width: screenWidth, y: top, x: left } } = getCurrentScreen(win)

  if (x <= left) {
    return 'left'
  }

  if ((x + Math.abs(left)) >= screenWidth - distance) {
    return 'right'
  }

  if (y <= top) {
    return 'top'
  }
}

// 获取窗口的初始位置
export const getWinInitPosition = (win?: BrowserWindow) => {
  const { workArea } = getCurrentScreen(win)

  const width = win?.getBounds().width || parseInt(workArea.width * 0.8 + '')
  const height = win?.getBounds().height || parseInt(workArea.height * 0.8 + '')

  return {
    x: parseInt((workArea.width - width) / 2 + '') + workArea.x,
    y: parseInt((workArea.height - height) / 2 + '') + workArea.y,
    width,
    height
  }
}

// 获取窗口靠近屏幕的哪边
export const getWinDirection = (win: BrowserWindow): 'left' | 'right' | 'top' | undefined => {
  const { width, x, y } = win.getBounds()
  const { workArea } = getCurrentScreen(win)

  if (x <= workArea.x) {
    return 'left'
  }

  if (y <= workArea.y) {
    return 'top'
  }

  if (x + width >= workArea.width - distance) {
    return 'right'
  }
}

// 隐藏窗口动画
export const hideWindow = (win: BrowserWindow, direction: string) => {
  if (isHiding || !win || !direction) return // 窗口正在隐藏时不再重复执行

  isHiding = true
  const [originalWidth, originalHeight] = win.getSize()

  const animation = () => {
    setTimeout(() => {
      const opacity = win.getOpacity()
      const { width, height, x: winX, y: winY } = win.getBounds()

      win.setOpacity(opacity - 0.02)
      switch (direction) {
        case 'left':
          win.setSize(width - 5, height)
          break
        case 'right':
          win.setSize(width - 5, height)
          win.setPosition(winX + 5, winY)
          break
        case 'top':
          win.setSize(width, height - 5)
          break
      }

      if (opacity <= 0) {
        win.setOpacity(1)
        win.setSize(originalWidth, originalHeight)
        win.hide()
        isHiding = false // 一定得是最后一句
      } else {
        animation()
      }
    }, 5)
  }

  animation()
}

// 获取当前屏幕
export const getCurrentScreen = (win?: BrowserWindow): Electron.Display => {
  if (win) {
    const { x, y } = win.getBounds()
    return screen.getDisplayNearestPoint({ x, y })
  }

  const displayName = readConfig('displayName')
  const display = screen.getAllDisplays().find(display => display.label === displayName)
  if (display) {
    return display
  }

  return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
}

// 获取指定目录下的所有文件夹
export const getDirs = (path: string) => {
  const dirs = fs.readdirSync(path).filter((file: string) => {
    return fs.statSync(`${path}/${file}`).isDirectory()
  })
  return dirs.filter((dir: string) => dir !== 'Temp')
}

// 加载插件
export const loadExtensions = async (session: any) => {
  const pluginPath = '/Users/wangzhenyu/Library/Application Support/Microsoft Edge/Default/Extensions'
  const dirs = getDirs(pluginPath)

  const plugins = dirs.map((dir: string) => {
    return pluginPath + '/' + dir + '/' + getDirs(`${pluginPath}/${dir}`)[0]
  })
  // .filter((plugin: string) => {
  // const mainfest = require(plugin + '/manifest.json')
  // return mainfest.manifest_version === 3
  // })

  return Promise.all(plugins.map(async (plugin: string) => {
    return await session.loadExtension(plugin, {
      allowFileAccess: true,
      allowRemoteContent: true,
      allowSecureContent: true,
      incognito: true,
    })
  }))
}

// 打开新窗口
export const openWindow = (url: string) => {
  const newWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  newWindow.loadURL(url)

  return newWindow
}
