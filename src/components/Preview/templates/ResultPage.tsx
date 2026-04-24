/**
 * 移动端结果页模板
 */

import type { StyleConfig } from '../../../types/config'
import { generateComponentTokens } from '../../../utils/design-tokens'

interface ResultPageProps {
  config: StyleConfig
}

export function ResultPage({ config }: ResultPageProps) {
  const tokens = generateComponentTokens(config)

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: config.backgroundColor }}>
      <div className="text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: config.primaryColor }}>操作成功</h2>
        <p className="text-sm" style={{ color: tokens.colors.textSecondary }}>您的操作已完成</p>
      </div>
    </div>
  )
}
