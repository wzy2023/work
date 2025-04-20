export default [
  {
    path: '/',
    redirect: '/lottery/type',
  },
  {
    name: '登录',
    path: '/login',
    component: './Login',
    hideInMenu: true,
    menuRender: false,
  },
  {
    name: '彩票',
    path: '/lottery',
    routes: [
      {
        name: '彩种',
        path: '/lottery/type',
        component: './Type',
        wrappers: ['@/wrappers/login'],
      },
      {
        name: '规则',
        path: '/lottery/rule',
        component: './Rule',
        wrappers: ['@/wrappers/login'],
      },
      {
        name: '分析',
        path: '/lottery/analysis',
        component: './Analysis',
        wrappers: ['@/wrappers/login'],
      },
      {
        name: 'Line',
        path: '/lottery/line',
        component: './Line',
        wrappers: ['@/wrappers/login'],
      },
    ],
  },
  {
    name: '404',
    path: '/*',
    component: './404',
    hideInMenu: true,
  },
]
