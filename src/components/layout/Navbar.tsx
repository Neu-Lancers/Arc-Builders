import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { brand, nav, services } from '../../data/site'
import { cn } from '../../lib/utils'
import { useTheme } from '../../hooks/hooks'
import { scrollToTop } from '../ui/Effects'
import { useSound } from '../../lib/sound'

export function Logo({ light }: { light?: boolean }) {
  const { pathname } = useLocation()
  return (
    <Link to="/" aria-label={`${brand.name} — home`} onClick={() => { if (pathname === '/') scrollToTop() }} className="flex items-center gap-2.5">
      <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', light ? 'bg-cream text-forest' : 'bg-forest text-cream')}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 20V10l9-7 9 7v10h-6v-6H9v6z" /></svg>
      </span>
      <span className="h-display text-xl font-semibold tracking-tight md:text-2xl">{brand.name}</span>
    </Link>
  )
}

const Chevron = ({ open }: { open?: boolean }) => (
  <svg viewBox="0 0 24 24" className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const [mobServices, setMobServices] = useState(false)
  const { pathname } = useLocation()
  const [dark, toggle] = useTheme()
  const [soundOn, toggleSound] = useSound()
  const closeT = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // pill while a hero is on screen; once the hero is behind us the header becomes a full-width fixed bar
    const f = () => {
      const h = document.querySelector('[data-hero]')
      setScrolled(h ? h.getBoundingClientRect().bottom < 90 : scrollY > 40)
    }
    f(); const t = setTimeout(f, 150)
    addEventListener('scroll', f, { passive: true })
    return () => { clearTimeout(t); removeEventListener('scroll', f) }
  }, [pathname])
  useEffect(() => { setOpen(false); setDrop(false) }, [pathname])
  useEffect(() => { document.documentElement.classList.toggle('lenis-stopped', open) }, [open])

  const enter = () => { clearTimeout(closeT.current); setDrop(true) }
  const leave = () => { closeT.current = setTimeout(() => setDrop(false), 160) }
  const same = (to: string) => () => { if (pathname === to) scrollToTop() }

  // Over the dark hero the pill is dark-glass; once scrolled it follows the theme.
  const pill = scrolled
    ? 'glass-light max-w-none rounded-none border-x-0 border-t-0 px-3 py-2 md:px-6'
    : 'max-w-6xl rounded-full border border-white/15 bg-ink/45 px-3 py-2 text-cream backdrop-blur-xl md:px-5'

  return (
    <>
      <header className={cn('fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500', scrolled ? 'px-0 pt-0' : 'px-3 pt-3 md:pt-4')}>
        <motion.nav aria-label="Primary"
          initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className={cn('w-full transition-[background,box-shadow] duration-500', pill)}
        >
          <div className={cn('mx-auto flex w-full items-center justify-between', scrolled && 'max-w-6xl')}>
          <Logo light={!scrolled} />
          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((n) => n.to === '/services' ? (
              <li key={n.to} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
                <NavLink to={n.to} onClick={same(n.to)} onFocus={enter}
                  className={({ isActive }) => cn('flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors', isActive ? 'bg-forest text-cream' : 'hover:bg-white/15')}>
                  {n.label} <Chevron open={drop} />
                </NavLink>
                <AnimatePresence>
                  {drop && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}
                      className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-2">
                      <ul className="overflow-hidden rounded-2xl border border-white/15 bg-forest-deep/97 p-1.5 text-cream shadow-xl backdrop-blur-xl">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link to={`/services/${s.slug}`} onClick={() => setDrop(false)} className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-[13px] font-semibold transition hover:bg-white/10">
                              <img src={s.hero} alt="" loading="lazy" className="h-8 w-11 shrink-0 rounded-md object-cover" />
                              <span className="flex-1">{s.title}</span>
                              
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-white/10 pt-1"><Link to="/services" onClick={() => setDrop(false)} className="block rounded-xl px-2.5 py-2 text-center text-xs font-bold text-gold hover:bg-white/10">View all services</Link></li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} onClick={same(n.to)}
                  className={({ isActive }) => cn('block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors', isActive ? 'bg-forest text-cream' : 'hover:bg-white/15')}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <button aria-label={soundOn ? "Mute click sounds" : "Enable click sounds"} aria-pressed={soundOn} onClick={toggleSound} data-sound="none" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" />{soundOn ? <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" /> : <path d="M17 9l5 6M22 9l-5 6" />}</svg>
            </button>
            <button aria-label="Toggle light / dark theme" data-sound="switch" onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/15">
              {dark ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
              )}
            </button>
            <Link to="/contact" className="btn btn-light hidden !py-2.5 sm:inline-flex">Free consultation</Link>
            <button aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full lg:hidden">
              <span className="relative block h-3 w-5">
                <span className={cn('absolute left-0 h-0.5 w-5 bg-current transition-all', open ? 'top-[5px] rotate-45' : 'top-0')} />
                <span className={cn('absolute left-0 h-0.5 w-5 bg-current transition-all', open ? 'top-[5px] -rotate-45' : 'top-[10px]')} />
              </span>
            </button>
          </div>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className={cn('fixed inset-x-3 z-40 max-h-[calc(100svh-5.4rem)] overflow-y-auto rounded-3xl bg-forest-deep p-4 text-cream shadow-2xl lg:hidden', scrolled ? 'top-[3.9rem]' : 'top-[4.4rem]')}
            data-lenis-prevent
          >
            <ul className="divide-y divide-cream/10">
              {nav.map((n) => n.to === '/services' ? (
                <li key={n.to}>
                  <div className="flex items-center justify-between">
                    <Link to={n.to} className="flex-1 py-3 text-base font-semibold">{n.label}</Link>
                    <button aria-label="Toggle services list" onClick={() => setMobServices(!mobServices)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Chevron open={mobServices} /></button>
                  </div>
                  <AnimatePresence initial={false}>
                    {mobServices && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-2 pl-3">
                        {services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="block py-2 text-sm text-cream/80">{s.title}</Link></li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={n.to}><NavLink to={n.to} end={n.to === '/'} onClick={same(n.to)} className={({ isActive }) => cn('block py-3 text-base font-semibold', isActive && 'text-gold')}>{n.label}</NavLink></li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={`tel:${brand.phone}`} className="btn btn-light !py-2.5 text-xs">Call us</a>
              <Link to="/contact" className="btn btn-ghost !py-2.5 text-xs">Get a quote</Link>
            </div>
            <p className="mt-3 break-all text-center text-xs text-cream/55">{brand.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
