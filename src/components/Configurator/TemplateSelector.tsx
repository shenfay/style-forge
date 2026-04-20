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
}

export function TemplateSelector({ templates, selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  if (templates.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-2">暂无可用模板</div>
    )
  }

  return (
    <div className="space-y-1">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-left ${
            selectedTemplate === template.type
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">{template.name}</div>
            <div className="text-xs text-gray-500 truncate">{template.description}</div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded ${
            selectedTemplate === template.type
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {pageTypeLabels[template.type]}
          </span>
        </button>
      ))}
    </div>
  )
}
