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
import { ProductCard } from '../ProductCard'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/tokenResolver'

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
          <div className="flex items-center justify-between py-4" style={{
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
              <div className="relative" style={{
                paddingLeft: config.titleStyle === 'left-accent' ? '12px' : '0',
                paddingRight: config.titleStyle === 'right-accent' ? '12px' : '0',
                paddingBottom: config.titleStyle === 'bottom-accent' ? '8px' : '0',
              }}>
                {config.titleStyle === 'left-accent' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
                )}
                {config.titleStyle === 'right-accent' && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded" style={{ background: config.primaryColor }} />
                )}
                {config.titleStyle === 'bottom-accent' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ background: config.primaryColor }} />
                )}
                <div className="text-base font-bold" style={{ 
                  color: config.titleColor,
                  fontSize: config.titleSize === 'small' ? '14px' : config.titleSize === 'medium' ? '16px' : '18px',
                  fontWeight: config.titleWeight === 'normal' ? 400 : config.titleWeight === 'medium' ? 500 : 700,
                }}>推荐搭配</div>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { name: 'AirPods Pro 2', price: 1899, originalPrice: 2299, sales: '8563' },
                { name: '苹果磁吸充电', price: 329, originalPrice: 399, sales: '1.2万' },
                { name: '运动表带', price: 379, originalPrice: 499, sales: '6521' },
              ].map((item, i) => (
                <div key={i} className="shrink-0 w-32">
                  <ProductCard
                    config={config}
                    image={<Placeholder width={128} height={128} type="product" text={item.name} />}
                    productName={item.name}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    sales={item.sales}
                  />
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
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
          </svg>
          <span style={{ fontSize: fontSize.xs, color: colors.text.tertiary }}>客服</span>
        </button>

        {/* 收藏 */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span style={{ fontSize: fontSize.xs, color: colors.text.tertiary }}>收藏</span>
        </button>

        {/* 购物车 */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1.5"/>
            <circle cx="20" cy="21" r="1.5"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
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
