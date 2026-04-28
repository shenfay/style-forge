/**
 * Landing 场景 - 桌面端主页
 */

import { memo } from 'react'
import type { StyleConfig } from '../../types/config'
import { SectionHeader } from './SectionHeader'
import { getBorderRadius, generateComponentTokens } from '../../utils/design-tokens'

interface LandingHomeDesktopProps {
  config: StyleConfig
}

const CONTAINER_MAX = 'max-w-6xl mx-auto'

export const LandingHomeDesktop = memo(function LandingHomeDesktop({ config }: LandingHomeDesktopProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b" style={{
        background: '#FFFFFF',
        borderColor: '#E5E5E5',
        height: '64px',
      }}>
        <div className={`${CONTAINER_MAX} h-full flex items-center justify-between px-6`}>
          <div className="flex items-center gap-10">
            <span className="text-lg font-bold" style={{ color: config.primaryColor }}>Style Forge</span>
            <nav className="flex gap-8 text-sm" style={{ color: '#666' }}>
              <span className="cursor-pointer hover:opacity-80" style={{ color: config.primaryColor, fontWeight: 500 }}>功能</span>
              <span className="cursor-pointer hover:opacity-80">定价</span>
              <span className="cursor-pointer hover:opacity-80">文档</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm rounded cursor-pointer transition-opacity hover:opacity-80" style={{
              border: '1px solid #E5E5E5',
              color: '#666',
              borderRadius: radius,
              background: 'transparent',
            }}>登录</button>
            <button className="px-5 py-2 text-sm rounded cursor-pointer text-white transition-opacity hover:opacity-90" style={{
              background: config.primaryColor,
              borderRadius: radius,
              fontWeight: 500,
            }}>免费开始</button>
          </div>
        </div>
      </header>

      {/* Hero 区 */}
      <section className="py-20 text-center" style={{
        background: `linear-gradient(180deg, ${config.primaryColor}08 0%, ${config.backgroundColor} 100%)`,
      }}>
        <div className={CONTAINER_MAX + ' px-6'}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium" style={{
            background: config.primaryColor + '10',
            color: config.primaryColor,
          }}>
            <span>🚀</span>
            <span>全新 2.0 版本已发布</span>
          </div>
          <h1 className="mb-4 font-bold" style={{
            fontSize: '48px',
            lineHeight: '1.2',
            color: config.titleColor,
            letterSpacing: '-0.02em',
          }}>
            构建你的下一个伟大产品
          </h1>
          <p className="mx-auto mb-8" style={{
            maxWidth: 600,
            fontSize: '17px',
            lineHeight: '1.7',
            color: config.textSecondary,
          }}>
            一站式开发平台，让创意快速落地。无需复杂配置，从想法到上线只需几分钟。
          </p>
          <div className="flex gap-3 justify-center mb-12">
            <button className="px-7 py-3 text-white font-medium cursor-pointer transition-all hover:shadow-lg" style={{
              background: config.primaryColor,
              borderRadius: radius,
              fontSize: '15px',
            }}>
              免费开始使用
            </button>
            <button className="px-7 py-3 font-medium cursor-pointer transition-all hover:bg-gray-50" style={{
              border: `1.5px solid ${config.primaryColor}30`,
              color: config.primaryColor,
              borderRadius: radius,
              fontSize: '15px',
              background: 'transparent',
            }}>
              观看演示视频
            </button>
          </div>

          {/* 产品截图占位 */}
          <div className="mx-auto rounded-2xl overflow-hidden shadow-xl" style={{
            maxWidth: 900,
            background: 'linear-gradient(135deg, #F8F9FA 0%, #F1F3F5 100%)',
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E5E7EB',
          }}>
            <div className="text-center" style={{ color: '#9CA3AF' }}>
              <div className="text-6xl mb-3 opacity-50">🖥️</div>
              <div className="text-sm font-medium">产品界面截图占位</div>
              <div className="text-xs mt-1.5 opacity-60">900 × 400</div>
            </div>
          </div>
        </div>
      </section>

      {/* 信任背书 */}
      <section className="py-10 border-b" style={{ borderColor: '#F0F0F0' }}>
        <div className={`${CONTAINER_MAX} px-6 text-center`}>
          <p className="text-sm mb-8" style={{ color: config.textSecondary, letterSpacing: '0.05em' }}>已被 1000+ 团队信赖</p>
          <div className="flex justify-center items-center gap-12 opacity-50">
            {['TechCorp', 'StartupX', 'DevStudio', 'CloudBase', 'DataFlow'].map((name, i) => (
              <div key={i} className="px-5 py-2 rounded-lg text-sm font-semibold tracking-wide" style={{ background: '#F9FAFB', color: '#6B7280' }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-20">
        <div className={`${CONTAINER_MAX} px-6`}>
          <SectionHeader
            title="为什么选择我们"
            align="center"
            config={config}
          />
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { icon: '⚡', title: '极速部署', desc: '一键发布到全球 CDN，秒级响应，零运维成本' },
              { icon: '🎨', title: '灵活定制', desc: '丰富的配置选项，按需调整，完美匹配品牌调性' },
              { icon: '📊', title: '数据洞察', desc: '实时监控关键指标，可视化报表辅助业务决策' },
              { icon: '🔒', title: '企业安全', desc: 'SOC2 认证，端到端加密，细粒度权限管控' },
              { icon: '🔌', title: '无缝集成', desc: '支持主流工具链，API 优先设计，Webhook 扩展' },
              { icon: '💬', title: '专属支持', desc: '7×24 小时在线，资深技术顾问一对一指导' },
            ].map((feature, i) => (
              <div key={i} className="p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{
                background: config.cardBackgroundColor,
                borderRadius: radius,
                ...tokens.card,
              }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4" style={{
                  background: config.primaryColor + '12',
                }}>
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: config.titleColor }}>{feature.title}</h3>
                <p style={{ color: config.textSecondary, fontSize: '13px', lineHeight: '1.65' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-20" style={{ background: '#F9FAFB' }}>
        <div className={`${CONTAINER_MAX} px-6`}>
          <SectionHeader
            title="用户反馈"
            align="center"
            config={config}
          />
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { name: '张三', role: '独立开发者', company: '个人工作室', content: '帮我节省了 80% 的开发时间，从原型到产品只用了 3 天。' },
              { name: '李四', role: 'CTO', company: 'StartupX', content: '团队协作效率提升了 5 倍，强烈推荐给所有技术团队。' },
              { name: '王五', role: '产品经理', company: 'TechCorp', content: '原型到产品的最佳工具，没有之一。' },
            ].map((item, i) => (
              <div key={i} className="p-6" style={{
                background: '#FFFFFF',
                borderRadius: radius,
                border: '1px solid #E5E7EB',
              }}>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: config.primaryColor }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: config.titleColor }}>{item.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: config.textSecondary }}>{item.role} · {item.company}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: config.textPrimary }}>"{item.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 定价方案 */}
      <section className="py-20">
        <div className={`${CONTAINER_MAX} px-6`}>
          <SectionHeader
            title="简单透明的定价"
            align="center"
            config={config}
          />
          <div className="grid grid-cols-3 gap-6 mt-10" style={{ maxWidth: 1000, margin: '2.5rem auto 0' }}>
            {[
              { name: '免费版', price: '¥0', desc: '个人项目起步', features: ['基础功能', '1 个项目', '社区支持', '1GB 存储'], cta: '免费开始', highlight: false },
              { name: '专业版', price: '¥99', desc: '专业开发者首选', features: ['全部功能', '无限项目', '优先支持', '100GB 存储', '自定义域名'], cta: '立即升级', badge: '最受欢迎', highlight: true },
              { name: '团队版', price: '¥299', desc: '高效团队协作', features: ['团队协作', '专属客服', '定制开发', '无限存储', 'SLA 保障', '审计日志'], cta: '联系销售', highlight: false },
            ].map((plan, i) => (
              <div key={i} className="p-7 relative transition-all duration-200 hover:-translate-y-1" style={{
                background: config.cardBackgroundColor,
                borderRadius: radius,
                border: plan.highlight ? `2px solid ${config.primaryColor}` : '1px solid #E5E7EB',
                boxShadow: plan.highlight ? '0 12px 32px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-white rounded-full shadow-md" style={{ background: config.primaryColor }}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-base font-semibold mb-2" style={{ color: config.titleColor }}>{plan.name}</h3>
                <p className="text-sm mb-5" style={{ color: config.textSecondary }}>{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold tracking-tight" style={{ color: config.primaryColor }}>{plan.price}</span>
                  <span className="text-sm ml-1" style={{ color: config.textSecondary }}>/月</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm" style={{ color: config.textPrimary }}>
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <span className="text-base" style={{ color: config.primaryColor, fontWeight: 600 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 font-semibold rounded transition-all duration-200 hover:shadow-md" style={{
                  background: plan.highlight ? config.primaryColor : 'transparent',
                  color: plan.highlight ? '#FFFFFF' : config.primaryColor,
                  border: plan.highlight ? 'none' : `1.5px solid ${config.primaryColor}`,
                  borderRadius: radius,
                  fontSize: '14px',
                }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: config.primaryColor }}>
        <div className={CONTAINER_MAX + ' px-6'}>
          <h2 className="text-2xl font-bold mb-3 text-white tracking-tight">准备好开始了吗？</h2>
          <p className="text-sm mb-8" style={{ color: '#FFFFFFD9' }}>免费试用 14 天，无需信用卡，随时取消</p>
          <div className="flex gap-4 justify-center">
            <button className="px-10 py-3.5 bg-white font-semibold rounded cursor-pointer transition-all hover:shadow-xl" style={{
              color: config.primaryColor,
              borderRadius: radius,
              fontSize: '15px',
            }}>
              立即注册
            </button>
            <button className="px-10 py-3.5 font-semibold rounded cursor-pointer transition-all hover:bg-white/10" style={{
              border: '1.5px solid #FFFFFF',
              color: '#FFFFFF',
              borderRadius: radius,
              fontSize: '15px',
              background: 'transparent',
            }}>
              预约演示
            </button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12" style={{ background: '#111827' }}>
        <div className={`${CONTAINER_MAX} px-6`}>
          <div className="grid grid-cols-4 gap-12">
            {[
              { title: '产品', links: ['功能介绍', '定价方案', '更新日志', '路线图'] },
              { title: '资源', links: ['文档中心', 'API 参考', '教程', '博客'] },
              { title: '公司', links: ['关于我们', '加入我们', '联系方式', '合作伙伴'] },
              { title: '法律', links: ['隐私政策', '服务条款', 'Cookie 设置', '安全声明'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold mb-5 text-white tracking-wide">{col.title}</h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j} className="cursor-pointer transition-colors hover:text-white" style={{ color: '#9CA3AF' }}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-8 text-center text-sm" style={{ borderTop: '1px solid #1F2937', color: '#6B7280' }}>
            Style Forge · 所有权利保留
          </div>
        </div>
      </footer>
    </div>
  )
})
