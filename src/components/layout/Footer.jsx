import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FOOTER_LINKS } from '../../constants'
import { useSiteSettings } from '../../hooks/useCmsContent'
import Container from '../ui/Container'
import Logo from '../common/Logo'

export default function Footer() {
  const company = useSiteSettings()

  const socialIcons = [
    { href: company.social?.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: company.social?.instagram, Icon: FaInstagram, label: 'Instagram' },
    { href: company.social?.twitter, Icon: FaXTwitter, label: 'X' },
    { href: company.social?.facebook, Icon: FaFacebookF, label: 'Facebook' },
    { href: company.social?.youtube, Icon: FaYoutube, label: 'YouTube' },
  ]

  return (
    <footer className="relative border-t border-white/8 bg-surface">
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex shrink-0 transition hover:opacity-90"
              aria-label={company.name}
            >
              <Logo type="nav" variant="full" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {company.footerContent || company.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-slate-400 transition hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title="Company" links={FOOTER_LINKS.company} />
            <FooterCol title="Services" links={FOOTER_LINKS.services} />
            <FooterCol title="Resources" links={FOOTER_LINKS.resources} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Insights on landmark projects, methods, and industry leadership.
            </p>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Email address"
                className="field min-w-0 flex-1"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-[46px] w-12 shrink-0 items-center justify-center rounded-sm bg-accent-deep text-white transition hover:bg-accent"
              >
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="mt-8 space-y-2 text-sm text-slate-400">
              <p>{company.address?.full}</p>
              <a
                href={`tel:${company.phoneRaw || company.phone}`}
                className="link-underline block hover:text-white"
              >
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="link-underline block hover:text-white">
                {company.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {company.copyrightText ||
              `© ${new Date().getFullYear()} ${company.name}. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="link-underline text-sm text-slate-400 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
