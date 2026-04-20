import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'

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
  const radius = config.cornerRadius === 'small' ? '8px' : config.cornerRadius === 'medium' ? '16px' : '24px'
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 状态栏 */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-[11px]" style={{ color: '#999999' }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-6 py-3" style={{
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : 'transparent',
      }}>
        <span className="text-[16px] font-semibold" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#1A1A1A' }}>
          首页
        </span>
        <div className="flex gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ 
            color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : config.primaryColor,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>
      </div>

      {/* 内容区 */}
      <div className="px-6 py-5 pb-24 space-y-4">
        {/* Hero 卡片 */}
        <div className="p-5 card-interactive" style={{
          borderRadius: radius,
          background: `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`,
        }}>
          <div className="text-white text-[20px] font-bold mb-2">欢迎回来</div>
          <div className="text-white/90 text-sm">探索更多精彩内容</div>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-2 gap-3">
          {[  
            { icon: '📊', title: '数据统计' },
            { icon: '🎯', title: '精准推荐' },
            { icon: '💬', title: '互动交流' },
            { icon: '⚙️', title: '个性化设置' },
          ].map((item, i) => (
            <div key={i} className="p-4 text-center card-interactive" style={{
              borderRadius: radius,
              background: '#FFFFFF',
              border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
              boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs font-medium" style={{ color: '#1A1A1A' }}>{item.title}</div>
            </div>
          ))}
        </div>

        {/* 推荐列表 */}
        <div className="space-y-3">
          <div className="text-[14px] font-semibold" style={{ color: '#1A1A1A' }}>热门推荐</div>
          {[
            { title: '推荐内容一', desc: '这是推荐内容的描述文字' },
            { title: '推荐内容二', desc: '这是推荐内容的描述文字' },
            { title: '推荐内容三', desc: '这是推荐内容的描述文字' },
          ].map((item, i) => (
            <div key={i} className="p-4" style={{
              borderRadius: radius,
              background: '#FFFFFF',
              border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
              boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            }}>
              <div className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>{item.title}</div>
              <div className="text-xs" style={{ color: '#999999' }}>{item.desc}</div>
            </div>
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
  const radius = config.cornerRadius === 'small' ? '8px' : config.cornerRadius === 'medium' ? '16px' : '24px'
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 状态栏 */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-[11px]" style={{ color: '#999999' }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* 顶部导航 */}
      <div className="flex items-center px-6 py-3" style={{
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : 'transparent',
      }}>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ 
          color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : config.primaryColor,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="flex-1 text-center text-[16px] font-semibold" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#1A1A1A' }}>详情</span>
        <div className="w-9" />
      </div>

      {/* 内容区 */}
      <div className="px-6 py-5 pb-24 space-y-4">
        {/* 标题区 */}
        <div>
          <h1 className="text-[22px] font-bold mb-2" style={{ color: '#1A1A1A' }}>详情标题</h1>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#999999' }}>
            <span>作者</span>
            <span>2026-04-17</span>
          </div>
        </div>

        {/* 内容卡片 */}
        <div className="p-5 space-y-3" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          boxShadow: config.cardStyle === 'shadow' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        }}>
          <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
            这是详情内容的正文部分。这里可以展示文章的详细内容，包括文字描述、图片展示等。
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
            支持多段落展示，内容排版清晰易读，符合用户阅读习惯。
          </p>
        </div>

        {/* 标签区 */}
        <div className="flex flex-wrap gap-2">
          {['标签一', '标签二', '标签三'].map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[11px]" style={{
              borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
              background: config.badgeStyle === 'rounded' ? `${config.primaryColor}15` : 'transparent',
              color: config.primaryColor,
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
  const radius = config.cornerRadius === 'small' ? '8px' : config.cornerRadius === 'medium' ? '16px' : '24px'
  
  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 状态栏 */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-[11px]" style={{ color: '#999999' }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="px-6 py-3">
        <div className="flex items-center gap-2 px-4 py-2" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-sm" style={{ color: '#999999' }}>搜索...</span>
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
          <div key={i} className="p-4" style={{
            borderRadius: radius,
            background: '#FFFFFF',
            border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
            boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          }}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.title}</div>
              {item.tag && (
                <span className="px-2 py-0.5 text-[10px]" style={{
                  borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
                  background: `${config.primaryColor}15`,
                  color: config.primaryColor,
                }}>
                  {item.tag}
                </span>
              )}
            </div>
            <div className="text-xs" style={{ color: '#999999' }}>{item.desc}</div>
          </div>
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
