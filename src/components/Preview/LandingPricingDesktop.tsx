/**
 * Landing 场景 - 桌面端定价页
 */

import { memo, useState } from 'react'
import type { StyleConfig } from '../../types/config'
import { getBorderRadius, generateComponentTokens, colors } from '../../utils/design-tokens'

interface LandingPricingDesktopProps {
  config: StyleConfig
}

const CONTAINER_MAX = 'mx-auto'

export const LandingPricingDesktop = memo(function LandingPricingDesktop({ config }: LandingPricingDesktopProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: '免费版',
      price: isYearly ? '¥0' : '¥0',
      period: '/月',
      description: '适合个人项目和学习',
      features: [
        { text: '基础功能', included: true },
        { text: '1个项目', included: true },
        { text: '社区支持', included: true },
        { text: '1GB存储', included: true },
        { text: '自定义域名', included: false },
        { text: '优先支持', included: false },
      ],
      ctaText: '免费开始',
      ctaStyle: 'secondary' as const,
    },
    {
      name: '专业版',
      price: isYearly ? '¥79' : '¥99',
      originalPrice: isYearly ? '¥99' : undefined,
      period: '/月',
      description: '专业开发者的最佳选择',
      features: [
        { text: '全部功能', included: true },
        { text: '无限项目', included: true },
        { text: '优先支持', included: true },
        { text: '100GB存储', included: true },
        { text: '自定义域名', included: true },
        { text: 'API访问', included: true },
      ],
      badge: '最受欢迎',
      ctaText: '立即升级',
      ctaStyle: 'primary' as const,
    },
    {
      name: '团队版',
      price: isYearly ? '¥239' : '¥299',
      originalPrice: isYearly ? '¥299' : undefined,
      period: '/月',
      description: '高效团队协作与管控',
      features: [
        { text: '专业版全部功能', included: true },
        { text: '团队成员（最多20人）', included: true },
        { text: '专属客服', included: true },
        { text: '无限存储', included: true },
        { text: 'SLA 99.9%保障', included: true },
        { text: '审计日志', included: true },
      ],
      ctaText: '联系销售',
      ctaStyle: 'secondary' as const,
    },
  ]

  const comparisonData = [
    {
      category: '核心功能',
      items: [
        { feature: '项目数量', free: '1个', pro: '无限', team: '无限' },
        { feature: '存储空间', free: '1GB', pro: '100GB', team: '无限' },
        { feature: '自定义域名', free: '❌', pro: '✅', team: '✅' },
        { feature: 'API访问', free: '❌', pro: '✅', team: '✅' },
      ],
    },
    {
      category: '协作与管理',
      items: [
        { feature: '团队成员', free: '1人', pro: '1人', team: '最多20人' },
        { feature: '权限管理', free: '❌', pro: '❌', team: '✅' },
        { feature: '审计日志', free: '❌', pro: '❌', team: '✅' },
      ],
    },
    {
      category: '支持与服务',
      items: [
        { feature: '技术支持', free: '社区', pro: '优先', team: '专属' },
        { feature: 'SLA保障', free: '❌', pro: '99.5%', team: '99.9%' },
        { feature: '定制开发', free: '❌', pro: '❌', team: '✅' },
      ],
    },
  ]

  const faqItems = [
    {
      question: '可以随时升级或降级方案吗？',
      answer: '可以。在账户设置中随时调整，升级立即生效，降级在下一个计费周期生效，费用按天折算。',
    },
    {
      question: '免费版真的永久免费吗？',
      answer: '是的。免费版包含核心功能，无时间限制，适合个人项目和学习使用。',
    },
    {
      question: '年付方案的折扣如何计算？',
      answer: '年付享受8折优惠，相当于免费获得2个月。例如专业版月付¥99/月，年付¥79/月（¥948/年）。',
    },
    {
      question: '是否支持退款？',
      answer: '付费方案支持30天无理由退款。超过30天后，可申请按比例退款。',
    },
    {
      question: '企业定制方案如何联系？',
      answer: '请通过\'联系销售\'按钮提交需求，我们的商务团队会在24小时内与您联系。',
    },
  ]

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
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>功能</a>
            <a href="#" className="text-sm font-medium" style={{ color: tokens.colors.primary }}>定价</a>
            <a href="#" className="text-sm hover:opacity-70 transition-opacity" style={{ color: tokens.colors.textSecondary }}>文档</a>
          </nav>
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

      {/* 标题区 */}
      <section className="py-20 px-6">
        <div className={`${CONTAINER_MAX} text-center`}>
          <h1 className="text-4xl font-bold mb-4" style={{ color: tokens.colors.textPrimary, lineHeight: '1.2' }}>
            选择你的方案
          </h1>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>
            从个人项目到企业级应用，总有一款适合你
          </p>

          {/* 月付/年付切换 */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium" style={{ color: !isYearly ? tokens.colors.textPrimary : tokens.colors.textSecondary }}>
              月付
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full transition-colors"
              style={{ backgroundColor: isYearly ? tokens.colors.primary : colors.gray[300] }}
            >
              <div
                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform"
                style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
              />
            </button>
            <span className="text-sm font-medium" style={{ color: isYearly ? tokens.colors.textPrimary : tokens.colors.textSecondary }}>
              年付
            </span>
            {isYearly && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: tokens.colors.primary }}>
                节省20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 定价卡片 */}
      <section className="pb-20 px-6">
        <div className={`${CONTAINER_MAX}`}>
          <div className="grid grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-xl transition-all hover:-translate-y-1 ${
                  plan.badge ? 'border-2' : 'border'
                }`}
                style={{
                  background: colors.background.card,
                  borderColor: plan.badge ? tokens.colors.primary : colors.border.light,
                  boxShadow: plan.badge ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full text-white" style={{
                    backgroundColor: tokens.colors.primary,
                  }}>
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2" style={{ color: tokens.colors.textPrimary }}>{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: tokens.colors.textSecondary }}>{plan.description}</p>
                
                <div className="mb-6 flex items-baseline gap-2">
                  {plan.originalPrice && (
                    <span className="text-lg line-through" style={{ color: colors.text.tertiary }}>{plan.originalPrice}</span>
                  )}
                  <span className="text-5xl font-bold" style={{ color: tokens.colors.primary }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: tokens.colors.textSecondary }}>{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3" style={{ color: tokens.colors.textPrimary }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ 
                        color: feature.included ? tokens.colors.primary : colors.text.tertiary, 
                        flexShrink: 0, 
                        marginTop: '2px' 
                      }}>
                        {feature.included ? (
                          <polyline points="20 6 9 17 4 12"/>
                        ) : (
                          <line x1="18" y1="6" x2="6" y2="18"/>
                        )}
                      </svg>
                      <span style={{ opacity: feature.included ? 1 : 0.5 }}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 font-medium rounded-lg transition-all hover:shadow-md" style={{
                  background: plan.ctaStyle === 'primary' ? tokens.colors.primary : colors.gray[100],
                  color: plan.ctaStyle === 'primary' ? colors.white : tokens.colors.textPrimary,
                  borderRadius: radius,
                }}>
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能对比表 */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.background.page }}>
        <div className={`${CONTAINER_MAX}`}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: tokens.colors.textPrimary }}>
            功能详细对比
          </h2>

          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: colors.border.light }}>
            <table className="w-full" style={{ background: colors.background.card }}>
              <thead>
                <tr style={{ backgroundColor: colors.gray[50] }}>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: tokens.colors.textPrimary }}>功能</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: tokens.colors.textPrimary }}>免费版</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: tokens.colors.primary, backgroundColor: withOpacity(tokens.colors.primary, 0.05) }}>专业版</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: tokens.colors.textPrimary }}>团队版</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((category, ci) => (
                  <>
                    <tr key={`cat-${ci}`} style={{ backgroundColor: colors.gray[50] }}>
                      <td colSpan={4} className="px-6 py-3 text-sm font-semibold" style={{ color: tokens.colors.textPrimary }}>
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, ii) => (
                      <tr key={`item-${ci}-${ii}`} style={{ 
                        backgroundColor: ii % 2 === 0 ? colors.background.card : colors.gray['25'],
                      }}>
                        <td className="px-6 py-4 text-sm" style={{ color: tokens.colors.textPrimary }}>{item.feature}</td>
                        <td className="px-6 py-4 text-sm text-center" style={{ color: tokens.colors.textSecondary }}>{item.free}</td>
                        <td className="px-6 py-4 text-sm text-center font-medium" style={{ 
                          color: tokens.colors.primary,
                          backgroundColor: withOpacity(tokens.colors.primary, 0.03),
                        }}>{item.pro}</td>
                        <td className="px-6 py-4 text-sm text-center" style={{ color: tokens.colors.textSecondary }}>{item.team}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className={`${CONTAINER_MAX} max-w-4xl`}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: tokens.colors.textPrimary }}>
            常见问题
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} config={config} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: config.backgroundColor }}>
        <div className={`${CONTAINER_MAX} max-w-3xl text-center`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: tokens.colors.textPrimary }}>
            还没找到合适的方案？
          </h2>
          <p className="text-lg mb-10" style={{ color: tokens.colors.textSecondary }}>
            告诉我们你的需求，为你量身定制
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3.5 text-base font-medium rounded-lg transition-all hover:shadow-lg" style={{
              background: tokens.colors.primary,
              color: colors.white,
            }}>
              联系销售
            </button>
            <button className="px-8 py-3.5 text-base font-medium rounded-lg transition-colors" style={{
              color: tokens.colors.textPrimary,
              backgroundColor: colors.gray[100],
            }}>
              免费试用
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

// FAQ 折叠面板组件
function FAQItem({ question, answer, config }: { question: string; answer: string; config: StyleConfig }) {
  const [isOpen, setIsOpen] = useState(false)
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="border rounded-xl overflow-hidden transition-all" style={{ 
      borderColor: colors.border.light,
      background: colors.background.card,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-base font-medium" style={{ color: tokens.colors.textPrimary }}>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300"
          style={{ 
            color: tokens.colors.textSecondary,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '200px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5" style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>
          {answer}
        </div>
      </div>
    </div>
  )
}

// 辅助函数：透明度处理
function withOpacity(color: string, opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0')
  return `${color}${alpha}`
}
