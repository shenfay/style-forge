/**
 * 移动端表单页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { Card } from '../../UI/Card'
import { colors, getBorderRadius } from '../../../utils/tokenResolver'

interface FormPageProps {
  config: StyleConfig
}

export function FormPage({ config }: FormPageProps) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="表单" showBack />

      <div className="px-6 py-4 space-y-4">
        {/* 输入框 */}
        <Card config={config} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>姓名</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 text-sm border outline-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
              }}
              placeholder="请输入姓名"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>邮箱</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 text-sm border outline-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
              }}
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>描述</label>
            <textarea 
              className="w-full px-3 py-2 text-sm border outline-none resize-none"
              style={{ 
                borderRadius: radius,
                borderColor: colors.border.light,
                minHeight: '100px',
              }}
              placeholder="请输入描述"
            />
          </div>
        </Card>

        {/* 提交按钮 */}
        <button className="w-full py-3 text-sm font-medium text-white btn-interactive" style={{
          borderRadius: radius,
          background: config.buttonStyle === 'gradient' 
            ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
            : config.primaryColor,
        }}>
          提交
        </button>
      </div>
    </div>
  )
}
