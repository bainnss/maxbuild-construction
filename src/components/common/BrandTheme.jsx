import { useEffect, useMemo } from 'react'
import { useCmsStore } from '../../store/cmsStore'
import { mergeSettings } from '../../admin/data/settingsDefaults'

function setFavicon(href) {
  if (!href) return
  let link = document.querySelector("link[rel*='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
}

/**
 * Applies CMS brand settings (colours, favicon, document title defaults)
 * across the whole app via CSS variables on :root.
 */
export default function BrandTheme() {
  const raw = useCmsStore((s) => s.settings)
  const settings = useMemo(() => mergeSettings(raw), [raw])

  useEffect(() => {
    const root = document.documentElement
    const map = {
      '--color-navy': settings.colorNavy,
      '--color-navy-light': settings.colorNavyLight,
      '--color-brand-navy': settings.colorBrandNavy,
      '--color-primary': settings.colorPrimary,
      '--color-primary-light': settings.colorPrimaryLight,
      '--color-accent': settings.colorAccent,
      '--color-accent-deep': settings.colorAccentDeep,
      '--color-lavender': settings.colorLavender,
      '--color-surface': settings.colorSurface,
    }

    Object.entries(map).forEach(([key, value]) => {
      if (value) root.style.setProperty(key, value)
    })

    if (settings.faviconUrl) setFavicon(settings.faviconUrl)
  }, [settings])

  return null
}
