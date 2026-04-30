import type { StyleConfig } from '../../types/config'
import { generateComponentTokens } from '../../utils/tokenResolver'

interface ProductCardProps {
  config: StyleConfig
  image: React.ReactNode
  productName: string
  price: string | number
  originalPrice?: string | number
  tag?: string
  sales?: string
  onClick?: () => void
}

/**
 * ProductCard - 商品卡片组件
 * 
 * 用途：展示商品信息（名称、价格、标签、图片）
 * 
 * 配置映射：
 * - 商品名称 → tokens.typography.bodySize, tokens.colors.textPrimary
 * - 价格 → tokens.typography.bodySize, tokens.colors.primary, bold
 * - 原价 → tokens.typography.bodySize, tokens.colors.textSecondary, line-through
 * - 标签 → tokens.typography.bodySize, tokens.colors.primary, primaryLight 背景
 * - 卡片容器 → tokens.shape.cornerRadius, tokens.colors.backgroundColor
 */
export function ProductCard({ 
  config,
  image,
  productName,
  price,
  originalPrice,
  tag,
  sales,
  onClick
}: ProductCardProps) {
  const tokens = generateComponentTokens(config)

  return (
    <div 
      onClick={onClick}
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      style={{
        borderRadius: tokens.card.borderRadius,
        backgroundColor: tokens.card.backgroundColor,
        boxShadow: tokens.card.boxShadow,
        border: tokens.card.border,
      }}
    >
      {/* 商品图片 */}
      <div className="w-full">
        {image}
      </div>
      
      {/* 商品信息 */}
      <div className="p-3">
        {/* 商品名称 */}
        <div 
          className="font-medium mb-2 line-clamp-2"
          style={{ 
            color: tokens.colors.textPrimary, 
            fontSize: tokens.typography.bodySize, 
            lineHeight: tokens.typography.lineHeight 
          }}
        >
          {productName}
        </div>
        
        {/* 价格和标签 */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {/* 现价 */}
            <span 
              className="font-bold"
              style={{ 
                color: tokens.colors.primary, 
                fontSize: tokens.typography.bodySize 
              }}
            >
              ¥{price}
            </span>
            
            {/* 原价 */}
            {originalPrice && (
              <span 
                className="line-through"
                style={{ 
                  color: tokens.colors.textSecondary, 
                  fontSize: tokens.typography.bodySize,
                  lineHeight: tokens.typography.lineHeight 
                }}
              >
                ¥{originalPrice}
              </span>
            )}
          </div>
          
          {/* 标签 */}
          {tag && (
            <span 
              className="px-2 py-0.5 text-xs font-medium rounded"
              style={{
                backgroundColor: `${tokens.colors.primary}1A`, // 10% opacity
                color: tokens.colors.primary,
              }}
            >
              {tag}
            </span>
          )}
        </div>
        
        {/* 销量 */}
        {sales && (
          <div 
            className="mt-1"
            style={{ 
              fontSize: tokens.typography.bodySize, 
              lineHeight: tokens.typography.lineHeight, 
              color: tokens.colors.textSecondary 
            }}
          >
            {sales}人付款
          </div>
        )}
      </div>
    </div>
  )
}
