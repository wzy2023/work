import { defineStore } from 'pinia'
import { router } from '@/router'
import { menuData } from '@/router/menu'

interface AdminState {
  menuData: MenuItem[],
  active: number,
  collapsed: boolean
}

export interface MenuItem {
  menuId: number
  name?: string
  title?: string
  icon?: string
}

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => {
    const { menuId: active } = menuData.find(item => item.name === router.currentRoute.value.name) || { menuId: 1 }
    return ({
      menuData,
      active,
      collapsed: true
    })
  },
  actions: {
    setSiderCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },
    changeMenu(menuId: number) {
      this.active = menuId
      const item = this.menuData.find(item => item.menuId === menuId)
      if (item?.name) {
        router.push({ name: item.name })
      }
    }
  },
})
