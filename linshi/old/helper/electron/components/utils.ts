import tabsStore from '../store/tabs'
import { BrowserWindow } from '@electron/remote'

// 更新窗口位置
export const updateBounds = (keys: string[], view: any) => {
  const [tabKey, key] = keys
  const tab = tabsStore.tabs.find((item: any) => item.key === tabKey)
  const view_ = tab.views.find((item: any) => item.key === key)
  view_.bounds = view.getBounds()
  tabsStore.updateView(tabKey, view_)
}

// 转换窗口位置
export const transformBounds = (win, bounds: any, flag: boolean): any => {
  const { x, y, width, height } = bounds
  const workArea = (win || BrowserWindow.getFocusedWindow())?.getBounds()

  const transform = (value: string, base: 'width' | 'height'): number | string => {
    const value_ = parseInt(value)

    if (flag) {
      if (isNaN(Number(value))) {
        return value
      }
      const res = parseFloat(((value_ / workArea[base]) * 100).toFixed(5))
      return Math.max(0, Math.min(res, 100)) + '%'
    }

    return !isNaN(Number(value)) ? value_ : parseInt(value_ * workArea[base] / 100 + '')
  }

  return {
    x: transform(x, 'width'),
    y: transform(y, 'height'),
    width: transform(width, 'width'),
    height: transform(height, 'height'),
  }
}

const openWindow = (url: string) => {
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

export const setWindowOpenHandler = (win: any) => {
  win.webContents.setWindowOpenHandler(({ url }) => {
    const win = openWindow(url)
    setWindowOpenHandler(win)
    return { action: 'deny' }
  })
}
