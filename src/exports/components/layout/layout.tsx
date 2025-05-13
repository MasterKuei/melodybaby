import { LeftOutlined } from "@ant-design/icons"
import { Breadcrumb, Grid, Menu, Typography } from "antd"
import type { MenuProps } from "antd"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { isNil, isEmpty } from "lodash-es"

import classNames from "../../utils/class-names"
import Logo from "./components/logo"

interface MenuItem {
  name: string
  icon?: ReactNode
  path?: string
  children?: MenuItem[]
}

export interface LayoutProps {
  /** 網頁標題 */
  title?: string
  /** 選單 */
  menu?: MenuItem[]
  /** 當前頁面的網址路徑 */
  path?: string
  /** 右上角工具列 */
  toolBar?: ReactNode
  /** 選單的渲染函數 */
  menuItemRender?: (item: MenuItem) => ReactNode
  /** 選單的點擊事件 */
  onMenuClick?: (key?: string) => void
  /** 內容 */
  children?: ReactNode
}

const { useBreakpoint } = Grid

const getBreadcrumbItems = (menu: MenuItem[], targetKey: string): { title: string }[] => {
  const path: { title: string }[] = []
  const dfs = (menu: MenuItem[], targetKey: string): boolean => {
    for (const item of menu) {
      path.push({ title: item.name })
      if (item.path === targetKey) {
        return true
      }
      if (item?.children && dfs(item.children, targetKey)) {
        return true
      }
      path.pop()
    }
    return false
  }
  dfs(menu, targetKey)
  return path
}

const Layout = ({ title, menu: config = [], path: activeKey, toolBar, menuItemRender, onMenuClick, children }: LayoutProps) => {
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)
  const [innerActiveKey, setInnerActiveKey] = useState("")

  const currentActiveKey = !isNil(activeKey) && !isEmpty(activeKey) ? activeKey : innerActiveKey

  const getMenuItems = (config: MenuItem[], depth: number = 0): MenuProps["items"] =>
    config.map((item, id) => {
      return {
        key: item?.path || `${depth}-${id}`,
        name: item.name,
        label: menuItemRender ? menuItemRender(item) : item.name,
        icon: item.icon,
        children: item.children ? getMenuItems(item.children, depth + 1) : undefined
      }
    })

  const menuItems = getMenuItems(config)
  const breadcrumbItems = getBreadcrumbItems(config, currentActiveKey)

  useEffect(() => {
    if (screens.md) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }, [screens.md])

  return (
    <div>
      <div className="m:from-gray-1 m:to-gray-2 m:fixed m:-z-50 m:h-full m:w-full m:bg-linear-to-b m:to-25%" />
      <header className="m:border-gray-4 m:bg-gray-1/60 m:fixed m:top-0 m:left-0 m:z-10 m:flex m:h-14 m:w-full m:flex-none m:border-b m:px-4 m:backdrop-blur-xs">
        <div className="m:mr-4 m:flex m:flex-none m:items-center">
          <Logo className="m:mr-2 size-5" />
          <Typography.Title level={5} className="m:my-0">
            {title}
          </Typography.Title>
        </div>
        <div className="m:flex m:flex-1 m:justify-end m:items-center">{toolBar}</div>
      </header>
      <aside
        className={classNames("m:border-gray-4 m:fixed m:top-14 m:left-0 m:h-full m:flex-none m:border-r m:pr-4 m:bg-gray-1 m:transition-all", {
          "m:w-56": !collapsed,
          "m:w-16": collapsed
        })}
      >
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[currentActiveKey]}
          onClick={({ key }) => {
            setInnerActiveKey(key)
            onMenuClick?.(key)
          }}
          className="m:h-full m:w-full m:border-0"
          items={menuItems}
        />
        <div
          onClick={() => {
            setCollapsed((collapsed) => !collapsed)
          }}
          className="m:text-red m:text-gray-7 m:hover:text-gray-11 m:bg-gray-1 m:absolute m:top-4 m:right-0 m:flex m:size-6 m:translate-x-1/2 m:cursor-pointer m:items-center m:justify-center m:rounded-full m:shadow-md"
        >
          <LeftOutlined
            className={classNames("m:text-[10px] m:transition-transform", {
              "m:rotate-180": collapsed,
              "m:rotate-0": !collapsed
            })}
          />
        </div>
      </aside>
      <main
        className={classNames("m:flex m:pt-14 m:transition-all", {
          "m:pl-56": !collapsed,
          "m:pl-16": collapsed
        })}
      >
        <div className="m:w-full m:px-8 m:pt-4 m:pb-40">
          <Breadcrumb className="m:mb-4" items={breadcrumbItems} />
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
