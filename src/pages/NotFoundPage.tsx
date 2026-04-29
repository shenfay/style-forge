/**
 * 404 页面
 * 当用户访问不存在的路由时显示
 */

import { Link } from 'react-router-dom'
import { useSEOMeta } from '../hooks/useSEOMeta'

export default function NotFoundPage() {
  useSEOMeta({
    title: '页面未找到 - Style Forge',
    description: '您访问的页面不存在，请检查链接是否正确。',
    robots: 'noindex, follow',
  })

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-6">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
            <svg className="w-10 h-10" style={{ color: '#71717A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#09090B' }}>404</h1>
          <p className="text-lg mb-2" style={{ color: '#09090B' }}>页面未找到</p>
          <p className="text-sm" style={{ color: '#71717A' }}>
            您访问的页面不存在，可能已被移除或链接有误。
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2.5 text-sm font-medium rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#373737' }}
          >
            返回首页
          </Link>
          <Link
            to="/designer/workbench"
            className="px-6 py-2.5 text-sm font-medium rounded-lg transition-colors"
            style={{ color: '#242424', backgroundColor: '#F0F0F0' }}
          >
            前往编辑器
          </Link>
        </div>
      </div>
    </div>
  )
}
