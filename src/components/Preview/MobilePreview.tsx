import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'
import { StatusBar } from '../UI/StatusBar'
import { NavBar } from '../UI/NavBar'
import { Card } from '../UI/Card'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, createGradient, withOpacity } from '../../utils/design-tokens'

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
    default:
      return <DefaultPage config={config} />
  }
}

// 首页模板
function HomePage({ config }: { config: StyleConfig }) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />

      <NavBar config={config} title="首页" showSearch />

      {/* 内容区 */}
      <div className="px-6 py-5 pb-24 space-y-4">
        {/* Hero 卡片 */}
        <Card config={config} interactive variant="gradient" className="p-5">
          <div className="text-white text-[20px] font-bold mb-2" style={{ fontSize: fontSize['2xl'], fontWeight: fontWeight.bold }}>欢迎回来</div>
          <div className="text-white/90 text-sm">探索更多精彩内容</div>
        </Card>

        {/* 功能卡片 */}
        <div className="grid grid-cols-2 gap-3">
          {[  
            { icon: '📊', title: '数据统计' },
            { icon: '🎯', title: '精准推荐' },
            { icon: '💬', title: '互动交流' },
            { icon: '⚙️', title: '个性化设置' },
          ].map((item, i) => (
            <Card key={i} config={config} interactive className="p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs font-medium" style={{ color: colors.text.primary, fontSize: fontSize.xs, fontWeight: fontWeight.medium }}>{item.title}</div>
            </Card>
          ))}
        </div>

        {/* 推荐列表 */}
        <div className="space-y-3">
          <div className="text-[14px] font-semibold" style={{ color: colors.text.primary, fontSize: fontSize.lg, fontWeight: fontWeight.semibold }}>热门推荐</div>
          {[
            { title: '推荐内容一', desc: '这是推荐内容的描述文字' },
            { title: '推荐内容二', desc: '这是推荐内容的描述文字' },
            { title: '推荐内容三', desc: '这是推荐内容的描述文字' },
          ].map((item, i) => (
            <Card key={i} config={config} className="p-4">
              <div className="text-sm font-medium mb-1" style={{ color: colors.text.primary, fontSize: fontSize.base, fontWeight: fontWeight.medium }}>{item.title}</div>
              <div className="text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] px-6 py-3" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex justify-around">
          {[
            { icon: '🏠', label: '首页' },
            { icon: '🔍', label: '发现' },
            { icon: '➕', label: '发布' },
            { icon: '🔔', label: '通知' },
            { icon: '👤', label: '我的' },
          ].map((tab, i) => (
            <button key={i} className="flex flex-col items-center gap-1">
              <span className="text-lg">{tab.icon}</span>
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
