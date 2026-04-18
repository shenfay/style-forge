import { useState } from 'react'
import type { StyleConfig } from '../../types/config'
import { radiusMap } from '../../types/config'

const riskData = {
  danger: { color: '#DC2626', bg: '#FEF2F2', text: '不推荐食用', reason: '含多种添加剂与高钠成分' },
  warning: { color: '#D97706', bg: '#FFFBEB', text: '适量食用', reason: '部分成分需留意控制摄入' },
  safe: { color: '#16A34A', bg: '#F0FDF4', text: '推荐食用', reason: '成分天然,营养丰富' },
}

export function ScanResultPreview({ config }: { config: StyleConfig }) {
  const [risk, setRisk] = useState<'danger' | 'warning' | 'safe'>('danger')
  const data = riskData[risk]
  const radius = radiusMap[config.cornerRadius]

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      {/* 状态栏 */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-[11px]" style={{ color: '#999999' }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* 标题栏 */}
      <div className="flex items-center px-6 py-3" style={{
        borderBottom: config.titleBarStyle === 'white-underline' ? '1px solid #E5E5E5' : 'none',
        background: config.titleBarStyle === 'colored-bg' ? config.primaryColor : config.titleBarStyle === 'frosted-glass' ? 'rgba(255,255,255,0.8)' : 'transparent',
        backdropFilter: config.titleBarStyle === 'frosted-glass' ? 'blur(10px)' : 'none',
      }}>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ 
          color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : config.primaryColor,
          background: config.titleBarStyle === 'frosted-glass' ? 'rgba(255,255,255,0.6)' : 'transparent',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="flex-1 text-center text-[16px] font-semibold" style={{ color: config.titleBarStyle === 'colored-bg' ? '#FFFFFF' : '#1A1A1A' }}>扫描结果</span>
        <div className="w-9" />
      </div>

      {/* 风险切换器 */}
      <div className="flex justify-center py-5 px-6">
        {config.switcherStyle === 'underline' ? (
          <div className="flex gap-6">
            {(['danger', 'warning', 'safe'] as const).map((r) => {
              const isActive = risk === r
              const d = riskData[r]
              return (
                <button key={r} onClick={() => setRisk(r)} className="relative pb-2 text-[13px] font-medium transition-all" style={{ color: isActive ? d.color : '#999999' }}>
                  {r === 'danger' ? '红灯' : r === 'warning' ? '黄灯' : '绿灯'}
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: d.color }} />}
                </button>
              )
            })}
          </div>
        ) : config.switcherStyle === 'pill' ? (
          <div className="flex rounded-full p-1" style={{ background: config.primaryColor + '15' }}>
            {(['danger', 'warning', 'safe'] as const).map((r) => {
              const isActive = risk === r
              const d = riskData[r]
              return (
                <button key={r} onClick={() => setRisk(r)} className="px-5 py-2 rounded-full text-[12px] font-medium transition-all" style={{
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? d.color : '#999999',
                  boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                }}>
                  {r === 'danger' ? '红灯' : r === 'warning' ? '黄灯' : '绿灯'}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex gap-3">
            {(['danger', 'warning', 'safe'] as const).map((r) => {
              const isActive = risk === r
              const d = riskData[r]
              return (
                <button key={r} onClick={() => setRisk(r)} className="px-5 py-2 text-[12px] font-medium transition-all" style={{
                  borderRadius: radius,
                  background: isActive ? d.bg : 'transparent',
                  color: isActive ? d.color : '#999999',
                  border: isActive ? 'none' : `1px solid #E5E5E5`,
                }}>
                  {r === 'danger' ? '红灯' : r === 'warning' ? '黄灯' : '绿灯'}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 风险结论 */}
      <div className="px-6 py-5">
        <div className="text-[32px] font-bold mb-3" style={{ color: data.color }}>
          {risk === 'danger' && '×'}{risk === 'warning' && '!'}{risk === 'safe' && '✓'}
        </div>
        <div className="text-[22px] font-bold mb-2" style={{ color: data.color }}>
          {data.text}
        </div>
        <div className="text-sm mb-2" style={{ color: '#666666' }}>{data.reason}</div>
        <div className="text-xs leading-relaxed" style={{ color: '#999999' }}>
          {risk === 'danger' ? '建议减少食用频率,优先选择天然食材' : risk === 'warning' ? '一般人群可少量食用,特殊人群建议避开' : '适合日常食用,提供优质营养'}
        </div>
      </div>

      {/* 分割线 */}
      <div className="mx-6" style={{ borderTop: '1px solid #E5E5E5' }} />

      {/* 产品信息 */}
      <div className="px-6 py-5">
        <div className="text-[14px] font-semibold mb-3" style={{ color: '#1A1A1A' }}>康师傅红烧牛肉面</div>
        <div className="text-[12px] space-y-2" style={{ color: '#999999' }}>
          <div className="flex justify-between"><span>净含量</span><span style={{ color: '#666666' }}>105g</span></div>
          <div className="flex justify-between"><span>保质期</span><span style={{ color: '#666666' }}>6个月</span></div>
          <div className="flex justify-between"><span>条形码</span><span className="font-mono text-[11px]" style={{ color: '#666666' }}>6922540280373</span></div>
        </div>
      </div>

      {/* 分割线 */}
      <div className="mx-6" style={{ borderTop: '1px solid #E5E5E5' }} />

      {/* 成分列表 */}
      <div className="px-6 py-5 pb-28">
        <div className="text-[13px] font-semibold mb-4 tracking-wide uppercase" style={{ color: '#1A1A1A' }}>成分分析</div>
        <div className="space-y-4">
          {[
            { name: '谷氨酸钠', desc: '增味剂,过量可能引起头痛', color: '#DC2626' },
            { name: '碳酸钠', desc: '酸度调节剂,需控制摄入', color: '#D97706' },
            { name: '小麦粉', desc: '主要原料,提供优质碳水', color: '#16A34A' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <div className="text-[14px] font-medium mb-1" style={{ color: '#1A1A1A' }}>{item.name}</div>
                <div className="text-[12px]" style={{ color: '#999999' }}>{item.desc}</div>
              </div>
              <div className="px-3 py-1 text-[11px] font-semibold" style={{
                borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
                background: config.badgeStyle === 'rounded' ? `${item.color}15` : 'transparent',
                color: item.color,
              }}>
                {item.color === '#DC2626' ? '红灯' : item.color === '#D97706' ? '黄灯' : '绿灯'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] px-6 py-5" style={{ background: config.backgroundColor, borderTop: '1px solid #E5E5E5' }}>
        <div className="flex gap-3">
          <button className="flex-1 py-4 text-[13px] font-medium transition-all" style={{
            borderRadius: radius,
            border: config.buttonStyle === 'wireframe' ? `1px solid #E5E5E5` : 'none',
            color: config.buttonStyle === 'wireframe' ? '#666666' : config.buttonStyle === 'solid' ? '#FFFFFF' : '#666666',
            background: config.buttonStyle === 'gradient' ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` : config.buttonStyle === 'solid' ? config.primaryColor : 'transparent',
          }}>收藏</button>
          <button className="flex-1 py-4 text-[13px] font-medium text-white transition-all" style={{
            borderRadius: radius,
            background: config.buttonStyle === 'gradient' ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}DD)` : config.primaryColor,
          }}>确认食用</button>
        </div>
      </div>
    </div>
  )
}
