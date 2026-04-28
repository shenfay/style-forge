/**
 * Landing 场景 - 移动端主页
 */

import { memo } from 'react'
import type { StyleConfig } from '../../../types/config'
import { Placeholder } from '../Placeholder'
import { SectionHeader } from '../SectionHeader'
import { getBorderRadius, generateComponentTokens } from '../../../utils/design-tokens'

interface LandingHomePageProps {
  config: StyleConfig
}

export const LandingHomePage = memo(function LandingHomePage({ config }: LandingHomePageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* Hero 区 */}
      <div className="px-4 py-10 text-center" style={{ background: 'linear-gradient(135deg, ' + config.primaryColor + '15 0%, ' + config.backgroundColor + ' 100%)' }}>
        <h1 className="text-2xl font-bold mb-3" style={{ color: config.titleColor, fontSize: '28px', lineHeight: '1.3' }}>
          构建你的下一个伟大产品
        </h1>
        <p className="mb-6" style={{ color: config.textSecondary, fontSize: '14px', lineHeight: tokens.typography.lineHeight }}>
          一站式开发平台，让创意快速落地
        </p>
        <div className="flex gap-3 justify-center">
          <button className="px-6 py-2.5 text-white text-sm font-medium" style={{
            background: config.primaryColor,
            borderRadius: radius,
          }}>
            免费开始
          </button>
          <button className="px-6 py-2.5 text-sm font-medium" style={{
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
            borderRadius: radius,
          }}>
            查看演示
          </button>
        </div>
      </div>

      {/* 信任背书 */}
      <div className="px-4 py-6 text-center" style={{ borderBottom: `1px solid ${config.cardBackgroundColor === '#FFFFFF' ? '#F0F0F0' : 'transparent'}` }}>
        <p className="text-xs mb-3" style={{ color: config.textSecondary }}>已被 1000+ 团队信赖</p>
        <div className="flex justify-between items-center opacity-60">
          {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
            <div key={i} className="w-10 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: '#F5F5F5', color: '#999' }}>
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* 核心功能 */}
      <div className="px-4 py-6">
        <SectionHeader
          title="核心功能"
          align="center"
          config={config}
        />
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { icon: '⚡', title: '快速部署', desc: '一键发布，秒级上线' },
            { icon: '🎨', title: '灵活定制', desc: '按需配置，随心调整' },
            { icon: '📊', title: '数据分析', desc: '实时监控，洞察趋势' },
            { icon: '🔒', title: '安全可靠', desc: '企业级安全防护' },
          ].map((feature, i) => (
            <div key={i} className="p-3" style={{
              background: config.cardBackgroundColor,
              borderRadius: radius,
              ...tokens.card,
            }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base mb-2" style={{
                background: config.primaryColor + '15',
              }}>
                {feature.icon}
              </div>
              <h3 className="text-sm font-medium mb-1" style={{ color: config.titleColor }}>{feature.title}</h3>
              <p className="text-xs" style={{ color: config.textSecondary }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 用户评价 */}
      <div className="px-4 py-6" style={{ background: config.cardBackgroundColor }}>
        <SectionHeader
          title="用户评价"
          align="center"
          config={config}
        />
        <div className="flex gap-3 overflow-x-auto px-4 mt-4 pb-2" style={{ scrollbarWidth: 'none' }}>
          {[
            { name: '张三', role: '独立开发者', content: '帮我节省了80%的开发时间' },
            { name: '李四', role: '初创团队CTO', content: '从想法到上线只用了3天' },
            { name: '王五', role: '产品经理', content: '原型到产品的最佳工具' },
          ].map((item, i) => (
            <div key={i} className="shrink-0 w-64 p-3" style={{
              background: config.backgroundColor,
              borderRadius: radius,
              border: `1px solid ${config.cardStyle === 'border' ? '#E5E5E5' : 'transparent'}`,
            }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: config.primaryColor }}>
                  {item.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: config.titleColor }}>{item.name}</div>
                  <div className="text-xs" style={{ color: config.textSecondary }}>{item.role}</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: config.textPrimary }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 定价预览 */}
      <div className="px-4 py-6">
        <SectionHeader
          title="定价方案"
          align="center"
          config={config}
        />
        <div className="mt-4 space-y-3">
          {[
            { name: '免费版', price: '¥0', features: ['基础功能', '1个项目'] },
            { name: '专业版', price: '¥99', features: ['全部功能', '无限项目'], highlight: true },
            { name: '团队版', price: '¥299', features: ['团队协作', '专属客服'] },
          ].map((plan, i) => (
            <div key={i} className="p-3" style={{
              background: config.cardBackgroundColor,
              borderRadius: radius,
              border: plan.highlight ? `2px solid ${config.primaryColor}` : `1px solid ${config.cardStyle === 'border' ? '#E5E5E5' : 'transparent'}`,
              position: 'relative',
            }}>
              {plan.highlight && (
                <div className="absolute -top-2.5 left-3 px-2 py-0.5 text-xs text-white rounded" style={{ background: config.primaryColor }}>
                  最受欢迎
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium" style={{ color: config.titleColor }}>{plan.name}</h3>
                <span className="text-lg font-bold" style={{ color: config.primaryColor }}>{plan.price}<span className="text-xs font-normal" style={{ color: config.textSecondary }}>/月</span></span>
              </div>
              <div className="flex gap-2 text-xs" style={{ color: config.textSecondary }}>
                {plan.features.map((f, j) => <span key={j}>{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-8 text-center" style={{ background: config.primaryColor }}>
        <h2 className="text-xl font-bold mb-2 text-white">准备好开始了吗？</h2>
        <p className="text-sm mb-4" style={{ color: '#FFFFFFCC' }}>免费试用14天，无需信用卡</p>
        <button className="px-8 py-2.5 bg-white text-sm font-medium rounded" style={{
          color: config.primaryColor,
          borderRadius: radius,
        }}>
          立即注册
        </button>
      </div>

      {/* 页脚 */}
      <div className="px-4 py-6 text-center" style={{ background: config.cardBackgroundColor, borderTop: `1px solid #E5E5E5` }}>
        <div className="flex justify-center gap-4 text-xs mb-3" style={{ color: config.textSecondary }}>
          <span>关于我们</span>
          <span>隐私政策</span>
          <span>服务条款</span>
        </div>
        <p className="text-xs" style={{ color: '#999' }}>Style Forge · 所有权利保留</p>
      </div>
    </div>
  )
})
