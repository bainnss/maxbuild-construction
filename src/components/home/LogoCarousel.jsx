import { usePublicClients } from '../../hooks/useCmsContent'

export default function LogoCarousel() {
  const clients = usePublicClients()
  const logos = clients.length ? [...clients, ...clients] : []

  if (!logos.length) return null

  return (
    <div className="relative overflow-hidden border-y border-white/8 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />
      <div className="flex w-max animate-marquee gap-16 px-8">
        {logos.map((client, i) => {
          const content = client.logoUrl ? (
            <img
              src={client.logoUrl}
              alt={client.name}
              className="h-8 w-auto max-w-[140px] object-contain opacity-70 transition hover:opacity-100"
            />
          ) : (
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 transition hover:text-slate-200">
              {client.name}
            </span>
          )

          const inner = (
            <div className="flex min-w-[160px] items-center justify-center">{content}</div>
          )

          if (client.websiteUrl) {
            return (
              <a
                key={`${client.id}-${i}`}
                href={client.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={client.name}
              >
                {inner}
              </a>
            )
          }

          return <div key={`${client.id}-${i}`}>{inner}</div>
        })}
      </div>
    </div>
  )
}
