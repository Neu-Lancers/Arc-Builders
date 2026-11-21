import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { SectionHead } from '../ui/Reveal'
import { GlareHover } from '../ui/Cards'
import { Marquee } from '../ui/Marquee'
import { useMedia, useOnScreen } from '../../hooks/hooks'

/** Background stays pinned while the section scrolls past (sticky layer — compositor friendly, no repaint). */
export function FixedBg({ src, children, overlay = 'bg-forest-deep/80', className }: { src: string; children: ReactNode; overlay?: string; className?: string }) {
  return (
    <section className={cn('relative z-10 [overflow:clip]', className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-[100svh] w-full bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${src})` }} />
      </div>
      <div className={cn('absolute inset-0', overlay)} />
      <div className="relative">{children}</div>
    </section>
  )
}

/** ONE pinned background shared by several consecutive sections: the image stays still while the sections
 *  (put them inside, with transparent backgrounds) scroll over it. */
export function FixedBgGroup({ src, children, overlay = 'bg-forest-deep/80', className }: { src: string; children: ReactNode; overlay?: string; className?: string }) {
  return (
    <div className={cn('relative z-10 [overflow:clip]', className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-[100svh] w-full bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${src})` }}>
          <div className={cn('absolute inset-0', overlay)} />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

/** Pinned background; rectangular cards glide right → left and the last card comes to rest at centre. */
export function HorizontalCards({
  bg, eyebrow, title, items,
}: { bg: string; eyebrow: string; title: string; items: { title: string; sub: string; meta?: string; img: string; to?: string }[] }) {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [range, setRange] = useState({ from: 0, to: 0 })
  useEffect(() => {
    const m = () => {
      const t = track.current!, vw = innerWidth
      const last = t.lastElementChild as HTMLElement
      const lastW = last?.offsetWidth ?? 0
      // final x: last card's centre sits on the viewport centre
      setRange({ from: vw * 0.62, to: vw / 2 - (t.scrollWidth - lastW / 2) })
    }
    m(); addEventListener('resize', m)
    return () => removeEventListener('resize', m)
  }, [items.length])
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.04, 0.94], [range.from, range.to])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1])

  return (
    <section ref={outer} className="relative z-10" style={{ height: `${120 + items.length * 34}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${bg})`, scale: bgScale }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink/90" />
        <div className="container-x relative mb-6 md:mb-8"><SectionHead light eyebrow={eyebrow} title={title} /></div>
        <motion.div ref={track} style={{ x }} className="relative flex w-max gap-4 will-change-transform md:gap-6">
          {items.map((it, i) => {
            const card = (
              <GlareHover className="glass-solid h-[42vh] w-[76vw] rounded-2xl p-2 sm:w-[48vw] md:h-[46vh] md:w-[30vw] lg:w-[26vw]">
                <div className="relative h-full overflow-hidden rounded-xl">
                  <img src={it.img} alt={it.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-bold text-forest">{String(i + 1).padStart(2, '0')}</span>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                    {it.meta && <p className="eyebrow text-gold">{it.meta}</p>}
                    <h3 className="h-display mt-1 text-xl md:text-2xl">{it.title}</h3>
                    <p className="mt-1 text-xs text-cream/80">{it.sub}</p>
                  </div>
                </div>
              </GlareHover>
            )
            return it.to ? <Link key={i} to={it.to} className="shrink-0">{card}</Link> : <div key={i} className="shrink-0">{card}</div>
          })}
        </motion.div>
      </div>
    </section>
  )
}

type StackItem = { title: string; text: string; img: string; to: string; tag: string; list: string[] }

function StackCard({ s, i, n, p }: { s: StackItem; i: number; n: number; p: MotionValue<number> }) {
  // each card shrinks + dims a little as the following cards pile on top of it
  const from = i / n
  const scale = useTransform(p, [from, 1], [1, i === n - 1 ? 1 : 1 - 0.045 * (n - 1 - i) - 0.02])
  const dim = useTransform(p, [from, 1], [0, i === n - 1 ? 0 : 0.5])
  return (
    <div className="sticky" style={{ top: `calc(84px + ${i * 22}px)`, marginBottom: i === n - 1 ? 0 : '14vh', zIndex: i + 1 }}>
      <motion.div style={{ scale }} className="relative origin-top overflow-hidden rounded-2xl bg-forest text-cream shadow-[0_-12px_40px_-18px_rgba(0,0,0,.5)] will-change-transform dark:bg-[#12291e] dark:ring-1 dark:ring-white/10">
        <div className="grid md:min-h-[46vh] md:grid-cols-2">
          <div className="flex flex-col justify-between p-6 md:p-9">
            <div>
              <p className="eyebrow text-gold">{s.tag}</p>
              <h3 className="h-display mt-3 text-2xl md:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-md text-sm text-cream/80">{s.text}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.list.map((l) => <li key={l} className="rounded-full border border-cream/25 px-2.5 py-0.5 text-[11px] text-cream/85">{l}</li>)}
              </ul>
            </div>
            <Link to={s.to} className="btn btn-light mt-6 w-fit">Explore service →</Link>
          </div>
          <div className="relative min-h-[190px]"><img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div>
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </div>
  )
}

/** True stacking cards: every card pins near the top and the next slides over it. */
export function ScrollStack({ items }: { items: StackItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div ref={ref} className="relative pb-6">
      {items.map((s, i) => <StackCard key={i} s={s} i={i} n={items.length} p={scrollYProgress} />)}
    </div>
  )
}

/** Images ride a semicircle arc (left-bottom → top-centre → right-bottom) with copy inside the arc.
 *  Hovering a card pauses the run. On small screens it becomes a straight auto-scrolling carousel. */
export function ArcCarousel({ images, title, text, cta }: { images: { img: string; label: string }[]; title: string; text: string; cta?: ReactNode }) {
  const small = useMedia('(max-width: 767px)')
  const wrap = useRef<HTMLDivElement>(null)
  const onScreen = useOnScreen(wrap, '100px')
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const paused = useRef(false)
  const off = useRef(0)
  const [w, setW] = useState(1200)
  const n = images.length

  useEffect(() => {
    const el = wrap.current; if (!el) return
    const ro = new ResizeObserver(() => setW(el.clientWidth))
    ro.observe(el); setW(el.clientWidth); return () => ro.disconnect()
  }, [small])

  // geometry: arc spans the full width; card width derived from arc length so neighbours never touch
  const a0 = w / 2, b0 = w * 0.3
  const arcLen = (Math.PI * (3 * (a0 + b0) - Math.sqrt((3 * a0 + b0) * (a0 + 3 * b0)))) / 2
  const cw = Math.max(110, Math.min(200, (arcLen / n) * 0.74))
  const ch = cw * 1.3
  const rx = w / 2 - cw * 0.55, ry = Math.min(rx * 0.58, 380)
  const height = ry + ch + 30

  useEffect(() => {
    if (small || !onScreen) return
    let raf = 0, last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      if (!paused.current) off.current = (off.current + dt / (n * 3.4)) % 1
      cards.current.forEach((c, i) => {
        if (!c) return
        const u = (i / n + off.current) % 1
        const th = Math.PI * (1 - u)
        const x = w / 2 + rx * Math.cos(th), y = ry + ch / 2 - ry * Math.sin(th)
        const rot = (Math.atan2(ry * Math.cos(th), rx * Math.sin(th)) * 180) / Math.PI
        const s = 0.9 + 0.16 * Math.sin(Math.PI * u)
        c.style.transform = `translate3d(${x - cw / 2}px, ${y - ch / 2}px, 0) rotate(${rot * 0.8}deg) scale(${s})`
        c.style.opacity = String(Math.min(1, Math.sin(Math.PI * u) * 4))
        c.style.zIndex = String(Math.round(Math.sin(Math.PI * u) * 20))
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [small, onScreen, w, n, rx, ry, ch, cw])

  if (small) {
    return (
      <div ref={wrap}>
        <div className="container-x mb-6 text-center">
          <h3 className="h-display text-2xl">{title}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-fg/70">{text}</p>
          {cta && <div className="mt-4">{cta}</div>}
        </div>
        <Marquee dur={34} className="touch-pause">
          {images.map((it) => (
            <div key={it.label} className="relative mr-3 w-[62vw] max-w-[260px] shrink-0 overflow-hidden rounded-2xl shadow-lg">
              <img src={it.img} alt={it.label} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 p-3 pt-8"><p className="h-display text-lg text-cream">{it.label}</p></div>
            </div>
          ))}
        </Marquee>
      </div>
    )
  }

  return (
    <div ref={wrap} className="relative w-full overflow-hidden" style={{ height }}>
      {images.map((it, i) => (
        <div key={i} ref={(el) => (cards.current[i] = el)}
          onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
          className="group absolute left-0 top-0 cursor-pointer will-change-transform" style={{ width: cw, height: ch }}>
          <GlareHover className="h-full w-full rounded-2xl border-[3px] border-page shadow-xl transition-shadow group-hover:shadow-2xl">
            <img src={it.img} alt={it.label} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-8"><p className="h-display text-base text-cream">{it.label}</p></div>
          </GlareHover>
        </div>
      ))}
      {/* copy sits in the optical centre of the empty arc */}
      <div className="pointer-events-none absolute left-1/2 z-[30] -translate-x-1/2 -translate-y-1/2 text-center" style={{ top: ch + ry * 0.5, width: Math.min(rx * 0.9, 520) }}>
        <h3 className="h-display text-[clamp(1.6rem,2.8vw,2.5rem)]">{title}</h3>
        <p className="mt-2 text-sm text-fg/70">{text}</p>
        {cta && <div className="pointer-events-auto mt-4">{cta}</div>}
      </div>
    </div>
  )
}

/** Three-up auto-looping carousel: centre card highlighted, sides recede, forever moving. */
export function CenterLoop<T>({ items, render, interval = 2800 }: { items: T[]; render: (item: T, active: boolean) => ReactNode; interval?: number }) {
  const n = items.length
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const on = useOnScreen(ref)
  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setIdx((i) => (i + 1) % n), interval)
    return () => clearInterval(id)
  }, [n, interval, on])
  const wide = useMedia('(min-width: 768px)')
  return (
    <div ref={ref}>
      <div className="relative mx-auto h-[400px] max-w-5xl overflow-hidden md:h-[420px]">
        {items.map((it, i) => {
          let d = ((i - idx) % n + n) % n
          if (d > n / 2) d -= n
          const vis = Math.abs(d) <= 1
          return (
            <motion.div key={i}
              animate={{ x: `${d * (wide ? 82 : 70)}%`, scale: d === 0 ? 1 : 0.84, opacity: vis ? (d === 0 ? 1 : 0.5) : 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
              onClick={() => setIdx(i)}
              className="absolute left-1/2 top-0 h-full w-[78vw] max-w-[380px] -translate-x-1/2 cursor-pointer md:w-[34%]"
              style={{ zIndex: d === 0 ? 10 : 1, pointerEvents: vis ? 'auto' : 'none' }}>
              {render(it, d === 0)}
            </motion.div>
          )
        })}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button aria-label="Previous" onClick={() => setIdx((idx - 1 + n) % n)} className="glass-light grid h-10 w-10 place-items-center rounded-full">←</button>
        <div className="flex gap-1.5">{items.map((_, i) => <button key={i} aria-label={`Go to ${i + 1}`} onClick={() => setIdx(i)} className={cn('h-1.5 rounded-full transition-all', i === idx ? 'w-7 bg-gold' : 'w-1.5 bg-fg/30')} />)}</div>
        <button aria-label="Next" onClick={() => setIdx((idx + 1) % n)} className="glass-light grid h-10 w-10 place-items-center rounded-full">→</button>
      </div>
    </div>
  )
}

/** Orbit system: three glowing rings, each spinning at its own speed / direction, photos riding the rings upright. */
const rings = [
  { r: 22, size: 11, count: 2, dur: 26, rev: false },
  { r: 33, size: 12, count: 2, dur: 38, rev: true },
  { r: 43.5, size: 13, count: 3, dur: 54, rev: false },
]
export function OrbitImages({ images, center }: { images: string[]; center: ReactNode }) {
  let k = 0
  return (
    <div data-orbit className="relative mx-auto aspect-square w-full max-w-[460px] [container-type:inline-size]">
      {/* ambient glow */}
      <div className="absolute inset-[18%] rounded-full bg-gold/20 blur-3xl" />
      {rings.map((rg, ri) => {
        const group = Array.from({ length: rg.count }, () => images[k++ % images.length])
        return (
          <div key={ri} className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-gold/40 shadow-[0_0_24px_rgba(192,149,90,.25),inset_0_0_24px_rgba(192,149,90,.12)]"
              style={{ width: `${rg.r * 2}cqw`, height: `${rg.r * 2}cqw`, transform: 'translate(-50%,-50%)' }} />
            <div className="absolute inset-0" style={{ animation: `star-spin ${rg.dur}s linear infinite ${rg.rev ? 'reverse' : ''}` }}>
              {group.map((src, i) => {
                const a = (i / rg.count) * 360 + ri * 40
                return (
                  <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(${-rg.r}cqw)` }}>
                    <div style={{ transform: `rotate(${-a}deg)` }}>
                      <div className="-translate-x-1/2 -translate-y-1/2" style={{ width: `${rg.size}cqw`, height: `${rg.size}cqw` }}>
                        <div className="h-full w-full" style={{ animation: `star-spin ${rg.dur}s linear infinite ${rg.rev ? '' : 'reverse'}` }}>
                          <div className="group sheen-host relative h-full w-full overflow-hidden rounded-full border-[3px] border-page shadow-[0_0_0_2px_rgba(192,149,90,.7),0_10px_26px_-8px_rgba(0,0,0,.5)] transition-transform hover:scale-110">
                            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                            <div className="sheen" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* comet dot riding the ring */}
            <div className="absolute inset-0" style={{ animation: `star-spin ${rg.dur * 0.6}s linear infinite ${rg.rev ? '' : 'reverse'}` }}>
              <span className="absolute left-1/2 rounded-full bg-gold shadow-[0_0_12px_4px_rgba(232,197,143,.8)]" style={{ top: `${50 - rg.r}cqw`, width: '1.4cqw', height: '1.4cqw', transform: 'translate(-50%,-50%)' }} />
            </div>
          </div>
        )
      })}
      {/* centre badge: spinning glow border + pulse */}
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center" style={{ width: '27cqw', height: '27cqw' }}>
        <span className="absolute -inset-[3px] rounded-full [animation:star-spin_5s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0 55%, #c0955a 80%, #fff3d6 92%, transparent)' }} />
        <div className="relative grid h-full w-full place-items-center rounded-full bg-forest p-2 text-center text-cream [animation:pulse-glow_3s_ease-in-out_infinite]">{center}</div>
      </div>
    </div>
  )
}
