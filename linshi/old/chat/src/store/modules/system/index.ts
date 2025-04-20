import { defineStore } from 'pinia'
import { fetchSetting } from '@/api';

export const useSystemStore = defineStore('system-store', {
  state: (): any => ({
    loading: undefined,
    systemSetting: null,
  }),

  actions: {
    async fetchSystemSetting() {
      this.loading = true
      const { data: { value } } = await fetchSetting<{ value: any }>()
      this.systemSetting = value
      this.loading = false
    }
  },
})
