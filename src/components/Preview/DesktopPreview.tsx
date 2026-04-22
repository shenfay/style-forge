import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'
import { radiusMap } from '../../types/config'
import { Placeholder } from './Placeholder'
import { SectionHeader } from './SectionHeader'
import { ProductCard } from './ProductCard'
import { colors, shadows, generateComponentTokens } from '../../utils/design-tokens'

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
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
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
                <div key={i} className="w-2.5 h-2.5 rounded-full transition-all" style={{
                  background: i === 0 ? config.primaryColor : 'rgba(255,255,255,0.5)'
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
          <div className="col-span-2 p-6" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
          }}>
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
          <div className="p-6" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
          }}>
            <div className="text-white text-lg font-bold mb-2">新人专享</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: bodyFontSize, lineHeight }}>注册立享 ¥100 优惠券</div>
          </div>
          <div className="p-6" style={{
            borderRadius: radius,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
          }}>
            <div className="text-white text-lg font-bold mb-2">会员福利</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: bodyFontSize, lineHeight }}>积分兑换好礼</div>
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
            {['Apple', 'Nike', 'Sony', 'Adidas', 'Samsung', 'Huawei'].map((brand, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                boxShadow: shadows.sm,
              }}>
                <Placeholder width={80} height={60} type="brand" text={brand.substring(0, 2)} />
                <span style={{ fontSize: bodyFontSize, lineHeight, fontWeight: 500, color: colors.text.primary }}>{brand}</span>
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
              { title: 'Apple Watch Series 9', price: '¥2999', tag: '新品' },
              { title: 'AirPods Pro 2', price: '¥1899', tag: '热卖' },
              { title: 'MacBook Air M3', price: '¥8999', tag: '新品' },
              { title: 'iPad Pro M2', price: '¥6799', tag: '爆款' },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden flex flex-col" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                boxShadow: shadows.sm,
              }}>
                <div className="w-full flex justify-center">
                  <Placeholder width={280} height={280} type="product" />
                </div>
                <div className="p-4">
                  <div className="font-medium mb-2 line-clamp-2" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>{item.title}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold" style={{ color: tokens.colors.primary }}>{item.price}</div>
                    {item.tag && (
                      <span className="px-3 py-1 text-xs font-medium rounded" style={{
                        background: withOpacity(config.primaryColor, 0.1),
                        color: config.primaryColor,
                      }}>{item.tag}</span>
                    )}
                  </div>
                </div>
              </div>
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
              { title: 'Sony WH-1000XM5', price: '¥2499', sales: '8563人付款' },
              { title: 'Nintendo Switch OLED', price: '¥2099', sales: '2.1万人付款' },
              { title: 'Dell XPS 15', price: '¥12999', sales: '4521人付款' },
              { title: 'Logitech MX Master 3', price: '¥799', sales: '1.5万人付款' },
              { title: 'Kindle Paperwhite', price: '¥1099', sales: '9876人付款' },
              { title: 'GoPro HERO12', price: '¥3499', sales: '6234人付款' },
              { title: 'DJI Mini 4 Pro', price: '¥4799', sales: '3456人付款' },
              { title: 'Bose QC45', price: '¥2299', sales: '7890人付款' },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden flex flex-col" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                boxShadow: shadows.sm,
              }}>
                <div className="w-full flex justify-center">
                  <Placeholder width={280} height={280} type="product" />
                </div>
                <div className="p-4">
                  <div className="font-medium mb-2 line-clamp-2" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>{item.title}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-xl font-bold" style={{ color: tokens.colors.primary }}>{item.price}</div>
                    <div style={{ fontSize: bodyFontSize, lineHeight, color: colors.text.tertiary }}>{item.sales}</div>
                  </div>
                </div>
              </div>
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

// 辅助函数：添加透明度
function withOpacity(color: string, opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0')
  return `${color}${alpha}`
}

// PC端详情页
function DetailPage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <span className="text-lg font-semibold">详情页</span>
        <button className="px-4 py-2" style={{ color: config.primaryColor, fontSize: bodyFontSize }}>返回</button>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-4" style={{ color: tokens.colors.textPrimary }}>详情标题</h1>
        <div className="flex items-center gap-4 mb-8" style={{ color: tokens.colors.textSecondary, fontSize: bodyFontSize, lineHeight }}>
          <span>作者</span>
          <span>2026-04-20</span>
        </div>

        <div className="p-6 mb-8" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        }}>
          <p style={{ color: '#333333', fontSize: bodyFontSize, lineHeight }}>
            这是详情内容的正文部分。这里可以展示文章的详细内容，包括文字描述、图片展示等。
            支持多段落展示，内容排版清晰易读，符合用户阅读习惯。
          </p>
        </div>
      </main>
    </div>
  )
}

// PC端列表页
function ListPage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <span className="text-lg font-semibold">列表页</span>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-2 mb-6">
          {['全部', '分类一', '分类二', '分类三'].map((filter, i) => (
            <button key={i} className="px-4 py-2" style={{
              borderRadius: '999px',
              background: i === 0 ? config.primaryColor : '#FFFFFF',
              color: i === 0 ? '#FFFFFF' : '#666666',
              fontSize: bodyFontSize,
            }}>
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { title: '列表项一', desc: '描述文字' },
            { title: '列表项二', desc: '描述文字' },
            { title: '列表项三', desc: '描述文字' },
            { title: '列表项四', desc: '描述文字' },
            { title: '列表项五', desc: '描述文字' },
            { title: '列表项六', desc: '描述文字' },
          ].map((item, i) => (
            <div key={i} className="p-6" style={{
              borderRadius: radius,
              background: '#FFFFFF',
              border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
              boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            }}>
              <h3 className="text-base font-semibold mb-2" style={{ color: '#1A1A1A' }}>{item.title}</h3>
              <p style={{ color: '#666666', fontSize: bodyFontSize, lineHeight }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// PC端个人中心
function ProfilePage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]
  const bodyFontSize = getBodyFontSize(config)
  const lineHeight = getLineHeight(config)

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
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
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
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
