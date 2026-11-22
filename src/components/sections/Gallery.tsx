import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Marquee } from '../ui/Marquee'

/** Collapsed gallery: panels expand on hover / tap. */
export function GalleryAccordion({ items }: { items: { img: string; label: string }[] }) {
  const [active, setActive] = useState(2)
  return (
    <div className="flex h-[56vh] min-h-[340px] gap-1.5 md:h-[60vh] md:gap-2.5">
      {items.slice(0, 7).map((it, i) => (
        <motion.button
          key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-label={it.label}
          animate={{ flexGrow: active === i ? 6 : 1 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative min-w-0 flex-1 overflow-hidden rounded-xl text-left md:rounded-2xl"
        >
          <img src={it.img} alt={it.label} loading="lazy" className={cn('absolute inset-0 h-full w-full object-cover transition-transform duration-700', active === i ? 'scale-100' : 'scale-110')} />
          <div className={cn('img-overlay absolute inset-0 transition-colors duration-500', active === i ? 'bg-gradient-to-t from-ink/85 via-transparent' : 'bg-ink/45')} />
          <span className={cn('absolute bottom-4 left-3 whitespace-nowrap text-cream transition-all duration-500', active === i ? 'h-display text-xl md:text-3xl' : 'eyebrow origin-bottom-left -rotate-90 translate-x-5 !text-[0.6rem]')}>
            {it.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

/** Filterable masonry with lightbox. */
export function MasonryGallery({ items }: { items: { img: string; label: string; cat?: string }[] }) {
  const cats = ['All', ...Array.from(new Set(items.map((i) => i.cat).filter(Boolean) as string[]))]
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState<number | null>(null)
  const list = items.filter((i) => cat === 'All' || i.cat === cat)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (open === null) return
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((open + 1) % list.length)
      if (e.key === 'ArrowLeft') setOpen((open - 1 + list.length) % list.length)
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [open, list.length])
  const ratios = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]']
  return (
    <>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn('rounded-full px-4 py-1.5 text-xs font-semibold transition', cat === c ? 'bg-forest text-cream' : 'glass-light hover:bg-accent/10')}>{c}</button>
        ))}
      </div>
      <div className="columns-2 gap-3 lg:columns-3">
        {list.map((it, i) => (
          <button key={it.img + it.label} onClick={() => setOpen(i)} className="group relative mb-3 block w-full overflow-hidden rounded-2xl">
            <img src={it.img} alt={it.label} loading="lazy" className={cn('w-full object-cover transition-transform duration-700 group-hover:scale-105', ratios[i % 4])} />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="h-display p-4 text-lg text-cream">{it.label}</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="fixed inset-0 z-[120] grid place-items-center bg-ink/92 p-4">
            <img src={list[open].img} className="max-h-[84vh] max-w-full rounded-xl object-contain shadow-2xl" alt={list[open].label} onClick={(e) => e.stopPropagation()} />
            <p className="h-display absolute bottom-5 text-2xl text-cream">{list[open].label}</p>
            <button aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream text-forest" onClick={() => setOpen(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Tilted rows of drifting images (grid-motion background). */
export function GridMotion({ images }: { images: string[] }) {
  return (
    <div className="absolute inset-0 -rotate-[8deg] scale-[1.3] space-y-3 opacity-60">
      {[0, 1, 2].map((r) => (
        <Marquee key={r} dur={60 + r * 8} rev={r % 2 === 1}>
          {[...images, ...images].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="mr-3 h-32 w-52 rounded-xl object-cover md:h-44 md:w-72" />
          ))}
        </Marquee>
      ))}
    </div>
  )
}
