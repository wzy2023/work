import routeJson from './routeJson'

export interface Route {
  path?: string
  redirect?: string
  name?: string
  menu?: boolean
  component?: string
  wrappers?: string[]
  routes?: Route[]
}

export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', menu: false, component: 'Welcome' },
  ...(routeJson || []),
  { component: './404' },
] as Route[]
