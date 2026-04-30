/**
 * 移动端设置页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { Card } from '../../UI/Card'
import { colors } from '../../../utils/tokenResolver'

interface SettingsPageProps {
  config: StyleConfig
}

export function SettingsPage({ config }: SettingsPageProps) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="设置" showBack />

      <div className="px-6 py-4 space-y-3">
        {/* 账号设置 */}
        <Card config={config} className="divide-y divide-gray-100">
          {[
            { icon: '👤', label: '账号与安全' },
            { icon: '🔔', label: '通知设置' },
            { icon: '🔒', label: '隐私设置' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm" style={{ color: colors.text.primary }}>{item.label}</span>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="#999" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </Card>

        {/* 系统设置 */}
        <Card config={config} className="divide-y divide-gray-100">
          {[
            { icon: '🌐', label: '语言', value: '简体中文' },
            { icon: '🎨', label: '主题', value: '浅色' },
            { icon: '💾', label: '缓存', value: '128MB' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm" style={{ color: colors.text.primary }}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: colors.text.tertiary }}>{item.value}</span>
                <svg className="w-4 h-4" fill="none" stroke="#999" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </Card>

        {/* 退出登录 */}
        <button className="w-full py-3 text-sm font-medium text-red-500">
          退出登录
        </button>
      </div>
    </div>
  )
}
