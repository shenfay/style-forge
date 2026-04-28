/**
 * 内容平台 PC 端专用模板
 * 三栏/双栏宽屏布局，区别于移动端单列瀑布流
 */

import type { StyleConfig } from '../../types/config'
import { Placeholder } from './Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, withOpacity, generateComponentTokens } from '../../utils/design-tokens'

/* ==================== PC 内容首页 ==================== */

export function ContentHomeDesktop({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize

  const categories = ['推荐', '最新', '设计', '科技', '生活方式', '旅行', '美食', '摄影', '读书', '商业']
  const articles = [
    { title: '2024 年度最佳设计工具盘点：提升效率的 10 款神器', tag: '设计', author: '设计之声', time: '3天前', likes: '2.3k' },
    { title: '如何用一杯咖啡开启高效一天', tag: '生活方式', author: '生活美学', time: '5天前', likes: '1.8k' },
    { title: '京都红叶季深度游攻略：错过等一年', tag: '旅行', author: '旅人日记', time: '1周前', likes: '3.5k' },
    { title: '极简主义摄影入门指南', tag: '摄影', author: '光影之间', time: '3天前', likes: '1.2k' },
    { title: '2024 年最值得关注的科技趋势', tag: '科技', author: '科技前沿', time: '2天前', likes: '4.1k' },
    { title: '周末在家做一杯手冲咖啡，享受慢时光', tag: '美食', author: '咖啡猎人', time: '4天前', likes: '982' },
  ]

  return (
    <div className="flex gap-8 px-8 py-6 mx-auto" style={{ maxWidth: 1200, background: config.backgroundColor, minHeight: 'calc(100vh - 120px)' }}>
      {/* 左侧 - 分类导航 */}
      <aside className="w-48 shrink-0">
        <div className="space-y-1 sticky top-6">
          <div className="text-xs font-medium mb-3 uppercase tracking-wider" style={{ color: colors.text.tertiary }}>分类</div>
          {categories.map((cat, i) => (
            <div key={i} className="px-3 py-2 text-sm rounded-lg cursor-pointer" style={{
              background: i === 0 ? withOpacity(config.primaryColor, 0.08) : 'transparent',
              color: i === 0 ? config.primaryColor : colors.text.secondary,
              fontWeight: i === 0 ? fontWeight.medium : fontWeight.normal,
            }}>
              {cat}
            </div>
          ))}
        </div>
      </aside>

      {/* 中间 - 文章网格 */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: colors.text.primary, fontWeight: fontWeight.bold }}>推荐阅读</h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: colors.text.tertiary }}>
            <span>排序：最新</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {articles.map((item, i) => (
            <div key={i} className="overflow-hidden border rounded-lg cursor-pointer transition-shadow hover:shadow-md" style={{
              borderColor: colors.border.light,
              borderRadius: radius,
            }}>
              <Placeholder width={360} height={i % 2 === 0 ? 200 : 160} type="product" text={item.title.length > 10 ? item.title.slice(0, 10) + '..' : item.title} />
              <div className="p-4 space-y-2">
                <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded" style={{
                  background: withOpacity(config.primaryColor, 0.1),
                  color: config.primaryColor,
                }}>
                  {item.tag}
                </span>
                <h3 className="font-medium leading-snug line-clamp-2" style={{
                  color: colors.text.primary,
                  fontSize: bodyFontSize,
                  fontWeight: fontWeight.medium,
                }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full" style={{ background: withOpacity(config.primaryColor, 0.2) }} />
                    <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 右侧 - 侧边栏 */}
      <aside className="w-64 shrink-0 space-y-6">
        <div className="sticky top-6 space-y-6">
          {/* 热门作者 */}
          <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.light }}>
            <div className="text-sm font-medium mb-3" style={{ color: colors.text.primary }}>推荐作者</div>
            {['设计之声', '科技前沿', '生活美学', '旅人日记'].map((name, i) => (
              <div key={i} className="flex items-center gap-2 py-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: config.primaryColor }}>
                  {name.substring(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: colors.text.primary }}>{name}</div>
                  <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>发布了 28 篇文章</div>
                </div>
                <button className="px-2.5 py-1 text-[11px] rounded-full cursor-pointer" style={{
                  border: `1px solid ${config.primaryColor}`,
                  color: config.primaryColor,
                }}>
                  关注
                </button>
              </div>
            ))}
          </div>

          {/* 热门标签 */}
          <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.light }}>
            <div className="text-sm font-medium mb-3" style={{ color: colors.text.primary }}>热门标签</div>
            <div className="flex flex-wrap gap-2">
              {['设计', '科技', 'AI', '生活方式', '旅行', '摄影', '阅读'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-full cursor-pointer" style={{
                  background: withOpacity(config.primaryColor, 0.06),
                  color: colors.text.secondary,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

/* ==================== PC 文章详情 ==================== */

export function ContentDetailDesktop({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <div className="flex gap-8 px-8 py-6 mx-auto" style={{ maxWidth: 1200, background: config.backgroundColor, minHeight: 'calc(100vh - 120px)' }}>
      {/* 中间 - 文章正文 */}
      <main className="flex-1 min-w-0 max-w-3xl mx-auto">
        <div className="mb-4">
          <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded mb-2" style={{
            background: withOpacity(config.primaryColor, 0.1),
            color: config.primaryColor,
          }}>
            设计
          </span>
          <h1 className="text-2xl font-bold leading-tight mb-3" style={{
            color: colors.text.primary,
            fontWeight: fontWeight.bold,
          }}>
            2024 年度最佳设计工具盘点：提升效率的 10 款神器
          </h1>

          <div className="flex items-center gap-3 py-3" style={{
            borderTop: `1px solid ${colors.border.light}`,
            borderBottom: `1px solid ${colors.border.light}`,
          }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: config.primaryColor }}>
              设
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: colors.text.primary, fontWeight: fontWeight.medium }}>设计之声</div>
              <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>资深设计师 · 2024年12月20日 · 阅读时长 8 分钟</div>
            </div>
            <button className="px-4 py-1.5 text-sm font-medium rounded cursor-pointer" style={{
              background: config.primaryColor,
              color: colors.white,
              borderRadius: '999px',
            }}>
              关注
            </button>
          </div>
        </div>

        {/* 文章头图 */}
        <div className="mb-6 rounded-lg overflow-hidden" style={{ borderRadius: radius }}>
          <Placeholder width={800} height={400} type="banner" />
        </div>

        {/* 正文 */}
        <div className="space-y-5 leading-relaxed" style={{
          color: colors.text.primary,
          fontSize: bodyFontSize,
          lineHeight,
        }}>
          <p>在当今快节奏的设计行业中，选择正确的工具可以显著提升工作效率。无论你是 UI/UX 设计师、平面设计师还是插画师，一套得心应手的工具组合都是必不可少的。</p>
          <p>本文将从用户界面设计、原型制作、协作平台和资源管理四个维度，为你盘点 2024 年最值得关注的 10 款设计工具。</p>

          <h2 className="text-xl font-bold" style={{ color: colors.text.primary, fontWeight: fontWeight.bold, marginTop: '32px' }}>一、用户界面设计工具</h2>
          <p>Figma 依然是 UI 设计领域的不二之选。2024 年，Figma 推出了 AI 辅助设计功能，可以自动生成组件变体和布局建议，进一步巩固了其市场地位。</p>
          <p>与此同时，Penpot 作为开源替代方案也在快速崛起，吸引了大量注重数据安全和预算有限的团队。</p>

          <div className="my-6 rounded-lg overflow-hidden" style={{ borderRadius: radius }}>
            <Placeholder width={800} height={350} type="banner" />
          </div>

          <h2 className="text-xl font-bold" style={{ color: colors.text.primary, fontWeight: fontWeight.bold, marginTop: '32px' }}>二、原型制作工具</h2>
          <p>ProtoPie 在 2024 年推出了更强大的交互引擎，支持复杂的条件逻辑和传感器交互，使高保真原型可以媲美真实应用。</p>
          <p>Axure RP 也推出了云端协作功能，让传统原型工具焕发了新的生机。</p>

          <h2 className="text-xl font-bold" style={{ color: colors.text.primary, fontWeight: fontWeight.bold, marginTop: '32px' }}>三、协作与反馈平台</h2>
          <p>Zeplin 和 Avocode 等协作工具在 2024 年进一步整合了 AI 能力，可以自动生成开发标注和代码片段，显著缩短了设计到开发的交付周期。</p>
        </div>

        {/* 文章底部操作 */}
        <div className="flex items-center gap-4 mt-8 pt-4" style={{ borderTop: `1px solid ${colors.border.light}` }}>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-gray-50" style={{ color: colors.text.secondary }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            368 赞
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-gray-50" style={{ color: colors.text.secondary }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            12 评论
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-gray-50" style={{ color: colors.text.secondary }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            收藏
          </button>
          <div className="flex-1" />
          <button className="px-6 py-2 text-sm font-medium rounded-full cursor-pointer" style={{
            background: config.buttonStyle === 'gradient'
              ? `linear-gradient(135deg, ${config.primaryColor}, ${withOpacity(config.primaryColor, 0.8)})`
              : config.buttonStyle === 'wireframe' ? 'transparent' : config.primaryColor,
            color: config.buttonStyle === 'wireframe' ? config.primaryColor : colors.white,
            border: config.buttonStyle === 'wireframe' ? `1px solid ${config.primaryColor}` : 'none',
          }}>
            分享
          </button>
        </div>

        {/* 评论区 */}
        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${colors.border.light}` }}>
          <h3 className="text-base font-bold mb-4" style={{ color: colors.text.primary, fontWeight: fontWeight.bold }}>
            评论 <span style={{ color: colors.text.tertiary, fontWeight: fontWeight.normal }}>(12)</span>
          </h3>

          <div className="flex items-start gap-3 mb-6">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: config.primaryColor }}>
              我
            </div>
            <div className="flex-1">
              <div className="px-4 py-2.5 text-sm rounded-lg" style={{
                borderRadius: radius,
                background: colors.background.card,
                border: `1px solid ${colors.border.light}`,
                color: colors.text.tertiary,
              }}>
                写下你的评论...
              </div>
            </div>
          </div>

          {[
            { name: '李明', time: '2小时前', content: '非常实用的盘点，Figma 的 AI 功能确实好用，推荐大家试试！', likes: '28' },
            { name: '小王', time: '5小时前', content: 'Penpot 最近在关注，开源替代方案越来越成熟了。', likes: '15' },
            { name: '设计师阿花', time: '1天前', content: 'ProtoPie 的交互引擎太强大了，做高保真原型首选。', likes: '42' },
          ].map((comment, i) => (
            <div key={i} className="flex gap-3 py-4" style={{
              borderBottom: i < 2 ? `1px solid ${colors.border.light}` : 'none',
            }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: withOpacity(config.primaryColor, 0.3) }}>
                {comment.name.substring(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium" style={{ color: colors.text.primary, fontWeight: fontWeight.medium }}>{comment.name}</span>
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{comment.time}</span>
                </div>
                <div className="text-sm mb-1.5" style={{ color: colors.text.primary, lineHeight }}>{comment.content}</div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{comment.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

/* ==================== PC 作者主页 ==================== */

export function ContentProfileDesktop({ config }: { config: StyleConfig }) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize

  const articles = [
    { title: '2024 年度最佳设计工具盘点：提升效率的 10 款神器', date: '2024-12-20', views: '2.3万', tag: '设计' },
    { title: 'Figma AI 功能深度评测：设计工具的未来', date: '2024-12-15', views: '1.8万', tag: '科技' },
    { title: '从零开始学 UI 设计：零基础入门指南', date: '2024-12-10', views: '3.5万', tag: '设计' },
    { title: '设计师必备的 10 个资源网站', date: '2024-12-05', views: '1.2万', tag: '资源' },
    { title: '2025 年设计趋势预测：AI 与人性化设计的融合', date: '2024-11-28', views: '4.1万', tag: '设计' },
    { title: 'Figma 插件推荐：提升设计效率的 10 个必备插件', date: '2024-11-20', views: '1.5万', tag: '工具' },
  ]

  return (
    <div className="flex gap-8 px-8 py-6 mx-auto" style={{ maxWidth: 1200, background: config.backgroundColor, minHeight: 'calc(100vh - 120px)' }}>
      {/* 左侧 - 作者信息卡片 */}
      <aside className="w-64 shrink-0">
        <div className="sticky top-6 p-6 rounded-lg border text-center" style={{ borderColor: colors.border.light }}>
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4" style={{ background: config.primaryColor }}>
            设
          </div>
          <h2 className="text-lg font-bold mb-1" style={{ color: colors.text.primary, fontWeight: fontWeight.bold }}>设计之声</h2>
          <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>资深 UI/UX 设计师</p>

          <div className="flex justify-around mb-4 py-3" style={{ borderTop: `1px solid ${colors.border.light}`, borderBottom: `1px solid ${colors.border.light}` }}>
            <div className="text-center">
              <div className="font-bold" style={{ color: colors.text.primary }}>128</div>
              <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>文章</div>
            </div>
            <div className="text-center">
              <div className="font-bold" style={{ color: colors.text.primary }}>3.2万</div>
              <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>关注</div>
            </div>
            <div className="text-center">
              <div className="font-bold" style={{ color: colors.text.primary }}>15.6万</div>
              <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>获赞</div>
            </div>
          </div>

          <button className="w-full py-2 text-sm font-medium rounded-full cursor-pointer" style={{
            background: config.primaryColor,
            color: colors.white,
          }}>
            + 关注
          </button>

          <div className="mt-4 text-left">
            <div className="text-xs font-medium mb-2" style={{ color: colors.text.tertiary }}>简介</div>
            <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
              10 年从业经验。分享设计思考、工具评测和行业洞察。著有《设计思维实践》一书。
            </p>
          </div>
        </div>
      </aside>

      {/* 右侧 - 文章列表 */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center gap-6 mb-5" style={{ borderBottom: `1px solid ${colors.border.light}` }}>
          {['文章', '专栏', '简介'].map((tab, i) => (
            <button key={i} className="py-3 text-sm font-medium cursor-pointer" style={{
              color: i === 0 ? config.primaryColor : colors.text.tertiary,
              borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : '2px solid transparent',
              marginBottom: '-1px',
            }}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {articles.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg border cursor-pointer transition-shadow hover:shadow-sm" style={{ borderColor: colors.border.light }}>
              <div className="w-32 h-24 shrink-0 overflow-hidden rounded" style={{ borderRadius: radius }}>
                <Placeholder width={128} height={96} type="product" text={item.title.length > 10 ? item.title.slice(0, 10) + '..' : item.title} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-1.5 line-clamp-1" style={{
                    color: colors.text.primary,
                    fontSize: bodyFontSize,
                    fontWeight: fontWeight.medium,
                  }}>
                    {item.title}
                  </div>
                  <span className="inline-block px-1.5 py-0.5 text-[11px] font-medium rounded" style={{
                    background: withOpacity(config.primaryColor, 0.1),
                    color: config.primaryColor,
                  }}>
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.date}</span>
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.views} 阅读</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
