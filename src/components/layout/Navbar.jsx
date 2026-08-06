import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react'
import { NAV_LINKS } from '../../constants'
import { useScrolled } from '../../hooks/useScroll'
import { useTheme } from '../../context/ThemeContext'
import { useSiteSettings } from '../../hooks/useCmsContent'
import Button from '../ui/Button'
import Logo from '../common/Logo'
import { cn } from '../../utils'

export default function Navbar() {
  const company = useSiteSettings()
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-[60] transition-all duration-500',
        scrolled || !isHome
          ? 'border-b border-white/8 bg-navy/90 py-3 shadow-premium backdrop-blur-xl'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-premium flex items-center justify-between gap-3 sm:gap-6">
        <Link
          to="/"
          className="group min-w-0 max-w-[calc(100%-3.5rem)] shrink transition hover:opacity-90 sm:max-w-none"
          aria-label={company.name}
        >
          <Logo type="nav" variant="compact" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white',
                      isActive && 'text-white'
                    )
                  }
                >
                  {link.label}
                  <ChevronDown size={14} className={cn('transition', mega && 'rotate-180')} />
                </NavLink>
                <AnimatePresence>
                  {mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 min-w-[220px] rounded-sm border border-white/10 bg-navy-light/95 p-2 shadow-premium backdrop-blur-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block rounded-sm px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white',
                    isActive && 'text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-slate-300 transition hover:border-accent/40 hover:text-accent md:inline-flex"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="hidden md:block">
            <Button to="/contact" size="sm">
              Get a Quote
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/10 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/8 bg-navy/98 lg:hidden"
          >
            <nav className="container-premium flex flex-col gap-1 py-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Button to="/contact" className="w-full" onClick={() => setOpen(false)}>
                  Get a Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
