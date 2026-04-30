/**
 * 移动端消息列表页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { colors, generateComponentTokens } from '../../../utils/tokenResolver'

interface MessagesPageProps {
  config: StyleConfig
}

export function MessagesPage({ config }: MessagesPageProps) {
  const tokens = generateComponentTokens(config)
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="消息" />

      {/* 消息分类Tab */}
      <div className="flex border-b border-gray-200">
        {['全部', '未读', '群聊'].map((tab, i) => (
          <button key={i} className="flex-1 py-3 text-sm font-medium" style={{
            color: i === 0 ? config.primaryColor : '#666666',
            borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : 'none',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* 消息列表 */}
      <div className="divide-y divide-gray-100">
        {[
          { name: '张三', msg: '你好，最近怎么样？', time: '10:30', unread: 2 },
          { name: '李四', msg: '明天的会议几点开始？', time: '09:15', unread: 0 },
          { name: '产品交流群', msg: '王五: 这个方案不错', time: '昨天', unread: 5 },
          { name: '赵六', msg: '收到，谢谢！', time: '昨天', unread: 0 },
          { name: '技术交流群', msg: '系统通知: 版本更新', time: '周一', unread: 0 },
        ].map((chat, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              {chat.name.includes('群') ? '👥' : '👤'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium" style={{ color: colors.text.primary }}>{chat.name}</span>
                <span className="text-xs" style={{ color: colors.text.tertiary }}>{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs truncate" style={{ color: colors.text.secondary }}>{chat.msg}</span>
                {chat.unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs text-white rounded-full" style={{
                    background: config.primaryColor,
                    minWidth: '18px',
                    textAlign: 'center',
                  }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部导航 */}
      <div className="px-6 py-3" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex justify-around">
          {[
            { icon: '🏠', label: '首页' },
            { icon: '🔍', label: '发现' },
            { icon: '💬', label: '消息' },
            { icon: '👤', label: '我的' },
          ].map((tab, i) => (
            <button key={i} className="flex flex-col items-center gap-1">
              <span className="text-lg">{tab.icon}</span>
              <span style={{ fontSize: bodyFontSize, lineHeight, color: i === 2 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
