import React, { useEffect } from 'react'
import { history, useModel } from '@umijs/max'

import { LoginPage } from '@/components'

import { user } from '@/apis'
import { Page } from '@/consts'

export default () => {
  const { userInfo, setUserInfo } = useModel('userState')

  useEffect(() => {
    if (userInfo) {
      history.replace(Page.Home)
    }
  }, [userInfo])

  return (
    <LoginPage
      apis={{ login: user.login }}
      onSuccess={setUserInfo}
    />
  )
}
