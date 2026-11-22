import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Small repeating wave path (filled region above the wave line). */
const path = (() => {
  const period = 60, w = 1440
  let d = `M0 0H${w}V16`
  for (let x = w; x > 0; x -= period) d += ` q-${period / 4} -14 -${period / 2} 0 t-${period / 2} 0`
  return d + 'Z'
})()

/** Solid wave strip (used under heroes, where the next section is always the page colour). */
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

/**
 * A rectangular band with small waves along top and/or bottom.
 * The wave is a mask on the band itself and the band overlaps its neighbours by the wave height,
 * so whatever is above/below (photo, cream, footer…) continues straight into the wave — no filler strip.
 * `top` / `bottom`: pass `false` to keep that edge straight. Any other value is ignored (kept for compatibility).
 */
export function WaveBand({
  children, className, top, bottom, dark = true, id,
}: { children: ReactNode; className?: string; top?: string | false; bottom?: string | false; dark?: boolean; id?: string }) {
  const hasTop = top !== false, hasBottom = bottom !== false
  return (
    <section
      id={id}
      className={cn(
        'wave-mask relative z-20 py-14 md:py-20',
        hasTop && 'wave-top -mt-[18px]',
        hasBottom && 'wave-bottom -mb-[18px]',
        dark ? 'bg-forest text-cream dark:bg-forest-deep' : 'bg-page-2 text-fg',
        className
      )}
    >
      {children}
    </section>
  )
}
