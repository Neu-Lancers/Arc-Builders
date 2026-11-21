import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Small repeating wave path (filled region above the wave line). */
const path = (() => {
  const period = 60, w = 1440
  let d = `M0 0H${w}V16`
  for (let x = w; x > 0; x -= period) d += ` q-${period / 4} -14 -${period / 2} 0 t-${period / 2} 0`
  return d + 'Z'
})()

/** Edge of a section drawn as small waves. `fill` = colour of the NEIGHBOURING section. */
export function Wave({ at, fill = 'var(--page)' }: { at: 'top' | 'bottom'; fill?: string }) {
  return (
    <svg
      aria-hidden viewBox="0 0 1440 30" preserveAspectRatio="none"
      className={cn('pointer-events-none absolute left-0 z-[2] block h-4 w-full md:h-5', at === 'top' ? 'top-[-1px]' : 'bottom-[-1px] -scale-y-100')}
    >
      <path d={path} style={{ fill }} />
    </svg>
  )
}

/** A rectangular band with small waves along top and/or bottom. */
export function WaveBand({
  children, className, top = 'var(--page)', bottom = 'var(--page)', dark = true, id,
}: { children: ReactNode; className?: string; top?: string | false; bottom?: string | false; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={cn('relative z-10 py-14 md:py-20', dark ? 'bg-forest text-cream dark:bg-forest-deep' : 'bg-page-2 text-fg', className)}>
      {top !== false && <Wave at="top" fill={top} />}
      {children}
      {bottom !== false && <Wave at="bottom" fill={bottom} />}
    </section>
  )
}
