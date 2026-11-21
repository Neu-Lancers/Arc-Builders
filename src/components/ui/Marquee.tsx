import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Infinite logo / text loop. */
export function Marquee({ children, dur = 40, rev, className }: { children: ReactNode; dur?: number; rev?: boolean; className?: string }) {
  return (
    <div className={cn('marquee overflow-hidden', className)} style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
      <div className={cn('marquee-track', rev && 'rev')} style={{ ['--dur' as string]: `${dur}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  )
}

/** Angled ribbon band with looping text. */
export function RibbonBand({ words, className }: { words: string[]; className?: string }) {
  return (
    <div className={cn('-rotate-[2.2deg] scale-[1.04] bg-forest py-4 text-cream shadow-xl', className)}>
      <Marquee dur={34}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-8 px-4 h-display text-3xl italic md:text-4xl">
            {w} <span className="text-gold">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
