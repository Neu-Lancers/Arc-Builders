import { lazy, Suspense, useRef, useState, type MutableRefObject } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brand } from '../../data/site'
import { StarBorder } from '../ui/Cards'
import { useOnScreen, useThemeColors } from '../../hooks/hooks'
import { Wave } from '../ui/Wave'

const HouseScene = lazy(() => import('../three/HouseScene'))

/** Chapters follow the build: plot → foundation → structure → facade → entrance → interior → handover */
const chapters = [
  { at: 0.14, tag: '01 · Survey', title: 'It starts with the land', text: 'Aerial survey, soil study and boundary marking — every project begins with understanding the plot.' },
  { at: 0.3, tag: '02 · Structure', title: 'Foundations to framework', text: 'Columns rise, slabs lock in, walls close the volume. Engineered precisely, tracked weekly.' },
  { at: 0.46, tag: '03 · Envelope', title: 'Facade, glass & roof', text: 'The skin goes on: glazing, balcony, roofline and a porch that welcomes you in.' },
  { at: 0.58, tag: '04 · Landscape', title: 'Gardens and approach', text: 'Pathways, trees and lighting make the arrival as considered as the architecture.' },
  { at: 0.74, tag: '05 · Interior', title: 'Step inside', text: 'Bespoke joinery, warm light and curated materials — crafted by our own studio.' },
  { at: 0.92, tag: '06 · Handover', title: 'Welcome home', text: 'Snag-free handover with a 10-year structural warranty. This is how we build.' },
]

function Caption({ at, tag, title, text, p }: (typeof chapters)[number] & { p: MotionValue<number> }) {
  const opacity = useTransform(p, [at - 0.07, at - 0.03, at + 0.03, at + 0.07], [0, 1, 1, 0])
  const y = useTransform(p, [at - 0.07, at, at + 0.07], [30, 0, -30])
  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute inset-x-0 bottom-[9vh] z-30 md:bottom-[12vh]">
      <div className="container-x">
        <div className="glass max-w-md rounded-2xl p-5 text-cream md:p-6">
          <p className="eyebrow text-gold">{tag}</p>
          <h2 className="h-display mt-2 text-2xl md:text-4xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-cream/85">{text}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroStory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const prog = useRef(0) as MutableRefObject<number>
  const theme = useThemeColors()
  const onScreen = useOnScreen(ref, '300px')
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    prog.current = v
    let s = 0
    chapters.forEach((c, i) => { if (Math.abs(v - c.at) < Math.abs(v - chapters[s].at)) s = i })
    setStep((o) => (o === s ? o : s))
  })
  const introO = useTransform(scrollYProgress, [0, 0.07, 0.11], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.11], [0, -60])
  const hintO = useTransform(scrollYProgress, [0, 0.04], [1, 0])
  const waveO = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.96, 1], [1, 1, 0, 0, 1])
  const endO = useTransform(scrollYProgress, [0.93, 0.99], [0, 1])

  return (
    <section data-hero ref={ref} className="relative h-[620vh] bg-ink md:h-[760vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,var(--color-forest),var(--color-ink)_70%)]">
        <div className="absolute inset-0">
          <Suspense fallback={null}><HouseScene progress={prog} active={onScreen} theme={theme} /></Suspense>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/60 via-transparent to-ink/70" />

        {/* intro */}
        <motion.div style={{ opacity: introO, y: introY }} className="absolute inset-0 z-30 flex items-center">
          <div className="container-x pt-16">
            <p className="eyebrow text-gold">— {brand.name} · Est. 2008</p>
            <h1 className="h-display mt-4 max-w-4xl text-[clamp(2.4rem,7vw,5.6rem)] text-cream">
              Building spaces <span className="italic text-gold">worth</span> living in.
            </h1>
            <p className="mt-5 max-w-lg text-sm text-cream/85 md:text-base">
              Scroll to watch a home take shape — from an empty plot to the finished interior — the way we build every one.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <StarBorder><Link to="/projects" className="btn btn-light">View our work →</Link></StarBorder>
              <Link to="/contact" className="btn btn-ghost text-cream">Get a quote</Link>
            </div>
          </div>
        </motion.div>

        {chapters.map((c) => <Caption key={c.tag} {...c} p={scrollYProgress} />)}

        <motion.div style={{ opacity: endO }} className="absolute right-4 bottom-[9vh] z-30 md:right-10 md:bottom-[12vh]">
          <Link to="/contact" className="btn btn-light">Build yours →</Link>
        </motion.div>

        <motion.div style={{ opacity: hintO }} className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center text-cream/80">
          <p className="eyebrow mb-1.5">Scroll</p>
          <div className="mx-auto h-8 w-px animate-pulse bg-cream/70" />
        </motion.div>

        {/* chapter rail */}
        <div className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex lg:right-8">
          {chapters.map((c, i) => (
            <div key={c.tag} className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${i === step ? 'text-gold opacity-100' : 'opacity-0'}`}>{c.tag.split('· ')[1]}</span>
              <span className={`block rounded-full transition-all ${i === step ? 'h-2.5 w-2.5 bg-gold' : 'h-1.5 w-1.5 bg-cream/50'}`} />
            </div>
          ))}
        </div>
        <motion.div style={{ opacity: waveO }} className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-6"><Wave at="bottom" fill="var(--page)" /></motion.div>
      </div>
    </section>
  )
}
