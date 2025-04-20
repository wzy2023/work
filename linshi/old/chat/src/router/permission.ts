import type { Router } from 'vue-router'
import { UserRole, useUserStore } from '@/store/modules/user'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {

    const { userInfo } = useUserStore()

    // 如果要去Admin 必须为Admin权限
    if (to.path.startsWith('/admin')) {
      if (userInfo?.role !== UserRole.Admin) {
        // next('/chat')
      }
    }

    next()
  })
}
