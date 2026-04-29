/**
 * useSEOMeta Hook
 *
 * 统一管理页面级 SEO 元数据（title、description、OG、canonical、JSON-LD、robots）。
 *
 * 设计原则：
 * - 当前通过 useEffect 直接操作 document/meta 元素（CSR 模式）
 * - 未来迁移 SSR 时，只需替换此 hook 内部实现（如改为 react-helmet-async 或 next/head），
 *   所有调用方无需改动
 *
 * 用法：
 *   useSEOMeta({
 *     title: '页面标题 - Style Forge',
 *     description: '页面描述',
 *     canonical: 'https://style.atmedia.fun/current-path',
 *     robots: 'index, follow',
 *     og: {
 *       title: '社交分享标题',
 *       description: '社交分享描述',
 *       image: 'https://style.atmedia.fun/og-image.png',
 *     },
 *     jsonLd: { ... },
 *   })
 */

import { useEffect } from 'react'

interface SEOOptions {
  /** 页面 <title> */
  title?: string
  /** <meta name="description"> */
  description?: string
  /** <link rel="canonical"> */
  canonical?: string
  /** <meta name="robots"> */
  robots?: string
  /** Open Graph / Twitter Card */
  og?: {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: string
  }
  /** JSON-LD 结构化数据 */
  jsonLd?: Record<string, unknown>
}

function setOrUpdateMeta(name: string, content: string, property?: string): () => void {
  let el = document.querySelector(
    property ? `meta[property="${property}"]` : `meta[name="${name}"]`
  ) as HTMLMetaElement | null

  const existed = !!el
  if (!el) {
    el = document.createElement('meta')
    if (property) {
      el.setAttribute('property', property)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }

  const prevContent = el.getAttribute('content') || ''
  el.setAttribute('content', content)

  return () => {
    if (existed) {
      el?.setAttribute('content', prevContent)
    } else {
      el?.remove()
    }
  }
}

function setLinkRel(rel: string, href: string | null): () => void {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  const existed = !!el

  if (!el && href) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }

  const prevHref = el?.getAttribute('href') || null

  if (href && el) {
    el.setAttribute('href', href)
  } else if (!href && el) {
    el.remove()
  }

  return () => {
    if (existed && el) {
      if (prevHref) {
        el.setAttribute('href', prevHref)
      } else {
        el.remove()
      }
    } else if (el && prevHref) {
      el.setAttribute('href', prevHref)
    }
  }
}

function setJsonLd(data: Record<string, unknown> | null): () => void {
  const id = 'seo-jsonld'
  const existing = document.getElementById(id)
  if (existing) {
    existing.remove()
  }

  if (data) {
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  return () => {
    const el = document.getElementById(id)
    el?.remove()
  }
}

export function useSEOMeta(options: SEOOptions) {
  useEffect(() => {
    const cleanups: (() => void)[] = []

    // Title
    const prevTitle = document.title
    if (options.title) {
      document.title = options.title
    }
    cleanups.push(() => {
      document.title = prevTitle
    })

    // Description
    if (options.description !== undefined) {
      cleanups.push(setOrUpdateMeta('description', options.description))
    }

    // Robots
    if (options.robots !== undefined) {
      cleanups.push(setOrUpdateMeta('robots', options.robots))
    }

    // Canonical
    if (options.canonical !== undefined) {
      cleanups.push(setLinkRel('canonical', options.canonical))
    }

    // Open Graph
    if (options.og) {
      if (options.og.title !== undefined) {
        cleanups.push(setOrUpdateMeta('og:title', options.og.title, 'og:title'))
      }
      if (options.og.description !== undefined) {
        cleanups.push(setOrUpdateMeta('og:description', options.og.description, 'og:description'))
      }
      if (options.og.image !== undefined) {
        cleanups.push(setOrUpdateMeta('og:image', options.og.image, 'og:image'))
      }
      if (options.og.url !== undefined) {
        cleanups.push(setOrUpdateMeta('og:url', options.og.url, 'og:url'))
      }
      if (options.og.type !== undefined) {
        cleanups.push(setOrUpdateMeta('og:type', options.og.type, 'og:type'))
      }

      // Twitter Card 与 OG 同步
      if (options.og.title !== undefined) {
        cleanups.push(setOrUpdateMeta('twitter:title', options.og.title))
      }
      if (options.og.description !== undefined) {
        cleanups.push(setOrUpdateMeta('twitter:description', options.og.description))
      }
      if (options.og.image !== undefined) {
        cleanups.push(setOrUpdateMeta('twitter:image', options.og.image))
      }
      if (options.og.type !== undefined) {
        const card = options.og.type === 'summary_large_image' ? 'summary_large_image' : 'summary'
        cleanups.push(setOrUpdateMeta('twitter:card', card))
      }
    }

    // JSON-LD
    if (options.jsonLd !== undefined) {
      cleanups.push(setJsonLd(options.jsonLd ?? null))
    }

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [
    options.title,
    options.description,
    options.robots,
    options.canonical,
    options.og?.title,
    options.og?.description,
    options.og?.image,
    options.og?.url,
    options.og?.type,
    options.jsonLd,
  ])
}
