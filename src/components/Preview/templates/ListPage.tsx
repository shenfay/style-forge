/**
 * 移动端购物车页（列表页）
 * 完整电商购物车：店铺分组、商品列表、数量管理、猜你喜欢、结算栏
 * 所有样式通过全局配置与设计令牌驱动
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Card } from '../../UI/Card'
import { Placeholder } from '../Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface ListPageProps {
  config: StyleConfig
}

export function ListPage({ config }: ListPageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  const cartItems = [
    {
      store: 'Apple 官方旗舰店',
      items: [
        { name: 'Apple Watch Series 9', spec: '午夜色/45mm', price: 2999, count: 1, image: 'Apple Watch' },
        { name: 'AirPods Pro 2', spec: '白色', price: 1899, count: 1, image: 'AirPods' },
      ],
    },
    {
      store: '索尼数码专营店',
      items: [
        { name: 'Sony WH-1000XM5', spec: '黑色/头戴式', price: 2499, count: 1, image: 'Sony' },
      ],
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />

      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-5 py-3" style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          <span className="text-base font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>购物车</span>
        </div>
        <button className="cursor-pointer" style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>编辑</button>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* 店铺商品分组 */}
        {cartItems.map((store, si) => (
          <div key={si}>
            {/* 店铺头 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded flex items-center justify-center cursor-pointer" style={{
                background: config.primaryColor,
                borderRadius: 3,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>{store.store}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            {/* 商品卡片 */}
            <Card config={config}>
              {store.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-3 p-4" style={{
                  borderBottom: ii < store.items.length - 1 ? `1px solid ${colors.border.light}` : 'none',
                }}>
                  {/* 选择框 */}
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 cursor-pointer" style={{
                    background: config.primaryColor,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  {/* 商品图片 */}
                  <div className="w-20 h-20 shrink-0" style={{ borderRadius: radius, overflow: 'hidden' }}>
                    <Placeholder width={80} height={80} type="product" text={item.image} />
                  </div>

                  {/* 商品信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm mb-1 line-clamp-1" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>{item.name}</div>
                    <div className="text-xs mb-2" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.spec}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: config.primaryColor, fontSize: bodyFontSize, fontWeight: fontWeight.bold }}>¥{item.price}</span>
                      <div className="flex items-center gap-1">
                        <button className="w-6 h-6 flex items-center justify-center cursor-pointer" style={{
                          borderRadius: radius,
                          background: colors.background.card,
                          border: `1px solid ${colors.border.light}`,
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                        </button>
                        <span className="text-sm w-6 text-center" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{item.count}</span>
                        <button className="w-6 h-6 flex items-center justify-center cursor-pointer" style={{
                          borderRadius: radius,
                          background: colors.background.card,
                          border: `1px solid ${colors.border.light}`,
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14m-7-7h14"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* 猜你喜欢 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: colors.border.light }} />
            <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>猜你喜欢</span>
            <div className="flex-1 h-px" style={{ background: colors.border.light }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'iPhone 15 Pro', price: 7999, tag: '新品' },
              { name: 'iPad Pro M2', price: 6799, tag: '爆款' },
              { name: 'MacBook Air M3', price: 8999 },
              { name: 'Nintendo Switch', price: 2099, tag: '推荐' },
            ].map((item, i) => (
              <div key={i} className="bg-white overflow-hidden" style={{ borderRadius: radius, boxShadow: shadows.sm }}>
                <Placeholder width={165} height={165} type="product" text={item.name} />
                <div className="p-3 space-y-1">
                  <div className="text-xs line-clamp-1" style={{ color: colors.text.primary, fontSize: fontSize.xs }}>{item.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: config.primaryColor, fontSize: fontSize.xs, fontWeight: fontWeight.bold }}>¥{item.price}</span>
                    {item.tag && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold rounded-full" style={{
                        background: withOpacity(config.primaryColor, 0.1),
                        color: config.primaryColor,
                        border: `0.5px solid ${withOpacity(config.primaryColor, 0.2)}`,
                      }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: config.primaryColor }} />
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部安全区 */}
        <div className="h-16" />
      </div>

      {/* 底部结算栏 - 固定 */}
      <div className="shrink-0 flex items-center px-5 py-3" style={{ 
        background: colors.white,
        borderTop: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{
            background: config.primaryColor,
            borderRadius: 3,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="text-sm" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>全选</span>
        </div>
        <div className="flex-1 text-right mr-3">
          <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>合计：</span>
          <span className="text-base font-bold" style={{ color: config.primaryColor, fontSize: fontSize.base, fontWeight: fontWeight.bold }}>¥7,397</span>
        </div>
        <button className="px-8 py-3 text-sm font-medium text-center cursor-pointer" style={{
          borderRadius: radius,
          background: config.buttonStyle === 'gradient'
            ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`
            : config.primaryColor,
          color: colors.white,
          fontSize: bodyFontSize,
        }}>
          结算(3)
        </button>
      </div>
    </div>
  )
}
