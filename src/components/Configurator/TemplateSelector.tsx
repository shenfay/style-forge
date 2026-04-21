import type { TemplateConfig, PageType } from '../../types/template'

interface TemplateSelectorProps {
  templates: TemplateConfig[]
  selectedTemplate: PageType | null
  onTemplateChange: (template: TemplateConfig) => void
}

const pageTypeLabels: Record<PageType, string> = {
  home: '首页',
  detail: '详情页',
  list: '列表页',
  form: '表单页',
  settings: '设置页',
  result: '结果页',
  profile: '个人中心',
  messages: '消息中心',
}

export function TemplateSelector({ templates, selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  if (templates.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-2">暂无可用模板</div>
    )
  }

  // 按页面类型去重，每个类型只保留一个模板
  const uniqueTemplates = templates.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = template
    }
    return acc
  }, {} as Record<PageType, TemplateConfig>)

  return (
    <div className="space-y-1">
      {Object.values(uniqueTemplates).map((template) => (
        <button
          key={template.type}
          onClick={() => onTemplateChange(template)}
          className="w-full flex items-center gap-2 transition-all text-left rounded-lg"
          style={{
            padding: '10px 12px',
            backgroundColor: selectedTemplate === template.type ? '#ECEAE5' : 'transparent',
            color: selectedTemplate === template.type ? '#1A1A1A' : '#4A4A4A',
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-normal">{pageTypeLabels[template.type]}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
