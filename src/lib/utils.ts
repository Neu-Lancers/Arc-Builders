export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export const img = (id: string, w = 1600, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
