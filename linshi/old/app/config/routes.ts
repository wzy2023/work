export default [
  {
    'path': '/',
    'redirect': '/user/list',
  },
  {
    'name': '登录',
    'path': '/login',
    'component': './Login',
    'hideInMenu': true,
    'menuRender': false,
  },
  {
    'name': 'user',
    'path': '/user/list',
    'component': './manage/User',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': '任务记录',
    'path': '/other/tasklog',
    'component': './other/TaskLog',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': '文案列表',
    'path': '/other/copywriter',
    'component': './other/Copywriter',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': '需求工作',
    'path': '/other/needJob',
    'component': './other/NeedJob',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': 'Profession',
    'path': '/quiz/profession',
    'component': './quiz/Profession',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': 'Tech',
    'path': '/quiz/tech',
    'component': './quiz/Tech',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': 'Queston',
    'path': '/quiz/question',
    'component': './quiz/Question',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': 'QuestonAttr',
    'path': '/quiz/questionAttr',
    'component': './quiz/QuestionAttr',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': 'User',
    'path': '/quiz/user',
    'component': './quiz/User',
    'wrappers': [
      '@/wrappers/login',
    ],
  },
  {
    'name': '404',
    'path': '/*',
    'component': './404',
    'hideInMenu': true,
  },
]
