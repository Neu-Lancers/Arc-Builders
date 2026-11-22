import type { ReactNode } from 'react'
import { features } from '../../data/site'
import { wavePath } from './Wave'
import { cn } from '../../lib/utils'

/**
 * Wraps everything that comes AFTER a hero. With features.stackedHeroes on, the hero stays pinned and this
 * block — topped with a small wave edge — slides up from the bottom and covers it. Off → renders children as-is.
 * `pull`: the hero keeps an extra screen of scroll (home walkthrough), so the cover starts one screen earlier.
 */
export default function StackCover({ children, pull }: { children: ReactNode; pull?: boolean }) {
  if (!features.stackedHeroes) return <>{children}</>
  return (
    <div data-hero-end className={cn('relative z-20 flow-root bg-page', pull && '-mt-[100svh]')}>
      <svg aria-hidden viewBox="0 0 1440 30" preserveAspectRatio="none" className="pointer-events-none absolute bottom-[calc(100%-1px)] left-0 block h-4 w-full -scale-y-100 md:h-5">
        <path d={wavePath} style={{ fill: 'var(--page)' }} />
      </svg>
      {children}
    </div>
  )
}
