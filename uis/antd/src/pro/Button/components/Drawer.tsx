'use client'

import React, { useState } from 'react'
import { _ } from '@wzyjs/utils'
import { Button, Drawer as AntdDrawer, DrawerProps as AntdDrawerProps, ButtonProps } from 'antd'

export interface DrawerProps extends AntdDrawerProps {
  btnProps?: ButtonProps
  defaultOpen?: boolean
}

export const Drawer = (props: DrawerProps) => {
  const { children, defaultOpen, btnProps } = props
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false)

  return (
    <>
      <Button
        type='link'
        {...btnProps}
        onClick={ev => {
          btnProps?.onClick?.(ev)
          setOpen(true)
        }}
      />
      <AntdDrawer
        title={btnProps?.children}
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        {..._.omit(props, ['children', 'btnProps'])}
      >
        {children}
      </AntdDrawer>
    </>
  )
}
