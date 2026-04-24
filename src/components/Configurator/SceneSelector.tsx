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
  { id: 'ecommerce', name: '电商零售', icon: '🛒', description: '商品、购物车、订单' },
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
            className="w-full flex items-center gap-2 transition-all text-left rounded-lg cursor-pointer"
            style={{
              padding: '10px 12px',
              backgroundColor: selectedScene === scene.id ? '#ECEAE5' : 'transparent',
              color: selectedScene === scene.id ? '#1A1A1A' : '#4A4A4A',
            }}
          >
            <span className="text-base" style={{ color: selectedScene === scene.id ? '#1A1A1A' : '#6B6B6B' }}>{scene.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-normal">{scene.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
