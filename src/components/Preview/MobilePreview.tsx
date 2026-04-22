import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'
import { StatusBar } from '../UI/StatusBar'
import { NavBar } from '../UI/NavBar'
import { Card } from '../UI/Card'
import { Placeholder } from './Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, createGradient, withOpacity, generateComponentTokens } from '../../utils/design-tokens'

interface MobilePreviewProps {
  config: StyleConfig
  pageType: PageType
}

export function MobilePreview({ config, pageType }: MobilePreviewProps) {
  // 根据页面类型渲染不同内容
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
}

// SVG 占位图组件（已废弃，使用 Placeholder 组件）

// 首页模板
function HomePage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  return (
    <div className="h-full overflow-y-auto relative" style={{ background: config.backgroundColor }}>
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
          <span className="text-sm flex-1" style={{ color: '#999' }}>搜索商品</span>
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
      <div className="px-3 pb-24 space-y-3">
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
          <span className="text-xs flex-1 truncate" style={{ color: '#666' }}>商城公告：新用户注册立享8折优惠</span>
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
                <span className="text-xs" style={{ color: colors.text.secondary, fontSize: fontSize.xs }}>{item.label}</span>
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
            <div className="text-white text-sm font-bold">限时抢购</div>
            <div className="text-white/90 text-xs mt-1">距结束 02:15:30</div>
          </div>
          <div className="space-y-2">
            <div className="p-2" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
            }}>
              <div className="text-white text-xs font-bold">新人专享</div>
            </div>
            <div className="p-2" style={{
              borderRadius: radius,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
            }}>
              <div className="text-white text-xs font-bold">会员福利</div>
            </div>
          </div>
        </div>

        {/* 6. 限时抢购 */}
        <div className="bg-white p-3" style={{ borderRadius: radius, boxShadow: shadows.sm }}>
          <div className="flex items-center justify-between mb-3">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 w-8 h-1" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              <div className="text-sm font-bold" style={{ 
                color: tokens.sectionHeader.titleColor,
                fontSize: tokens.sectionHeader.titleSize,
                fontWeight: tokens.sectionHeader.titleWeight,
              }}>限时抢购</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {['02', '15', '30'].map((t, i) => (
                  <div key={i} className="px-1.5 py-0.5 text-xs text-white" style={{
                    borderRadius: 4,
                    background: '#FF4757'
                  }}>{t}</div>
                ))}
              </div>
              <button className="text-xs" style={{ color: colors.text.tertiary }}>更多 ›</button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="shrink-0 w-24">
                <Placeholder width={96} height={96} type="product" text="" />
                <div className="mt-1 text-xs font-bold" style={{ color: '#FF4757' }}>¥99</div>
                <div className="text-[10px] line-through" style={{ color: '#999' }}>¥199</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. 品牌专区 */}
        <div className="bg-white p-3" style={{ borderRadius: radius, boxShadow: shadows.sm }}>
          <div className="flex items-center justify-between mb-3">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 w-8 h-1" style={{
                  backgroundColor: tokens.colors.primary,
                  borderRadius: '2px',
                }} />
              )}
              <div className="text-sm font-bold" style={{ 
                color: tokens.sectionHeader.titleColor,
                fontSize: tokens.sectionHeader.titleSize,
                fontWeight: tokens.sectionHeader.titleWeight,
              }}>品牌专区</div>
            </div>
            <button className="text-xs" style={{ color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['Apple', 'Nike', 'Sony', 'Adidas'].map((brand, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-2" style={{
                borderRadius: radius,
                background: '#F9F9F9'
              }}>
                <Placeholder width={48} height={32} type="brand" text={brand.substring(0, 2)} />
                <span className="text-[10px]" style={{ color: colors.text.secondary }}>{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. 新品推荐 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-[15px] font-semibold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>新品推荐</div>
            </div>
            <button className="text-xs" style={{ color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Apple Watch Series 9', price: '¥2999', tag: '新品' },
              { title: 'AirPods Pro 2', price: '¥1899', tag: '热卖' },
            ].map((item, i) => (
              <Card key={i} config={config} className="overflow-hidden">
                <Placeholder width={180} height={180} type="product" />
                <div className="px-3 pb-3">
                  <div className="text-sm font-medium mb-2 line-clamp-2" style={{ color: colors.text.primary, fontSize: fontSize.sm, fontWeight: fontWeight.medium }}>
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-bold" style={{ color: '#FF4757', fontSize: fontSize.lg }}>{item.price}</div>
                    {item.tag && (
                      <span className="px-2 py-0.5 text-[10px] rounded" style={{
                        background: withOpacity(config.primaryColor, 0.1),
                        color: config.primaryColor,
                      }}>{item.tag}</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 9. 猜你喜欢 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="relative" style={{
              paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
              paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
              paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
            }}>
              {config.titleStyle === 'left-accent' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'right-accent' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded" style={{ background: config.primaryColor }} />
              )}
              {config.titleStyle === 'bottom-accent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
              )}
              <div className="text-[15px] font-semibold" style={{ 
                color: config.titleColor,
                fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
              }}>猜你喜欢</div>
            </div>
            <button className="text-xs" style={{ color: colors.text.tertiary }}>查看更多 ›</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'MacBook Pro 14寸', price: '¥14999', sales: '3.2万+' },
              { title: 'iPad Air M2', price: '¥4799', sales: '1.8万+' },
              { title: 'Sony WH-1000XM5', price: '¥2499', sales: '8563' },
              { title: 'Nintendo Switch', price: '¥2099', sales: '2.1万+' },
            ].map((item, i) => (
              <Card key={i} config={config} className="overflow-hidden">
                <Placeholder width={180} height={180} type="product" />
                <div className="px-3 pb-3">
                  <div className="text-sm font-medium mb-2 line-clamp-2" style={{ color: colors.text.primary, fontSize: fontSize.sm, fontWeight: fontWeight.medium }}>
                    {item.title}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-base font-bold" style={{ color: '#FF4757', fontSize: fontSize.lg }}>{item.price}</div>
                    <div className="text-xs" style={{ color: colors.text.tertiary }}>{item.sales}人付款</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 10. 底部导航栏 */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ 
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? config.primaryColor : '#999'} strokeWidth="2">
                {tab.icon === 'home' && <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>}
                {tab.icon === 'category' && <><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>}
                {tab.icon === 'cart' && <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>}
                {tab.icon === 'user' && <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
              </svg>
              <span className="text-[10px]" style={{ color: i === 0 ? config.primaryColor : '#999999' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 详情页模板
function DetailPage({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />

      <NavBar config={config} title="详情" showBack />

      {/* 内容区 */}
      <div className="px-6 py-5 pb-24 space-y-4">
        {/* 标题区 */}
        <div>
          <h1 className="text-[22px] font-bold mb-2" style={{ color: colors.text.primary, fontSize: fontSize['3xl'], fontWeight: fontWeight.bold }}>详情标题</h1>
          <div className="flex items-center gap-3 text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>
            <span>作者</span>
            <span>2026-04-17</span>
          </div>
        </div>
      
        {/* 内容卡片 */}
        <Card config={config} className="p-5 space-y-3">
          <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
            这是详情内容的正文部分。这里可以展示文章的详细内容,包括文字描述、图片展示等。
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
            支持多段落展示,内容排版清晰易读,符合用户阅读习惯。
          </p>
        </Card>

        {/* 标签区 */}
        <div className="flex flex-wrap gap-2">
          {['标签一', '标签二', '标签三'].map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[11px]" style={{
              borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
              background: config.badgeStyle === 'rounded' ? withOpacity(config.primaryColor, 0.08) : 'transparent',
              color: config.primaryColor,
              fontSize: fontSize.sm,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] px-6 py-4" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex gap-3">
          <button className="flex-1 py-3 text-[13px] font-medium btn-interactive" style={{
            borderRadius: radius,
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
          }}>
            收藏
          </button>
          <button className="flex-1 py-3 text-[13px] font-medium text-white btn-interactive" style={{
            borderRadius: radius,
            background: config.buttonStyle === 'gradient' 
              ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
              : config.primaryColor,
          }}>
            分享
          </button>
        </div>
      </div>
    </div>
  )
}

// 列表页模板
function ListPage({ config }: { config: StyleConfig }) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />

      {/* 搜索栏 */}
      <div className="px-6 py-3">
        <div className="flex items-center gap-2 px-4 py-2" style={{
          borderRadius: radius,
          background: colors.background.card,
          border: `1px solid ${colors.border.light}`,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-sm" style={{ color: colors.text.tertiary }}>搜索...</span>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex gap-2 px-6 py-2 overflow-x-auto">
        {['全部', '分类一', '分类二', '分类三'].map((filter, i) => (
          <button key={i} className="px-4 py-1.5 text-xs whitespace-nowrap" style={{
            borderRadius: '999px',
            background: i === 0 ? config.primaryColor : '#FFFFFF',
            color: i === 0 ? '#FFFFFF' : '#666666',
          }}>
            {filter}
          </button>
        ))}
      </div>

      {/* 列表内容 */}
      <div className="px-6 py-3 pb-24 space-y-3">
        {[
          { title: '列表项一', desc: '描述文字', tag: '热门' },
          { title: '列表项二', desc: '描述文字', tag: '推荐' },
          { title: '列表项三', desc: '描述文字', tag: '最新' },
          { title: '列表项四', desc: '描述文字', tag: '' },
          { title: '列表项五', desc: '描述文字', tag: '精选' },
        ].map((item, i) => (
          <Card key={i} config={config} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: fontSize.base, fontWeight: fontWeight.medium }}>{item.title}</div>
              {item.tag && (
                <span className="px-2 py-0.5 text-[10px]" style={{
                  borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
                  background: withOpacity(config.primaryColor, 0.08),
                  color: config.primaryColor,
                  fontSize: fontSize.xs,
                }}>
                  {item.tag}
                </span>
              )}
            </div>
            <div className="text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 结果页模板（原有扫码结果）
function ResultPage({ config }: { config: StyleConfig }) {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: config.backgroundColor }}>
      <div className="text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: config.primaryColor }}>操作成功</h2>
        <p className="text-sm" style={{ color: '#666666' }}>您的操作已完成</p>
      </div>
    </div>
  )
}

// 个人中心页模板
function ProfilePage({ config }: { config: StyleConfig }) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
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
          <div className="text-sm font-medium mb-3" style={{ color: colors.text.primary }}>我的订单</div>
          <div className="flex justify-around">
            {[
              { icon: '💰', label: '待付款' },
              { icon: '📦', label: '待发货' },
              { icon: '🚚', label: '待收货' },
              { icon: '⭐', label: '待评价' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs" style={{ color: colors.text.secondary }}>{item.label}</span>
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
                <span className="text-sm" style={{ color: colors.text.primary }}>{item.label}</span>
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
              <span className="text-[10px]" style={{ color: i === 3 ? config.primaryColor : '#999999' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 消息列表页模板
function MessagesPage({ config }: { config: StyleConfig }) {
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="消息" />

      {/* 消息分类Tab */}
      <div className="flex border-b border-gray-200">
        {['全部', '未读', '群聊'].map((tab, i) => (
          <button key={i} className="flex-1 py-3 text-sm font-medium" style={{
            color: i === 0 ? config.primaryColor : '#666666',
            borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : 'none',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* 消息列表 */}
      <div className="divide-y divide-gray-100">
        {[
          { name: '张三', msg: '你好，最近怎么样？', time: '10:30', unread: 2 },
          { name: '李四', msg: '明天的会议几点开始？', time: '09:15', unread: 0 },
          { name: '产品交流群', msg: '王五: 这个方案不错', time: '昨天', unread: 5 },
          { name: '赵六', msg: '收到，谢谢！', time: '昨天', unread: 0 },
          { name: '技术交流群', msg: '系统通知: 版本更新', time: '周一', unread: 0 },
        ].map((chat, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              {chat.name.includes('群') ? '👥' : '👤'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium" style={{ color: colors.text.primary }}>{chat.name}</span>
                <span className="text-xs" style={{ color: colors.text.tertiary }}>{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs truncate" style={{ color: colors.text.secondary }}>{chat.msg}</span>
                {chat.unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs text-white rounded-full" style={{
                    background: config.primaryColor,
                    minWidth: '18px',
                    textAlign: 'center',
                  }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
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
              <span className="text-[10px]" style={{ color: i === 3 ? config.primaryColor : '#999999' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 设置页模板
function SettingsPage({ config }: { config: StyleConfig }) {
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
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

// 表单页模板
function FormPage({ config }: { config: StyleConfig }) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="表单" showBack />

      <div className="px-6 py-4 space-y-4">
        {/* 输入框 */}
        <Card config={config} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>姓名</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 text-sm border outline-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
              }}
              placeholder="请输入姓名"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>邮箱</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 text-sm border outline-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
              }}
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>描述</label>
            <textarea 
              className="w-full px-3 py-2 text-sm border outline-none resize-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
                minHeight: '100px',
              }}
              placeholder="请输入描述"
            />
          </div>
        </Card>

        {/* 提交按钮 */}
        <button className="w-full py-3 text-sm font-medium text-white btn-interactive" style={{
          borderRadius: radius,
          background: config.buttonStyle === 'gradient' 
            ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
            : config.primaryColor,
        }}>
          提交
        </button>
      </div>
    </div>
  )
}

// 默认页面
function DefaultPage({ config }: { config: StyleConfig }) {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: config.backgroundColor }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>页面开发中</h2>
        <p className="text-sm" style={{ color: '#999999' }}>该模板正在开发中...</p>
      </div>
    </div>
  )
}
