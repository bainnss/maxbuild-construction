import logoPrimary from '../../assets/images/maxbuild-logo.svg'
import logoNav from '../../assets/images/maxbuild-logo2.svg'
import { cn } from '../../utils'
import { useSiteSettings } from '../../hooks/useCmsContent'

/**
 * Official MaxBuild logos with CMS overrides.
 * - brand: full-color logo (loader / light surfaces)
 * - nav: light/knockout logo for dark header & footer
 */
export default function Logo({
  variant = 'full',
  type = 'nav',
  className,
  imgClassName,
}) {
  const settings = useSiteSettings()
  const fallback = type === 'brand' ? logoPrimary : logoNav
  const custom =
    type === 'brand'
      ? settings.logoUrl
      : settings.logoNavUrl || settings.logoUrl
  const src = custom || fallback

  const sizes = {
    full: 'h-12 w-auto max-w-[min(240px,70vw)] sm:h-14 sm:max-w-[280px] md:h-16 md:max-w-[320px]',
    compact:
      'h-9 w-auto max-w-[min(168px,58vw)] sm:h-11 sm:max-w-[210px] md:h-14 md:max-w-[260px]',
    mark: 'h-9 w-auto max-w-[140px] sm:h-10',
    hero: 'h-auto w-full max-w-[min(100%,320px)] sm:max-w-[420px] md:max-w-[520px]',
  }

  return (
    <img
      src={src}
      alt={settings.name || 'MaxBuild'}
      className={cn(
        'object-contain object-left',
        sizes[variant] || sizes.full,
        className,
        imgClassName
      )}
      decoding="async"
    />
  )
}
