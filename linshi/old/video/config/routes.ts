export default [
  {
    'path': '/',
    'redirect': '/project/list',
  },
  {
    'name': '登录',
    'path': '/login',
    'component': './Login',
    'hideInMenu': true,
    'menuRender': false,
  },
  {
    'path': '/',
    'component': '@/layouts/index',
    'wrappers': [
      '@/wrappers/login',
    ],
    'routes': [
      {
        'path': '/project/list',
        'component': './Project/List',
      },
      {
        'path': '/project/detail/:projectId',
        'component': './Project/Detail/Index',
        'routes': [
          {
            'path': '/project/detail/:projectId/prompt',
            'component': './Project/Detail/Prompt',
          },
          {
            'path': '/project/detail/:projectId/material',
            'component': './Project/Detail/Material',
          },
          {
            'path': '/project/detail/:projectId/work',
            'component': './Project/Detail/Work',
          },
          {
            'path': '/project/detail/:projectId/account',
            'component': './Project/Detail/Account',
          },
          {
            'path': '/project/detail/:projectId/release',
            'component': './Project/Detail/Release',
          },
        ],
      },
    ],
  },
  {
    'name': '404',
    'path': '/*',
    'component': './404',
    'hideInMenu': true,
  },
]
