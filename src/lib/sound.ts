import { useEffect, useState } from 'react'

/** Tiny synthesised UI sounds (Web Audio) — no audio files to load, very quiet, user can mute. */
let ctx: AudioContext | null = null
let master: AudioNode | null = null
let enabled = (() => { try { return localStorage.getItem('sound') !== 'off' } catch { return true } })()
const listeners = new Set<() => void>()

const ac = () => {
  if (!ctx) { const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; if (!C) return null; ctx = new C()
    // master chain: gain boost + compressor so peaks never clip but the sound stays clearly audible
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 6
    const gain = ctx.createGain(); gain.gain.value = 2.4
    gain.connect(comp).connect(ctx.destination); master = gain }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) {
  const c = ac(); if (!c) return
  const t0 = c.currentTime + start
  const o = c.createOscillator(), g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t0)
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  o.connect(g).connect(master ?? c.destination)
  o.start(t0); o.stop(t0 + dur + 0.02)
}

export const sounds = {
  /** crisp tick — links & small controls */
  tick: () => { tone(1800, 0, 0.05, 'triangle', 0.28, 900); tone(900, 0, 0.04, 'sine', 0.2) },
  /** bright two-note chime — primary buttons / CTAs */
  chime: () => { tone(784, 0, 0.14, 'sine', 0.34); tone(1175, 0.05, 0.2, 'sine', 0.3); tone(1568, 0.05, 0.12, 'triangle', 0.1) },
  /** switch click — theme toggle */
  switch: () => { tone(600, 0, 0.05, 'square', 0.1, 320); tone(1000, 0.035, 0.09, 'sine', 0.26) },
  /** bubble pop — chat / open actions */
  pop: () => { tone(480, 0, 0.1, 'sine', 0.36, 1100) },
  /** confirm arpeggio — form submit */
  success: () => { tone(659, 0, 0.12, 'sine', 0.32); tone(831, 0.07, 0.12, 'sine', 0.32); tone(1109, 0.14, 0.26, 'sine', 0.32) },
}

/** Warm the audio engine on first interaction so the first click is not delayed. */
export function warmAudio() { ac() }

export function playFor(el: Element | null) {
  if (!enabled || !el) return
  const tagged = el.closest('[data-sound]') as HTMLElement | null
  const kind = tagged?.dataset.sound
  if (kind === 'none') return
  if (kind && kind in sounds) return sounds[kind as keyof typeof sounds]()
  if (el.closest('.btn-primary, .btn-light')) return sounds.chime()
  if (el.closest('[aria-label*="WhatsApp"], [aria-label*="menu"]')) return sounds.pop()
  if (el.closest('button, a, summary, [role="button"]')) return sounds.tick()
}

export function useSound() {
  const [on, setOn] = useState(enabled)
  useEffect(() => {
    const l = () => setOn(enabled)
    listeners.add(l); return () => { listeners.delete(l) }
  }, [])
  const toggle = () => {
    enabled = !enabled
    try { localStorage.setItem('sound', enabled ? 'on' : 'off') } catch { /* ignore */ }
    listeners.forEach((f) => f())
    if (enabled) sounds.pop()
  }
  return [on, toggle] as const
}
