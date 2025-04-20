import React, { useState } from 'react'
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { router } from './config/default'

import 'antd/dist/antd.css'

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  const render = {
    title: () => {
      return (
        <div style={{ color: '#fff', fontSize: 22, lineHeight: '64px', textAlign: 'center' }}>
          <Link to='/'>虚拟商品管理</Link>
        </div>
      )
    },
    menus: () => {
      const renderSubMenu = ({ key, title, children = [] }) => {
        return (
          <Menu.SubMenu key={key} title={title}>
            {children?.map(item => (
              item?.children?.length ? renderSubMenu(item) : renderMenuItem(item)),
            )}
          </Menu.SubMenu>
        )
      }
      const renderMenuItem = ({ key, title }) => {
        return (
          <Menu.Item key={key}>
            <Link to={key}>{title}</Link>
          </Menu.Item>
        )
      }
      return (
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['/goodManage']}>
          {router.map((item: any) => {
            return item?.children?.length ? renderSubMenu(item) : renderMenuItem(item)
          })}
        </Menu>
      )
    },
    header: () => {
      return <Layout.Header className='site-layout-background' style={{ padding: 0 }} />
    },
    body: () => {
      return (
        <Layout.Content style={{ padding: 16, overflow: 'auto' }}>
          <div className='site-layout-background'>
            <Switch>
              {router.map((item) => (
                <Route exact key={item.key} path={item.key} component={item.component} />
              ))}
              <Redirect to='/goodManage' />
            </Switch>
          </div>
        </Layout.Content>
      )
    },
  }

  return (
    <div className='App'>
      <Layout style={{ height: '100vh' }}>
        <HashRouter>

          {/* 左侧菜单 */}
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          >
            {/* 网站名称 */}
            {render.title()}
            {/* 菜单列表 */}
            {render.menus()}
          </Layout.Sider>

          {/* 主体内容 */}
          <Layout className='site-layout'>
            {/* 顶部横条 */}
            {render.header()}
            {/*/!* 主体区域 *!/*/}
            {render.body()}
          </Layout>
        </HashRouter>
      </Layout>
    </div>
  )
}
