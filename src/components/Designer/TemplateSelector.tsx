import { useTranslation } from 'react-i18next'
import type { TemplateConfig, PageType } from '../../types/template'

interface TemplateSelectorProps {
  templates: TemplateConfig[]
  selectedTemplate: PageType | null
  onTemplateChange: (template: TemplateConfig) => void
}

export function TemplateSelector({ templates, selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const { t } = useTranslation('designer')

  if (templates.length === 0) {
    return (
      <div className="text-sm" style={{ color: '#999999' }}>{t('templateSection.noTemplate')}</div>
    )
  }

  // 按页面类型去重，每个类型只保留一个模板
  const uniqueTemplates = templates.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = template
    }
    return acc
  }, {} as Record<string, TemplateConfig>)

  return (
    <div className="space-y-1">
      {Object.values(uniqueTemplates).map((template) => (
        <button
          key={template.type}
          onClick={() => onTemplateChange(template)}
          className="w-full flex items-start gap-2 transition-all text-left rounded-lg cursor-pointer"
          style={{
            padding: '10px 12px',
            backgroundColor: selectedTemplate === template.type ? '#ECEAE5' : 'transparent',
            color: selectedTemplate === template.type ? '#1A1A1A' : '#4A4A4A',
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-normal">{template.name}</div>
            <div className="text-xs mt-1" style={{ color: '#999999' }}>{template.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
