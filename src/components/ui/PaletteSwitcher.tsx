import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { palettes, usePalette } from '../../hooks/hooks'
import { cn } from '../../lib/utils'

const Swatch = ({ c, size = 28 }: { c: readonly string[]; size?: number }) => (
  <span className="relative block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10" style={{ width: size, height: size, background: `linear-gradient(135deg, ${c[0]} 50%, ${c[1]} 50%)` }} />
)

/** Colour-theme picker. variant "popover" = navbar button + dropdown; "row" = inline swatches (mobile menu). */
export default function PaletteSwitcher({ variant = 'popover' }: { variant?: 'popover' | 'row' }) {
  const [id, set] = usePalette()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const f = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('mousedown', f); addEventListener('keydown', k)
    return () => { removeEventListener('mousedown', f); removeEventListener('keydown', k) }
  }, [open])
  const cur = palettes.find((p) => p.id === id) ?? palettes[0]

  if (variant === 'row') {
    return (
      <div>
        <p className="eyebrow mb-2 text-gold">Colour theme</p>
        <div className="grid grid-cols-4 gap-2">
          {palettes.map((p) => (
            <button key={p.id} onClick={() => set(p.id)} aria-label={`${p.name} theme`} aria-pressed={id === p.id}
              className={cn('flex flex-col items-center gap-1.5 rounded-xl border p-2 text-[10px] font-semibold transition', id === p.id ? 'border-gold bg-white/10' : 'border-white/10 hover:bg-white/5')}>
              <Swatch c={p.colors} size={30} />{p.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button aria-label="Choose colour theme" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full sm:h-10 sm:w-10 transition hover:bg-white/15">
        <Swatch c={cur.colors} size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}
            className="absolute right-0 top-full z-20 w-60 pt-2">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-forest-deep/97 p-2 text-cream shadow-2xl backdrop-blur-xl">
              <p className="eyebrow px-2 pb-1.5 pt-1 text-gold">Colour theme</p>
              {palettes.map((p) => (
                <button key={p.id} onClick={() => { set(p.id); setOpen(false) }} aria-pressed={id === p.id}
                  className={cn('flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/10', id === p.id && 'bg-white/10')}>
                  <Swatch c={p.colors} size={30} />
                  <span className="min-w-0 flex-1"><span className="block text-[13px] font-semibold leading-tight">{p.name}</span><span className="block text-[11px] text-cream/60">{p.note}</span></span>
                  {id === p.id && <span className="text-gold">✓</span>}
                </button>
              ))}
              <p className="px-2 pb-1 pt-1.5 text-[10px] text-cream/50">Works in both light and dark mode.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
