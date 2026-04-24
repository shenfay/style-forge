/**
 * 移动端个人中心页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Card } from '../../UI/Card'
import { colors, getBorderRadius, generateComponentTokens } from '../../../utils/design-tokens'

interface ProfilePageProps {
  config: StyleConfig
}

export function ProfilePage({ config }: ProfilePageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      
      {/* 个人信息区 */}
      <div className="px-6 py-8" style={{ background: config.primaryColor }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            👤
          </div>
          <div className="flex-1">
            <div className="text-white text-lg font-bold">用户名</div>
            <div className="text-white/80 text-sm">用户ID: 123456</div>
          </div>
          <button className="px-3 py-1 text-xs text-white border border-white/50 rounded" style={{ borderRadius: radius }}>
            编辑
          </button>
        </div>
        
        {/* 统计数据 */}
        <div className="flex justify-around mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-white text-xl font-bold">128</div>
            <div className="text-white/70 text-xs">动态</div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl font-bold">1.2k</div>
            <div className="text-white/70 text-xs">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl font-bold">356</div>
            <div className="text-white/70 text-xs">关注</div>
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="px-6 py-4 space-y-3">
        {/* 我的订单 */}
        <Card config={config} className="p-4">
          <div className="font-medium mb-3" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>我的订单</div>
          <div className="flex justify-around">
            {[
              { icon: '💰', label: '待付款' },
              { icon: '📦', label: '待发货' },
              { icon: '🚚', label: '待收货' },
              { icon: '⭐', label: '待评价' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xl">{item.icon}</span>
                <span style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 常用功能 */}
        <Card config={config} className="divide-y divide-gray-100">
          {[
            { icon: '❤️', label: '我的收藏' },
            { icon: '📍', label: '收货地址' },
            { icon: '🎫', label: '优惠券' },
            { icon: '💳', label: '钱包' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>{item.label}</span>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="#999" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </Card>
      </div>

      {/* 底部导航 */}
      <div className="px-6 py-3" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex justify-around">
          {[
            { icon: '🏠', label: '首页' },
            { icon: '🔍', label: '发现' },
            { icon: '💬', label: '消息' },
            { icon: '👤', label: '我的' },
          ].map((tab, i) => (
            <button key={i} className="flex flex-col items-center gap-1">
              <span className="text-lg">{tab.icon}</span>
              <span style={{ fontSize: bodyFontSize, lineHeight, color: i === 3 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
