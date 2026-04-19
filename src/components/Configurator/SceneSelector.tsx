import type { SceneType, DeviceType, PageType } from '../../types/template'

interface SceneSelectorProps {
  selectedScene: SceneType
  selectedDevice: DeviceType
  selectedTemplate: PageType
  onSceneChange: (scene: SceneType) => void
  onDeviceChange: (device: DeviceType) => void
  onTemplateChange: (template: PageType) => void
}

const scenes: Array<{ id: SceneType; name: string; icon: string; description: string }> = [
  { id: 'food', name: '食品健康', icon: '🍎', description: '扫码结果、成分分析' },
  { id: 'ecommerce', name: '电商零售', icon: '🛒', description: '商品详情、购物车' },
  { id: 'saas', name: 'SaaS 工具', icon: '📊', description: '数据看板、设置页' },
  { id: 'media', name: '内容媒体', icon: '📰', description: '文章详情、列表页' },
  { id: 'social', name: '社交社区', icon: '💬', description: '动态流、个人主页' },
  { id: 'finance', name: '金融服务', icon: '💰', description: '交易记录、账户' },
]

const deviceOptions: Array<{ id: DeviceType; name: string; icon: string }> = [
  { id: 'mobile', name: '移动端', icon: '📱' },
  { id: 'desktop', name: 'PC 端', icon: '💻' },
]

export function SceneSelector({
  selectedScene,
  selectedDevice,
  selectedTemplate,
  onSceneChange,
  onDeviceChange,
  onTemplateChange,
}: SceneSelectorProps) {
  return (
    <div className="space-y-4">
      {/* 场景选择 */}
      <ConfigSection title="选择场景">
        <div className="grid grid-cols-3 gap-2">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-left ${
                selectedScene === scene.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="text-2xl">{scene.icon}</span>
              <span className="text-xs font-medium">{scene.name}</span>
              <span className="text-[10px] text-gray-500">{scene.description}</span>
            </button>
          ))}
        </div>
      </ConfigSection>

      {/* 设备选择 */}
      <ConfigSection title="设备类型">
        <div className="flex gap-2">
          {deviceOptions.map((device) => (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                selectedDevice === device.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{device.icon}</span>
              <span className="text-sm font-medium">{device.name}</span>
            </button>
          ))}
        </div>
      </ConfigSection>
    </div>
  )
}

function ConfigSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  )
}
