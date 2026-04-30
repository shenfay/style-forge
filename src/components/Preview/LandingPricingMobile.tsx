/**
 * Landing 场景 - 移动端定价页
 */

import { memo, useState } from 'react'
import type { StyleConfig } from '../../types/config'
import { getBorderRadius, generateComponentTokens, colors } from '../../utils/tokenResolver'
import { StatusBar } from '../UI/StatusBar'

interface LandingPricingMobileProps {
  config: StyleConfig
}

export const LandingPricingMobile = memo(function LandingPricingMobile({ config }: LandingPricingMobileProps) {
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

  const faqItems = [
    {
      question: '可以随时升级或降级方案吗？',
      answer: '可以。在账户设置中随时调整，升级立即生效，降级在下一个计费周期生效。',
    },
    {
      question: '免费版真的永久免费吗？',
      answer: '是的。免费版包含核心功能，无时间限制，适合个人项目和学习使用。',
    },
    {
      question: '年付方案的折扣如何计算？',
      answer: '年付享受8折优惠，相当于免费获得2个月。',
    },
    {
      question: '是否支持退款？',
      answer: '付费方案支持30天无理由退款。',
    },
  ]

  return (
    <div className="h-full overflow-y-auto" style={{ background: tokens.colors.background }}>
      <StatusBar />
      {/* 标题区 */}
      <section className="px-5 pt-8 pb-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: tokens.colors.textPrimary, lineHeight: '1.3' }}>
            选择你的方案
          </h1>
          <p className="text-sm" style={{ color: tokens.colors.textSecondary, lineHeight: '1.5' }}>
            从个人项目到企业级应用
          </p>
        </div>
      </section>

      {/* 月付/年付切换 */}
      <section className="px-5 pb-6">
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium" style={{ color: !isYearly ? tokens.colors.textPrimary : tokens.colors.textSecondary }}>
            月付
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-12 h-6 rounded-full transition-colors"
            style={{ backgroundColor: isYearly ? tokens.colors.primary : colors.gray[300] }}
          >
            <div
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              style={{ transform: isYearly ? 'translateX(24px)' : 'translateX(0)' }}
            />
          </button>
          <span className="text-sm font-medium" style={{ color: isYearly ? tokens.colors.textPrimary : tokens.colors.textSecondary }}>
            年付
          </span>
          {isYearly && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: tokens.colors.primary }}>
              省20%
            </span>
          )}
        </div>
      </section>

      {/* 定价卡片 */}
      <section className="px-5 pb-8 space-y-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-5 rounded-xl ${plan.badge ? 'border-2' : 'border'}`}
            style={{
              background: colors.background.card,
              borderColor: plan.badge ? tokens.colors.primary : colors.border.light,
              boxShadow: plan.badge ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {plan.badge && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold rounded-full text-white" style={{
                backgroundColor: tokens.colors.primary,
              }}>
                {plan.badge}
              </div>
            )}

            <h3 className="text-base font-semibold mb-1.5" style={{ color: tokens.colors.textPrimary }}>{plan.name}</h3>
            <p className="text-xs mb-4" style={{ color: tokens.colors.textSecondary }}>{plan.description}</p>
            
            <div className="mb-4 flex items-baseline gap-2">
              {plan.originalPrice && (
                <span className="text-sm line-through" style={{ color: colors.text.tertiary }}>{plan.originalPrice}</span>
              )}
              <span className="text-3xl font-bold" style={{ color: tokens.colors.primary }}>{plan.price}</span>
              <span className="text-xs" style={{ color: tokens.colors.textSecondary }}>{plan.period}</span>
            </div>

            <ul className="space-y-2 mb-5 text-xs">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2" style={{ color: tokens.colors.textPrimary }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ 
                    color: feature.included ? tokens.colors.primary : colors.text.tertiary, 
                    flexShrink: 0, 
                    marginTop: '1px' 
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

            <button className="w-full py-2.5 text-sm font-medium rounded-lg transition-all" style={{
              background: plan.ctaStyle === 'primary' ? tokens.colors.primary : colors.gray[100],
              color: plan.ctaStyle === 'primary' ? colors.white : tokens.colors.textPrimary,
              borderRadius: radius,
            }}>
              {plan.ctaText}
            </button>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="px-5 pb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: tokens.colors.textPrimary }}>
          常见问题
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} config={config} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-8">
        <div className="p-6 rounded-xl text-center" style={{ backgroundColor: config.backgroundColor }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: tokens.colors.textPrimary }}>
            还没找到合适的方案？
          </h3>
          <p className="text-xs mb-4" style={{ color: tokens.colors.textSecondary }}>
            告诉我们你的需求，为你量身定制
          </p>
          <div className="space-y-2">
            <button className="w-full py-2.5 text-sm font-medium rounded-lg transition-all" style={{
              background: tokens.colors.primary,
              color: colors.white,
            }}>
              联系销售
            </button>
            <button className="w-full py-2.5 text-sm font-medium rounded-lg transition-colors" style={{
              color: tokens.colors.textPrimary,
              backgroundColor: colors.gray[100],
            }}>
              免费试用
            </button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="px-5 py-6 text-center text-xs border-t" style={{ borderColor: colors.border.light, color: tokens.colors.textSecondary }}>
        © 2026 Style Forge. All rights reserved.
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
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>{question}</span>
        <svg
          width="18"
          height="18"
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
          maxHeight: isOpen ? '150px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-3.5 text-xs" style={{ color: tokens.colors.textSecondary, lineHeight: '1.6' }}>
          {answer}
        </div>
      </div>
    </div>
  )
}
