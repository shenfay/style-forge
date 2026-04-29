/**
 * Landing 场景 - 桌面端页面集合
 */

import { memo } from 'react'
import type { StyleConfig } from '../../types/config'
import { getBorderRadius, generateComponentTokens, colors } from '../../utils/design-tokens'

interface LandingHomeDesktopProps {
  config: StyleConfig
}

const CONTAINER_MAX = 'max-w-6xl mx-auto'

export const LandingHomeDesktop = memo(function LandingHomeDesktop({ config }: LandingHomeDesktopProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="h-full overflow-y-auto" style={{ background: tokens.colors.background }}>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: colors.border.light }}>
        <div className={`${CONTAINER_MAX} h-16 flex items-center justify-between px-6`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: tokens.colors.primary }}>
              SF
            </div>
            <span className="text-lg font-medium" style={{ color: tokens.colors.textPrimary }}>Style Forge</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium rounded-lg transition-colors" style={{
              color: tokens.colors.textPrimary,
              backgroundColor: colors.gray[100],
            }}>
              登录
            </button>
            <button className="px-5 py-2.5 text-sm font-medium rounded-lg text-white transition-colors" style={{
              backgroundColor: tokens.colors.primary,
            }}>
              开始使用
            </button>
          </div>
        </div>
      </header>

      {/* Hero 区 - 居中布局 */}
      <section className="py-24 px-6">
        <div className={`${CONTAINER_MAX} text-center`}>
          <h1 className="text-5xl font-bold mb-6" style={{ color: tokens.colors.textPrimary, lineHeight: '1.2' }}>
            从想法到上线只需 5 分钟
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>
            无需复杂配置，一站式开发平台让创意快速落地。
            <br />
            10,000+ 开发者已在使用，平均节省 80% 开发时间。
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <button className="px-8 py-3.5 text-base font-medium rounded-lg text-white transition-all hover:shadow-lg" style={{
              backgroundColor: tokens.colors.primary,
            }}>
              免费开始使用
            </button>
            <button className="px-8 py-3.5 text-base font-medium rounded-lg transition-colors" style={{
              color: tokens.colors.textPrimary,
              backgroundColor: colors.gray[100],
            }}>
              观看演示
            </button>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t" style={{ borderColor: colors.border.light }}>
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: tokens.colors.primary }}>10K+</div>
              <div className="text-sm" style={{ color: tokens.colors.textSecondary }}>活跃开发者</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: tokens.colors.primary }}>80%</div>
              <div className="text-sm" style={{ color: tokens.colors.textSecondary }}>时间节省</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: tokens.colors.primary }}>50K+</div>
              <div className="text-sm" style={{ color: tokens.colors.textSecondary }}>项目已上线</div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.background.page }}>
        <div className={`${CONTAINER_MAX}`}>
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: tokens.colors.textPrimary }}>
            核心功能
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { 
                title: '极速部署', 
                desc: '一键发布到全球 CDN，秒级响应，零运维成本',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              { 
                title: '灵活定制', 
                desc: '丰富的配置选项，按需调整，完美匹配品牌调性',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              },
              { 
                title: '数据洞察', 
                desc: '实时监控关键指标，可视化报表辅助业务决策',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              { 
                title: '企业安全', 
                desc: 'SOC2 认证，端到端加密，细粒度权限管控',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              { 
                title: '无缝集成', 
                desc: '支持主流工具链，API 优先设计，Webhook 扩展',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )
              },
              { 
                title: '专属支持', 
                desc: '7×24 小时在线，资深技术顾问一对一指导',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-xl border" style={{ borderColor: colors.border.light }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: colors.gray[100] }}>
                  <div style={{ color: tokens.colors.primary }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: tokens.colors.textPrimary }}>{feature.title}</h3>
                <p style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用流程 */}
      <section className="py-20 px-6">
        <div className={`${CONTAINER_MAX} max-w-4xl`}>
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: tokens.colors.textPrimary }}>
            三步上手
          </h2>
          <div className="space-y-12">
            {[
              { step: 1, title: '选择场景和模板', desc: '从主流场景中选择适合你的业务场景，然后挑选一个初始模板开始定制。' },
              { step: 2, title: '实时预览调整', desc: '在配置面板调整色彩、形状、间距等参数，预览区实时展示效果。' },
              { step: 3, title: '导出配置', desc: '一键导出 Tailwind Config、CSS 变量或 AI 提示词，直接应用到你的项目中。' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: tokens.colors.primary }}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: tokens.colors.textPrimary }}>{item.title}</h3>
                  <p style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.background.page }}>
        <div className={`${CONTAINER_MAX}`}>
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: tokens.colors.textPrimary }}>
            用户反馈
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { 
                name: '张三', 
                role: '独立开发者', 
                content: '帮我节省了 80% 的开发时间，从原型到产品只用了 3 天。之前需要一周的工作，现在一天就能完成。',
              },
              { 
                name: '李四', 
                role: 'CTO', 
                content: '团队协作效率提升了 5 倍，代码审查和部署流程完全自动化。强烈推荐给所有技术团队。',
              },
              { 
                name: '王五', 
                role: '产品经理', 
                content: '原型到产品的最佳工具，没有之一。需求文档直接生成可交互原型，沟通成本大幅降低。',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-xl border" style={{ borderColor: colors.border.light }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{
                    background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primary}CC 100%)`,
                  }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: tokens.colors.textPrimary }}>{item.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: tokens.colors.textSecondary }}>{item.role}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: tokens.colors.textPrimary }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 定价方案 */}
      <section className="py-20 px-6">
        <div className={`${CONTAINER_MAX}`}>
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: tokens.colors.textPrimary }}>
            简单透明的定价
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { 
                name: '免费版', 
                price: '¥0', 
                desc: '个人项目起步',
                features: ['基础功能', '1 个项目', '社区支持', '1GB 存储'], 
                cta: '免费开始', 
                highlight: false 
              },
              { 
                name: '专业版', 
                price: '¥99', 
                desc: '专业开发者首选',
                features: ['全部功能', '无限项目', '优先支持', '100GB 存储', '自定义域名'], 
                cta: '立即升级', 
                badge: '最受欢迎', 
                highlight: true 
              },
              { 
                name: '团队版', 
                price: '¥299', 
                desc: '高效团队协作',
                features: ['团队协作', '专属客服', '定制开发', '无限存储', 'SLA 保障', '审计日志'], 
                cta: '联系销售', 
                highlight: false 
              },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-xl ${plan.highlight ? 'border-2' : 'border'}`} style={{
                background: colors.background.card,
                borderColor: plan.highlight ? tokens.colors.primary : colors.border.light,
              }}>
                {plan.badge && (
                  <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{
                    background: tokens.colors.primary,
                    color: colors.white,
                  }}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2" style={{ color: tokens.colors.textPrimary }}>{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: tokens.colors.textSecondary }}>{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: tokens.colors.primary }}>{plan.price}</span>
                  <span className="text-sm ml-1" style={{ color: tokens.colors.textSecondary }}>/月</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm" style={{ color: tokens.colors.textPrimary }}>
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: tokens.colors.primary, flexShrink: 0, marginTop: '2px' }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 font-medium rounded-lg transition-all" style={{
                  background: plan.highlight ? tokens.colors.primary : colors.gray[100],
                  color: plan.highlight ? colors.white : tokens.colors.textPrimary,
                  borderRadius: radius,
                }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: config.backgroundColor }}>
        <div className={`${CONTAINER_MAX} max-w-3xl text-center`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: tokens.colors.textPrimary }}>
            准备好开始了吗？
          </h2>
          <p className="text-lg mb-10" style={{ color: tokens.colors.textSecondary }}>
            立即体验 Style Forge，免费试用 14 天，无需信用卡。
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3.5 text-base font-medium rounded-lg transition-all hover:shadow-lg" style={{
              background: tokens.colors.primary,
              color: colors.white,
            }}>
              开始使用
            </button>
            <button className="px-8 py-3.5 text-base font-medium rounded-lg transition-colors" style={{
              color: tokens.colors.textPrimary,
              backgroundColor: colors.gray[100],
            }}>
              预约演示
            </button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: colors.border.light }}>
        <div className={`${CONTAINER_MAX}`}>
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: tokens.colors.textPrimary }}>产品</h4>
              <div className="space-y-2">
                {['功能介绍', '定价方案', '更新日志', '路线图'].map((link, i) => (
                  <a key={i} href="#" className="block text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: tokens.colors.textPrimary }}>资源</h4>
              <div className="space-y-2">
                {['文档中心', 'API参考', '教程', '博客'].map((link, i) => (
                  <a key={i} href="#" className="block text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: tokens.colors.textPrimary }}>公司</h4>
              <div className="space-y-2">
                {['关于我们', '加入我们', '联系方式', '合作伙伴'].map((link, i) => (
                  <a key={i} href="#" className="block text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: tokens.colors.textPrimary }}>法律</h4>
              <div className="space-y-2">
                {['隐私政策', '服务条款', 'Cookie设置', '安全声明'].map((link, i) => (
                  <a key={i} href="#" className="block text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>{link}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm" style={{ borderColor: colors.border.light, color: tokens.colors.textSecondary }}>
            © 2026 Style Forge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
})

export { LandingPricingDesktop } from './LandingPricingDesktop'
