import { localforage } from '@wzyjs/utils'

export interface Values {
  name: string,
  password: string,
  remember?: boolean,
}

export const localStorageKey = 'loginInfo'

export const defaultBackgroundImageUrl = 'https://www.helloweba.net/demo/2018/logins/v1/images/bg-01.jpg'

export const rememberUserInfo = (values: Values) => {
  localforage.setItem(localStorageKey, { name: values.name })
}

export const getRememberUserInfo = async (): Promise<Values> => {
  const values = await localforage.getItem<Values | null>(localStorageKey) || {} as Values
  values.remember = true
  return values
}
