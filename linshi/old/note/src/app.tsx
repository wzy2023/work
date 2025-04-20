import { history, RunTimeLayoutConfig } from '@umijs/max'
import path from 'path'
import routes, { Route } from '../config/routes'
import defaultSettings from '../config/defaultSettings'

// 有时候一级目录没有component，所以去找子路径，直到找到有component的子路径
// 比如 /1.Html，这个路径没有component能显示
// 所以去找它的子路径，直到找到 /1.Html/1.标签介绍，这个路径有component能显示
const getTargetPath = (pathInfo: any, routes: Route[]): string | void => {
  const { pathname, hash } = pathInfo

  // 分割路径
  const arr = pathname.split('/').filter((i: string) => i)

  if (!Array.isArray(arr) || arr.length <= 0) {
    return
  }

  // 根据路径，获取route
  const route = arr.reduce(({ routes = [] }, item) => {
    return routes.find((i: Route) => i.path === item)
  }, { routes })

  // 如果这个路径的 component 是 PageBase，则不再去找子路由
  if (route?.component !== '@/components/PageBase' && !route?.routes?.length) {
    return
  }

  // 拼接路径
  return path.resolve(pathname, route.routes[0].path || '') + hash
}

export const layout: RunTimeLayoutConfig = () => ({
  ...defaultSettings,
  rightContentRender: () => <span />,
  onPageChange: (pathInfo: any) => {
    // 点击顶部菜单时，自动跳到该菜单下的第一个页面
    const targetPath = getTargetPath(pathInfo, routes)
    if (targetPath) {
      history.push(targetPath)
    }
  },
})
