/**
 * Landing 场景 - 桌面端主页
 */

import { memo } from 'react'
import type { StyleConfig } from '../../types/config'
import { SectionHeader } from './SectionHeader'
import { getBorderRadius, generateComponentTokens, colors, fontSize, fontWeight } from '../../utils/design-tokens'

interface LandingHomeDesktopProps {
  config: StyleConfig
}

export const LandingHomeDesktop = memo(function LandingHomeDesktop({ config }: LandingHomeDesktopProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 px-4" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
        height: '72px',
      }}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200 }}>
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold" style={{ color: config.primaryColor }}>Style Forge</span>
            <div className="flex gap-6 text-sm" style={{ color: '#666' }}>
              <span style={{ color: config.primaryColor, fontWeight: 500 }}>功能</span>
              <span>定价</span>
              <span>文档</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 text-sm rounded cursor-pointer" style={{
              border: '1px solid #E5E5E5',
              color: '#666',
              borderRadius: radius,
            }}>登录</div>
            <div className="px-4 py-2 text-sm rounded cursor-pointer text-white" style={{
              background: config.primaryColor,
              borderRadius: radius,
            }}>免费开始</div>
          </div>
        </div>
      </header>

      {/* Hero 区 */}
      <div className="px-4 py-20 text-center" style={{
        background: `linear-gradient(135deg, ${config.primaryColor}10 0%, ${config.backgroundColor} 100%)`,
      }}>
        <h1 className="mx-auto mb-4 font-bold" style={{
          maxWidth: 800,
          fontSize: '48px',
          lineHeight: '1.2',
          color: config.titleColor,
        }}>
          构建你的下一个伟大产品
        </h1>
        <p className="mx-auto mb-8" style={{
          maxWidth: 600,
          fontSize: '18px',
          lineHeight: '1.6',
          color: config.textSecondary,
        }}>
          一站式开发平台，让创意快速落地。无需复杂配置，从想法到上线只需几分钟。
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 text-white font-medium" style={{
            background: config.primaryColor,
            borderRadius: radius,
            ...tokens.button,
          }}>
            免费开始使用
          </button>
          <button className="px-8 py-3 font-medium" style={{
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
            borderRadius: radius,
          }}>
            观看演示视频
          </button>
        </div>

        {/* 产品截图占位 */}
        <div className="mx-auto mt-12 rounded-xl overflow-hidden shadow-2xl" style={{
          maxWidth: 1000,
          background: '#F5F5F5',
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}>
          <div className="text-center">
            <div className="text-6xl mb-4">🖥️</div>
            <div className="text-lg">产品界面截图占位</div>
            <div className="text-sm mt-2">1200×600</div>
          </div>
        </div>
      </div>

      {/* 信任背书 */}
      <div className="px-4 py-10 text-center" style={{ borderBottom: `1px solid #F0F0F0` }}>
        <p className="text-sm mb-6" style={{ color: config.textSecondary }}>已被 1000+ 团队信赖</p>
        <div className="mx-auto flex justify-between items-center opacity-60" style={{ maxWidth: 900 }}>
          {['TechCorp', 'StartupX', 'DevStudio', 'CloudBase', 'DataFlow', 'AIWorks'].map((name, i) => (
            <div key={i} className="px-4 py-2 rounded text-sm font-medium" style={{ background: '#F9F9F9', color: '#999' }}>
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* 功能特性 */}
      <div className="px-4 py-16">
        <SectionHeader
          title="为什么选择我们"
          align="center"
          config={config}
        />
        <div className="mx-auto grid grid-cols-3 gap-6 mt-10" style={{ maxWidth: 1100 }}>
          {[
            { icon: '⚡', title: '极速部署', desc: '一键发布到全球CDN，秒级响应，无需运维' },
            { icon: '🎨', title: '灵活定制', desc: '丰富的配置选项，按需调整，完美匹配品牌' },
            { icon: '📊', title: '数据洞察', desc: '实时监控关键指标，可视化报表辅助决策' },
            { icon: '🔒', title: '企业安全', desc: 'SOC2认证，数据加密，权限管控，审计日志' },
            { icon: '🔌', title: '无缝集成', desc: '支持主流工具链，API优先，Webhook扩展' },
            { icon: '💬', title: '专属支持', desc: '7×24小时在线，技术顾问一对一指导' },
          ].map((feature, i) => (
            <div key={i} className="p-6" style={{
              background: config.cardBackgroundColor,
              borderRadius: radius,
              ...tokens.card,
            }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{
                background: config.primaryColor + '15',
              }}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: config.titleColor }}>{feature.title}</h3>
              <p style={{ color: config.textSecondary, fontSize: '14px', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 用户评价 */}
      <div className="px-4 py-16" style={{ background: '#FAFAFA' }}>
        <SectionHeader
          title="用户反馈"
          align="center"
          config={config}
        />
        <div className="mx-auto grid grid-cols-3 gap-6 mt-10" style={{ maxWidth: 1100 }}>
          {[
            { name: '张三', role: '独立开发者', company: '个人工作室', content: '帮我节省了80%的开发时间，从原型到产品只用了3天' },
            { name: '李四', role: 'CTO', company: 'StartupX', content: '团队协作效率提升了5倍，强烈推荐' },
            { name: '王五', role: '产品经理', company: 'TechCorp', content: '原型到产品的最佳工具，没有之一' },
          ].map((item, i) => (
            <div key={i} className="p-6" style={{
              background: '#FFFFFF',
              borderRadius: radius,
              border: `1px solid #E5E5E5`,
            }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: config.primaryColor }}>
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-medium" style={{ color: config.titleColor }}>{item.name}</div>
                  <div className="text-sm" style={{ color: config.textSecondary }}>{item.role} · {item.company}</div>
                </div>
              </div>
              <p style={{ color: config.textPrimary, fontSize: '14px', lineHeight: '1.6' }}>"{item.content}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* 定价方案 */}
      <div className="px-4 py-16">
        <SectionHeader
          title="简单透明的定价"
          align="center"
          config={config}
        />
        <div className="mx-auto grid grid-cols-3 gap-6 mt-10" style={{ maxWidth: 1000 }}>
          {[
            { name: '免费版', price: '¥0', desc: '个人项目起步', features: ['基础功能', '1个项目', '社区支持', '1GB存储'], cta: '免费开始', highlight: false },
            { name: '专业版', price: '¥99', desc: '专业开发者首选', features: ['全部功能', '无限项目', '优先支持', '100GB存储', '自定义域名'], cta: '立即升级', badge: '最受欢迎', highlight: true },
            { name: '团队版', price: '¥299', desc: '高效团队协作', features: ['团队协作', '专属客服', '定制开发', '无限存储', 'SLA保障', '审计日志'], cta: '联系销售', highlight: false },
          ].map((plan, i) => (
            <div key={i} className="p-6 relative" style={{
              background: config.cardBackgroundColor,
              borderRadius: radius,
              border: plan.highlight ? `2px solid ${config.primaryColor}` : `1px solid #E5E5E5`,
              boxShadow: plan.highlight ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
            }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-medium text-white rounded-full" style={{ background: config.primaryColor }}>
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-medium mb-2" style={{ color: config.titleColor }}>{plan.name}</h3>
              <p className="text-sm mb-4" style={{ color: config.textSecondary }}>{plan.desc}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold" style={{ color: config.primaryColor }}>{plan.price}</span>
                <span className="text-sm" style={{ color: config.textSecondary }}>/月</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm" style={{ color: config.textPrimary }}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span style={{ color: config.primaryColor }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 font-medium rounded" style={{
                background: plan.highlight ? config.primaryColor : 'transparent',
                color: plan.highlight ? '#FFFFFF' : config.primaryColor,
                border: plan.highlight ? 'none' : `1px solid ${config.primaryColor}`,
                borderRadius: radius,
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-16 text-center" style={{ background: config.primaryColor }}>
        <h2 className="text-3xl font-bold mb-3 text-white">准备好开始了吗？</h2>
        <p className="text-base mb-6" style={{ color: '#FFFFFFCC' }}>免费试用14天，无需信用卡，随时取消</p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white font-medium rounded" style={{
            color: config.primaryColor,
            borderRadius: radius,
          }}>
            立即注册
          </button>
          <button className="px-8 py-3 font-medium rounded" style={{
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
            borderRadius: radius,
          }}>
            预约演示
          </button>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="px-4 py-12" style={{ background: '#1A1A1A' }}>
        <div className="mx-auto grid grid-cols-4 gap-8" style={{ maxWidth: 1100 }}>
          {[
            { title: '产品', links: ['功能介绍', '定价方案', '更新日志', '路线图'] },
            { title: '资源', links: ['文档中心', 'API参考', '教程', '博客'] },
            { title: '公司', links: ['关于我们', '加入我们', '联系方式', '合作伙伴'] },
            { title: '法律', links: ['隐私政策', '服务条款', 'Cookie设置', '安全声明'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-medium mb-3 text-white">{col.title}</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#A3A3A3' }}>
                {col.links.map((link, j) => (
                  <li key={j} className="cursor-pointer hover:text-white transition-colors">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 pt-6 text-center text-sm" style={{ borderTop: '1px solid #333', color: '#666', maxWidth: 1100 }}>
          Style Forge · 所有权利保留
        </div>
      </footer>
    </div>
  )
})
