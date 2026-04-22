import React from 'react'

interface PlaceholderProps {
  width?: number
  height?: number
  type?: 'product' | 'banner' | 'avatar' | 'brand' | 'icon'
  text?: string
  variant?: 'default' | 'gradient' | 'pattern'
}

export function Placeholder({ 
  width = 200, 
  height = 200, 
  type = 'product',
  text,
  variant = 'default'
}: PlaceholderProps) {
  switch (type) {
    case 'product':
      return <ProductPlaceholder width={width} height={height} text={text} variant={variant} />
    case 'banner':
      return <BannerPlaceholder width={width} height={height} text={text} />
    case 'avatar':
      return <AvatarPlaceholder size={width} text={text} />
    case 'brand':
      return <BrandPlaceholder width={width} height={height} text={text} />
    case 'icon':
      return <IconPlaceholder size={width} text={text} />
    default:
      return <ProductPlaceholder width={width} height={height} text={text} variant={variant} />
  }
}

// 商品占位图
function ProductPlaceholder({ width, height, text = '商品图', variant }: { width: number; height: number; text?: string; variant: string }) {
  // 计算相对尺寸，确保在任何容器中都居中且比例协调
  const scale = Math.min(width, height) / 100 // 以 100px 为基准，让图形更大
  const centerX = width / 2
  const centerY = height / 2
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${width}-${height}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F5F7FA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E4E9F0', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* 背景 - 单层渐变 */}
      <rect width="100%" height="100%" fill={`url(#grad-${width}-${height})`} />
      
      {/* 商品轮廓 - 极简设计，只保留圆形和横线 */}
      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* 顶部圆形装饰 - 代表产品主体 */}
        <circle 
          cx="0" 
          cy={-12 * scale} 
          r={28 * scale} 
          fill="#E2E8F0" 
          opacity="0.6" 
        />
        {/* 底部横线装饰 - 代表产品信息 */}
        <rect 
          x={-32 * scale} 
          y={18 * scale} 
          width={64 * scale} 
          height={6 * scale} 
          rx={3 * scale} 
          fill="#E2E8F0" 
          opacity="0.5" 
        />
        <rect 
          x={-22 * scale} 
          y={31 * scale} 
          width={44 * scale} 
          height={6 * scale} 
          rx={3 * scale} 
          fill="#E2E8F0" 
          opacity="0.5" 
        />
      </g>
    </svg>
  )
}

// 轮播图占位图
function BannerPlaceholder({ width, height, text = '活动轮播图' }: { width: number; height: number; text?: string }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="banner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667EEA', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#764BA2', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#banner-grad)" />
      {/* 装饰圆圈 */}
      <circle cx={width * 0.2} cy={height * 0.3} r={height * 0.4} fill="#FFFFFF" opacity="0.1" />
      <circle cx={width * 0.85} cy={height * 0.7} r={height * 0.3} fill="#FFFFFF" opacity="0.08" />
      {/* 文本内容 */}
      <text 
        x="50%" 
        y="40%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize={Math.max(14, width / 20)} 
        fill="#FFFFFF"
        fontWeight="bold"
      >
        {text}
      </text>
      <text 
        x="50%" 
        y="60%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize={Math.max(10, width / 30)} 
        fill="#FFFFFF"
        opacity="0.9"
      >
        精选好物 · 限时特惠
      </text>
    </svg>
  )
}

// 头像占位图
function AvatarPlaceholder({ size, text = '头像' }: { size: number; text?: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50%" cy="50%" r="50%" fill="#E5E7EB" />
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle cy="-8" r={size * 0.2} fill="#D1D5DB" />
        <path d={`M -${size * 0.3} ${size * 0.15} Q 0 ${size * 0.35} ${size * 0.3} ${size * 0.15}`} 
              fill="none" 
              stroke="#D1D5DB" 
              strokeWidth={size * 0.05} 
              strokeLinecap="round" />
      </g>
    </svg>
  )
}

// 品牌Logo占位图
function BrandPlaceholder({ width, height, text = 'BRAND' }: { width: number; height: number; text?: string }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F9FAFB" rx="4" />
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize={Math.max(10, width / 5)} 
        fill="#9CA3AF"
        fontWeight="600"
        letterSpacing="1"
      >
        {text.toUpperCase()}
      </text>
    </svg>
  )
}

// 图标占位图
function IconPlaceholder({ size, text }: { size: number; text?: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F3F4F6" rx={size * 0.15} />
      {text && (
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontSize={size * 0.5} 
          fill="#6B7280"
        >
          {text}
        </text>
      )}
    </svg>
  )
}
