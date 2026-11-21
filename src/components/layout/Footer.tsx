import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand, nav, services } from '../../data/site'
import { Logo } from './Navbar'

const contacts = [
  { label: 'Call us', href: `tel:${brand.phone.replace(/\s/g, '')}`, d: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z' },
  { label: 'WhatsApp', href: `https://wa.me/${brand.whatsapp}`, fill: true, d: 'M12.04 2a9.9 9.9 0 00-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1012.04 2zm5.2 13.9c-.22.62-1.3 1.2-1.8 1.25-.46.05-1.04.07-1.68-.1a15 15 0 01-1.52-.56c-2.67-1.15-4.4-3.84-4.53-4.02-.13-.17-1.08-1.43-1.08-2.74 0-1.3.68-1.94.92-2.2.24-.27.52-.33.7-.33h.5c.16 0 .38-.06.6.46.22.54.75 1.84.82 1.97.07.13.1.3.02.47-.08.17-.12.28-.25.43-.13.15-.27.33-.38.44-.13.13-.26.27-.11.53.15.26.67 1.1 1.44 1.78.99.88 1.83 1.15 2.09 1.28.26.13.41.1.56-.07.15-.18.65-.76.82-1.02.17-.26.34-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.2.5.3.06.1.06.62-.16 1.24z' },
  { label: 'Email us', href: `mailto:${brand.email}`, d: 'M3 6h18v12H3zM3 7l9 6 9-6' },
  { label: 'Find us on the map', href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`, d: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z' },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current!, r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    el.style.setProperty("--mx", x + "px"); el.style.setProperty("--my", y + "px")
    el.style.setProperty("--ox", ((x / r.width - 0.5) * -26).toFixed(1) + "px"); el.style.setProperty("--oy", ((y / r.height - 0.5) * -26).toFixed(1) + "px")
  }
  const leave = () => { const el = ref.current!; el.style.setProperty("--ox", "0px"); el.style.setProperty("--oy", "0px") }
  return (
    <footer ref={ref} onMouseMove={move} onMouseLeave={leave} className="pattern-blueprint group relative z-10 overflow-hidden text-cream">
      <div aria-hidden className="footer-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="container-x relative grid gap-8 py-12 md:grid-cols-12 md:py-14">
        <div className="md:col-span-4">
          <Logo light />
          <p className="h-display mt-4 max-w-xs text-xl italic text-cream/90">{brand.tagline}.</p>
          <p className="mt-3 text-sm text-cream/65">{brand.address}</p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-3 text-gold">Explore</p>
          <ul className="space-y-2 text-sm text-cream/80">
            {nav.map((n) => <li key={n.to}><Link className="hover:text-gold" to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-3 text-gold">Services</p>
          <ul className="space-y-2 text-sm text-cream/80">
            {services.map((s) => <li key={s.slug}><Link className="hover:text-gold" to={`/services/${s.slug}`}>{s.title}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-3 text-gold">Talk to us</p>
          <div className="w-fit">
          <ul className="flex gap-3">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={c.label} title={c.label}
                  className="glow-border group relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/15 to-white/5 text-gold shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:from-gold hover:to-[#e8c58f] hover:text-ink">
                  <span className="sheen" />
                  <svg viewBox="0 0 24 24" className="relative h-[22px] w-[22px]" fill={c.fill ? 'currentColor' : 'none'} stroke={c.fill ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={c.d} /></svg>
                </a>
              </li>
            ))}
          </ul>
          <span className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gold/50 bg-gold/15 px-3.5 py-1.5 text-xs font-semibold text-cream shadow-[0_0_18px_rgba(192,149,90,.18)]">
            <span className="relative grid h-2 w-2 place-items-center"><span className="absolute inset-0 rounded-full bg-[#4ade80] [animation:wa-pulse_2s_ease-out_infinite]" /><span className="h-2 w-2 rounded-full bg-[#4ade80]" /></span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {brand.hours}
          </span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-[#100e1c]">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <p className="flex items-center gap-2">Created by <span className="badge-lavender">✦ {brand.credit}</span></p>
      </div>
      </div>
    </footer>
  )
}
