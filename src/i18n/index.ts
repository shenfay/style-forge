/**
 * i18n 初始化配置
 *
 * 语言检测策略:
 *   localStorage → navigator.language → fallback(zh-CN)
 *
 * 命名空间:
 *   common      - 通用 UI（导航、按钮、状态）
 *   designer    - 设计器（菜单、导出、配置区）
 *   home        - 营销首页
 *   placeholder - 占位图生成器
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonZh from './resources/zh-CN/common.json'
import designerZh from './resources/zh-CN/designer.json'
import homeZh from './resources/zh-CN/home.json'
import placeholderZh from './resources/zh-CN/placeholder.json'

import commonEn from './resources/en-US/common.json'
import designerEn from './resources/en-US/designer.json'
import homeEn from './resources/en-US/home.json'
import placeholderEn from './resources/en-US/placeholder.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': {
        common: commonZh,
        designer: designerZh,
        home: homeZh,
        placeholder: placeholderZh,
      },
      'en-US': {
        common: commonEn,
        designer: designerEn,
        home: homeEn,
        placeholder: placeholderEn,
      },
    },
    fallbackLng: 'zh-CN',
    ns: ['common', 'designer', 'home', 'placeholder'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React 已处理 XSS
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18n-lang',
      caches: ['localStorage'],
    },
  })

export default i18n
