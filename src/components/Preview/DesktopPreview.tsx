import type { StyleConfig } from '../../types/config'
import type { PageType } from '../../types/template'
import { radiusMap } from '../../types/config'

interface DesktopPreviewProps {
  config: StyleConfig
  pageType: PageType
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

// PC端首页
function HomePage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : '#FFFFFF',
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
      }}>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#1A1A1A' }}>
            品牌 Logo
          </span>
          <nav className="flex gap-6">
            {['首页', '产品', '关于', '联系'].map((item) => (
              <a key={item} href="#" className="text-sm transition-colors" style={{
                color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#666666',
              }}>
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium btn-interactive" style={{
            borderRadius: radius,
            color: config.primaryColor,
          }}>
            登录
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white btn-interactive" style={{
            borderRadius: radius,
            background: config.buttonStyle === 'gradient' 
              ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
              : config.primaryColor,
          }}>
            注册
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#1A1A1A' }}>
            欢迎来到我们的产品
          </h1>
          <p className="text-lg mb-8" style={{ color: '#666666' }}>
            这是一段描述文字，展示产品的主要特点和价值主张。
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 text-base font-medium text-white btn-interactive" style={{
              borderRadius: radius,
              background: config.buttonStyle === 'gradient' 
                ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
                : config.primaryColor,
            }}>
              立即开始
            </button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A1A1A' }}>核心特性</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: '特性一', desc: '特性描述文字' },
              { title: '特性二', desc: '特性描述文字' },
              { title: '特性三', desc: '特性描述文字' },
            ].map((feature, i) => (
              <div key={i} className="p-6" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
                boxShadow: config.cardStyle === 'shadow' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
              }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#666666' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-8 py-12" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="max-w-7xl mx-auto text-center text-sm" style={{ color: '#999999' }}>
          © 2026 Style Forge. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

// PC端详情页
function DetailPage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <span className="text-lg font-semibold">详情页</span>
        <button className="px-4 py-2 text-sm" style={{ color: config.primaryColor }}>返回</button>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1A1A1A' }}>详情标题</h1>
        <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: '#666666' }}>
          <span>作者</span>
          <span>2026-04-20</span>
        </div>

        <div className="p-6 mb-8" style={{
          borderRadius: radius,
          background: '#FFFFFF',
          border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        }}>
          <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
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
            <button key={i} className="px-4 py-2 text-sm" style={{
              borderRadius: '999px',
              background: i === 0 ? config.primaryColor : '#FFFFFF',
              color: i === 0 ? '#FFFFFF' : '#666666',
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
              <p className="text-sm" style={{ color: '#666666' }}>{item.desc}</p>
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
            <p className="text-sm" style={{ color: '#666666' }}>用户ID: 123456</p>
          </div>
          <button className="px-4 py-2 text-sm" style={{
            borderRadius: radius,
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
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
                <div key={i} className="text-center text-sm" style={{ color: '#666666' }}>{item}</div>
              ))}
            </div>
          </div>

          <div className="p-6" style={{
            borderRadius: radius,
            background: '#FFFFFF',
            border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>我的收藏</h3>
            <p className="text-sm" style={{ color: '#666666' }}>共收藏了 42 件商品</p>
          </div>
        </div>
      </main>
    </div>
  )
}

// PC端设置页
function SettingsPage({ config }: { config: StyleConfig }) {
  const radius = radiusMap[config.cornerRadius]

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
                <span className="text-sm" style={{ color: '#333333' }}>{item}</span>
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
                <span className="text-sm" style={{ color: '#333333' }}>{item.label}</span>
                <span className="text-sm" style={{ color: '#999999' }}>{item.value}</span>
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
