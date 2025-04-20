import { useModel } from '@umijs/max'
import { setupHttpClient } from '@midwayjs/rpc'
import { initHttpClient } from '@/utils'

initHttpClient(setupHttpClient, {
  timeout: 10 * 60 * 1000,
  onError: (err: any) => {
    switch (err?.status) {
      case 401:
        location.href = '/login'
        break
      default:
        throw new Error(err?.response?.data.message || err.message)
    }
  },
})

export const layout = () => {
  const { collapsed, setCollapsed } = useModel('appState')

  return {
    collapsed: true,
    onCollapse: setCollapsed,
    menu: {
      locale: false,
    },
  }
}
