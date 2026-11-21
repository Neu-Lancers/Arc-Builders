import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../lib/utils'

/** Glare: diagonal flash sweep + cursor spotlight + glowing border on hover. */
export function GlareHover({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--gx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={move} className={cn('group glow-border relative overflow-hidden', className)}>
      {children}
      <div className="sheen" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--gx) var(--gy), rgba(255,255,255,.22), transparent 55%)' }}
      />
    </div>
  )
}

/** 3D tilt card following the cursor. */
export function TiltedCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 160, damping: 18 }), sy = useSpring(my, { stiffness: 160, damping: 18 })
  const rx = useTransform(sy, [-0.5, 0.5], [max, -max]), ry = useTransform(sx, [-0.5, 0.5], [-max, max])
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }
  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </motion.div>
    </div>
  )
}

/** Card with a cursor-following spotlight, glowing border and flash sweep. */
export function SpotlightCard({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--sx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={move} className={cn('group glow-border relative overflow-hidden rounded-3xl', className)}>
      <div className="sheen" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(340px circle at var(--sx) var(--sy), ${dark ? 'rgba(192,149,90,.28)' : 'rgba(29,74,53,.14)'}, transparent 60%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/** Rotating conic star border. */
export function StarBorder({ children, className, color = '#c0955a' }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span className={cn('relative inline-block overflow-hidden rounded-full p-px', className)}>
      <span className="absolute -inset-[200%] animate-[star-spin_4s_linear_infinite]" style={{ background: `conic-gradient(from 0deg, transparent 0 60%, ${color} 88%, transparent 100%)` }} />
      <span className="relative block rounded-full">{children}</span>
    </span>
  )
}
