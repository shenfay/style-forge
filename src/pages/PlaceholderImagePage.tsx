/**
 * 占位图图片输出页面（fallback）
 * 路由：/placeholder（无参数时）
 * 用途：当 Vite 中间件未处理时，显示简单的图片输出提示
 */

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function PlaceholderImagePage() {
  const { t } = useTranslation('placeholder')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.has('width')) {
      navigate('/placeholder/workbench', { replace: true })
    }
  }, [searchParams, navigate])

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600 mb-4">{t('redirect.message')}</p>
        <a
          href="/placeholder/workbench"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t('redirect.button')}
        </a>
      </div>
    </div>
  )
}
