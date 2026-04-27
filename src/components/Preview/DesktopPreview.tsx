import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'
import { radiusMap } from '../../types/config'
import { Placeholder } from './Placeholder'
import { SectionHeader } from './SectionHeader'
import { ProductCard } from './ProductCard'
import { colors, fontSize, fontWeight, shadows, withOpacity, generateComponentTokens } from '../../utils/design-tokens'

interface DesktopPreviewProps {
  config: StyleConfig
  pageType: PageType
}

// 辅助函数：根据配置获取正文字号
function getBodyFontSize(config: StyleConfig): string {
  switch (config.bodySize) {
    case 'small': return '12px'
    case 'large': return '16px'
    default: return '14px'
  }
}

// 辅助函数：根据配置获取行高
function getLineHeight(config: StyleConfig): string {
  switch (config.lineHeight) {
    case 'compact': return '1.4'
    case 'relaxed': return '2.0'
    default: return '1.6'
  }
}

export function DesktopPreview({ config, pageType }: DesktopPreviewProps) {
  // 根据页面类型渲染不同内容
  switch (pageType) {
    case 'home':
      return <HomePage config={config} />
    case 'detail':
      return <DetailPage config={config} />
    case 'list':
      return <ListPage config={config} />
    case 'profile':
      return <ProfilePage config={config} />
    case 'settings':
      return <SettingsPage config={config} />
    default:
      return <DefaultPage config={config} />
  }
}

// PC端电商首页
function HomePage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div style={{ background: config.backgroundColor }}>
      {/* 1. 顶部导航栏 */}
      <header className="sticky top-0 z-10 px-8 py-4" style={{
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : '#FFFFFF',
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-xl font-bold" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#1A1A1A' }}>
            品牌 Logo
          </div>

          {/* 搜索框 */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-2 px-4 py-2.5" style={{
              borderRadius: radius,
              background: config.titleBarStyle === 'colored-bg' ? 'rgba(255,255,255,0.2)' : '#F5F5F5',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={config.titleBarStyle === 'colored-bg' ? 'rgba(255,255,255,0.7)' : '#999'} strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span style={{ color: config.titleBarStyle === 'colored-bg' ? 'rgba(255,255,255,0.7)' : '#999', fontSize: bodyFontSize, lineHeight }}>搜索商品、品牌或分类</span>
            </div>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center gap-6">
            <button className="relative" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#666666' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs text-white flex items-center justify-center" style={{ background: '#FF4757' }}>3</span>
            </button>
            <div className="flex items-center gap-2" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#666666' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: bodyFontSize, lineHeight }}>我的账户</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-8 py-6">
        {/* 2-3. 左侧分类 + 右侧轮播图 */}
        <div className="flex gap-4 mb-6" style={{ height: '400px' }}>
          {/* 左侧分类导航 */}
          <div className="w-56 shrink-0 p-4" style={{
            borderRadius: radius,
            background: '#FFFFFF',
            boxShadow: shadows.sm,
          }}>
            <div className="space-y-1">
              {['数码电子', '服装鞋帽', '家居家装', '美妆个护', '食品生鲜', '运动户外', '图书文具', '母婴玩具', '汽车用品'].map((category, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors" style={{
                  borderRadius: radius,
                  background: i === 0 ? withOpacity(config.primaryColor, 0.1) : 'transparent',
                  color: i === 0 ? config.primaryColor : '#333333',
                  fontSize: bodyFontSize,
                  lineHeight,
                }}>
                  <span>{category}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧轮播图 */}
          <div className="flex-1 relative overflow-hidden" style={{ borderRadius: radius }}>
            <Placeholder width={960} height={400} type="banner" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  width: i === 0 ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: i === 0 ? config.primaryColor : 'rgba(255,255,255,0.5)',
                  transition: 'width 0.2s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* 4. 公告栏 */}
        <div className="flex items-center gap-3 px-6 py-3 mb-6" style={{
          borderRadius: radius,
          background: '#FFF9F0',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span style={{ color: '#666', fontSize: bodyFontSize, lineHeight }}>商城公告：新用户注册立享8折优惠，满199元包邮！春季大促进行中...</span>
        </div>

        {/* 5. 营销卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-2 p-6 relative overflow-hidden" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
          }}>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="absolute -right-3 -top-8 w-16 h-16 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="relative z-10">
              <div className="text-white text-xl font-bold mb-2">限时抢购</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: bodyFontSize, lineHeight, marginBottom: '12px' }}>距结束 02:15:30</div>
              <div className="flex gap-1">
                {['02', '15', '30'].map((t, i) => (
                  <div key={i} className="px-2 py-1 text-white font-bold" style={{
                    borderRadius: 4,
                    background: 'rgba(0,0,0,0.2)',
                    fontSize: bodyFontSize,
                  }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 relative overflow-hidden" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
          }}>
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="relative z-10">
              <div className="text-white text-lg font-bold mb-2">新人专享</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: bodyFontSize, lineHeight }}>注册立享 ¥100 优惠券</div>
            </div>
          </div>
          <div className="p-6 relative overflow-hidden" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
          }}>
            <div className="absolute -right-3 -bottom-6 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="relative z-10">
              <div className="text-white text-lg font-bold mb-2">会员福利</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: bodyFontSize, lineHeight }}>积分兑换好礼</div>
            </div>
          </div>
        </div>

        {/* 6. 限时抢购 */}
        <section className="mb-8">
          <SectionHeader 
            config={config}
            title="限时抢购"
            showDecoration={true}
            align={config.titleStyle === 'left-accent' ? 'left' : config.titleStyle === 'right-accent' ? 'right' : config.titleStyle === 'bottom-accent' ? 'bottom' : 'left'}
            onMoreClick={() => {}}
          />
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="p-4 flex flex-col items-center" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                boxShadow: shadows.sm,
              }}>
                <div className="w-full flex justify-center mb-3">
                  <Placeholder width={200} height={200} type="product" />
                </div>
                <div className="text-lg font-bold" style={{ color: tokens.colors.primary }}>¥{99 + i * 10}</div>
                <div className="line-through" style={{ color: '#999', fontSize: bodyFontSize, lineHeight }}>¥{199 + i * 20}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 品牌专区 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '16px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '16px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '10px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-xl font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '18px' : config.titleSize === 'medium' ? '20px' : '24px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>品牌专区</div>
            </div>
            <button style={{ fontSize: bodyFontSize, lineHeight, color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {[
              { name: 'Apple', color: '#555555' },
              { name: 'Nike', color: '#EA4C2C' },
              { name: 'Sony', color: '#1A1A1A' },
              { name: 'Adidas', color: '#005E9E' },
              { name: 'Samsung', color: '#1428A0' },
              { name: 'Huawei', color: '#CF0A2C' },
            ].map((brand, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                boxShadow: shadows.sm,
              }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${brand.color}15` }}>
                  <span style={{ fontSize: '20px', fontWeight: 600, color: brand.color }}>{brand.name.substring(0, 2)}</span>
                </div>
                <span style={{ fontSize: bodyFontSize, lineHeight, fontWeight: 500, color: colors.text.primary }}>{brand.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. 新品推荐 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '16px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '16px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '10px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-xl font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '18px' : config.titleSize === 'medium' ? '20px' : '24px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>新品推荐</div>
            </div>
            <button style={{ fontSize: bodyFontSize, lineHeight, color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: 'Apple Watch Series 9', price: 2999, originalPrice: 3499, tag: '新品', sales: '1.2万' },
              { title: 'AirPods Pro 2', price: 1899, originalPrice: 2299, tag: '热卖', sales: '8563' },
              { title: 'MacBook Air M3', price: 8999, originalPrice: 10499, tag: '新品', sales: '6234' },
              { title: 'iPad Pro M2', price: 6799, originalPrice: 7999, tag: '爆款', sales: '4521' },
            ].map((item, i) => (
              <ProductCard
                key={i}
                config={config}
                image={<Placeholder width={280} height={280} type="product" />}
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
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '16px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '16px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '10px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-xl font-bold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '18px' : config.titleSize === 'medium' ? '20px' : '24px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>猜你喜欢</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: 'Sony WH-1000XM5', price: 2499, originalPrice: 2999, sales: '2.8万' },
              { title: 'Nintendo Switch OLED', price: 2099, originalPrice: 2599, sales: '1.2万' },
              { title: 'Dell XPS 15', price: 12999, originalPrice: 14999, sales: '4521' },
              { title: 'Logitech MX Master 3', price: 799, originalPrice: 999, sales: '8563' },
              { title: 'Kindle Paperwhite', price: 1099, originalPrice: 1399, sales: '9876' },
              { title: 'GoPro HERO12', price: 3499, originalPrice: 3999, sales: '6234' },
              { title: 'DJI Mini 4 Pro', price: 4799, originalPrice: 5499, sales: '3456' },
              { title: 'Bose QC45', price: 2299, originalPrice: 2799, sales: '7890' },
            ].map((item, i) => (
              <ProductCard
                key={i}
                config={config}
                image={<Placeholder width={280} height={280} type="product" />}
                productName={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                sales={item.sales}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 10. 页脚 */}
      <footer className="px-8 py-12" style={{ borderTop: '1px solid #E5E5E5', background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-base font-bold mb-4" style={{ color: colors.text.primary }}>关于我们</h4>
              <div className="space-y-2" style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                <div>公司简介</div>
                <div>联系我们</div>
                <div>加入我们</div>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold mb-4" style={{ color: colors.text.primary }}>客户服务</h4>
              <div className="space-y-2" style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                <div>帮助中心</div>
                <div>退换货政策</div>
                <div>配送说明</div>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold mb-4" style={{ color: colors.text.primary }}>商家入驻</h4>
              <div className="space-y-2" style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                <div>入驻流程</div>
                <div>商家规则</div>
                <div>常见问题</div>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold mb-4" style={{ color: colors.text.primary }}>关注我们</h4>
              <div className="space-y-2" style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                <div>微信公众号</div>
                <div>新浪微博</div>
                <div>抖音账号</div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8" style={{ borderTop: '1px solid #E5E5E5', color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>
            © 2026 Style Forge E-Commerce. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}



// PC端详情页（电商商品详情）
function DetailPage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div className="flex flex-col h-full" style={{ background: config.backgroundColor }}>
      {/* 顶部导航 */}
      <header className="shrink-0 px-8 py-4 flex items-center justify-between" style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold" style={{ color: colors.text.primary }}>商品详情</span>
          <div className="flex gap-6">
            {['首页', '商品分类', '购物车', '我的'].map((item, i) => (
              <button key={i} className="text-sm cursor-pointer" style={{ color: i === 1 ? config.primaryColor : colors.text.secondary }}>{item}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2" style={{ borderRadius: radius, background: colors.background.card }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>搜索商品</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-6">
          {/* 商品主体：左图右信息 */}
          <div className="flex gap-8 mb-8">
            {/* 左侧商品图 */}
            <div className="w-[400px] shrink-0">
              <Placeholder width={400} height={400} type="product" text="Apple Watch" />
              <div className="flex gap-2 mt-3">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded cursor-pointer" style={{
                    border: i === 0 ? `2px solid ${config.primaryColor}` : `2px solid ${colors.border.light}`,
                    overflow: 'hidden',
                  }}>
                    <Placeholder width={56} height={56} type="product" />
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧商品信息 */}
            <div className="flex-1">
              {/* 价格区 */}
              <div className="p-6 mb-4" style={{
                borderRadius: radius,
                background: colors.white,
                border: config.cardStyle === 'border' ? `1px solid ${colors.border.light}` : 'none',
                boxShadow: config.cardStyle === 'shadow' ? shadows.sm : 'none',
              }}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl font-bold" style={{ color: config.primaryColor, fontSize: fontSize['3xl'], fontWeight: fontWeight.bold }}>¥2,999</span>
                  <span className="text-lg line-through" style={{ color: colors.text.tertiary, fontSize: fontSize.lg }}>¥3,999</span>
                  <span className="px-2 py-0.5 text-xs rounded" style={{
                    background: withOpacity(config.primaryColor, 0.1),
                    color: config.primaryColor,
                    fontSize: fontSize.xs,
                  }}>立省¥1,000</span>
                </div>
                <h1 className="text-xl font-medium mb-4 leading-relaxed" style={{ color: colors.text.primary }}>
                  Apple Watch Series 9 智能手表 GPS 版 45毫米 午夜色 运动型表带
                </h1>
                <div className="flex gap-4" style={{ fontSize: bodyFontSize, color: colors.text.tertiary }}>
                  <span>已售 1.2万件</span>
                  <span>好评率 98%</span>
                </div>
              </div>

              {/* 促销标签 */}
              <div className="p-4 mb-4 flex flex-wrap gap-2" style={{
                borderRadius: radius,
                background: colors.white,
                border: config.cardStyle === 'border' ? `1px solid ${colors.border.light}` : 'none',
                boxShadow: config.cardStyle === 'shadow' ? shadows.sm : 'none',
              }}>
                <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>促销：</span>
                {['满199减30', '领券立减50', '6期免息'].map((tag, i) => (
                  <span key={i} className="px-2 py-0.5" style={{
                    borderRadius: config.badgeStyle === 'rounded' ? '999px' : '4px',
                    background: withOpacity(config.primaryColor, 0.08),
                    color: config.primaryColor,
                    fontSize: fontSize.xs,
                  }}>{tag}</span>
                ))}
              </div>

              {/* SKU 选择 */}
              <div className="p-4 mb-4" style={{
                borderRadius: radius,
                background: colors.white,
                border: config.cardStyle === 'border' ? `1px solid ${colors.border.light}` : 'none',
                boxShadow: config.cardStyle === 'shadow' ? shadows.sm : 'none',
              }}>
                <div className="mb-3">
                  <span className="text-sm font-medium mr-4" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>颜色</span>
                  {['午夜色', '星光色', '银色', '深空灰'].map((c, i) => (
                    <button key={i} className="px-4 py-1.5 mr-2 mb-1 cursor-pointer" style={{
                      borderRadius: radius,
                      background: i === 0 ? config.primaryColor : colors.background.card,
                      color: i === 0 ? colors.white : colors.text.secondary,
                      border: i === 0 ? 'none' : `1px solid ${colors.border.light}`,
                      fontSize: bodyFontSize,
                    }}>{c}</button>
                  ))}
                </div>
                <div>
                  <span className="text-sm font-medium mr-4" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>尺寸</span>
                  {['41mm', '45mm', 'Ultra 49mm'].map((s, i) => (
                    <button key={i} className="px-4 py-1.5 mr-2 cursor-pointer" style={{
                      borderRadius: radius,
                      background: i === 1 ? config.primaryColor : colors.background.card,
                      color: i === 1 ? colors.white : colors.text.secondary,
                      border: i === 1 ? 'none' : `1px solid ${colors.border.light}`,
                      fontSize: bodyFontSize,
                    }}>{s}</button>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 cursor-pointer" style={{
                  borderRadius: radius,
                  border: `1px solid ${config.primaryColor}`,
                  color: config.primaryColor,
                  background: colors.white,
                  fontSize: bodyFontSize,
                  fontWeight: fontWeight.medium,
                }}>加入购物车</button>
                <button className="flex-1 py-3 cursor-pointer" style={{
                  borderRadius: radius,
                  background: config.buttonStyle === 'gradient'
                    ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`
                    : config.primaryColor,
                  color: colors.white,
                  fontSize: bodyFontSize,
                  fontWeight: fontWeight.medium,
                }}>立即购买</button>
              </div>
            </div>
          </div>

          {/* 商品详情 Tab */}
          <div className="p-6 mb-6" style={{
            borderRadius: radius,
            background: colors.white,
            boxShadow: shadows.sm,
          }}>
            <div className="flex gap-8 mb-6 border-b" style={{ borderColor: colors.border.light }}>
              {['商品介绍', '规格参数', '售后保障'].map((tab, i) => (
                <button key={i} className="pb-3 cursor-pointer" style={{
                  color: i === 0 ? config.primaryColor : colors.text.tertiary,
                  fontSize: bodyFontSize,
                  fontWeight: fontWeight.medium,
                  borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : '2px solid transparent',
                }}>{tab}</button>
              ))}
            </div>
            <p style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
              Apple Watch Series 9 配备 S9 芯片，支持全天候视网膜显示屏，带来更快的处理和更流畅的交互体验。支持血氧检测、心电图、睡眠监测等健康功能，满足日常运动与健康管理需求。
            </p>
          </div>

          {/* 用户评价 */}
          <div className="p-6 mb-6" style={{
            borderRadius: radius,
            background: colors.white,
            boxShadow: shadows.sm,
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, fontWeight: fontWeight.medium }}>用户评价</span>
                <span className="text-lg font-bold" style={{ color: '#F59E0B', fontWeight: fontWeight.bold }}>4.8</span>
              </div>
              <button className="cursor-pointer" style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>查看全部 ›</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: '张***', content: '非常好用，续航持久，推荐购买！', rating: 5, spec: '午夜色/45mm' },
                { name: '李***', content: '包装精美，外观时尚，功能强大。', rating: 5, spec: '星光色/41mm' },
                { name: '王***', content: '物流很快，第二天就到了，好评。', rating: 4, spec: '午夜色/45mm' },
              ].map((review, i) => (
                <div key={i} className="p-4" style={{ borderRadius: radius, background: colors.background.card }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{review.name}</span>
                    <span className="text-xs" style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>{review.content}</p>
                  <p className="text-xs mt-1" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{review.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// PC端购物车页
function ListPage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div className="flex flex-col h-full" style={{ background: config.backgroundColor }}>
      {/* 顶部导航 */}
      <header className="shrink-0 px-8 py-4 flex items-center justify-between" style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold" style={{ color: colors.text.primary }}>购物车</span>
          <div className="flex gap-6">
            {['首页', '商品分类', '购物车', '我的'].map((item, i) => (
              <button key={i} className="text-sm cursor-pointer" style={{ color: i === 2 ? config.primaryColor : colors.text.secondary }}>{item}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm cursor-pointer" style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>编辑</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-6">
          {/* 店铺分组 */}
          {[
            { name: 'Apple 官方旗舰店', items: [
              { name: 'Apple Watch Series 9', spec: '午夜色/45mm', price: 2999, count: 1, img: 'Apple Watch' },
              { name: 'AirPods Pro 2', spec: '白色', price: 1899, count: 2, img: 'AirPods' },
            ]},
            { name: '索尼数码专营店', items: [
              { name: 'Sony WH-1000XM5', spec: '黑色/头戴式', price: 2499, count: 1, img: 'Sony' },
            ]},
          ].map((store, si) => (
            <div key={si} className="mb-6" style={{
              borderRadius: radius,
              background: colors.white,
              boxShadow: shadows.sm,
              overflow: 'hidden',
            }}>
              {/* 店铺头 */}
              <div className="flex items-center gap-2 px-6 py-4" style={{ borderBottom: `1px solid ${colors.border.light}` }}>
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{
                  background: config.primaryColor,
                  borderRadius: 3,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{store.name}</span>
              </div>
              {/* 商品列表 */}
              {store.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-4 px-6 py-4" style={{
                  borderBottom: ii < store.items.length - 1 ? `1px solid ${colors.border.light}` : 'none',
                }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{
                    background: config.primaryColor,
                    borderRadius: 3,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div className="w-24 h-24 shrink-0" style={{ borderRadius: radius, overflow: 'hidden' }}>
                    <Placeholder width={96} height={96} type="product" text={item.img} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{item.name}</div>
                    <div className="text-xs mb-2" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.spec}</div>
                  </div>
                  <div className="text-sm font-bold w-24 text-right" style={{ color: config.primaryColor, fontSize: bodyFontSize, fontWeight: fontWeight.bold }}>¥{item.price}</div>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center cursor-pointer" style={{ borderRadius: radius, background: colors.background.card, border: `1px solid ${colors.border.light}` }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                    </button>
                    <span className="text-sm w-8 text-center" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{item.count}</span>
                    <button className="w-7 h-7 flex items-center justify-center cursor-pointer" style={{ borderRadius: radius, background: colors.background.card, border: `1px solid ${colors.border.light}` }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14m-7-7h14"/></svg>
                    </button>
                  </div>
                  <div className="text-sm font-bold w-24 text-right" style={{ color: config.primaryColor, fontSize: bodyFontSize, fontWeight: fontWeight.bold }}>¥{item.price * item.count}</div>
                </div>
              ))}
            </div>
          ))}

          {/* 推荐区 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: colors.border.light }} />
              <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>为你推荐</span>
              <div className="flex-1 h-px" style={{ background: colors.border.light }} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'iPhone 15 Pro', price: 7999 },
                { name: 'iPad Pro M2', price: 6799 },
                { name: 'MacBook Air M3', price: 8999 },
                { name: 'Nintendo Switch', price: 2099 },
              ].map((item, i) => (
                <div key={i} className="overflow-hidden" style={{
                  borderRadius: radius,
                  background: colors.white,
                  boxShadow: shadows.sm,
                }}>
                  <Placeholder width={200} height={200} type="product" text={item.name} />
                  <div className="p-3">
                    <div className="text-sm mb-1" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>{item.name}</div>
                    <div className="text-sm font-bold" style={{ color: config.primaryColor, fontSize: bodyFontSize, fontWeight: fontWeight.bold }}>¥{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 底部结算栏 */}
      <footer className="shrink-0 px-8 py-4 flex items-center justify-between" style={{
        background: colors.white,
        borderTop: `1px solid ${colors.border.light}`,
      }}>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{
            background: config.primaryColor,
            borderRadius: 3,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <span className="text-sm" style={{ color: colors.text.primary, fontSize: bodyFontSize }}>全选</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>合计：</span>
            <span className="text-xl font-bold" style={{ color: config.primaryColor, fontSize: fontSize.xl, fontWeight: fontWeight.bold }}>¥9,386</span>
          </div>
          <button className="px-10 py-3 cursor-pointer" style={{
            borderRadius: radius,
            background: config.buttonStyle === 'gradient'
              ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`
              : config.primaryColor,
            color: colors.white,
            fontSize: bodyFontSize,
            fontWeight: fontWeight.medium,
          }}>结算(4)</button>
        </div>
      </footer>
    </div>
  )
}

// PC端个人中心
function ProfilePage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div style={{ background: config.backgroundColor }}>
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <span className="text-lg font-semibold">个人中心</span>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex items-center gap-6 mb-8 p-6" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        }}>
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
            👤
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>用户名</h2>
            <p style={{ color: '#666666', fontSize: bodyFontSize, lineHeight }}>用户ID: 123456</p>
          </div>
          <button className="px-4 py-2" style={{
            borderRadius: radius,
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
            fontSize: bodyFontSize,
          }}>
            编辑资料
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6" style={{
            borderRadius: radius,
            background: '#FFFFFF',
            border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>我的订单</h3>
            <div className="grid grid-cols-4 gap-4">
              {['待付款', '待发货', '待收货', '待评价'].map((item, i) => (
                <div key={i} className="text-center" style={{ color: '#666666', fontSize: bodyFontSize, lineHeight }}>{item}</div>
              ))}
            </div>
          </div>

          <div className="p-6" style={{
            borderRadius: radius,
            background: '#FFFFFF',
            border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>我的收藏</h3>
            <p style={{ color: '#666666', fontSize: bodyFontSize, lineHeight }}>共收藏了 42 件商品</p>
          </div>
        </div>
      </main>
    </div>
  )
}

// PC端设置页
function SettingsPage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div style={{ background: config.backgroundColor }}>
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <span className="text-lg font-semibold">设置</span>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8 space-y-6">
        <div className="p-6" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>账号设置</h3>
          <div className="space-y-4">
            {['账号与安全', '通知设置', '隐私设置'].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span style={{ color: '#333333', fontSize: bodyFontSize, lineHeight }}>{item}</span>
                <svg className="w-4 h-4" fill="none" stroke="#999" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>系统设置</h3>
          <div className="space-y-4">
            {[
              { label: '语言', value: '简体中文' },
              { label: '主题', value: '浅色' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span style={{ color: '#333333', fontSize: bodyFontSize, lineHeight }}>{item.label}</span>
                <span style={{ color: '#999999', fontSize: bodyFontSize, lineHeight }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// PC端默认页面
function DefaultPage({ config }: { config: StyleConfig }) {
  return (
    <div className="h-full flex items-center justify-center" style={{ background: config.backgroundColor }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>页面开发中</h2>
        <p className="text-sm" style={{ color: '#999999' }}>该模板正在开发中...</p>
      </div>
    </div>
  )
}
