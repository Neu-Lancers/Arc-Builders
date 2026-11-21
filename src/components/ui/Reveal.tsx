import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

const ease = [0.2, 0.8, 0.2, 1] as const

/** Fade / slide in on scroll (transform + opacity only → cheap). */
export function Reveal({
  children, delay = 0, y = 28, x = 0, className,
}: { children: ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Word-by-word masked headline reveal. */
export function SplitHeading({
  text, className, delay = 0, as: Tag = 'h2',
}: { text: string; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <Tag ref={ref as never} className={cn('h-display', className)} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="mr-[.24em] inline-block overflow-hidden pb-[.12em] align-bottom" aria-hidden>
          <motion.span className="inline-block" initial={{ y: '115%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.85, delay: delay + i * 0.05, ease }}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Ribbon highlighter that sweeps in behind text. */
export function Ribbon({ children, color }: { children: ReactNode; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })
  return (
    <span ref={ref} className={cn('ribbon', inView && 'in')} style={color ? ({ '--ribbon': color } as React.CSSProperties) : undefined}>
      {children}
    </span>
  )
}

/** Animated counter. value like "120+", "3.2M", "₹900Cr", "4.9★". */
export function Counter({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)([\d.]+)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || !m) return
    const c = animate(0, parseFloat(m[2]), { duration: 2, ease: 'easeOut', onUpdate: setN })
    return () => c.stop()
  }, [inView])
  if (!m) return <span className={className}>{value}</span>
  const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0
  return <span ref={ref} className={className}>{m[1]}{n.toFixed(dec)}{m[3]}</span>
}

export function SectionHead({
  eyebrow, title, ribbon, text, center, light,
}: { eyebrow: string; title: string; ribbon?: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      <Reveal><p className={cn('eyebrow mb-3', light ? 'text-gold' : 'text-accent')}>— {eyebrow}</p></Reveal>
      <SplitHeading text={title} className={cn('text-[clamp(1.8rem,4vw,3.1rem)]', light && 'text-cream')} />
      {ribbon && (
        <Reveal delay={0.15}>
          <p className={cn('h-display mt-1 italic text-[clamp(1.35rem,2.8vw,2.1rem)]', light ? 'text-cream' : 'text-accent')}>
            <Ribbon>{ribbon}</Ribbon>
          </p>
        </Reveal>
      )}
      {text && <Reveal delay={0.2}><p className={cn('mt-4 text-[0.95rem] leading-relaxed md:text-base', light ? 'text-cream/80' : 'text-fg/70')}>{text}</p></Reveal>}
    </div>
  )
}
