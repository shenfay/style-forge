/**
 * 折叠面板组件
 * 用于可收起/展开的配置项
 */

import React, { useState, useRef, useEffect } from 'react'
import { colors, fontSize } from '../../../../tokens'

interface CollapsePanelProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function CollapsePanel({ title, children, defaultExpanded = false }: CollapsePanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [height, setHeight] = useState<number | undefined>(defaultExpanded ? undefined : 0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    } else if (!expanded) {
      setHeight(0)
    }
  }, [expanded])

  const handleTransitionEnd = () => {
    if (expanded) {
      setHeight(undefined) // 动画结束后移除固定高度
    }
  }

  return (
    <div className="border-b" style={{ borderColor: colors.border.light }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-2.5 cursor-pointer"
        style={{ color: colors.text.primary }}
      >
        <span style={{ fontSize: fontSize.base, fontWeight: 500 }}>{title}</span>
        <svg
          className="w-4 h-4 transition-transform duration-200"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            color: colors.text.tertiary,
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          height: height !== undefined ? `${height}px` : 'auto',
          overflow: 'hidden',
          transition: 'height 0.2s ease-in-out, opacity 0.2s ease-in-out',
          opacity: expanded ? 1 : 0,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="pb-4 space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
