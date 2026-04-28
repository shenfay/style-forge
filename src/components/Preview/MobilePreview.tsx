/**
 * 移动端预览组件（路由分发器）
 * 根据页面类型分发到对应的模板组件
 */

import { memo } from 'react'
import type { StyleConfig } from '../../types/config'
import type { PageType, SceneType } from '../../types/template'
import {
  HomePage,
  DetailPage,
  ListPage,
  ResultPage,
  ProfilePage,
  MessagesPage,
  SettingsPage,
  FormPage,
  DefaultPage,
} from './templates'
// 内容平台模板
import {
  ContentHomePage,
  ContentDetailPage,
  ContentProfilePage,
} from './templates'
// Landing 场景模板
import {
  LandingHomePage,
} from './templates'

interface MobilePreviewProps {
  config: StyleConfig
  pageType: PageType
  scene?: SceneType
}

/**
 * 移动端预览组件
 * @param config - 样式配置
 * @param pageType - 页面类型
 * @returns 对应的页面模板组件
 */
export const MobilePreview = memo(function MobilePreview({ config, pageType, scene }: MobilePreviewProps) {
  // Landing 场景
  if (scene === 'landing') {
    switch (pageType) {
      case 'home':
        return <LandingHomePage config={config} />
      default:
        return <DefaultPage config={config} />
    }
  }

  // 内容平台场景
  if (scene === 'content') {
    switch (pageType) {
      case 'home':
        return <ContentHomePage config={config} />
      case 'detail':
        return <ContentDetailPage config={config} />
      case 'profile':
        return <ContentProfilePage config={config} />
      default:
        return <DefaultPage config={config} />
    }
  }

  // 电商场景（默认）
  switch (pageType) {
    case 'home':
      return <HomePage config={config} />
    case 'detail':
      return <DetailPage config={config} />
    case 'list':
      return <ListPage config={config} />
    case 'result':
      return <ResultPage config={config} />
    case 'profile':
      return <ProfilePage config={config} />
    case 'messages':
      return <MessagesPage config={config} />
    case 'settings':
      return <SettingsPage config={config} />
    case 'form':
      return <FormPage config={config} />
    default:
      return <DefaultPage config={config} />
  }
})
