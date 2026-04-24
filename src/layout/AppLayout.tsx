/**
 * 应用级布局容器
 * 所有页面共享的基础布局框架
 */

import React from 'react'
import { layoutConfig } from './layout-config'

interface AppLayoutProps {
  /** 左侧边栏内容 */
  sidebar?: React.ReactNode
  /** 右侧面板内容 */
  panel?: React.ReactNode
  /** 顶部栏内容 */
  header?: React.ReactNode
  /** 主内容区 */
  children: React.ReactNode
  /** 是否显示侧边栏 */
  showSidebar?: boolean
  /** 是否显示面板 */
  showPanel?: boolean
  /** 自定义类名 */
  className?: string
}

export function AppLayout({
  sidebar,
  panel,
  header,
  children,
  showSidebar = true,
  showPanel = true,
  className = '',
}: AppLayoutProps) {
  return (
    <div className={`h-screen flex ${className}`} style={{ backgroundColor: layoutConfig.main.backgroundColor }}>
      {/* 左侧边栏 */}
      {showSidebar && sidebar && (
        <aside
          className="overflow-y-auto shrink-0 transition-all duration-300 flex flex-col"
          style={{
            width: layoutConfig.sidebar.width,
            padding: layoutConfig.sidebar.padding,
            backgroundColor: layoutConfig.sidebar.backgroundColor,
            borderRight: `1px solid ${layoutConfig.sidebar.borderColor}`,
          }}
        >
          {sidebar}
        </aside>
      )}

      {/* 右侧主体区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        {header && (
          <header
            className="flex items-center shrink-0 border-b"
            style={{
              height: layoutConfig.header.height,
              padding: layoutConfig.header.padding,
              backgroundColor: layoutConfig.header.backgroundColor,
              borderColor: layoutConfig.header.borderColor,
            }}
          >
            {header}
          </header>
        )}

        {/* 主内容区和右侧面板 */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* 主内容区 */}
          <main
            className="flex-1 overflow-auto"
            style={{
              padding: layoutConfig.preview.padding,
              backgroundColor: layoutConfig.preview.backgroundColor,
            }}
          >
            {children}
          </main>

          {/* 右侧面板 */}
          {showPanel && panel && (
            <aside
              className="overflow-y-auto shrink-0"
              style={{
                width: layoutConfig.panel.width,
                padding: layoutConfig.panel.padding,
                backgroundColor: layoutConfig.panel.backgroundColor,
                borderLeft: `1px solid ${layoutConfig.panel.borderColor}`,
              }}
            >
              {panel}
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
