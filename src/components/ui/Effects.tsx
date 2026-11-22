import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { brand } from '../../data/site'
import { playFor, warmAudio } from '../../lib/sound'

/** Plays a quiet, context-aware UI sound on every button / link click. */
export function ClickSound() {
  useEffect(() => {
    let handledByDown = false
    // mouse: react on press (no release lag). touch / keyboard: react on click so scrolling never beeps.
    const down = (e: PointerEvent) => { if (e.pointerType === 'mouse') { warmAudio(); handledByDown = true; playFor(e.target as Element) } }
    const click = (e: MouseEvent) => { if (handledByDown) { handledByDown = false; return } playFor(e.target as Element) }
    addEventListener('pointerdown', down, true)
    addEventListener('click', click, true)
    return () => { removeEventListener('pointerdown', down, true); removeEventListener('click', click, true) }
  }, [])
  return null
}

/** Inertial smooth scrolling — one wheel flick keeps gliding. */
let lenisRef: Lenis | null = null
/** Jump (or glide) to the very top — used by route changes and logo / same-page nav clicks. */
export function scrollToTop(immediate = false) {
  if (lenisRef) lenisRef.scrollTo(0, { immediate, force: true, duration: 1.1 })
  else window.scrollTo(0, 0)
}

export function SmoothScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // lerp-based smoothing: constant feel, no restart-jitter between wheel ticks
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, autoRaf: true })
    lenisRef = lenis
    return () => { lenis.destroy(); lenisRef = null }
  }, [])
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    scrollToTop(true)
    const t = setTimeout(() => { window.scrollTo(0, 0); scrollToTop(true) }, 60) // after lazy page mounts
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

/** Floating WhatsApp button with greeting popup. */
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(() => { try { return !!sessionStorage.getItem('wa') } catch { return false } })
  useEffect(() => {
    const t = setTimeout(() => { if (!seen) { setOpen(true); try { sessionStorage.setItem('wa', '1') } catch { /* */ } } }, 9000)
    return () => clearTimeout(t)
  }, [seen])
  const href = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hi ${brand.short}, I would like to discuss a project.`)}`
  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white text-ink shadow-2xl">
            <div className="flex items-center gap-3 bg-[#075e54] p-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">{brand.short[0]}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{brand.name}</p><p className="text-[11px] opacity-80">Typically replies within minutes</p></div>
              <button aria-label="Close chat popup" onClick={() => { setOpen(false); setSeen(true) }} className="text-lg leading-none opacity-80 hover:opacity-100">×</button>
            </div>
            <div className="bg-[#efe7dd] p-3">
              <p className="inline-block max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm shadow-sm">Hello 👋 Planning a home, office or interior project? Tell us a little and we will help.</p>
            </div>
            <a href={href} target="_blank" rel="noreferrer" className="block bg-white p-3 text-center text-sm font-bold text-[#075e54] hover:bg-[#f0fff4]">Start chat on WhatsApp →</a>
          </motion.div>
        )}
      </AnimatePresence>
      <button aria-label="Chat on WhatsApp" onClick={() => { setOpen((o) => !o); setSeen(true) }} className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-105">
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366] [animation:wa-pulse_2.2s_ease-out_infinite]" />
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden><path d="M16.02 3C8.84 3 3 8.83 3 16c0 2.3.6 4.55 1.75 6.52L3 29l6.64-1.72A13 13 0 0016.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3zm0 23.78c-1.98 0-3.9-.53-5.58-1.54l-.4-.24-3.94 1.02 1.05-3.84-.26-.4A10.7 10.7 0 015.2 16c0-5.9 4.8-10.7 10.82-10.7 5.9 0 10.7 4.8 10.7 10.7s-4.8 10.78-10.7 10.78zm5.88-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.5-.16-.72.17-.2.32-.83 1.04-1 1.26-.2.2-.38.23-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.85-1.6-1.9-1.8-2.22-.2-.32 0-.5.15-.66.15-.14.32-.38.48-.57.16-.2.2-.33.32-.55.1-.2.05-.4-.03-.56-.08-.16-.72-1.74-1-2.38-.26-.62-.52-.54-.72-.55h-.6c-.2 0-.55.08-.84.4-.28.32-1.1 1.08-1.1 2.64s1.13 3.06 1.3 3.27c.16.2 2.2 3.4 5.4 4.76.76.33 1.36.53 1.82.68.77.24 1.46.2 2 .12.62-.1 1.9-.78 2.17-1.53.27-.74.27-1.38.2-1.52-.1-.14-.3-.22-.62-.38z" /></svg>
      </button>
    </div>
  )
}

/** Click sparks — the canvas loop only runs while sparks are alive (no idle cost). */
export function ClickSpark({ color = '#c0955a' }: { color?: string }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = cv.current!, ctx = c.getContext('2d')!
    const fit = () => { c.width = innerWidth; c.height = innerHeight }
    fit(); addEventListener('resize', fit)
    type S = { x: number; y: number; a: number; t: number }
    let sparks: S[] = [], raf = 0, col = color
    const draw = (now: number) => {
      ctx.clearRect(0, 0, c.width, c.height)
      sparks = sparks.filter((s) => now - s.t < 550)
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineCap = 'round'
      for (const s of sparks) {
        const p = (now - s.t) / 550, e = 1 - Math.pow(1 - p, 3), d = e * 28, l = (1 - p) * 9
        ctx.beginPath()
        ctx.moveTo(s.x + Math.cos(s.a) * d, s.y + Math.sin(s.a) * d)
        ctx.lineTo(s.x + Math.cos(s.a) * (d + l), s.y + Math.sin(s.a) * (d + l))
        ctx.stroke()
      }
      raf = sparks.length ? requestAnimationFrame(draw) : 0
      if (!sparks.length) ctx.clearRect(0, 0, c.width, c.height)
    }
    const click = (e: MouseEvent) => {
      col = getComputedStyle(document.documentElement).getPropertyValue('--color-gold').trim() || color
      const t = performance.now()
      for (let i = 0; i < 9; i++) sparks.push({ x: e.clientX, y: e.clientY, a: (Math.PI * 2 * i) / 9, t })
      if (!raf) raf = requestAnimationFrame(draw)
    }
    addEventListener('click', click)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); removeEventListener('click', click) }
  }, [color])
  return <canvas ref={cv} className="pointer-events-none fixed inset-0 z-[90]" />
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement
      if (ref.current) ref.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`
    }
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return <div ref={ref} className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
}

/** Intro splash: house draws itself, counter fills, curtain lifts. */
export function Splash() {
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem('splash') } catch { return true } })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const start = performance.now(), dur = 2300
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => { setShow(false); document.body.style.overflow = ''; try { sessionStorage.setItem('splash', '1') } catch { /* */ } }, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = '' }
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-forest-deep text-cream">
          <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" className="h-28 w-36 text-gold" strokeWidth="2.2" strokeLinejoin="round">
            {['M10 82H110', 'M18 82V38L60 10l42 28v44', 'M44 82V54h32v28', 'M8 40L60 6l52 34'].map((d, i) => (
              <path key={i} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1} style={{ animation: `draw 1.1s ${i * 0.35}s ease forwards` }} />
            ))}
          </svg>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="h-display mt-6 text-3xl md:text-4xl">{brand.name}</motion.p>
          <p className="eyebrow mt-2 text-gold">{brand.tagline}</p>
          <div className="mt-8 h-px w-48 bg-cream/20"><div className="h-px bg-gold" style={{ width: `${n}%` }} /></div>
          <p className="mt-3 text-xs tabular-nums text-cream/60">{n}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
