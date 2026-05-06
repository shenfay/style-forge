import { useTranslation } from 'react-i18next'
import type { SceneType, DeviceType, PageType } from '../../types/template'

interface SceneSelectorProps {
  selectedScene: SceneType
  selectedDevice: DeviceType
  selectedTemplate: PageType
  onSceneChange: (scene: SceneType) => void
  onDeviceChange: (device: DeviceType) => void
  onTemplateChange: (template: PageType) => void
}

export function SceneSelector({
  selectedScene,
  selectedDevice,
  selectedTemplate,
  onSceneChange,
  onDeviceChange,
  onTemplateChange,
}: SceneSelectorProps) {
  const { t } = useTranslation('designer')
  const { t: tc } = useTranslation('common')

  const scenes: Array<{ id: SceneType; name: string; icon: string; description: string }> = [
    { id: 'ecommerce', name: t('sceneLabels.ecommerce'), icon: '🛒', description: t('sceneDescriptions.ecommerce') },
    { id: 'content', name: t('sceneLabels.content'), icon: '✍️', description: t('sceneDescriptions.content') },
    { id: 'landing', name: t('sceneLabels.landing'), icon: '🚀', description: t('sceneDescriptions.landing') },
  ]

  const deviceOptions: Array<{ id: DeviceType; name: string; icon: string }> = [
    { id: 'mobile', name: tc('device.mobile'), icon: '📱' },
    { id: 'desktop', name: tc('device.desktop'), icon: '💻' },
  ]

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
