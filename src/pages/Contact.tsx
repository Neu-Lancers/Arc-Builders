import { useState, type FormEvent } from 'react'
import { PageHero, Panel, FAQ, Testimonials } from '../components/sections/Blocks'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard, StarBorder } from '../components/ui/Cards'
import { WaveBand } from '../components/ui/Wave'
import { FixedBg } from '../components/sections/Scroller'
import { cn } from '../lib/utils'
import { sounds } from '../lib/sound'
import { brand, I, services } from '../data/site'

const field = 'w-full rounded-xl border border-line bg-page/70 px-4 py-3 text-sm text-fg outline-none transition placeholder:text-fg/45 focus:border-accent focus:ring-4 focus:ring-accent/15'

const icons: Record<string, string> = {
  Call: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  Email: 'M3 6h18v12H3zM3 7l9 6 9-6',
  Visit: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  Hours: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
}
const offices = [
  ['Chennai · HQ', '12, Cathedral Road, Chennai 600086', '+91 98765 43210'],
  ['Bengaluru', '48, Residency Road, Bengaluru 560025', '+91 98765 43211'],
  ['Kochi', '7, Marine Drive, Ernakulam 682031', '+91 98765 43212'],
]
const next = [['We call you', 'A project lead reaches out within one working day.'], ['Site visit', 'We visit your plot or space and listen to your brief.'], ['Proposal', 'A clear scope, timeline and cost within 7 days.']]

function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o)
        return (
          <button type="button" key={o} onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            className={cn('rounded-full border px-3.5 py-1.5 text-xs font-semibold transition', on ? 'border-forest bg-forest text-cream' : 'border-line hover:border-accent')}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [types, setTypes] = useState<string[]>([])
  const [budget, setBudget] = useState<string[]>([])
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); sounds.success() }
  const info = [['Call', brand.phone, `tel:${brand.phone}`], ['Email', brand.email, `mailto:${brand.email}`], ['Visit', brand.address, '#map'], ['Hours', brand.hours, '#']]
  return (
    <>
      <PageHero eyebrow="Contact" title="Let us talk about" ribbon="your project." text="Tell us about your plot, your plans and your timeline. We reply within one working day." img={I.lobby} />

      <Panel>
        <div className="container-x">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {info.map(([k, v, h], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <a href={h} className="block h-full">
                  <SpotlightCard className="glass-light h-full !rounded-2xl">
                    <div className="flex items-center gap-3 p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-cream">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={icons[k]} /></svg>
                      </span>
                      <span className="min-w-0"><span className="eyebrow block !text-[0.6rem] text-accent">{k}</span><span className="block break-words text-sm font-semibold">{v}</span></span>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead eyebrow="Get in touch" title="Tell us about" ribbon="what you have in mind." text="The more we know, the more useful our first conversation will be. Pick what fits — we will take it from there." />
              <div className="mt-8 space-y-3">
                {next.map(([t, d], i) => (
                  <Reveal key={t} delay={i * 0.08}>
                    <div className="flex gap-4 rounded-2xl border border-line p-4">
                      <span className="h-display text-3xl text-gold">0{i + 1}</span>
                      <div><p className="font-semibold">{t}</p><p className="text-sm text-fg/70">{d}</p></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="lg:col-span-7" x={30}>
              <form onSubmit={submit} className="glass-light rounded-2xl p-5 md:p-8">
                {sent ? (
                  <div className="grid min-h-[420px] place-items-center text-center">
                    <div>
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-2xl text-cream">✓</span>
                      <p className="h-display mt-4 text-4xl text-accent">Thank you.</p>
                      <p className="mt-2 text-fg/70">Our team will be in touch within one working day.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required className={field} placeholder="Full name" />
                    <input required type="email" className={field} placeholder="Email address" />
                    <input className={field} placeholder="Phone / WhatsApp" />
                    <input className={field} placeholder="Project location" />
                    <div className="sm:col-span-2"><p className="eyebrow mb-2 text-accent">I am interested in</p><Chips options={services.map((s) => s.title.split(' &')[0])} value={types} onChange={setTypes} /></div>
                    <div className="sm:col-span-2"><p className="eyebrow mb-2 text-accent">Estimated budget</p><Chips options={['< ₹50L', '₹50L – 1Cr', '₹1 – 5Cr', '₹5Cr+']} value={budget} onChange={(v) => setBudget(v.slice(-1))} /></div>
                    <textarea required rows={4} className={cn(field, 'sm:col-span-2')} placeholder="Tell us about your project, plot size and timeline" />
                    <div className="sm:col-span-2"><StarBorder className="w-full"><button className="btn btn-primary w-full">Send enquiry →</button></StarBorder></div>
                    <p className="text-xs text-fg/55 sm:col-span-2">We never share your details. Prefer to talk? Call {brand.phone}.</p>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </Panel>

      {/* Offices */}
      <FixedBg src={I.tower2} className="py-14 md:py-20">
        <div className="container-x">
          <SectionHead light eyebrow="Our offices" title="Find a studio" ribbon="near you." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {offices.map(([c, a, p], i) => (
              <Reveal key={c} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-5 text-cream">
                  <p className="h-display text-xl text-gold">{c}</p>
                  <p className="mt-2 text-sm text-cream/85">{a}</p>
                  <a href={`tel:${p}`} className="mt-3 inline-block text-sm font-semibold underline-offset-4 hover:underline">{p}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FixedBg>

      {/* Map */}
      <Panel className="!pb-0" alt>
        <div id="map" className="container-x relative pb-12 md:pb-16">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <iframe title="Map" className="h-[380px] w-full" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=80.22%2C13.03%2C80.28%2C13.07&layer=mapnik" />
            <div className="glass absolute bottom-3 left-3 hidden max-w-xs rounded-xl p-4 text-cream sm:block">
              <p className="h-display text-lg">{brand.name}</p>
              <p className="mt-1 text-xs text-cream/85">{brand.address}</p>
              <p className="mt-1 text-xs text-gold">{brand.hours}</p>
            </div>
          </div>
        </div>
      </Panel>

      <WaveBand top="var(--page-2)" bottom="var(--page)" className="!py-14 text-center">
        <div className="container-x">
          <p className="eyebrow text-gold">— Prefer to talk?</p>
          <h3 className="h-display mx-auto mt-2 max-w-2xl text-[clamp(1.6rem,3.6vw,2.6rem)]">Call us now or message us on WhatsApp.</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`tel:${brand.phone}`} className="btn btn-light">Call {brand.phone}</a>
            <a href={`https://wa.me/${brand.phone.replace(/\D/g, '')}`} className="btn btn-ghost">WhatsApp us</a>
          </div>
        </div>
      </WaveBand>

      <Panel><div className="container-x"><SectionHead center eyebrow="Reviews" title="Trusted by" ribbon="homeowners & developers." /><div className="mt-8"><Testimonials /></div></div></Panel>
      <Panel alt><div className="container-x"><SectionHead center eyebrow="FAQ" title="Before you" ribbon="reach out." /><div className="mt-8"><FAQ /></div></div></Panel>
    </>
  )
}
