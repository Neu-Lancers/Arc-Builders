import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { partners, team, faqs, I, testimonials, brand, features } from '../../data/site'
import Breadcrumbs from '../ui/Breadcrumbs'
import { Counter, Reveal, SectionHead, SplitHeading, Ribbon } from '../ui/Reveal'
import { Marquee } from '../ui/Marquee'
import { GlareHover, SpotlightCard, TiltedCard, StarBorder } from '../ui/Cards'
import { Wave, WaveBand } from '../ui/Wave'
import { cn } from '../../lib/utils'
import { CenterLoop } from './Scroller'

/** Inner-page hero with parallax image. */
export function PageHero({ eyebrow, title, ribbon, text, img, crumb }: { eyebrow: string; title: string; ribbon?: string; text?: string; img: string; crumb?: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], ['0%', '14%'])
  const o = useTransform(scrollY, [0, 520], [1, 0])
  const dim = useTransform(scrollY, [0, 800], [0, 0.6])
  const stacked = features.stackedHeroes
  return (
    <section data-hero ref={ref} className={cn('flex items-center overflow-hidden bg-ink pb-16 pt-28 text-cream', stacked ? 'sticky top-0 z-0 h-[100svh]' : 'relative min-h-[100svh]')}>
      <motion.img src={img} alt="" style={{ y }} className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="img-overlay absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/55" />
      <motion.div style={{ opacity: o }} className="container-x relative">
        <Breadcrumbs last={crumb} />
        <SplitHeading as="h1" text={title} className="mt-3 max-w-3xl text-[clamp(2.2rem,5.6vw,4.4rem)]" />
        {ribbon && <p className="h-display mt-1 text-[clamp(1.4rem,3vw,2.4rem)] italic"><Ribbon>{ribbon}</Ribbon></p>}
        {text && <Reveal delay={0.25}><p className="mt-4 max-w-xl text-sm text-cream/85 md:text-base">{text}</p></Reveal>}
      </motion.div>
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      {!stacked && <Wave at="bottom" fill="var(--page)" />}
    </section>
  )
}

/** Plain rectangular content section. */
export function Panel({ children, className, dark, alt }: { children: ReactNode; className?: string; dark?: boolean; alt?: boolean }) {
  return (
    <section className={cn('relative z-10 section', dark ? "bg-forest text-cream dark:bg-forest-deep" : alt ? "bg-page-2 text-fg" : "bg-page text-fg", className)}>
      {children}
    </section>
  )
}

const statIcons = ['M3 21h18M5 21V8l7-5 7 5v13', 'M4 20V10m6 10V4m6 16v-8m5 8H2', 'M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z', 'M12 8v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z']

/** Rectangular stats band with small waves top & bottom. */
export function StatsBand({ stats, top, bottom, title }: { stats: string[][]; top?: string; bottom?: string; title?: string }) {
  return (
    <WaveBand top={top} bottom={bottom} className="!py-16 md:!py-20">
      <div className="container-x">
        {title && <p className="eyebrow mb-6 text-center text-gold">— {title}</p>}
        <div className={cn('grid gap-px overflow-hidden rounded-2xl bg-cream/15', stats.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4')}>
          {stats.map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="bg-forest p-6 text-center dark:bg-forest-deep md:p-8">
              <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={statIcons[i % 4]} /></svg>
              <Counter value={v} className="h-display mt-3 block text-4xl md:text-5xl" />
              <p className="eyebrow mt-2 text-cream/70">{l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </WaveBand>
  )
}

/** Compact inline stat cards (for sections that sit on page colour). */
export function StatCards({ stats, dark }: { stats: string[][]; dark?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(([v, l], i) => (
        <Reveal key={l} delay={i * 0.08}>
          <div className={cn('rounded-2xl p-4 text-center', dark ? 'glass text-cream' : 'glass-light')}>
            <Counter value={v} className={cn('h-display block text-2xl md:text-4xl', dark ? 'text-gold' : 'text-accent')} />
            <p className="eyebrow mt-1 !text-[0.6rem] opacity-80">{l}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function Partners() {
  const tile = 'mx-2 grid h-14 min-w-[150px] place-items-center rounded-xl border border-line bg-page-2 px-6 h-display text-lg text-fg transition hover:bg-forest hover:text-cream'
  return (
    <section className="relative z-10 overflow-hidden bg-page py-12 md:py-16">
      <div className="container-x mb-7 text-center">
        <p className="eyebrow text-accent">— Trusted by &amp; built with</p>
        <h3 className="h-display mt-2 text-[clamp(1.5rem,3vw,2.3rem)]">Clients &amp; partners who <span className="italic text-accent"><Ribbon>build with us</Ribbon></span></h3>
      </div>
      <Marquee dur={45}>{partners.map((p) => <span key={p} className={tile}>{p}</span>)}</Marquee>
      <Marquee dur={55} rev className="mt-3">{[...partners].reverse().map((p) => <span key={p} className={cn(tile, 'opacity-70')}>{p}</span>)}</Marquee>
    </section>
  )
}

export function CEOMessage({ top = "var(--page)", bottom = "var(--page)", light }: { top?: string; bottom?: string; light?: boolean }) {
  return (
    <WaveBand top={top} bottom={bottom} dark={!light} className="!py-16 md:!py-20">
      <div className="container-x grid items-center gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <TiltedCard max={6}>
            <div className="relative mx-auto max-w-xs">
              <div className="absolute -inset-2 rotate-3 rounded-2xl border border-gold/60" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="CEO" className="relative aspect-[4/5] w-full rounded-2xl object-cover" />
              <div className="glass absolute -bottom-4 -right-3 rounded-xl px-4 py-2.5 text-cream">
                <p className="h-display text-lg">Arjun Raghavan</p>
                <p className="eyebrow !text-[0.6rem] text-gold">Founder &amp; CEO</p>
              </div>
            </div>
          </TiltedCard>
        </Reveal>
        <div className="md:col-span-8">
          <p className={cn("eyebrow", light ? "text-accent" : "text-gold")}>— A word from our CEO</p>
          <span className={cn("h-display mt-3 block h-9 text-6xl leading-none", light ? "text-gold" : "text-gold/70")}>“</span>
          <SplitHeading text="We do not build for a handover date. We build for the decades that follow." className={cn("text-[clamp(1.6rem,3.4vw,2.6rem)]", light && "text-accent")} />
          <Reveal delay={0.2}>
            <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed md:text-base", light ? "text-fg/75" : "text-cream/80")}>
              A building is a promise — to the family who will grow up in it, the team who will work in it, and the city around it.
              That is why design, engineering and craft sit under one roof, and every client has a single person accountable from day one.
            </p>
          </Reveal>
        </div>
      </div>
    </WaveBand>
  )
}

export function TeamGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
      {team.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.07}>
          <TiltedCard max={6}>
            <GlareHover className="rounded-2xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
                <div className="glass absolute inset-x-2 bottom-2 rounded-xl p-3 text-cream">
                  <p className="h-display text-base md:text-lg">{m.name}</p>
                  <p className="eyebrow !text-[0.6rem] text-gold">{m.role}</p>
                </div>
              </div>
            </GlareHover>
          </TiltedCard>
        </Reveal>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <CenterLoop
      items={testimonials}
      render={(t, active) => (
        <div className={cn('flex h-full flex-col justify-between rounded-2xl p-6 transition-colors', active ? 'bg-forest text-cream shadow-xl dark:bg-[color-mix(in_srgb,var(--color-forest)_75%,black)]' : 'glass-light')}>
          <span className="h-display text-5xl leading-none text-gold">“</span>
          <p className="h-display text-lg leading-snug md:text-xl">{t.text}</p>
          <div className="mt-4 flex items-center gap-3">
            <img src={t.img} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
            <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs opacity-70">{t.role}</p></div>
          </div>
        </div>
      )}
    />
  )
}

export function FAQ() {
  const cats = ['All', ...Array.from(new Set(faqs.map((f) => f.cat)))]
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState<number | null>(0)
  const list = faqs.filter((f) => cat === 'All' || f.cat === cat)
  return (
    <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <div className="relative overflow-hidden rounded-2xl bg-forest p-6 text-cream lg:sticky lg:top-24 dark:bg-[color-mix(in_srgb,var(--color-forest)_65%,black)]">
          <img src={I.lobby} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="relative">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/25 text-xl text-gold">?</span>
            <h3 className="h-display mt-4 text-2xl">Still have questions?</h3>
            <p className="mt-2 text-sm text-cream/80">Our project leads answer within a few hours on working days.</p>
            <div className="mt-5 grid gap-2">
              <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn !bg-[#25d366] !text-white !py-2.5 text-xs">Chat on WhatsApp</a>
              <a href={`tel:${brand.phone}`} className="btn btn-ghost !py-2.5 text-xs">Call {brand.phone}</a>
            </div>
          </div>
        </div>
      </aside>
      <div className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => { setCat(c); setOpen(0) }} className={cn('rounded-full px-4 py-1.5 text-xs font-semibold transition', cat === c ? 'bg-forest text-cream' : 'glass-light hover:bg-accent/10')}>{c}</button>
          ))}
        </div>
        <div className="space-y-2.5">
          {list.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q} className={cn('glow-border rounded-2xl border transition-colors', on ? 'border-accent/40 bg-page-2' : 'border-line bg-page')}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center gap-3 p-4 text-left md:gap-4 md:p-5">
                  <span className={cn('h-display grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm transition-colors', on ? 'bg-forest text-cream' : 'bg-accent/10 text-accent')}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-display flex-1 text-base md:text-lg">{f.q}</span>
                  <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg leading-none transition-transform', on && 'rotate-45 bg-gold text-ink')}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <p className="px-4 pb-5 pl-[3.75rem] text-sm leading-relaxed text-fg/75 md:pl-[4.75rem] md:pr-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function CTA({ title = 'Let us build something remarkable.', top = 'var(--page)' }: { title?: string; top?: string }) {
  return (
    <WaveBand top={top} bottom="var(--color-forest-deep)" className="overflow-hidden !py-16 text-center md:!py-24">
      <img src={I.aerial} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-x relative">
        <p className="eyebrow text-gold">— Start your project</p>
        <SplitHeading text={title} className="mx-auto mt-3 max-w-3xl text-[clamp(1.9rem,4.6vw,3.6rem)]" />
        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <StarBorder><Link to="/contact" className="btn btn-light">Book a free consultation →</Link></StarBorder>
            <Link to="/projects" className="btn btn-ghost">See our projects</Link>
          </div>
        </Reveal>
      </div>
    </WaveBand>
  )
}

/** Scroll-expand media: small rounded frame grows to fullscreen; headline sits above and below it. */
export function ScrollExpand({ img, caption, chips }: { img: string; caption: string; chips?: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const w = useTransform(scrollYProgress, [0, 0.7], ['46vw', '100vw'])
  const h = useTransform(scrollYProgress, [0, 0.7], ['36svh', '100svh'])
  const r = useTransform(scrollYProgress, [0, 0.7], [32, 0])
  const t = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])
  const words = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0])
  const lx = useTransform(scrollYProgress, [0, 0.5], ['0vw', '-40vw'])
  const rx = useTransform(scrollYProgress, [0, 0.5], ['0vw', '40vw'])
  const word = 'h-display whitespace-nowrap text-[clamp(2.4rem,9vw,7rem)] leading-none text-accent'
  return (
    <section ref={ref} className="relative z-10 h-[220vh] bg-page">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-3 overflow-hidden pt-16 md:gap-5">
        <motion.div style={{ x: lx, opacity: words }} className={word}>Craft</motion.div>
        <motion.div style={{ width: w, height: h, borderRadius: r }} className="relative z-10 shrink-0 overflow-hidden shadow-2xl">
          <img src={img} alt="" className="h-full w-full object-cover" />
          <div className={chips ? 'img-overlay absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/25 to-transparent' : 'img-overlay absolute inset-0 bg-ink/40'} />
          <motion.div style={{ opacity: t }} className="absolute inset-x-0 bottom-[10%] mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center">
            <p className="h-display text-2xl text-cream md:text-4xl">{caption}</p>
            {chips && <div className="flex flex-wrap justify-center gap-2">{chips.map((c) => <span key={c} className="glass rounded-full px-3.5 py-1.5 text-xs font-semibold text-cream">{c}</span>)}</div>}
          </motion.div>
        </motion.div>
        <motion.div style={{ x: rx, opacity: words }} className={cn(word, 'italic')}>&amp; Care</motion.div>
      </div>
    </section>
  )
}

export function ServiceCard({ s, i }: { s: { slug: string; title: string; short: string; hero: string; icon: string }; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <Link to={`/services/${s.slug}`} className="block h-full">
        <SpotlightCard className="glass-light h-full !rounded-2xl">
          <div className="p-2.5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img src={s.hero} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-bold text-forest">{s.icon}</span>
            </div>
            <div className="p-3 pb-4">
              <h3 className="h-display text-xl text-accent md:text-2xl">{s.title}</h3>
              <p className="mt-1.5 text-sm text-fg/70">{s.short}</p>
              <p className="mt-3 text-sm font-semibold text-accent transition group-hover:translate-x-1">Learn more →</p>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </Reveal>
  )
}

export { SectionHead }
