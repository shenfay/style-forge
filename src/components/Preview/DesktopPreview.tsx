import type { StyleConfig } from '../../types/config'
import { radiusMap } from '../../types/config'

interface DesktopPreviewProps {
  config: StyleConfig
}

export function DesktopPreview({ config }: DesktopPreviewProps) {
  const radius = radiusMap[config.cornerRadius]

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : '#FFFFFF',
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
        backdropFilter: config.titleBarStyle === 'frosted-glass' ? 'blur(10px)' : 'none',
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
        {/* Hero Section */}
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
            <button className="px-8 py-4 text-base font-medium btn-interactive" style={{
              borderRadius: radius,
              border: config.buttonStyle === 'wireframe' ? `2px solid ${config.primaryColor}` : 'none',
              color: config.buttonStyle === 'wireframe' ? config.primaryColor : '#666666',
              background: config.buttonStyle === 'wireframe' ? 'transparent' : '#FFFFFF',
            }}>
              了解更多
            </button>
          </div>
        </section>

        {/* 特性卡片区 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A1A1A' }}>核心特性</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: '特性一', desc: '这是特性一的描述文字' },
              { title: '特性二', desc: '这是特性二的描述文字' },
              { title: '特性三', desc: '这是特性三的描述文字' },
            ].map((feature, i) => (
              <div key={i} className="p-6 card-interactive" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
                boxShadow: config.cardStyle === 'shadow' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
              }}>
                <div className="w-12 h-12 mb-4 rounded-lg" style={{ background: config.primaryColor + '20' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#666666' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 数据展示区 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A1A1A' }}>数据统计</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: '用户数', value: '10,000+' },
              { label: '订单数', value: '50,000+' },
              { label: '满意度', value: '99%' },
              { label: '服务时长', value: '24/7' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6" style={{
                borderRadius: radius,
                background: '#FFFFFF',
                border: config.cardStyle === 'border' ? '1px solid #E5E5E5' : 'none',
                boxShadow: config.cardStyle === 'shadow' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}>
                <div className="text-3xl font-bold mb-2" style={{ color: config.primaryColor }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#999999' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="px-8 py-12" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm" style={{ color: '#999999' }}>
            © 2026 Style Forge. All rights reserved.
          </div>
          <div className="flex gap-6">
            {['隐私政策', '使用条款', '联系我们'].map((link) => (
              <a key={link} href="#" className="text-sm transition-colors" style={{ color: '#666666' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
