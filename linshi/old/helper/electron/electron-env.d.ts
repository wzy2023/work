declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    DIST_ELECTRON: string
    DIST: string
    PUBLIC: string
  }
}


// 给 window 扩展属性
interface Window {
  ipcRenderer: Electron.IpcRenderer
}
