import React from 'react'
import { Navigate, Outlet, useModel } from '@umijs/max'
import { Page } from '@/consts'
import { Loading } from '@/components'

export default () => {
  const { userInfo, loading } = useModel('userState')

  if (loading) {
    return <Loading />
  }

  if (userInfo) {
    // @ts-ignore
    return <Outlet />
  }

  return <Navigate to={Page.Login} />
}
