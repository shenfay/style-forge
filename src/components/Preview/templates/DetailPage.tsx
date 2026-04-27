/**
 * 移动端商品详情页
 * 完整电商详情页：商品图、价格、SKU选择、详情、评价、推荐、底部操作
 * 所有样式通过全局配置与设计令牌驱动
 */

import { Fragment } from 'react'
import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { Card } from '../../UI/Card'
import { Placeholder } from '../Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface DetailPageProps {
  config: StyleConfig
}

export function DetailPage({ config }: DetailPageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <Fragment>
      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
        <StatusBar />
        <NavBar config={config} title="商品详情" showBack />

        {/* 1. 商品轮播图 */}
        <div className="relative">
          <Placeholder width={375} height={375} type="product" text="商品图" />
          <div className="absolute bottom-3 right-3 px-2 py-0.5 text-xs text-white rounded" style={{
            background: 'rgba(0,0,0,0.5)',
            fontSize: fontSize.xs,
          }}>
            1/5
          </div>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* 2. 价格区 */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold" style={{ color: config.primaryColor, fontSize: fontSize['3xl'], fontWeight: fontWeight.bold }}>
                ¥2,999
              </span>
              <span className="text-sm line-through" style={{ color: colors.text.tertiary, fontSize: fontSize.sm }}>
                ¥3,999
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{
                background: withOpacity(config.primaryColor, 0.1),
                color: config.primaryColor,
                fontSize: fontSize.xs,
              }}>
                立省¥1,000
              </span>
            </div>
            <div className="flex justify-between" style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>
              <span>已售 1.2万件</span>
              <span>好评率 98%</span>
            </div>
          </div>

          {/* 3. 商品标题 */}
          <div>
            <h1 className="text-base font-medium leading-relaxed" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>
              Apple Watch Series 9 智能手表 GPS 版 45毫米 午夜色 运动型表带
            </h1>
          </div>

          {/* 4. 促销标签 */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: '满199减30', type: 'promo' },
              { label: '领券立减50', type: 'coupon' },
              { label: '6期免息', type: 'installment' },
            ].map((tag, i) => (
              <span key={i} className="px-2 py-0.5 text-xs" style={{
                borderRadius: config.badgeStyle === 'rounded' ? '999px' : '4px',
                background: withOpacity(config.primaryColor, 0.08),
                color: config.primaryColor,
                fontSize: fontSize.xs,
              }}>
                {tag.label}
              </span>
            ))}
          </div>

          {/* 5. 配送信息 */}
          <div className="flex items-center justify-between py-3" style={{
            borderTop: `1px solid ${colors.border.light}`,
            borderBottom: `1px solid ${colors.border.light}`,
          }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>送至</span>
                <span style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>北京</span>
              </div>
              <div className="flex items-center gap-1">
                <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>运费</span>
                <span style={{ color: config.primaryColor, fontSize: bodyFontSize, lineHeight }}>免运费</span>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          {/* 6. SKU 选择 */}
          <Card config={config} className="p-4">
            <div className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm font-medium mb-1" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>已选</div>
                <div style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>午夜色 / 45mm</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Card>

          {/* 7. 商品详情 Tab */}
          <Card config={config}>
            <div className="flex border-b" style={{ borderColor: colors.border.light }}>
              {['商品介绍', '规格参数', '售后保障'].map((tab, i) => (
                <button key={i} className="flex-1 py-3 text-center text-sm font-medium cursor-pointer" style={{
                  color: i === 0 ? config.primaryColor : colors.text.tertiary,
                  fontSize: bodyFontSize,
                  lineHeight,
                  borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : '2px solid transparent',
                }}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 space-y-3">
              <p style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                Apple Watch Series 9 配备 S9 芯片，支持全天候视网膜显示屏，带来更快的处理和更流畅的交互体验。
              </p>
              <p style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>
                支持血氧检测、心电图、睡眠监测等健康功能，满足日常运动与健康管理需求。
              </p>
            </div>
          </Card>

          {/* 8. 用户评价 */}
          <Card config={config} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>用户评价</span>
                <span className="text-sm font-bold" style={{ color: '#F59E0B', fontSize: bodyFontSize, fontWeight: fontWeight.bold }}>4.8</span>
              </div>
              <button className="cursor-pointer" style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>查看全部 ›</button>
            </div>
            <div className="space-y-3">
              {[
                { name: '张***', content: '非常好用，续航持久，推荐购买！', rating: 5, spec: '午夜色/45mm' },
                { name: '李***', content: '包装精美，外观时尚，功能强大。', rating: 5, spec: '星光色/41mm' },
                { name: '王***', content: '物流很快，第二天就到了，好评。', rating: 4, spec: '午夜色/45mm' },
              ].map((review, i) => (
                <div key={i} className="pb-3" style={{ borderBottom: i < 2 ? `1px solid ${colors.border.light}` : 'none' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium" style={{ color: colors.text.primary, fontSize: fontSize.xs }}>{review.name}</span>
                    <span className="text-xs" style={{ color: colors.text.tertiary }}>{'⭐'.repeat(review.rating)}</span>
                    <span className="text-xs" style={{ color: colors.text.tertiary }}>{review.spec}</span>
                  </div>
                  <p style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>{review.content}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* 9. 推荐商品 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>推荐搭配</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { name: 'AirPods Pro 2', price: 1899 },
                { name: '苹果磁吸充电', price: 329 },
                { name: '运动表带', price: 379 },
              ].map((item, i) => (
                <div key={i} className="shrink-0 w-32">
                  <div style={{ borderRadius: radius, overflow: 'hidden' }}>
                    <Placeholder width={128} height={128} type="product" text={item.name} />
                  </div>
                  <div className="mt-2">
                    <div className="text-xs truncate mb-1" style={{ color: colors.text.primary, fontSize: fontSize.xs }}>{item.name}</div>
                    <div className="text-xs font-bold" style={{ color: config.primaryColor, fontSize: fontSize.xs, fontWeight: fontWeight.bold }}>¥{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部安全区 */}
        <div className="h-24" />
      </div>

      {/* 底部操作栏 - 始终固定 */}
      <div className="shrink-0 flex items-center px-4 py-2" style={{ 
        background: colors.white,
        borderTop: `1px solid ${colors.border.light}`,
      }}>
        {/* 客服 */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9"/>
          </svg>
          <span style={{ fontSize: fontSize.xs, color: colors.text.tertiary }}>客服</span>
        </button>

        {/* 收藏 */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <span style={{ fontSize: fontSize.xs, color: colors.text.tertiary }}>收藏</span>
        </button>

        {/* 购物车 */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span style={{ fontSize: fontSize.xs, color: colors.text.tertiary }}>购物车</span>
        </button>

        {/* 加入购物车 */}
        <button className="flex-1 ml-2 py-3 text-sm font-medium text-center cursor-pointer" style={{
          borderRadius: radius,
          background: withOpacity(config.primaryColor, 0.85),
          color: colors.white,
          fontSize: bodyFontSize,
        }}>
          加入购物车
        </button>

        {/* 立即购买 */}
        <button className="flex-1 ml-2 py-3 text-sm font-medium text-center cursor-pointer" style={{
          borderRadius: radius,
          background: config.buttonStyle === 'gradient'
            ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`
            : config.primaryColor,
          color: colors.white,
          fontSize: bodyFontSize,
        }}>
          立即购买
        </button>
      </div>
    </Fragment>
  )
}
