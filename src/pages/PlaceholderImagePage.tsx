/**
 * 占位图图片输出页面（fallback）
 * 路由：/placeholder（无参数时）
 * 用途：当 Vite 中间件未处理时，显示简单的图片输出提示
 */

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function PlaceholderImagePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    // 如果有 width 参数但中间件未处理（非开发环境），重定向到 workbench
    if (searchParams.has('width')) {
      navigate('/placeholder/workbench', { replace: true })
    }
  }, [searchParams, navigate])

  // 无参数时，重定向到 workbench
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600 mb-4">正在重定向到占位图生成器...</p>
        <a
          href="/placeholder/workbench"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          前往占位图生成器
        </a>
      </div>
    </div>
  )
}
