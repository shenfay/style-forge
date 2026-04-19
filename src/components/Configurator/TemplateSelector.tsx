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
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-500">暂无可用模板</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">选择模板</h3>
      <div className="space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              selectedTemplate === template.type
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{template.name}</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded">
                {pageTypeLabels[template.type]}
              </span>
            </div>
            <p className="text-[11px] text-gray-500">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
