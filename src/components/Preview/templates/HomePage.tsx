/**
 * 移动端首页模板
 */

import { Fragment } from 'react'
import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { Card } from '../../UI/Card'
import { Placeholder } from '../Placeholder'
import { SectionHeader } from '../SectionHeader'
import { ProductCard } from '../ProductCard'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, createGradient, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface HomePageProps {
  config: StyleConfig
}

export function HomePage({ config }: HomePageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <Fragment>
      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
        <StatusBar />

        {/* 1. 顶部搜索栏 */}
        <div className="sticky top-0 z-10 px-3 py-2" style={{ background: config.backgroundColor }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{
          borderRadius: radius,
          background: '#F5F5F5',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="flex-1" style={{ color: '#999', fontSize: tokens.typography.bodySize }}>搜索商品</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
            <rect x="7" y="7" width="10" height="10" rx="1"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
      </div>

      {/* 内容区 */}
      <div className="px-3 space-y-3">
        {/* 2. 活动轮播图 */}
        <div className="relative overflow-hidden" style={{ borderRadius: radius }}>
          <Placeholder width={375} height={160} type="banner" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{
                background: i === 0 ? config.primaryColor : 'rgba(255,255,255,0.5)'
              }} />
            ))}
          </div>
        </div>

        {/* 3. 公告栏 */}
        <div className="flex items-center gap-2 px-3 py-2" style={{
          borderRadius: radius,
          background: '#FFF9F0',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="flex-1 truncate" style={{ color: '#666', fontSize: tokens.typography.bodySize }}>商城公告：新用户注册立享8折优惠</span>
        </div>

        {/* 4. 分类导航 */}
        <div className="bg-white p-4" style={{ borderRadius: radius, boxShadow: shadows.sm }}>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: '数码', color: '#3B82F6' },
              { label: '服饰', color: '#EC4899' },
              { label: '家居', color: '#10B981' },
              { label: '美食', color: '#F59E0B' },
              { label: '美妆', color: '#8B5CF6' },
              { label: '运动', color: '#EF4444' },
              { label: '图书', color: '#6366F1' },
              { label: '母婴', color: '#F97316' },
              { label: '家电', color: '#14B8A6' },
              { label: '更多', color: '#6B7280' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden" style={{ background: `${item.color}15` }}>
                  <Placeholder width={48} height={48} type="icon" />
                </div>
                <span style={{ color: colors.text.secondary, fontSize: tokens.typography.bodySize }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 营销卡片 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 p-3" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
          }}>
            <div className="font-bold" style={{ color: colors.white, fontSize: bodyFontSize, lineHeight }}>限时抢购</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: tokens.typography.bodySize, marginTop: '4px' }}>距结束 02:15:30</div>
          </div>
          <div className="space-y-2">
            <div className="p-2" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
            }}>
              <div style={{ color: colors.white, fontSize: tokens.typography.bodySize, fontWeight: fontWeight.bold }}>新人专享</div>
            </div>
            <div className="p-2" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
            }}>
              <div style={{ color: colors.white, fontSize: tokens.typography.bodySize, fontWeight: fontWeight.bold }}>会员福利</div>
            </div>
          </div>
        </div>

        {/* 6-9. 其他区块（限时抢购、品牌专区、新品推荐、猜你喜欢） */}
        {/* 为简化，保留核心结构，完整实现需要继续提取 */}
      </div>
      </div>

      {/* 底部导航栏 - 始终固定在底部 */}
      <div className="shrink-0 px-3 py-2 z-20" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex justify-around">
          {[
            { icon: 'home', label: '首页' },
            { icon: 'category', label: '分类' },
            { icon: 'cart', label: '购物车' },
            { icon: 'user', label: '我的' },
          ].map((tab, i) => (
            <button key={i} className="flex flex-col items-center gap-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? config.primaryColor : colors.text.tertiary} strokeWidth="2">
                {tab.icon === 'home' && <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>}
                {tab.icon === 'category' && <g><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></g>}
                {tab.icon === 'cart' && <g><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></g>}
                {tab.icon === 'user' && <g><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></g>}
              </svg>
              <span style={{ fontSize: bodyFontSize, lineHeight, color: i === 0 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  )
}
