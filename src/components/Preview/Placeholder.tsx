/**
 * 占位图组件
 * 使用占位图服务输出真实图片（PNG），替代内联 SVG
 * 服务地址：/placeholder?width=X&height=Y&bg=...&format=png
 */

import React, { useState } from 'react'
import { colors, fontSize } from '../../tokens'

interface PlaceholderProps {
  width?: number
  height?: number
  type?: 'product' | 'banner' | 'avatar' | 'brand' | 'icon'
  text?: string
  variant?: 'default' | 'gradient' | 'pattern'
}

/** 根据类型生成占位图服务 URL */
function buildPlaceholderUrl(width: number, height: number, type: string, text?: string): string {
  const params = new URLSearchParams()
  params.set('width', String(width))
  params.set('height', String(height))
  params.set('format', 'png')

  // 移除 border 以避免边框干扰视觉
  params.set('borderWidth', '0')

  switch (type) {
    case 'product': {
      params.set('bg', '#F5F5F5')
      params.set('text', '#999999')
      params.set('content', text || '商品图')
      params.set('fontSize', String(Math.min(Math.max(Math.round(width / 12), 14), 32)))
      params.set('radius', String(Math.round(Math.min(width, height) * 0.04)))
      break
    }
    case 'banner': {
      params.set('bg', '#667EEA')
      params.set('text', '#FFFFFF')
      params.set('content', text || '活动轮播图')
      params.set('fontSize', String(Math.min(Math.max(Math.round(width / 20), 18), 48)))
      params.set('radius', '0')
      break
    }
    case 'avatar': {
      params.set('bg', '#E5E7EB')
      params.set('text', '#9CA3AF')
      params.set('content', text || '头像')
      params.set('fontSize', String(Math.min(Math.max(Math.round(width / 3), 12), 24)))
      params.set('radius', '50%')
      break
    }
    case 'brand': {
      params.set('bg', '#F9FAFB')
      params.set('text', '#9CA3AF')
      params.set('content', text || 'BRAND')
      params.set('fontSize', String(Math.min(Math.max(Math.round(width / 4), 10), 20)))
      params.set('radius', '4')
      break
    }
    case 'icon': {
      params.set('bg', '#F3F4F6')
      params.set('text', '#9CA3AF')
      params.set('content', text || 'icon')
      params.set('fontSize', String(Math.min(Math.max(Math.round(width / 2), 12), 24)))
      params.set('radius', String(Math.round(Math.max(width * 0.15, 4))))
      break
    }
    default: {
      params.set('bg', '#F5F5F5')
      params.set('text', '#666666')
      params.set('content', text || '占位图')
      params.set('fontSize', '14')
      params.set('radius', '4')
    }
  }

  return `/placeholder?${params.toString()}`
}

/** 当图片加载失败时的回退占位 */
function PlaceholderFallback({ width, height, type }: { width: number; height: number; type: string }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill={colors.border.light} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={Math.max(12, width / 10)}
        fill={colors.text.tertiary}
      >
        {type}
      </text>
    </svg>
  )
}

export function Placeholder({
  width = 200,
  height = 200,
  type = 'product',
  text,
}: PlaceholderProps) {
  const [error, setError] = useState(false)
  const imgUrl = buildPlaceholderUrl(width, height, type, text)

  if (error) {
    return <PlaceholderFallback width={width} height={height} type={type} />
  }

  return (
    <img
      src={imgUrl}
      alt={text || type}
      width={width}
      height={height}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}
