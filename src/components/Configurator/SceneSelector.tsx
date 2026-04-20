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
    <div>
      {/* 场景选择 */}
      <div className="space-y-1">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSceneChange(scene.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-left ${
              selectedScene === scene.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{scene.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{scene.name}</div>
              <div className="text-xs text-gray-500 truncate">{scene.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
