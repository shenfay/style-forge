/**
 * 移动端默认页面模板（占位）
 */

import type { StyleConfig } from '../../../types/config'
import { generateComponentTokens } from '../../../utils/design-tokens'

interface DefaultPageProps {
  config: StyleConfig
}

export function DefaultPage({ config }: DefaultPageProps) {
  const tokens = generateComponentTokens(config)

  return (
    <div className="flex-1 flex items-center justify-center p-6" style={{ background: config.backgroundColor }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: tokens.colors.textPrimary }}>页面开发中</h2>
        <p className="text-sm" style={{ color: tokens.colors.textSecondary }}>该模板正在开发中...</p>
      </div>
    </div>
  )
}
