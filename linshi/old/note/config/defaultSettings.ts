import { Settings as LayoutSettings } from '@ant-design/pro-components'

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  siderWidth?: number;
  disableContentMargin?: boolean;
} = {
  title: 'newNote',
  iconfontUrl: '',
  logo: '/icon.webp',

  layout: 'mix',
  splitMenus: true,

  navTheme: 'light',
  contentWidth: 'Fluid',
  colorWeak: false,
  siderWidth: 250,
  fixedHeader: true,
  fixSiderbar: true,
  disableContentMargin: true,

  pwa: false,
}

export default Settings
