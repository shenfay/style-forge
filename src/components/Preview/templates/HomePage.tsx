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
import { colors, fontWeight, getBorderRadius, shadows, generateComponentTokens } from '../../../utils/tokenResolver'

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
          background: colors.background.card,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="flex-1" style={{ color: colors.text.tertiary, fontSize: tokens.typography.bodySize }}>搜索商品</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.secondary} strokeWidth="2">
            <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
            <rect x="7" y="7" width="10" height="10" rx="1"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.secondary} strokeWidth="2">
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
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: i === 0 ? '14px' : '5px',
                height: '5px',
                borderRadius: '999px',
                background: i === 0 ? config.primaryColor : 'rgba(255,255,255,0.5)',
                transition: 'width 0.2s ease',
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
          <span className="flex-1 truncate" style={{ color: colors.text.secondary, fontSize: tokens.typography.bodySize }}>商城公告：新用户注册立享8折优惠</span>
        </div>

        {/* 4. 分类导航 */}
        <div className="bg-white p-4" style={{ borderRadius: radius, boxShadow: shadows.sm }}>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: '数码', emoji: '📱', color: '#3B82F6' },
              { label: '服饰', emoji: '👗', color: '#EC4899' },
              { label: '家居', emoji: '🛋️', color: '#10B981' },
              { label: '美食', emoji: '🍜', color: '#F59E0B' },
              { label: '美妆', emoji: '💄', color: '#8B5CF6' },
              { label: '运动', emoji: '⚽', color: '#EF4444' },
              { label: '图书', emoji: '📚', color: '#6366F1' },
              { label: '母婴', emoji: '🍼', color: '#F97316' },
              { label: '家电', emoji: '🖥️', color: '#14B8A6' },
              { label: '更多', emoji: '⋯', color: '#6B7280' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>{item.emoji}</span>
                </div>
                <span style={{ color: colors.text.secondary, fontSize: tokens.typography.bodySize }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 营销卡片 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 p-3 relative overflow-hidden" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
          }}>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="absolute -right-2 -top-6 w-12 h-12 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="relative z-10">
              <div className="font-bold" style={{ color: colors.white, fontSize: bodyFontSize, lineHeight }}>限时抢购</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: tokens.typography.bodySize, marginTop: '4px' }}>距结束 02:15:30</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="p-2 relative overflow-hidden" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
            }}>
              <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="relative" style={{ color: colors.white, fontSize: tokens.typography.bodySize, fontWeight: fontWeight.bold }}>新人专享</div>
            </div>
            <div className="p-2 relative overflow-hidden" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
            }}>
              <div className="absolute -right-2 -bottom-4 w-12 h-12 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="relative" style={{ color: colors.white, fontSize: tokens.typography.bodySize, fontWeight: fontWeight.bold }}>会员福利</div>
            </div>
          </div>
        </div>

        {/* 6. 限时抢购 */}
        <section>
          <SectionHeader 
            config={config}
            title="限时抢购"
            showDecoration={true}
            align={config.titleStyle === 'left-accent' ? 'left' : config.titleStyle === 'right-accent' ? 'right' : config.titleStyle === 'bottom-accent' ? 'bottom' : 'left'}
            onMoreClick={() => {}}
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="shrink-0 w-28 flex flex-col items-center p-2 bg-white" style={{
                borderRadius: radius,
                boxShadow: shadows.sm,
              }}>
                <div className="w-full flex justify-center mb-2">
                  <Placeholder width={96} height={96} type="product" />
                </div>
                <div className="text-sm font-bold" style={{ color: tokens.colors.primary }}>¥{99 + i * 10}</div>
                <div className="line-through text-xs" style={{ color: colors.text.tertiary }}>¥{199 + i * 20}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 品牌专区 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-base font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>品牌专区</div>
            </div>
            <button style={{ fontSize: bodyFontSize, lineHeight, color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: 'Apple', color: '#555555' },
              { name: 'Nike', color: '#EA4C2C' },
              { name: 'Sony', color: '#1A1A1A' },
              { name: 'Adidas', color: '#005E9E' },
              { name: 'Samsung', color: '#1428A0' },
              { name: 'Huawei', color: '#CF0A2C' },
            ].map((brand, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 bg-white" style={{
                borderRadius: radius,
                boxShadow: shadows.sm,
              }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${brand.color}15` }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: brand.color }}>{brand.name.substring(0, 2)}</span>
                </div>
                <span style={{ fontSize: bodyFontSize, lineHeight, fontWeight: 500, color: colors.text.primary }}>{brand.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. 新品推荐 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-base font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>新品推荐</div>
            </div>
            <button style={{ fontSize: bodyFontSize, lineHeight, color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'Apple Watch Series 9', price: 2999, originalPrice: 3499, tag: '新品', sales: '1.2万' },
              { title: 'AirPods Pro 2', price: 1899, originalPrice: 2299, tag: '热卖', sales: '8563' },
            ].map((item, i) => (
              <ProductCard
                key={i}
                config={config}
                image={<Placeholder width={180} height={180} type="product" />}
                productName={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                tag={item.tag}
                sales={item.sales}
              />
            ))}
          </div>
        </section>

        {/* 9. 猜你喜欢 */}
        <section className="pb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-base font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>猜你喜欢</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'Sony WH-1000XM5', price: 2499, originalPrice: 2999, sales: '2.8万' },
              { title: 'Nintendo Switch OLED', price: 2099, originalPrice: 2599, sales: '1.2万' },
              { title: 'Dell XPS 15', price: 12999, originalPrice: 14999, sales: '4521' },
              { title: 'Logitech MX Master 3', price: 799, originalPrice: 999, sales: '8563' },
            ].map((item, i) => (
              <ProductCard
                key={i}
                config={config}
                image={<Placeholder width={180} height={180} type="product" />}
                productName={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                sales={item.sales}
              />
            ))}
          </div>
        </section>
      </div>
      </div>

      {/* 底部导航栏 - 始终固定在底部 */}
      <div className="shrink-0 px-3 py-2 z-20" style={{ 
        background: colors.white,
        borderTop: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex justify-around">
          {[
            { icon: 'home', label: '首页' },
            { icon: 'category', label: '分类' },
            { icon: 'cart', label: '购物车' },
            { icon: 'user', label: '我的' },
          ].map((tab, i) => (
            <button key={i} className="flex flex-col items-center gap-0.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? config.primaryColor : colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {tab.icon === 'home' && <><path d="M3 10a1 1 0 0 1 .4-.8l8-6a1 1 0 0 1 1.2 0l8 6a1 1 0 0 1 .4.8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Z"/><path d="M9 22V12h6v10"/></>}
                {tab.icon === 'category' && <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>}
                {tab.icon === 'cart' && <><circle cx="9" cy="21" r="1.5"/><circle cx="20" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>}
                {tab.icon === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
              </svg>
              <span style={{ fontSize: bodyFontSize, lineHeight, color: i === 0 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  )
}
