import { action, reaction, makeAutoObservable, observable } from 'mobx'
import AutoBrowserView, { transformBounds } from '../components/AutoBrowserView'
import { getCurrentWindow } from '@electron/remote'
import { readConfig, writeConfig } from '../utils/configOper'

interface View {
  key: string,
  href: string,
  view?: AutoBrowserView,
  tabKey?: string,
  bounds: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
}

interface Tab {
  label: string
  key: string,
  views?: View[],
}

const preload = '/Users/wangzhenyu/Code/work/persons/helper/dist-electron/preload/index.js'

class TabsStore {
  constructor() {
    makeAutoObservable(this)

    reaction(() => this.activeKey, () => this.setViewVisible())

    reaction(() => this.tabs, () => this.initViews(), { fireImmediately: true })
  }

  key: string = Math.random().toString(36).slice(2)

  @observable tabs: Tab[] = readConfig('tabs') || []

  @observable activeKey: string = ''

  @action setActiveKey(key: string) {
    this.activeKey = key
  }

  @action setTabs(data: Tab[]) {
    this.tabs = data
    this.writeTabs()
  }

  @action addTab(data: Tab) {
    this.tabs = [...this.tabs, data]
    this.writeTabs()
  }

  @action removeTab(tabKey: string) {
    this.tabs.forEach(tab => {
      if (tab.key === tabKey) {
        tab.views?.forEach(view => {
          view.view?.win.removeBrowserView(view.view)
        })
      }
    })

    this.tabs = this.tabs.filter((tab) => tab.key !== tabKey)

    this.writeTabs()
  }

  @action addView(tabKey: string, data: View) {
    const item = this.tabs.find((tab) => tab.key === tabKey)
    if (!item) {
      return
    }
    if (!Array.isArray(item.views)) {
      item.views = []
    }
    item.views.push(data)
    this.tabs = [...this.tabs]
    this.writeTabs()
  }

  @action updateView(tabKey: string, data: View) {
    const tab = this.tabs.find((tab) => tab.key === tabKey)
    if (!tab) {
      return
    }
    tab.views = tab.views.map(view => {
      if (view.key === data.key) {
        return data
      }
      return view
    })
    this.writeTabs()
  }

  writeTabs() {
    writeConfig({
      tabs: this.tabs?.map(item => ({
        ...item,
        views: item.views?.map(view => ({
          ...view,
          view: undefined,
          tabKey: undefined,
          bounds: transformBounds(undefined, view.bounds, true),
        }))
      }))
    })
  }

  setViewVisible() {
    this.tabs.forEach(tab => {
      tab.views?.forEach(view => {
        if (tab.key === this.activeKey) {
          view.view?.show()
          return
        }
        view.view?.hide()
      })
    })
  }

  initViews() {
    const win = getCurrentWindow()

    this.tabs.forEach(tab => {
      tab.views?.forEach(item => {
        if (item.view) {
          return
        }
        const view = new AutoBrowserView([tab.key, item.key], win, {
          webPreferences: { preload, nodeIntegration: true, contextIsolation: false }
        })
        view.webContents.loadURL(item.href)
        view.data = item
        item.view = view
      })
    })

    if (!this.activeKey) {
      this.setActiveKey(this.tabs[0]?.key || '')
      return
    }

    this.setViewVisible()
  }
}

export default new TabsStore()
