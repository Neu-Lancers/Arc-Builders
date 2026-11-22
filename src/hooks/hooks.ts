import { useEffect, useState, useSyncExternalStore } from 'react'

export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false
  )
}

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* ignore */ }
  }, [dark])
  return [dark, () => setDark((d) => !d)] as const
}

/** True while an element is on screen (used to pause WebGL when off-screen). */
export function useOnScreen<T extends Element>(ref: React.RefObject<T>, margin = '200px') {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, margin])
  return on
}

/* ---------- colour palettes (applied as <html data-palette="…">; light/dark is independent) ---------- */
export const palettes = [
  { id: 'classic', name: 'Heritage', note: 'Cream & forest', colors: ['#1d4a35', '#eee5da'] },
  { id: 'navy', name: 'Midnight', note: 'Navy & sky', colors: ['#131d38', '#adc7e9'] },
  { id: 'burgundy', name: 'Burgundy', note: 'Wine & cream', colors: ['#790b13', '#fff0dc'] },
  { id: 'sage', name: 'Sage', note: 'Sage & moss', colors: ['#789575', '#e5e8ce'] },
] as const
export type PaletteId = (typeof palettes)[number]['id']

const readPalette = (): PaletteId => (document.documentElement.getAttribute('data-palette') as PaletteId) || 'classic'
export function setPalette(id: PaletteId) {
  document.documentElement.setAttribute('data-palette', id)
  try { localStorage.setItem('palette', id) } catch { /* ignore */ }
  window.dispatchEvent(new Event('palette-change'))
}
export function usePalette() {
  const id = useSyncExternalStore(
    (cb) => { window.addEventListener('palette-change', cb); return () => window.removeEventListener('palette-change', cb) },
    readPalette,
    () => 'classic' as PaletteId
  )
  return [id, setPalette] as const
}

/** Live brand colours (read from CSS variables) for canvas / WebGL code. */
export function useThemeColors() {
  const read = () => {
    const cs = getComputedStyle(document.documentElement)
    const g = (n: string) => cs.getPropertyValue(n).trim()
    return { forest: g('--color-forest'), forestDeep: g('--color-forest-deep'), ink: g('--color-ink'), gold: g('--color-gold'), cream: g('--color-cream') }
  }
  const [c, setC] = useState(read)
  useEffect(() => {
    const f = () => setC((o) => { const n = read(); return JSON.stringify(n) === JSON.stringify(o) ? o : n })
    window.addEventListener('palette-change', f)
    return () => window.removeEventListener('palette-change', f)
  }, [])
  return c
}
