import { app, BrowserWindow, globalShortcut } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { createWindow } from './createWindow'

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST

if (release().startsWith('6.1')) {
  app.disableHardwareAcceleration()
}

if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName())
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

// 当完成初始化时调用
app.on('ready', async () => {
  win = await createWindow()
})

// 当所有窗口都被关闭时退出
app.on('window-all-closed', () => {
  win = null
  app.quit()
})

// 在app被激活时触发的事件，比如用户点击了Dock图标或者切换到了app窗口，这里可以检查是否有窗口存在，如果没有就创建一个新的窗口
app.on('activate', async () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    win = await createWindow()
  }
})

// 当应用程序已经启动时，再次启动应用程序时触发
app.on('second-instance', () => {
  if (!win) {
    return
  }
  // 如果窗口对象是最小化状态就恢复窗口大小
  if (win.isMinimized()) {
    win.restore()
  }
  win.focus()
})

// 当窗口关闭时取消全局快捷键注册
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
