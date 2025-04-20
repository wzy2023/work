import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'
import AdminLayout from '@/views/admin/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    children: [
      {
        path: '/chat/:chatId?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },

  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/user',
    component: AdminLayout,
    children: [
      {
        path: '/admin/user',
        name: 'User',
        component: () => import('@/views/admin/pages/user/index.vue'),
      },
      {
        path: '/admin/talk',
        name: 'Talk',
        component: () => import('@/views/admin/pages/talk/index.vue'),
      },
      {
        path: '/admin/system',
        name: 'System',
        component: () => import('@/views/admin/pages/system/index.vue'),
      },
      {
        path: '/admin/share',
        name: 'Share',
        component: () => import('@/views/admin/pages/share/index.vue'),
      },
      {
        path: '/admin/income',
        name: 'Income',
        component: () => import('@/views/admin/pages/income/index.vue'),
      },
      {
        path: '/admin/order',
        name: 'Order',
        component: () => import('@/views/admin/pages/order/index.vue'),
      },
      {
        path: '/admin/point',
        name: 'Point',
        component: () => import('@/views/admin/pages/point/index.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
